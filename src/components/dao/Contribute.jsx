import { Button } from "@mui/material"
import React from "react"
import { Input } from "./Form"

export const Contribute = () => {
  const [inputValue, setInputValue] = React.useState("")
  return (
    <div id="contribute" className="option">
      <p className="title">Contribute. _01</p>
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
