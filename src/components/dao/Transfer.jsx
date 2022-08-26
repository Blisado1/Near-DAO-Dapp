import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { Input } from "./Form";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import { transferShares } from "../../utils/dao";

export const Transfer = () => {
  const [amount, setAmount] = React.useState("");
  const [sendTo, setSendTo] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const startTxn = async () => {
    if (amount === "" && sendTo === "") return;
    try {
      setLoading(true);
      await transferShares({ amount, sendTo }).then((resp) => {
        console.log(resp);
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="transfer" className="option">
      <p className="title">
        Transfer Shares. _03
        <Tooltip
          title="Transfer shares to other accounts making them members of Dao"
          arrow
        >
          <Info color="primary" sx={{ cursor: "pointer" }} />
        </Tooltip>
      </p>
      <Input
        name={"Amount In NEAR"}
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        name={"To"}
        type="text"
        value={sendTo}
        onChange={(e) => setSendTo(e.target.value)}
      />
      <LoadingButton
        onClick={() => startTxn()}
        loading={loading}
        variant="contained"
      >
        Transfer
      </LoadingButton>
    </div>
  );
};
