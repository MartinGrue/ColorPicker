import React, { FunctionComponent, ReactNode } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { StyleRulesCallback, Theme, WithStyles } from "@material-ui/core";
import { IPalette } from "../../models/IPalette";

const styles: StyleRulesCallback<Theme, Props> = () => ({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    position: "relative",
    overflow: "hidden",
    padding: "5px",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  colors: {
    marginBottom: "auto",
    backgroundColor: "#dae1e4",
    height: "150px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
    color: "black",
    paddingTop: "1rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: ".5rem",
    fontSize: "1.5rem",
  },
  minicolor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    postion: "relative",
    marginBottom: "-4px",
  },
  delete: {},
  deleteIcon: {
    top: "0px",
    right: "0px",
    position: "absolute",
    padding: "5px",
    zIndex: 10,
    color: "white",
    backgroundColor: "red",
    width: "20px",
    height: "20px",
    opacity: 0,
    borderRadius: "5px",
  },
});
interface Props {
  children: ReactNode;
  palette: IPalette;
  goToPalette: (id: string) => void;
  openParentDialog: (palette: IPalette) => void;
}
interface MiniPaletteProps extends WithStyles<typeof styles>, Props {}
const PropsAreEqual = (
  prevProps: MiniPaletteProps,
  nextPorps: MiniPaletteProps
) => {
  return prevProps.palette === nextPorps.palette;
};
const MiniPalette: FunctionComponent<MiniPaletteProps> = React.memo(
  ({ classes, palette, openParentDialog, goToPalette }) => {
    return (
      <div
        className={classes.root}
        onClick={() => {
          goToPalette(palette.id);
        }}
      >
        <div className={classes.delete}>
          <DeleteIcon
            className={classes.deleteIcon}
            style={{ transition: "all 0.3s ease-in-out" }}
            onClick={(e: any) => {
              openParentDialog(palette);
              e.stopPropagation();
            }}
          ></DeleteIcon>
        </div>
        <div className={classes.colors}>
          {palette.colors.map((color) => (
            <div
              className={classes.minicolor}
              key={color.name}
              style={{ backgroundColor: color.color }}
            ></div>
          ))}
        </div>
        <h5 className={classes.title}>
          {palette.paletteName}
          <span className={classes.emoji}>{palette.emoji}</span>
        </h5>
      </div>
    );
  },
  PropsAreEqual
);
export default withStyles(styles)(MiniPalette);
