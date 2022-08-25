import React from "react";
import { Container } from "react-bootstrap";
import { login } from "./utils/near";
import { Notification } from "./components/utils/Notifications";
import Dao from "./components/dao";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/DAO.jpg";
import "./App.css";

const App = function AppWrapper() {
  const account = window.walletConnection.account();

  return (
    <>
      <Notification />
      {account.accountId ? (
        <Container fluid="md">
          <main>
            <Dao />
          </main>
        </Container>
      ) : (
        <Cover name="DAO DApp" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;
