import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle, WithStyles } from "@material-ui/core";
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
import bg from "../../Rainbow-Vortex.svg"
const styles = createStyles({
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

    gridTemplateColumns: "repeat(4,1fr)",
    gridGap: "5%",
    [sizes.down("l")]: {
      gridTemplateColumns: "repeat(3,1fr)",
    },
    [sizes.down("m")]: { gridTemplateColumns: "repeat(3,1fr)" },
    [sizes.down("xs")]: { gridTemplateColumns: "repeat(2,1fr)" },
  },
});

interface ListProps extends RouteComponentProps, WithStyles<typeof styles> {
  palettes: IPalette[];
  setpalettes: React.Dispatch<React.SetStateAction<IPalette[]>>;
}
const Home: React.FC<ListProps> = ({
  history,
  palettes,
  classes,
  setpalettes,
}) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [palleteToDelete, setpalleteToDelete] = useState<IPalette>();
  const openDialog = (palette: IPalette) => {
    setdialogOpen(true);
    setpalleteToDelete(palette);
  };
  const closeDialog = () => {
    setdialogOpen(false);
  };
  const goToPalette = (id: string) => {
    history.push(`/palette/${id}`);
  };
  const deletePalette = () => {
    // console.log(palettes!.filter(p => p.id !== palleteToDelete!.id));
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
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                openParentDialog={openDialog}
                palette={palette}
                goToPalette={goToPalette}
                key={palette.paletteName}
              >
                {palette.paletteName}
              </MiniPalette>
            </CSSTransition>
          ))}
        </TransitionGroup>
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
