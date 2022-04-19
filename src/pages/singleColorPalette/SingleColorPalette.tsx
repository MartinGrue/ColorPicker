import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { StyleRulesCallback, WithStyles } from "@material-ui/core";
import ColorBox from "../../components/ColorBox";
import NavBar from "../../components/NavBar";
import PaletteFooter from "../../components/PaletteFooter";
import { IColor, IPaletteLevels } from "../../models/IPaletteLevels";
import { sizes } from "../../styles/sizes";
import { Theme } from "@material-ui/core";
import { IPalette } from "../../models/IPalette";
import { getPaletteLevels } from "../../utils/ColorHelpers";

interface Props {
  findPalette: (id: string) => IPalette | undefined;
  savePalette: (newPalette: IPalette) => void;
}

interface SingleColorPaletteProps extends WithStyles<typeof styles>, Props {}

const SingleColorPalette: React.FC<SingleColorPaletteProps> = ({
  classes,
  findPalette,
  savePalette,
}) => {
  // palette={generatePalette(
  //   findPalette(routeProps.match.params.paletteId)!
  // )}
  // colorId={routeProps.match.params.colorId}

  const { paletteId, colorId } = useParams();
  const palette = findPalette(paletteId!);
  const paletteLevels = getPaletteLevels(palette!);
  const [format, setformat] = useState<string>("hex");
  let levels = paletteLevels.levels;

  const levelsOfColor = levels.find((level) => level[0].id === colorId!);

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
      <div className={classes.navbar}>
        <NavBar
          format={format}
          handleChange={handleChange}
          showSlider={false}
        ></NavBar>
      </div>
      <div className={classes.paletteColors}>
        {levelsOfColor!.map((color) => (
          <ColorBox
            key={color.hex}
            background={color[format] as string}
            name={color.name!}
            showLink={false}
          ></ColorBox>
        ))}
        <Link
          to={`/palette/${paletteLevels.id}`}
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
        <PaletteFooter {...{ paletteLevels }}></PaletteFooter>
      </div>
    </div>
  );
};

const styles: StyleRulesCallback<Theme, Props> = () => ({
  palette: { height: "100vh", overflow: "hidden" },
  navbar: { height: "5vh" },
  paletteColors: { height: "90vh" },
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
export default withStyles(styles)(SingleColorPalette);
