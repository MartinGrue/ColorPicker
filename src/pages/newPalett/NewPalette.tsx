import React, { useState } from "react";
import clsx from "clsx";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { IPalette } from "../../models/IPalette";
import { arrayMove } from "react-sortable-hoc";
import { BaseEmoji } from "emoji-mart";
import { sizes } from "../../styles/sizes";
import namer from "color-namer";
import NewPaletteColorList from "./NewPaletteColorList";
import NewPaletteNav from "./NewPaletteNav";
import ColoPicker from "./ColorPicker";
import { RouteComponentProps } from "react-router-dom";

const drawerWidth = 400;
const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "row",
    },
    hide: {
      display: "none",
    },
    drawer: {
      [sizes.down("m")]: { width: drawerWidth - 100, textAlign: "center" },
      width: drawerWidth,
    },
    drawerPaper: {
      [sizes.down("m")]: { width: drawerWidth - 100 },
      [sizes.down("xs")]: { width: "100%" },
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      height: "100vh",

      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [sizes.down("m")]: { marginLeft: -drawerWidth + 100 },
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    drawerContainer: {
      width: "90%",
      alignSelf: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    drawerBtns: {
      width: "100%",
    },
    btn: {
      width: "50%",
    },
  });
interface NewPaletteFormProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  savePalette: (newpalette: IPalette) => void;
  palettes: IPalette[];
}
const NewPalette: React.FC<NewPaletteFormProps> = ({
  classes,
  savePalette,
  history,
  palettes,
}) => {
  
  const [colorObjs, setcolorObjs] = useState<{ name: string; color: string }[]>(
    [
      { name: "red", color: "#F44336" },
      { name: "pink", color: "#E91E63" },
      { name: "purple", color: "#9C27B0" },
    ]
  );

  const [open, setOpen] = useState(true);
  const [currentColor, setcurrentColor] = useState("");

  const handlesetcurrentColor = (newColor: string) => {
    setcurrentColor(newColor);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const deletePalette = () => {
    setcolorObjs([]);
  };
  const deleteColor = (name: string) => {
    setcolorObjs(colorObjs.filter((p) => p.name !== name));
  };
  const localsavePalette = (newPaletteName: string, emoji: BaseEmoji) => {
    let paletteName = newPaletteName || "New test Palette";
    const newPalette: IPalette = {
      paletteName: paletteName,
      colors: colorObjs,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji.native,
    };
    // savePalette(newPalette);
    history.push("/");
  };

  const selectColor = (name: string) => {
    const selectedColor = colorObjs.find((p) => p.name === name);
    setcurrentColor(selectedColor!.color);
  };
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setcolorObjs(arrayMove(colorObjs, oldIndex, newIndex));
  };
  const isunique = (name: string) => {
    return colorObjs.filter((obj) => obj.name === name).length > 0;
  };
  const addRandomColor = (): string => {
    const generateHex = () => {
      const letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    let color = generateHex();
    colorObjs.forEach((obj) => {
      obj.color === color && (color = generateHex());
    });
    var colorNames = namer(color);
    let name = colorNames.ntc[0].name;
    let count = 0;

    while (isunique(name)) {
      count++;
      name = colorNames.ntc[count].name;
    }
    setcolorObjs([...colorObjs, { name: name, color: color }]);
    return color;
  };

  return (
    <div className={classes.root}>
      
      <Drawer
        transitionDuration={4000}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.drawerContainer}>
          <Typography variant="h4" gutterBottom>
            Design your palette
          </Typography>
          <div className={classes.drawerBtns}>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              onClick={() => {
                deletePalette();
              }}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={() => {
                handlesetcurrentColor(addRandomColor());
              }}
              disabled={colorObjs.length >= 20}
            >
              Random Color
            </Button>
          </div>
          <ColoPicker
            currentColor={currentColor}
            handlesetcurrentColor={handlesetcurrentColor}
            colorObjs={colorObjs}
            setcolorObjs={setcolorObjs}
          ></ColoPicker>
        </div>
      </Drawer>
      <main className={clsx(classes.content, open && classes.contentShift)}>
        <NewPaletteNav
          open={open}
          setOpen={setOpen}
          localsavePalette={localsavePalette}
          palettes={palettes}
        ></NewPaletteNav>
        <NewPaletteColorList
          selectColor={selectColor}
          deleteColor={deleteColor}
          colorObjs={colorObjs}
          axis="xy"
          onSortEnd={onSortEnd}
          pressDelay={100}
        ></NewPaletteColorList>
      </main>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(NewPalette);
