import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  StyleRulesCallback,
  Theme,
  WithStyles,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { IPalette } from "../../models/IPalette";
import { sizes } from "../../styles/sizes";
import MiniPalette from "./MiniPalette";
import bg from "../../Rainbow-Vortex.svg";

interface Props {
  palettes: IPalette[];
  setpalettes: React.Dispatch<React.SetStateAction<IPalette[]>>;
}
const styles: StyleRulesCallback<Theme, Props> = () => ({
  "@global": {
    ".fade-exit": { opacity: 1 },
    ".fade-exit-active": { opacity: 0, transition: "opacity 500ms ease-out" },
  },
  root: {
    overflowY: "scroll",
    overflowX: "hidden",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "start",
  },
  container: {
    width: "75%",
    [sizes.down("l")]: { width: "75%", padding: "5%" },
    [sizes.down("m")]: { width: "100%", padding: "5%" },
    [sizes.down("xs")]: {},
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridGap: "2%",
    gridTemplateColumns: "repeat(4,1fr)",
    padding: "10px",
    [sizes.down("l")]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    [sizes.down("m")]: { gridTemplateColumns: "repeat(3,1fr)" },
    [sizes.down("xs")]: { gridTemplateColumns: "repeat(1,1fr)" },
  },
});

interface ListProps extends WithStyles<typeof styles>, Props {}
const Home: React.FC<ListProps> = ({ palettes, classes, setpalettes }) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [palleteToDelete, setpalleteToDelete] = useState<IPalette>();
  const navigate = useNavigate();
  const openDialog = (palette: IPalette) => {
    setdialogOpen(true);
    setpalleteToDelete(palette);
  };
  const closeDialog = () => {
    setdialogOpen(false);
  };
  const goToPalette = (id: string) => {
    navigate(`/palette/${id}`);
  };
  const deletePalette = () => {
    setpalettes(palettes!.filter((p) => p.id !== palleteToDelete!.id));
    setdialogOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">New Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette) => (
            <MiniPalette
              openParentDialog={openDialog}
              palette={palette}
              goToPalette={goToPalette}
              key={palette.paletteName}
            >
              {palette.paletteName}
            </MiniPalette>
          ))}
        </div>
      </div>
      <Dialog open={dialogOpen}>
        <DialogTitle id="delete-dialog-title">Delete this palette?</DialogTitle>
        <List>
          <ListItem
            button
            onClick={() => {
              deletePalette();
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon></CheckIcon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Delete</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              closeDialog();
              setpalleteToDelete(undefined);
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon></CloseIcon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Cancel</ListItemText>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(Home);
