import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export default function Proposals() {
  const dummyProposals = [
    {
      id: 1,
      name: "Tester",
      amount: "5 Near",
      recipient: "testAccount.testnet",
      votes: 2,
      vote: "Vote Finished",
      endsOn: "8/31/2021, 5:14:21 PM",
      executed: "No",
    },
    {
      id: 2,
      name: "Tester Member",
      amount: "5 Near",
      recipient: "tester1122.testnet",
      votes: 2,
      vote: "Vote Finished",
      endsOn: "9/31/2021, 8:07:47 PM",
      executed: "No",
    },
  ];
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
            {dummyProposals.map((proposal) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: "#aec1c5" }}>
                  {proposal.id}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>{proposal.name}</TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.amount}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.recipient}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.votes}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>{proposal.vote}</TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.endsOn}
                </TableCell>
                <TableCell sx={{ color: "#aec1c5" }}>
                  {proposal.executed}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
