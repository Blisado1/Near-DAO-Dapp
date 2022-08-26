import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { Input } from "./Form";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import { redeemShares } from "../../utils/dao";

export const Redeem = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const startTxn = async () => {
    if (inputValue === "") return;
    try {
      setLoading(true);
      await redeemShares(inputValue).then((resp) => {
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
    <div id="redeem" className="option">
      <p className="title">
        Redeem Shares. _02
        <Tooltip title="Convert shares back to token" arrow>
          <Info color="primary" sx={{ cursor: "pointer" }} />
        </Tooltip>
      </p>
      <Input
        name={"Amount of Shares"}
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <LoadingButton
        onClick={() => startTxn()}
        loading={loading}
        variant="contained"
      >
        Redeem
      </LoadingButton>
    </div>
  );
};
