import * as stylex from "@stylexjs/stylex"
// import { colors } from "../../assets/styles/tokens.stylex"

type HeaderTextProps = {
  text: string
  color?: string
  fontWeight?: number
  bgColor?: string
  fontSize?: string
}
export const CustomText = ({
  text,
  color,
  fontWeight,
  bgColor,
  fontSize,
}: HeaderTextProps) => {
  return (
    <div
      {...stylex.props(
        customTextStyles.dynamicOptions(color, fontWeight, bgColor, fontSize)
      )}
    >
      {text}
    </div>
  )
}

const customTextStyles = stylex.create({
  base: { backgroundColor: "white" },
  dynamicOptions: (color, fontWeight, bgColor, fontSize) => ({
    backgroundColor: bgColor,
    fontWeight: fontWeight,
    color: color,
    fontSize: fontSize,
  }),
})
