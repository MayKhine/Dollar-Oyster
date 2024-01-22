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
  borderColor?: string
  width?: string
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
  borderColor,
  width,
}: CustomButtonProps) => {
  return (
    <button
      {...stylex.props(
        customButtonStyles.dynamicOptions(
          color,
          fontWeight,
          bgColor,
          fontSize,
          padding,
          borderColor,
          width
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
  dynamicOptions: (
    color,
    fontWeight,
    bgColor,
    fontSize,
    padding,
    borderColor,
    width
  ) => ({
    backgroundColor: bgColor,
    fontWeight: fontWeight,
    color: color,
    fontSize: fontSize,
    cursor: "pointer",
    // width: "max-content",
    padding: padding,
    border: `2px ${borderColor} solid`,
    borderRadius: ".3rem",
    minWidth: "5rem",
    width: width ? width : "max-content",
  }),
})
