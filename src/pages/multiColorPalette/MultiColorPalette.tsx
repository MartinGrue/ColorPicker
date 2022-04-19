import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { withStyles } from "@material-ui/styles";
import { StyleRulesCallback, Theme, WithStyles } from "@material-ui/core";
import ColorBox from "../../components/ColorBox";
import PaletteFooter from "../../components/PaletteFooter";
import { useParams } from "react-router";
import { getPaletteLevels } from "../../utils/ColorHelpers";
import { IPalette } from "../../models/IPalette";
import { IColor } from "../../models/IPaletteLevels";

interface Props {
  findPalette: (id: string) => IPalette | undefined;
}

interface PaletteProps extends WithStyles<typeof styles>, Props {}
const MultiColorPalette: React.FC<PaletteProps> = ({
  classes,
  findPalette,
}) => {
  const { id } = useParams();
  const statingPalette = findPalette(id!);
  const paletteLevels = getPaletteLevels(statingPalette!);

  const [levelVolume, setlevel] = useState<number>(500);
  const [format, setformat] = useState<string>("hex");
  const { levels } = paletteLevels;

  const colorsOfLevel = levels.reduce((acc, item) => {
    const hit = item.find((color) => color.levelVolume === levelVolume);
    hit && acc.push(hit);
    return acc;
  }, [] as unknown as [IColor]);

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: string;
    }>
  ) => {
    setformat(e.target.value);
  };
  const changeLevel = (level: number | number[]) => {
    setlevel(level as number);
  };
  return (
    <div className={classes.palette}>
      <div className={classes.navbar}>
        <NavBar
          level={levelVolume}
          changeLevel={changeLevel}
          handleChange={(e) => handleChange(e)}
          format={format}
          showSlider={true}
        ></NavBar>
      </div>
      <div className={classes.paletteColors}>
        {colorsOfLevel.map((color) => (
          <ColorBox
            key={color.id}
            background={color[format] as string}
            colorId={color.id}
            paletteId={paletteLevels.id}
            name={color.name}
            showLink={true}
          ></ColorBox>
        ))}
      </div>
      <PaletteFooter {...{ paletteLevels }}></PaletteFooter>
    </div>
  );
};

const styles: StyleRulesCallback<Theme, Props> = () => ({
  palette: { height: "100vh", minWidth: "310px", overflow: "hidden" },
  navbar: { height: "5vh" },
  paletteColors: {
    height: "90vh",
  },
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

export default withStyles(styles)(MultiColorPalette);
