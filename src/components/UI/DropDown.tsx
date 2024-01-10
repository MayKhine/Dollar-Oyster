import React, { useState } from "react"

type DropdownProps = {
  options: string[]
  onSelectFn: (selectedOption: string) => void
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelectFn }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    onSelectFn(option)
  }

  return (
    <div>
      <label>Select an option:</label>
      <select
        value={selectedOption || undefined}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {/* <option value="" disabled>
          Choose an option
        </option> */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
