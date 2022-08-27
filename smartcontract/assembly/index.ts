import {
	checkIfInvestor,
	contractParameters,
	getContractParams,
	Investor,
	Investors,
	MinDeposit,
	Proposal,
	Proposals,
	updateContractParams,
} from "./model";
import { context, ContractPromiseBatch, u128 } from "near-sdk-as";

/**
 *
 * This function changes the state of data in the blockchain.
 * @dev It is used to start the DAO
 * @param admin - moderator of DAO
 * @param daoLife - How long the DAO is going to run in days;
 * @param voteTimeLimit - How long the investors have to vote in hours
 * @param quorum - Min percentage of votes required for a proposal to be executed on the DAO
 */
export function startDAO(
	admin: string,
	daoLife: u64,
	voteTimeLimit: u64,
	quorum: u32
): void {
	assert(context.predecessor == context.contractName, "Method is private");
	assert(quorum <= 100, "Quorum's percentage can't be above 100%");
	// get Contract parameters from storage
	const contractParameters = getContractParams();

	// check if dao is already live
	assert(
		context.blockTimestamp > contractParameters.daoLife,
		"dao is already Live"
	);

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

	assert(
		context.blockTimestamp < contractParameters.daoLife,
		"Dao is currently closed to contributions"
	);

	assert(
		u128.gt(context.attachedDeposit, MinDeposit) ||
			u128.eq(context.attachedDeposit, MinDeposit),
		"Amount Must be greater or equal to 1 Near"
	);

	let investor: Investor;

	if (checkIfInvestor(context.predecessor)) {
		investor = getInvestor(context.predecessor);
	} else {
		investor = new Investor(context.predecessor);
	}

	investor.updateShares(context.attachedDeposit, "add");

	Investors.set(context.predecessor, investor);

	// update available funds and total shares
	contractParameters.updateAvailableFunds(context.attachedDeposit, "add");
	contractParameters.updateShares(context.attachedDeposit, "add");

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

	assert(
		checkIfInvestor(context.predecessor),
		"Only Investors are allowed to use this feature"
	);

    const availableFunds = u128.sub(
		contractParameters.availableFunds,
		contractParameters.locked
	);
	assert(
		u128.gt(availableFunds, amountToRedeem) ||
			u128.eq(availableFunds, amountToRedeem),
		"not enough available funds, please try again later"
	);

	const investor = getInvestor(context.predecessor);

	assert(
		u128.gt(investor.shares, amountToRedeem) ||
			u128.eq(investor.shares, amountToRedeem),
		"not enough shares"
	);

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
	assert(
		checkIfInvestor(context.predecessor),
		"Only Investors are allowed to use this feature"
	);

	const investor = getInvestor(context.predecessor);

	assert(
		u128.gt(investor.shares, amountToTransfer) ||
			u128.eq(investor.shares, amountToTransfer),
		"not enough shares"
	);

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

	investorTo.updateShares(amountToTransfer, "add");

	// update values in storage
	Investors.set(to, investorTo);
	Investors.set(context.predecessor, investor);
}

/**
 *
 * @param proposal - a proposal to be added to the blockchain
 */
export function createProposal(proposal: Proposal): void {
	const contractParameters = getContractParams();
	// on testnet, accountIds end with .testnet
	assert(proposal.recipient.length > 8, "Invalid recipient's accountId");
	assert(
		checkIfInvestor(context.predecessor),
		"Only Investors are allowed to use this feature"
	);

	let storedProposal = Proposals.get(proposal.id);

	if (storedProposal !== null) {
		throw new Error(`a proposal with id=${proposal.id} already exists`);
	}
	const availableFunds = u128.sub(
		contractParameters.availableFunds,
		contractParameters.locked
	);
	assert(
		u128.gt(availableFunds, proposal.amount) ||
			u128.eq(availableFunds, proposal.amount),
		"amount too big"
	);

	Proposals.set(
		proposal.id,
		Proposal.fromPayload(proposal, contractParameters.voteTime)
	);
	contractParameters.updateLocked(proposal.amount, "add");
	updateContractParams(contractParameters);
}

/**
 *
 * @param proposalId - an identifier of a proposal to be voted on
 *
 */

export function vote(proposalId: string): void {
	assert(
		checkIfInvestor(context.predecessor),
		"Only Investors are allowed to use this feature"
	);

	let proposal = getProposal(proposalId);

	assert(
		!proposal.checkVoter(context.predecessor),
		"Investor can only vote once for a proposal"
	);

	assert(
		context.blockTimestamp < proposal.ends,
		"Proposal voting period has ended"
	);

	let investor = getInvestor(context.predecessor);

	proposal.addVote(investor.shares);

	Proposals.set(proposalId, proposal);
}

/**
 * @dev allows the admin to end a proposal
 * @param proposalId - an identifier of a proposal to be ended
 *
 */

export function endProposal(proposalId: string): void {
	const contractParameters = getContractParams();

	assert(
		contractParameters.admin == context.predecessor,
		"Only Admin is allowed to use this feature"
	);

	let proposal = getProposal(proposalId);

	assert(
		context.blockTimestamp >= proposal.ends,
		"cannot execute proposal before end date"
	);

	assert(!proposal.ended, "proposal has already ended");

	//calculate vote percentage
	const votePercentage = u128.mul(
		u128.div(proposal.votes, contractParameters.totalShares),
		u128.from(100)
	);
	// the if block only runs if votePercentage has reached/exceeded the required quorum. Sets success to true
	// else success is set to false
	if (
		u128.gt(votePercentage, u128.from(contractParameters.quorum)) ||
		u128.eq(votePercentage, u128.from(contractParameters.quorum))
	) {
		proposal.endProposal(true);
	} else {
		proposal.endProposal(false);
	}


	Proposals.set(proposalId, proposal);
	updateContractParams(contractParameters);
}

/**
 * @dev allows the admin to execute a Proposal
 * @param proposalId - an identifier of a proposal to be executed
 *
 */

export function executeProposal(proposalId: string): void {
	const contractParameters = getContractParams();

	assert(
		contractParameters.admin == context.predecessor,
		"Only Admin is allowed to use this feature"
	);

	let proposal = getProposal(proposalId);

	assert(proposal.ended, "proposal hasn't ended");
	assert(!proposal.executed, "cannot execute proposal already executed");
    // funds transferred to recipient only if proposal is a success
	if (proposal.success) {
		//send proposal amount to recipient
		ContractPromiseBatch.create(proposal.recipient).transfer(
			proposal.amount
		);

		contractParameters.updateAvailableFunds(proposal.amount, "sub");
	}

	proposal.executeProposal();
    // amount of funds locked is reduced as proposal has been executed
    // the funds are either sent to the recipient if proposal was a success
    // or they are made available again to the DAO
	contractParameters.updateLocked(proposal.amount, "sub");

	Proposals.set(proposalId, proposal);
	updateContractParams(contractParameters);
}

function getInvestor(accountId: string): Investor {
	let investor = Investors.get(accountId);

	if (investor == null) {
		throw new Error(`${accountId} does not exist on record`);
	}

	return investor;
}

function getProposal(proposalId: string): Proposal {
	let proposal = Proposals.get(proposalId);

	if (proposal === null) {
		throw new Error(`a proposal with id=${proposalId} does not exist`);
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
		return false;
	}

	return proposal.checkVoter(accountId);
}
