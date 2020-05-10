import React, { useState } from "react";
import { IExtendedPalette } from "../../../models/IExtendedPalette";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/styles";
import { sizes } from "../../../styles/sizes";
import { WithStyles } from "@material-ui/core";

const styles = createStyles({
  palette: { height: "100vh", overflow: "hidden" },
  paletteColors: { height: "90%" },
  colorBox: {
    width: "20%",
    height: (props: any) => (props.showLink ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover button": {
      opacity: 1,
    },
  },
  goback: {
    backgroundColor: "#eceff1",
    display: "inline-block",
    position: "relative",
    width: "20%",
    height: "50%",
    marginBottom: "-4px",
    cursor: "pointer",
    [sizes.down("l")]: {
      width: "100%",
      height: "23.3333%",
    },
    [sizes.down("m")]: {
      width: "100%",
      height: "20%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%",
    },
  },
  gobackbtn: {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(188, 182, 182, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: "black",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
  },
});

interface SingleColorPaletteProps extends WithStyles<typeof styles> {
  palette: IExtendedPalette;
  colorId: string;
}
interface shades {
  [key: string]: string;
  name: string;
  id: string;
  hex: string;
  rgb: string;
  rgba: string;
}
const SingleColorPalette: React.FC<SingleColorPaletteProps> = ({
  palette,
  colorId,
  classes,
}) => {
  const [format, setformat] = useState<string>("hex");

  const gatherShades = (palette: IExtendedPalette, colorToFilterBy: string) => {
    let shades: shades[] | undefined;
    let allColors = palette.colors;
    for (let key in allColors) {
      typeof shades === "undefined"
        ? (shades = allColors[key].filter(
            (color) => color.id === colorToFilterBy
          ))
        : (shades = shades!.concat(
            allColors[key].filter((color) => color.id === colorToFilterBy)
          ));
    }
    return shades!.slice(1);
  };

  const shades: shades[] = gatherShades(palette, colorId);

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: string;
    }>
  ) => {
    setformat(e.target.value);
  };
  return (
    <div className={classes.palette}>
      <NavBar
        format={format}
        handleChange={handleChange}
        showSlider={false}
      ></NavBar>
      <div className={classes.paletteColors}>
        {shades.map((color) => (
          <ColorBox
            key={color.hex}
            background={color[format]}
            name={color.name!}
            showLink={false}
          ></ColorBox>
        ))}
        <Link
          to={`/palette/${palette.id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={classes.goback}>
            <div className={classes.gobackbtn}>Go Back</div>
          </div>
        </Link>
      </div>
      <div>
        <PaletteFooter palette={palette}></PaletteFooter>
      </div>
    </div>
  );
};

export default withStyles(styles)(SingleColorPalette);
