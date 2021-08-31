import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { withStyles } from "@material-ui/styles";
import { StyleRulesCallback, Theme, WithStyles } from "@material-ui/core";
import ColorBox from "../../components/ColorBox";
import PaletteFooter from "../../components/PaletteFooter";
import { IExtendedPalette } from "../../models/IExtendedPalette";

interface Props {
  palette: IExtendedPalette;
}
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
interface PaletteProps extends WithStyles<typeof styles>, Props {}
const MultiColorPalette: React.FC<PaletteProps> = ({ palette, classes }) => {
  const [level, setlevel] = useState<number>(500);
  const [format, setformat] = useState<string>("hex");
  const { colors, id } = palette;

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: string;
    }>
  ) => {
    setformat(e.target.value);
  };
  const changeLevel = (level: number) => {
    setlevel(level);
  };
  return (
    <div className={classes.palette}>
      <div className={classes.navbar}>
        <NavBar
          level={level}
          changeLevel={changeLevel}
          handleChange={(
            e: React.ChangeEvent<{
              name?: string | undefined;
              value: string;
            }>
          ) => handleChange(e)}
          format={format}
          showSlider={true}
        ></NavBar>
      </div>
      <div className={classes.paletteColors}>
        {colors[level].map((color) => (
          <ColorBox
            key={color.id}
            // background={Object.keys(color).find(p => p === format)!}
            background={color[format]}
            colorId={color.id}
            paletteId={id}
            name={color.name}
            showLink={true}
          ></ColorBox>
        ))}
      </div>
      <PaletteFooter palette={palette}></PaletteFooter>
    </div>
  );
};

export default withStyles(styles)(MultiColorPalette);
