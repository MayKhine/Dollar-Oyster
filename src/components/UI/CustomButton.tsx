import * as stylex from "@stylexjs/stylex"

type CustomButtonProps = {
  text: string
  color?: string
  fontWeight?: number
  bgColor?: string
  fontSize?: string
  onClickFn?: () => void
  onClickWithEventFn?: (event: React.FormEvent) => void
  padding?: string
  type?: string
}
export const CustomButton = ({
  text,
  color,
  fontWeight,
  bgColor,
  fontSize,
  onClickFn,
  onClickWithEventFn,
  padding,
  type,
}: CustomButtonProps) => {
  return (
    <button
      {...stylex.props(
        customButtonStyles.dynamicOptions(
          color,
          fontWeight,
          bgColor,
          fontSize,
          padding
        )
      )}
      onClick={onClickWithEventFn ? onClickWithEventFn : onClickFn}
      type={type == "submit" ? "submit" : "button"}
    >
      {text}
    </button>
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
