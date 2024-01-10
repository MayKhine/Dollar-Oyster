import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"

type FormInputType = {
  label: string
  type: string
  value: string | number
  handleInputChangeFn: (element: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  placeholder?: string
}

export const FormInput = ({
  label,
  type,
  value,
  handleInputChangeFn,
  id,
  placeholder,
}: FormInputType) => {
  return (
    <div {...stylex.props(formInputStyles.base)}>
      <label {...stylex.props(formInputStyles.label)}>{label}</label>
      <input
        {...stylex.props(formInputStyles.input)}
        type={type}
        value={value}
        onChange={handleInputChangeFn}
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}

const formInputStyles = stylex.create({
  base: {
    // backgroundColor: colors.offwhite,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "1rem",
    // padding: ".5rem",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "400",
    fontSize: "1.3rem",
    // backgroundColor: colors.blue,
  },
  input: {
    fontWeight: 200,
    fontSize: "1.2rem",
    padding: ".5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    // color: "gray",
    "::placeholder": { color: "lightgray" },
    border: "0px",
    backgroundColor: colors.offwhite,
  },
})
