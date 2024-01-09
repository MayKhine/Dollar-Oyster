import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"

export const LogoDiv = () => {
  return (
    <div {...stylex.props(logoDivStyles.base)}>
      <div>Boston Dollar Oysters</div>
    </div>
  )
}

const logoDivStyles = stylex.create({ base: { backgroundColor: colors.pink } })
