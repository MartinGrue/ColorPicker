import React from "react";
import {
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { SortableElement } from "react-sortable-hoc";
import { sizes } from "../../styles/sizes";

interface Props {
  color: string;
  name: string;
  deleteColor: (color: string) => void;
  selectColor: (color: string) => void;
}
const styles: StyleRulesCallback<Theme, Props> = () => ({
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-6px",
    [sizes.down("l")]: {
      width: "25%",
      height: "18%",
    },
    [sizes.down("m")]: {
      width: "50%",
      height: "9%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: "0",
    bottom: "0",

    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  dragMeContainer: {
    marginRight: "auto",
    alignSelf: "center",
    justifySelf: "end",
    background: "rgba(255, 255, 255, 0.3)",
    lineHeight: "30px",
    textTransform: "uppercase",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  deleteIcon: {
    marginRight: "auto",
    transition: "all .3s ease-in-out",
    "&:hover": { color: "white", transform: "scale(1.5)" },
  },
  colorNameContainer: {
    width: "25px",
    textAlign: "right",
    display: "flex",
    flexDirection: "row-reverse",
  },
});
interface DragableColorBoxProps extends WithStyles<typeof styles>, Props {}
const DragableColorBox = SortableElement<DragableColorBoxProps>(
  ({
    color,
    name,
    deleteColor,
    selectColor,
    classes,
  }: DragableColorBoxProps) => {
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: color }}
        onClick={() => selectColor(name)}
      >
        <div className={classes.boxContent}>
          <DeleteOutlinedIcon
            className={classes.deleteIcon}
            onClick={() => {
              deleteColor(name);
            }}
          ></DeleteOutlinedIcon>
          <div className={classes.dragMeContainer}>
            <span>Drag me</span>
          </div>
          <div className={classes.colorNameContainer}>
            <span>{name}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default withStyles(styles)(DragableColorBox);
