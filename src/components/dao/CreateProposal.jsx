import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { Input } from "./Form";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import { createProposal } from "../../utils/dao";

export const Proposal = () => {
  const [amount, setAmount] = React.useState("");
  const [name, setName] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const startTxn = async () => {
    if (amount === "" && name === "" && recipient === "") return;
    try {
      setLoading(true);
      await createProposal({ amount, name, recipient }).then((resp) => {
        console.log(resp);
        window.location.reload();
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="create-proposal" className="option">
      <p className="title">
        Create Proposal. _04
        <Tooltip title="Kickstart your new proposal" arrow>
          <Info color="primary" sx={{ cursor: "pointer" }} />
        </Tooltip>
      </p>
      <Input
        name={"Name"}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        name={"Amount In NEAR"}
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        name={"Recipient"}
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <LoadingButton
        onClick={() => startTxn()}
        loading={loading}
        variant="contained"
      >
        Create Proposal
      </LoadingButton>
    </div>
  );
};
