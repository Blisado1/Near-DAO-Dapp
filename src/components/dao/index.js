import { Contribute } from "./Contribute";
import { Redeem } from "./Redeem";
import { Header } from "./Header";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Transfer } from "./Transfer";
import { Proposal } from "./CreateProposal";
import Proposals from "./Proposals";

function Dao() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#fcbd7a",
        main: "#f1a14b",
        dark: "#fdb261d8",
        contrastText: "#fff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Header />
        <Container>
          <Contribute />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Redeem />
          </Box>
          <Transfer />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Proposal />
          </Box>
          <Proposals />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Dao;
