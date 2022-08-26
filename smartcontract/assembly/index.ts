import { checkIfInvestor, contractParameters, getContractParams, Investor, Investors, MinDeposit, Proposal, Proposals, updateContractParams } from "./model";
import { context, ContractPromiseBatch, u128 } from "near-sdk-as";

/**
 * 
 * This function changes the state of data in the blockchain. 
 * It is used to start the DAO
 * @param admin - moderator of DAO
 * @param daoLife - How long the DAO is going to run in days;
 * @param voteTimeLimit - How long the investors have to vote in hours
 * @param quorum - Min percentage of votes required for a proposal to be executed on the DAO
 */
export function startDAO(admin: string, daoLife: u64, voteTimeLimit: u64, quorum: u32): void {
    assert(context.predecessor == context.contractName, "Method is private");

    // get Contract parameters from storage
    const contractParameters = getContractParams();

    // check if dao is already live
    assert(context.blockTimestamp > contractParameters.daoLife, "dao is already Live")

    // set the parameters
    contractParameters.setContractParams(admin, daoLife, voteTimeLimit, quorum);

    // update the contract parameters in storage
    updateContractParams(contractParameters);
}

// to view active contract parameters
export function contractParam(): contractParameters {
    return getContractParams();
}

/**
 * 
 * This function changes the state of data in the blockchain. 
 * It is used to contribute to the DAO, by adding funds and in return the user gets investor rights.
 * 
 */
export function contributeToDAO(): void {
    const contractParameters = getContractParams();

    assert(context.blockTimestamp < contractParameters.daoLife, "Dao is currently closed to contributions");

    assert(u128.gt(context.attachedDeposit, MinDeposit) || u128.eq(context.attachedDeposit, MinDeposit), "Amount Must be greater or equal to 1 Near")

    let investor: Investor;

    if (checkIfInvestor(context.predecessor)) {
        investor = getInvestor(context.predecessor);
    } else {
        investor = new Investor(context.predecessor);
    }

    investor.updateShares(context.attachedDeposit, "add");

    Investors.set(context.predecessor, investor);

    // update available funds and total shares
    contractParameters.availableFunds = u128.add(contractParameters.availableFunds, context.attachedDeposit);
    contractParameters.totalShares = u128.add(contractParameters.totalShares, context.attachedDeposit);

    updateContractParams(contractParameters);
}


/**
 * 
 * This function changes the state of data in the blockchain. 
 * It is used to remove funds from dao. Investors convert their shares back to near
 * 
 */
export function redeemShares(amountToRedeem: u128): void {
    const contractParameters = getContractParams();

    assert(checkIfInvestor(context.predecessor), "Only Investors are allowed to use this feature")

    assert(u128.gt(contractParameters.availableFunds, amountToRedeem) || u128.eq(contractParameters.availableFunds, amountToRedeem), "not enough available funds, please try again later");

    const investor = getInvestor(context.predecessor);

    assert(u128.gt(investor.shares, amountToRedeem) || u128.eq(investor.shares, amountToRedeem), "not enough shares");

    // update investor shares
    investor.updateShares(amountToRedeem, "sub");

    // check if investor still has shares else revoke investor rights
    if (!investor.stillHasShares()) {
        investor.revokeRights();
    }

    //send money
    ContractPromiseBatch.create(context.predecessor).transfer(amountToRedeem);

    // update contract parameters
    contractParameters.updateAvailableFunds(amountToRedeem, "sub");

    contractParameters.updateShares(amountToRedeem, "sub");

    // update values in storage
    updateContractParams(contractParameters);
    Investors.set(context.predecessor, investor);
}


/**
 * 
 * This function changes the state of data in the blockchain. 
 * It is used to remove funds from dao. Investors convert their shares back to near
 * 
 */
