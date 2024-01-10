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
    // backgroundColor: colors.green,
    backgroundColor: colors.offwhite,
    width: "100%",
    height: "3rem",
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    borderBottom: `1px ${colors.darkBlue} solid`,
  },
  imgDiv: { height: "3rem", display: "flex", flexDirection: "row" },
  image: {
    marginLeft: "2rem",
    marginRight: "1rem",
    height: "100%",
  },
  text: {
    alignSelf: "center",
    fontWeight: "400",
    fontSize: "1.8rem",
    color: colors.darkBlue,
  },
  line: {
    width: "100%",
    backgroundColor: "black",
    marginTop: "1rem",
    height: ".1rem",
  },
})
