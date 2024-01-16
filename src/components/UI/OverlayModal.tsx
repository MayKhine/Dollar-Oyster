import * as stylex from "@stylexjs/stylex"
import { colors } from "../../assets/styles/tokens.stylex"

type OverlayModalProps = {
  title: string
  text: string
}

export const OverlayModal = ({ title, text }: OverlayModalProps) => {
  return (
    <div {...stylex.props(overlayModalStyles.base)}>
      <div {...stylex.props(overlayModalStyles.modal)}>
        <div>{title}</div>
        <div>{text}</div>
      </div>
    </div>
  )
}

const overlayModalStyles = stylex.create({
  base: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    // zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    // height: "100%",
  },
  modal: {
    position: "absolute",
    top: "40%",
    left: "30%",
    width: "35%",
    height: "20%",
    backgroundColor: colors.offwhite,
    borderRadius: ".5rem",
  },
})
