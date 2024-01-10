import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"
import oyster from "../../assets/images/oyster.png"
export const LogoDiv = () => {
  return (
    <div {...stylex.props(logoDivStyles.base)}>
      <img {...stylex.props(logoDivStyles.image)} src={oyster}></img>
      <div {...stylex.props(logoDivStyles.text)}>Boston Dollar Oysters</div>
    </div>
  )
}

const logoDivStyles = stylex.create({
  base: {
    backgroundColor: colors.blue,
    width: "100%",
    height: "5rem",
    position: "fixed",
    display: "flex",
    flexDirection: "row",
  },
  image: {
    marginLeft: "1rem",
    marginRight: "1rem",
    height: "100%",
    // background: "white",
  },
  text: {
    alignSelf: "center",
    fontWeight: "600",
    fontSize: "2rem",
  },
})
