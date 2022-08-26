import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";

const Cover = ({ name, login, coverImg }) => {
  if ((name, login, coverImg)) {
    return (
      <div
        className="cover-page"
        style={{ background: "#000", minHeight: "100vh" }}
      >
        <div>
          <img src={coverImg} alt="dao" />
        </div>
        <div>
          <h1 style={{ margin: "1rem" }}>{name}</h1>
          <p style={{ margin: "0.5rem" }}>
            Please connect your wallet to continue.
          </p>
          <Button
            onClick={login}
            variant="outlined"
            color="primary"
            startIcon={<AccountBalanceWallet />}
          >
            Connect Wallet
          </Button>
        </div>
        <p>Powered by NEAR</p>
      </div>
    );
  }
  return null;
};

Cover.propTypes = {
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: "",
};

export default Cover;
