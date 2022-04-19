import React from "react";
import { withStyles } from "@material-ui/styles";
import { StyleRulesCallback, Theme, WithStyles } from "@material-ui/core";
import { IPaletteLevels } from "../models/IPaletteLevels";

interface Props {
  paletteLevels: IPaletteLevels;
}

const styles: StyleRulesCallback<Theme, Props> = () => ({
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
interface PaletteFooterProps extends WithStyles<typeof styles>, Props {}
const PaletteFooter: React.FC<PaletteFooterProps> = ({
  paletteLevels,
  classes,
}) => {
  const { paletteName, emoji } = paletteLevels;
  return (
    <footer className={classes.paletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
