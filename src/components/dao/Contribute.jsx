import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { Input } from "./Form";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import { contributToDAO } from "../../utils/dao";

export const Contribute = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const startTxn = async () => {
    if (inputValue === "") return;
    try {
      setLoading(true);
      await contributToDAO(inputValue).then((resp) => {
        console.log("done");
        window.location.reload();
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contribute" className="option">
      <p className="title">
        Contribute. _01
        <Tooltip title="Deposit token to join Dao and receive shares" arrow>
          <Info color="primary" sx={{ cursor: "pointer" }} />
        </Tooltip>
      </p>
      <Input
        name={"Amount In NEAR"}
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <LoadingButton
        onClick={() => startTxn()}
        loading={loading}
        variant="contained"
      >
        Contribute
      </LoadingButton>
    </div>
  );
};
