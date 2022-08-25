import { Button } from "@mui/material"
import React from "react"
import { Input } from "./Form"

export const Transfer = () => {
  const [amount, setAmount] = React.useState("")
  const [sendTo, setSendTo] = React.useState("")
  return (
    <div id="transfer" className="option">
      <p className="title">Transfer Shares. _03</p>
      <Input
        name={"Amount"}
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
      <Button variant="contained">Submit</Button>
    </div>
  )
}
