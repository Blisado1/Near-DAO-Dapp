import { Button } from "@mui/material"
import React from "react"
import { Input } from "./Form"

export const Redeem = () => {
  const [inputValue, setInputValue] = React.useState("")
  return (
    <div id="redeem" className="option">
      <p className="title">Redeem Shares. _02</p>
      <Input
        name={"Amount"}
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant="contained">Submit</Button>
    </div>
  )
}
