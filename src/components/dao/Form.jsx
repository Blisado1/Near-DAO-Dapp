import React from "react"
import "../../input.css"

export const Input = ({ name, type, value, onChange }) => {
  return (
    <div className="form__group field">
      <input
        type={type}
        className="form__field"
        placeholder={name}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={name} className="form__label">
        {name}
      </label>
    </div>
  )
}
