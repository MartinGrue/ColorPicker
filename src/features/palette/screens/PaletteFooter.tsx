import React from "react";
import { withStyles, createStyles } from "@material-ui/styles";

import { IExtendedPalette } from "../../../models/IExtendedPalette";
import { WithStyles } from "@material-ui/core";
const styles = createStyles({
  paletteFooter: {
    backgroundColor: "white",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontWeight: "bold",
  },
  emoji: {
    fontSize: "1rem",
    margin: "0 1 rem",
  },
});
interface PaletteFooterProps extends WithStyles<typeof styles> {
  palette: IExtendedPalette;
}
const PaletteFooter: React.FC<PaletteFooterProps> = ({ palette, classes }) => {
  return (
    <footer className={classes.paletteFooter}>
      {palette.paletteName}
      <span className={classes.emoji}>{palette.emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
