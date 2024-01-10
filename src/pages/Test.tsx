import * as stylex from "@stylexjs/stylex"
export const Test = () => {
  return (
    <div>
      Google Map
      <div {...stylex.props(testStyles.font1)}>Boston Dollar Oyster</div>
      <div {...stylex.props(testStyles.font2)}>Boston Dollar Oyster</div>
      <div {...stylex.props(testStyles.font3)}>Boston Dollar Oyster</div>
      <div {...stylex.props(testStyles.font4)}>Boston Dollar Oyster</div>
      <div {...stylex.props(testStyles.font5)}>Boston Dollar Oyster</div>
      <div {...stylex.props(testStyles.font6)}>Boston Dollar Oyster</div>
    </div>
  )
}

const testStyles = stylex.create({
  font1: {
    fontWeight: 200,
    fontStyle: "italic",
  },
  font2: {
    fontWeight: 300,
  },
  font3: {
    fontWeight: 400,
  },
  font4: {
    fontWeight: 600,
    // fontStyle: "italic",
  },
  font5: {
    fontWeight: 700,
  },
  font6: {
    fontWeight: 900,
  },
})
