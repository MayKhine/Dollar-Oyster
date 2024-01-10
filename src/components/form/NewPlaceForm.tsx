import { CustomButton } from "../UI/CustomButton"
import { colors } from "../../assets/styles/tokens.stylex"
import * as styex from "@stylexjs/stylex"

type NewPlaceFormProps = {
  cancelFn: () => void
}

export const NewPlaceForm = ({ cancelFn }: NewPlaceFormProps) => {
  return (
    <div>
      This is form location for a new palce
      <div {...styex.props(newPlaceFormStyles.buttonsDiv)}>
        <CustomButton
          text="cancel"
          bgColor={colors.pink}
          fontSize="1.3rem"
          padding=".3rem"
          onClickFn={cancelFn}
        />
        <CustomButton
          text="add"
          bgColor={colors.pink}
          fontSize="1.3rem"
          padding=".3rem"
          onClickFn={() => {
            console.log("ADD IS CLICKED")
          }}
        />
      </div>
    </div>
  )
}

const newPlaceFormStyles = styex.create({
  base: { backgroundColor: colors.offwhite },
  buttonsDiv: { display: "flex", gap: "1rem" },
})
