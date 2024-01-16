import * as stylex from "@stylexjs/stylex"
import { semanticColors } from "../../assets/styles/tokens.stylex"

type ErrorTextProps = {
  text: string
}
export const ErrorText = ({ text }: ErrorTextProps) => {
  return <div {...stylex.props(errorTextStyles.base)}>{text}</div>
}

const errorTextStyles = stylex.create({
  base: {
    color: semanticColors.red,
    fontSize: "0.9em",
    marginTop: ".2rem",
  },
})
