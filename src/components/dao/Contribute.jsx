import { Button } from "@mui/material"
import React from "react"
import { Input } from "./Form"
import { Tooltip } from "@mui/material"
import { Info } from "@mui/icons-material"

export const Contribute = () => {
  const [inputValue, setInputValue] = React.useState("")
  return (
    <div id="contribute" className="option">
      <p className="title">
        Contribute. _01 
        <Tooltip title="Deposit token to join Dao and receive shares" arrow>
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
