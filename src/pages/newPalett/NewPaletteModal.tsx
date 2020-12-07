import React, { useState, useEffect, useRef, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { IPalette } from "../../models/IPalette";
import { Link } from "react-router-dom";
import { Picker, EmojiData, BaseEmoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

interface PaletteMetaFormProps {
  palettes: IPalette[];
  localsavePalette: (newPaletteName: string, emoji: BaseEmoji) => void;
  modalstage: "nameStage" | "emojiStage" | undefined;
  setmodalstage: React.Dispatch<
    React.SetStateAction<"nameStage" | "emojiStage" | undefined>
  >;
}

const PaletteMetaForm: React.FC<PaletteMetaFormProps> = ({
  palettes,
  localsavePalette,
  modalstage,
  setmodalstage,
}) => {
  const [newPaletteName, setnewPaletteName] = useState("");

  const handleClose = (reason: "backdropClick" | "escapeKeyDown") => {
    console.log(reason);
    setmodalstage("emojiStage");
  };
  const handleChangePaletteName = (name: string) => {
    setnewPaletteName(name);
  };
  const savePalette = (emoji: BaseEmoji) => {
    setmodalstage(undefined);

    localsavePalette(newPaletteName, emoji);
  };
  useEffect(() => {
    ValidatorForm.addValidationRule("isUniquePaletteName", (value: string) => {
      return palettes.every((palette: IPalette) => {
        return palette.paletteName.toLowerCase() !== value.toLowerCase();
      });
    });
  });
  return (
    <Fragment>
      <Dialog
        disablePortal={true}
        open={modalstage === "emojiStage"}
        onClose={(e, reason) => {
          if (reason === "backdropClick") {
            setmodalstage(undefined);
          }
        }}
      >
        <DialogTitle id="form-dialog-title">Chosse a palette Emoji</DialogTitle>
        <Picker onSelect={(emoji: BaseEmoji) => savePalette(emoji)}></Picker>
      </Dialog>
      <Dialog
        disablePortal={true}
        open={modalstage === "nameStage"}
        onAbort={() => {
          setmodalstage(undefined);
        }}
        onClose={(e, reason) => {
          console.log("backdrop");
          if (reason === "backdropClick") {
            setmodalstage(undefined);
          } else {
            handleClose(reason);
          }
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Chosse a palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => {}}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for the new color palette.
            </DialogContentText>
            <TextValidator
              fullWidth
              autoFocus
              margin="normal"
              placeholder="New Palette Name"
              value={newPaletteName}
              name={newPaletteName}
              validators={["isUniquePaletteName"]}
              errorMessages={["Palette name must be unique"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangePaletteName(e.target.value);
              }}
            ></TextValidator>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setmodalstage("emojiStage");
              }}
            >
              Save Palette
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setmodalstage(undefined)}
            >
              Go back
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </Fragment>
  );
};
export default PaletteMetaForm;
