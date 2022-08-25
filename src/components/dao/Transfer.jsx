import { Button } from "@mui/material"
import React from "react"
import { Input } from "./Form"
import { Tooltip } from "@mui/material"
import { Info } from "@mui/icons-material"

export const Transfer = () => {
  const [amount, setAmount] = React.useState("")
  const [sendTo, setSendTo] = React.useState("")
  return (
    <div id="transfer" className="option">
      <p className="title">
        Transfer Shares. _03
        <Tooltip title="Transfer shares to other accounts making them members of Dao" arrow>
          <Info color="primary" sx={{cursor: "pointer"}}/>
        </Tooltip>
      </p>
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
