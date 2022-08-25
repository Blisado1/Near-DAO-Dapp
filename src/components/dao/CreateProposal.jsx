import { Button } from "@mui/material"
import React from "react"
import { Input } from "./Form"

export const Proposal = () => {
  const [amount, setAmount] = React.useState("")
  const [name, setName] = React.useState("")
  const [sendTo, setSendTo] = React.useState("")
  return (
    <div id="create-proposal" className="option">
      <p className="title">Create Proposal. _04</p>
      <Input
        name={"Name"}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        name={"Amount"}
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        name={"Recipient"}
        type="text"
        value={sendTo}
        onChange={(e) => setSendTo(e.target.value)}
      />
      <Button variant="contained">Submit</Button>
    </div>
  )
}
