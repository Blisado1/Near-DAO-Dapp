import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function contributToDAO(amount) {
  amount = parseNearAmount(amount + "");
  return window.contract.contributeToDAO({}, GAS, amount);
}

export function redeemShares(amountToRedeem) {
  amountToRedeem = parseNearAmount(amountToRedeem + "");
  return window.contract.redeemShares({ amountToRedeem });
}

export function transferShares({ amountToTransfer, to }) {
  amountToTransfer = parseNearAmount(amountToTransfer + "");
  return window.contract.transferShares({ amountToTransfer, to });
}

export function createProposal(proposal) {
  proposal.id = uuid4();
  proposal.amount = parseNearAmount(proposal.amount + "");
  return window.contract.createProposal({ proposal });
}

export function voteProposal(proposalId) {
  return window.contract.vote({ proposalId });
}

export function executeProposal(proposalId) {
  return window.contract.executeProposal({ proposalId });
}

export function getProposals() {
  return window.contract.getProposals();
}

export function getInvestorData(accountId) {
  return window.contract.getInvestorData({ accountId });
}

export function checkIfInvestorHasVoted({ accountId, proposalId }) {
  return window.contract.hasVoted({ accountId, proposalId });
}

export function getContractParams() {
  return window.contract.contractParam();
}
