import React, { useEffect, useCallback, useState } from "react";
import { logout as destroy, accountBalance } from "../../utils/near";
import { Typography, Box, Grid, Button } from "@mui/material";
import { Drawer } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { getInvestorData } from "../../utils/dao";
import { utils } from "near-api-js";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const account = window.walletConnection.account();

  const [balance, setBalance] = useState("0");

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  }, [account.accountId]);

  const retrieveUserData = useCallback(async () => {
    if (account.accountId) {
      const data = await getInvestorData(account.accountId);
      if (data !== null) {
        setUserData(data);
      }
    }
  }, [account.accountId]);

  useEffect(() => {
    getBalance();
    retrieveUserData();
  }, [getBalance, retrieveUserData]);

  return (
    <>
      <Box className="hero">
        <Box className="hero_dao">
          <Box className="logo">
            <Typography variant="string">
              Dao <span style={{ opacity: "0.5" }}>DApp.</span>
            </Typography>
          </Box>
          <Typography align="center" variant="string" className="dao_showcase">
            DAO DApp
          </Typography>
          <Box className="options">
            <Box>
              <Typography color={"#aec1c5"} fontSize="1.2rem">
                {" "}
                <span style={{ color: "#fcbd7a" }}>#</span> Account:{" "}
                <a
                  href={`https://explorer.testnet.near.org/accounts/${account.accountId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {account.accountId}
                </a>
              </Typography>
              <Grid container spacing={0} width="25rem" marginY={"0.5rem"}>
                <Grid item>
                  <Button href="#contribute" xs={6} className="options-nav">
                    Contribute
                  </Button>
                  <Button href="#redeem" xs={6} className="options-nav">
                    redeem shares
                  </Button>
                </Grid>
                <Grid item>
                  <Button href="#transfer" xs={6} className="options-nav">
                    transfer shares
                  </Button>
                  <Button
                    href="#create-proposal"
                    xs={6}
                    className="options-nav"
                  >
                    Create proposal
                  </Button>
                </Grid>
              </Grid>

              <Typography color={"#aec1c5"} fontSize="1rem">
                <span style={{ color: "#fcbd7a" }}>#</span> Wallet Balance:{" "}
                {balance} NEAR
              </Typography>
              <Typography color={"#aec1c5"} fontSize="1rem">
                <span style={{ color: "#fcbd7a" }}>#</span> Shares:{" "}
                {userData.shares
                  ? utils.format.formatNearAmount(userData.shares)
                  : 0}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <div
        className={`menu ${open && "active"}`}
        onClick={() => {
          open === false ? setOpen(true) : setOpen(false);
        }}
      >
        <Typography variant="button" color={"#fcbd7a"} mr="0.5rem">
          menu
        </Typography>
        <div>
          <div className="one">
            <div className="menu-dots"></div>
            <div className="menu-dots"></div>
          </div>
          <div className="two">
            <div className="menu-dots"></div>
            <div className="menu-dots"></div>
          </div>
        </div>
      </div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ display: "flex", flexDirection: "column", padding: "3rem" }}>
          <Button href="#contribute">Contribute</Button>
          <Button href="#redeem">redeem shares</Button>
          <Button href="#transfer">transfer shares</Button>
          <Button href="#create-proposal">create proposal</Button>
          <Button href="#proposals">Proposals</Button>
          <Button
            onClick={() => {
              destroy();
            }}
            startIcon={<Logout />}
            variant={"contained"}
          >
            disconnect
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
