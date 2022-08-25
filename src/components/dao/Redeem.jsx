import { Button } from "@mui/material"
import React from "react"
import { Input } from "./Form"
import { Tooltip } from "@mui/material"
import { Info } from "@mui/icons-material"

export const Redeem = () => {
  const [inputValue, setInputValue] = React.useState("")
  return (
    <div id="redeem" className="option">
      <p className="title">
        Redeem Shares. _02
        <Tooltip title="Convert shares back to token" arrow>
          <Info color="primary" sx={{cursor: "pointer"}}/>
        </Tooltip>
      </p>
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