export function transferShares(amountToTransfer: u128, to: string): void {

    assert(checkIfInvestor(context.predecessor), "Only Investors are allowed to use this feature")

    const investor = getInvestor(context.predecessor);

    assert(u128.gt(investor.shares, amountToTransfer) || u128.eq(investor.shares, amountToTransfer), "not enough shares")

    // update investor shares
    investor.updateShares(amountToTransfer, "sub");

    // check if investor still has shares else revoke investor rights
    if (!investor.stillHasShares()) {
        investor.revokeRights();
    }

    // investor To
    let investorTo: Investor;

    if (checkIfInvestor(to)) {
        investorTo = getInvestor(to);
    } else {
        investorTo = new Investor(to);
    }

    investorTo.updateShares(context.attachedDeposit, "add");

    // update values in storage
    Investors.set(context.predecessor, investorTo);
    Investors.set(context.predecessor, investor);
}


/**
 * 
 * @param proposal - a proposal to be added to the blockchain
 */
export function createProposal(proposal: Proposal): void {
    const contractParameters = getContractParams();

    assert(checkIfInvestor(context.predecessor), "Only Investors are allowed to use this feature")

    let storedProposal = Proposals.get(proposal.id);

    if (storedProposal !== null) {
        throw new Error(`a proposal with id=${proposal.id} already exists`)
    }

    assert(u128.gt(contractParameters.availableFunds, proposal.amount) || u128.eq(contractParameters.availableFunds, proposal.amount), "amount too big");

    Proposals.set(proposal.id, Proposal.fromPayload(proposal, contractParameters.voteTime));
}

/**
 * 
 * @param proposalId - an identifier of a proposal to be voted on
 *
 */

export function vote(proposalId: string): void {
    assert(checkIfInvestor(context.predecessor), "Only Investors are allowed to use this feature")

    let proposal = getProposal(proposalId);

    assert(!proposal.checkVoter(context.predecessor), "Investor can only vote once for a proposal")

    assert(context.blockTimestamp < proposal.ends, "Proposal voting period has ended");

    let investor = getInvestor(context.predecessor)

    proposal.addVote(investor.shares);

    Proposals.set(proposalId, proposal);
}


/**
 * 
 * @param proposalId - an identifier of a proposal to be executed
 *
 */

export function executeProposal(proposalId: string): void {
    const contractParameters = getContractParams();

    assert(contractParameters.admin == context.predecessor, "Only Admin is allowed to use this feature")

    let proposal = getProposal(proposalId);

    assert(context.blockTimestamp >= proposal.ends, "cannot execute proposal before end date")

    assert(!proposal.executed, "cannot execute proposal already executed");

    //calculate vote percentage
    const votePercentage = u128.mul((u128.div(proposal.votes, contractParameters.totalShares)), u128.from(100));

    assert(u128.gt(votePercentage, u128.from(contractParameters.quorum)) || u128.eq(votePercentage, u128.from(contractParameters.quorum)), "cannot execute proposal with votes # below quorum");

    //transfer the funds and execute the proposal
    assert(u128.gt(contractParameters.availableFunds, proposal.amount) || u128.eq(contractParameters.availableFunds, proposal.amount), "amount too big");

    contractParameters.updateAvailableFunds(proposal.amount, "sub");

    updateContractParams(contractParameters);
}


function getInvestor(accountId: string): Investor {
    let investor = Investors.get(accountId);

    if (investor == null) {
        throw new Error(`${accountId} does not exist on record`)
    }

    return investor;
}

function getProposal(proposalId: string): Proposal {
    let proposal = Proposals.get(proposalId);

    if (proposal === null) {
        throw new Error(`a proposal with id=${proposalId} does not exist`)
    }

    return proposal;

}

/**
 * 
 * A function that returns an array of products for all accounts
 * 
 * @returns an array of objects that represent a proposal
 */
export function getProposals(): Array<Proposal> {
    return Proposals.values();
}


export function getInvestorData(accountId: string): Investor | null {
    let investor = Investors.get(accountId);

    if (investor == null) {
        return null;
    }

    return investor;
}


export function hasVoted(accountId: string, proposalId: string): bool {
    let proposal = Proposals.get(proposalId);

    if (proposal === null) {
        return false
    }

    return proposal.checkVoter(accountId);
}
