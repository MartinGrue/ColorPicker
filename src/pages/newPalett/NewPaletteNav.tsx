import React, { Fragment, useState } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { IPalette } from "../../models/IPalette";
import { Theme, withStyles } from "@material-ui/core/styles";
import { BaseEmoji } from "emoji-mart";
import { sizes } from "../../styles/sizes";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import NewPaletteModal from "./NewPaletteModal";
import { StyleRulesCallback } from "@material-ui/core";

interface Props {
  open: boolean;
  localsavePalette: (newPaletteName: string, emoji: BaseEmoji) => void;
  setOpen: any;
  palettes: IPalette[];
}
const styles: StyleRulesCallback<Theme, Props> = (theme: Theme) => ({
  hide: {
    display: "none",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbtns: { margin: "10px" },
  heading: {
    [sizes.down("m")]: {
      width: "0%",
    },

    [sizes.down("xs")]: { width: "0px" },
  },
});

interface PaletteFormNavProps extends WithStyles<typeof styles>, Props {}
const PaletteFormNav: React.FC<PaletteFormNavProps> = ({
  classes,
  open,
  localsavePalette,
  setOpen,
  palettes,
}) => {
  const [modalstage, setmodalstage] =
    useState<"nameStage" | "emojiStage" | undefined>();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <AppBar
        color="default"
        position={"sticky"}
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" noWrap className={classes.heading}>
            Create a new Palette
          </Typography>
          <div className={classes.navbtns}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setmodalstage("nameStage")}
              style={{ margin: "5px" }}
            >
              Save
            </Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setmodalstage(undefined)}
              >
                Go back
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      {setmodalstage && (
        <NewPaletteModal
          modalstage={modalstage}
          setmodalstage={setmodalstage}
          palettes={palettes}
          localsavePalette={localsavePalette}
        ></NewPaletteModal>
      )}
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
