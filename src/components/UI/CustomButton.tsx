import * as stylex from "@stylexjs/stylex"

type CustomButtonProps = {
  text: string
  color?: string
  fontWeight?: number
  bgColor?: string
  fontSize?: string
  onClickFn?: () => void
  padding?: string
}
export const CustomButton = ({
  text,
  color,
  fontWeight,
  bgColor,
  fontSize,
  onClickFn,
  padding,
}: CustomButtonProps) => {
  return (
    <div
      {...stylex.props(
        customButtonStyles.dynamicOptions(
          color,
          fontWeight,
          bgColor,
          fontSize,
          padding
        )
      )}
      onClick={onClickFn}
    >
      {text}
    </div>
  )
}

const customButtonStyles = stylex.create({
  dynamicOptions: (color, fontWeight, bgColor, fontSize, padding) => ({
    backgroundColor: bgColor,
    fontWeight: fontWeight,
    color: color,
    fontSize: fontSize,
    cursor: "pointer",
    width: "max-content",
    padding: padding,
  }),
})
