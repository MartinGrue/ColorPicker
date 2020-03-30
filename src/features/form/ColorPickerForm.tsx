import React, { useState, useEffect } from "react";
import ChromePicker from "react-color/lib/components/chrome/Chrome";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, withStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    addcolor: {
      width: "100%",
      padding: "1rem",
      marginTop: "2rem",
      fontSize: "1rem"
    },
    colorNameInput: {
      width: "100%",
      marginTop: "2rem"
    }
  });
interface ColoPickerFormProps {
  currentColor: string;
  handlesetcurrentColor: (newColor: string) => void;
  colorObjs: {
    name: string;
    color: string;
  }[];
  setcolorObjs: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        color: string;
      }[]
    >
  >;
  classes: any;
}

const ColoPickerForm: React.FC<ColoPickerFormProps> = ({
  currentColor,
  handlesetcurrentColor,
  colorObjs,
  setcolorObjs,
  classes
}) => {
  useEffect(() => {
    ValidatorForm.addValidationRule("isUniqueColorName", (value: string) => {
      return colorObjs.every((colorObj: { name: string; color: string }) => {
        return (
          colorObj.name.toLowerCase() !== value.toLowerCase() &&
          value.toLowerCase() !== colorObj.name.concat("\u200e").toLowerCase()
        );
      });
    });
    ValidatorForm.addValidationRule("isUniqueColor", () => {
      return colorObjs.every((colorObj: { name: string; color: string }) => {
        return colorObj.color.toLowerCase() !== currentColor.toLowerCase();
      });
    });
  }, [colorObjs, currentColor]);
  const AddColor = () => {
    const newColor: { name: string; color: string } = {
      name: newName,
      color: currentColor
    };
    setcolorObjs([...colorObjs, newColor]);
    console.log(colorObjs)
  };
  const handleNewName = (name: string) => {
    setnewName(name);
  };
  const [newName, setnewName] = useState("");
  return (
    <div>
      <ChromePicker
        styles={{ default: { picker: { width: "100%", marginTop: "2rem" } } }}
        color={currentColor}
        onChangeComplete={newColor => {
          handlesetcurrentColor(newColor.hex);
          setnewName(newName.concat("\u200e"));
        }}
      ></ChromePicker>
      <ValidatorForm
        onSubmit={() => {
          AddColor();
        }}
      >
        <TextValidator
          placeholder="Color Name"
          className={classes.colorNameInput}
          validators={["isUniqueColorName", "required", "isUniqueColor"]}
          errorMessages={[
            "Color name must be unique",
            "Color name required",
            "Color already added"
          ]}
          name={newName}
          value={newName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleNewName(e.target.value);
          }}
        ></TextValidator>
        <Button
          className={classes.addcolor}
          variant="contained"
          color="primary"
          type="submit"
          disabled={colorObjs.length >= 20}
          style={{
            backgroundColor: colorObjs.length >= 20 ? "grey" : currentColor
          }}
        >
          {colorObjs.length >= 20 ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};
export default withStyles(styles)(ColoPickerForm);
