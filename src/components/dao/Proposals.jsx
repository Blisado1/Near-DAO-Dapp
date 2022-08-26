import React, { useEffect, useCallback, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import {
  getProposals,
  checkIfInvestorHasVoted,
  voteProposal,
  getContractParams,
  executeProposal,
} from "../../utils/dao";
import { utils } from "near-api-js";

export default function Proposals() {
  const [proposals, setProposals] = useState([]);
  const [admin, setAdmin] = useState("");
  const [loading, setLoading] = React.useState(false);

  const account = window.walletConnection.account();

  const allProposals = useCallback(async () => {
    setProposals(await getProposals());
  }, []);

  const retrieveData = useCallback(async () => {
    const contract = await getContractParams();
    console.log(contract);
    setAdmin(contract.admin);
  }, []);

  function isFinished(proposal) {
    const now = new Date().getTime();
    const proposalEnd = new Date(parseInt(proposal.ends) / 1000000);
    return proposalEnd > now > 0 ? false : true;
  }

  function hasVoted(accountId, proposal) {
    let hasVoted;

    checkIfInvestorHasVoted({
      accountId,
      proposalId: proposal.id,
    }).then((result) => {
      hasVoted = result;
    });

    return hasVoted;
  }

  function convertTime(proposal) {
    let dateObj = new Date(parseInt(proposal.ends) / 1000000);

    console.log(proposal.ends);
    let date = dateObj.toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    let time = dateObj.toLocaleString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return date + ", " + time;
  }

  const startVoteTxn = async (proposal) => {
    try {
      setLoading(true);
      await voteProposal(proposal.id).then((resp) => {
        console.log(resp);
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const startExecTxn = async (proposal) => {
    try {
      setLoading(true);
      await executeProposal(proposal.id).then((resp) => {
        console.log(resp);
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allProposals();
    retrieveData();
  }, [allProposals, retrieveData]);

  return (
    <>
      <div id="proposals" className="option">
        <p className="title">Proposals. _05</p>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          background: "#02315a",
          marginBottom: "5rem",
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="proposals">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#aec1c5", fontSize: "1rem" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#aec1c5", fontSize: "1rem" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#aec1c5", fontSize: "1rem" }}>
                Amount
              </TableCell>
              <TableCell sx={{ color: "#aec1c5", fontSize: "1rem" }}>
                Recipient
              </TableCell>
              <TableCell sx={{ color: "#aec1c5", fontSize: "1rem" }}>
                Votes
              </TableCell>
              <TableCell sx={{ color: "#aec1c5", fontSize: "1rem" }}>
                Vote
              </TableCell>
              <TableCell sx={{ color: "#aec1c5", fontSize: "1rem" }}>
                Ends on
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#aec1c5", fontSize: "1rem" }}
              >
                Executed
              </TableCell>
            </TableRow>
          </TableHead>

          {/* ****************Table Body*************** */}
          <TableBody>
            {proposals.reverse().map((proposal) => (
              <TableRow
                key={proposal.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: "#aec1c5" }}>
                  {proposal.id}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>{proposal.name}</TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {utils.format.formatNearAmount(proposal.amount)} NEAR
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.recipient}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.votes}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {" "}
                  {isFinished(proposal) ? (
                    "Vote finished"
                  ) : hasVoted(account.accountId, proposal) ? (
                    "You already voted"
                  ) : (
                    <LoadingButton
                      onClick={(e) => startVoteTxn(proposal)}
                      loading={loading}
                      variant="contained"
                    >
                      Vote
                    </LoadingButton>
                  )}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {convertTime(proposal)}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.executed ? (
                    "Yes"
                  ) : admin === account.accountId ? (
                    <LoadingButton
                      onClick={(e) => startExecTxn(proposal)}
                      loading={loading}
                      variant="contained"
                    >
                      Execute
                    </LoadingButton>
                  ) : (
                    "No"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
