import { PersistentUnorderedMap, context, PersistentMap, storage, u128 } from "near-sdk-as";

// one hour in nanoseconds
const hour: u64 = (60 * 60 * 1000 * 1000000);

// day in nanoseconds
const day: u64 = 24 * hour;

/**
 * @dev This class represents the contract parameters.
 * It contains basic properties that are needed to define the contract.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class contractParameters {
    admin: string = "";
    quorum: u32 = 0;
    totalShares: u128 = initialValue;
    voteTime: u64 = 0;
    availableFunds: u128 = initialValue;
    locked: u128 = initialValue;
    daoLife: u64 = 0;

    public setContractParams(admin: string, daoLife: u64, voteTimeLimit: u64, quorum: u32): void {
        this.admin = admin;
        this.daoLife = context.blockTimestamp + (daoLife * day);
        this.voteTime = voteTimeLimit * hour;
        this.quorum = quorum;
    }

    public updateShares(shares: u128, command: string): void {
        if (command == "add") {
            this.totalShares = u128.add(this.totalShares, shares);
        } else if (command == "sub") {
            this.totalShares = u128.sub(this.totalShares, shares);
        }
    }

    public updateAvailableFunds(funds: u128, command: string): void {
        if (command == "add") {
            this.availableFunds = u128.add(this.availableFunds, funds);
        } else if (command == "sub") {
            this.availableFunds = u128.sub(this.availableFunds, funds);
        }
    }

    public updateAdmin(newAdmin: string): void {
        this.admin = newAdmin;
    }

    public updateLocked(amount: u128, command: string): void {
        if (command == "add") {
            this.locked = u128.add(this.locked, amount);
        } else if (command == "sub") {
            this.locked = u128.sub(this.locked, amount);
        }

    }
}

const initialValue: u128 = u128.from("000000000000000000000000");
const contractInstance = new contractParameters();

export function updateContractParams(contract: contractParameters): void {
    storage.set<contractParameters>("contract", contract)
}

export function getContractParams(): contractParameters {
    if (!storage.contains("contract")) { return contractInstance }
    return storage.getSome<contractParameters>("contract")
}

/**
 * @dev This class represents a proposal.
 * It contains basic properties that are needed to define a proposal.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class Proposal {
    id: string;
    name: string;
    amount: u128;
    recipient: string;
    votes: u128;
    ends: u64;
    executed: bool;
    success: bool;
    ended: bool;
    private voters: Array<String>;

    public static fromPayload(payload: Proposal, voteTimeLimit: u64): Proposal {
        const proposal = new Proposal();
        proposal.id = payload.id;
        proposal.name = payload.name;
        proposal.amount = payload.amount;
        proposal.recipient = payload.recipient;
        proposal.votes = initialValue;
        proposal.ends = context.blockTimestamp + voteTimeLimit;
        proposal.executed = false;
        proposal.success = false;
        proposal.ended = false;
        proposal.voters = new Array<String>();
        return proposal;
    }

    public addVote(shares: u128): void {
        this.votes = u128.add(this.votes, shares);
        this.voters.push(context.predecessor);
    }

    public executeProposal(): void {
        this.executed = true;
    }

    public endProposal(success: bool): void {
        this.ended = true;
        this.success = success;
    }
    // check if investor has voted
    public checkVoter(accountId: string): bool {
        return this.voters.includes(accountId);
    }
}

export const Proposals = new PersistentUnorderedMap<string, Proposal>("PROPOSALS");

/**
 * @dev This class represents an investor.
 * It contains basic properties that are needed to define an investor.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class Investor {
    //params
    isInvestor: bool;
    shares: u128 = initialValue;

    constructor(public name: string) {
        this.isInvestor = true;
    }

    public updateShares(shares: u128, command: string): void {
        if (command == "add") {
            this.shares = u128.add(this.shares, shares);
        } else if (command == "sub") {
            this.shares = u128.sub(this.shares, shares);
        }
    }

    public stillHasShares(): bool {
        if (this.shares.toString() == initialValue.toString()) {
            return false;
        } else {
            return true;
        }
    }

    public revokeRights(): void {
        this.isInvestor = false;
    }
}

export const Investors = new PersistentUnorderedMap<string, Investor>("INVESTORS");

export function checkIfInvestor(accountId: string): bool {
    // get investor data
    const investor = Investors.get(accountId);

    // run checks
    if (investor == null) {
        return false
    } else {
        return investor.isInvestor
    }
}

// min deposit of 10 NEAR
export const MinDeposit = u128.from(1000000000000000000000000);
