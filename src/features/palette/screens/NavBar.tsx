import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Snackbar from "@material-ui/core/Snackbar";

import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles, createStyles } from "@material-ui/styles";
import { sizes } from "../../../styles/sizes";
import { WithStyles } from "@material-ui/core";

const styles = createStyles({
  navBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    [sizes.down("m")]: { height: "auto", flexFlow: "row wrap" },
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    [sizes.down("m")]: {
      padding: "13px 13px",
    },
    [sizes.down("xs")]: {
      height: "50%",
    },
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  sliderContainer: {
    [sizes.down("m")]: {
      flex: "1 1 auto",
    },
  },
  slider: {
    "@media (max-width: 750px)": {
      width: "170px",
    },
    width: "340px",
    margin: "0 10px",
    display: "inline-flex",
    "& .rc-slider-rail": {
      backgroundColor: "grey",
    },
    "& .rc-slider-track": {
      // height: '8px'
    },
    "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus": {
      backgroundColor: "green",
      outline: "none",
      border: "2px solid green",
      boxShadow: "none",
      width: "13px",
      height: "13px",
      marginLeft: "-7px",
      marginTop: "-4px",
    },
  },
  selectContainer: {
    marginLeft: "auto",
    [sizes.down("m")]: {
      marginLeft: "auto",
      marginRight: "auto",
      margin: "10px",
      alignSelf: "center",
    },
  },
});
interface NavBarProps extends WithStyles<typeof styles> {
  level?: number;
  changeLevel?: (value: number) => void;
  handleChange: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: string;
    }>
  ) => void;
  format: string;
  showSlider: boolean;
}
const NavBar: React.FC<NavBarProps> = ({
  level,
  changeLevel,
  handleChange,
  format,
  showSlider,
  classes,
}) => {
  const [open, setopen] = useState(false);
  const handleFormatChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: string;
    }>
  ) => {
    handleChange(e);
  };
  const handleCloseSnackBar = () => {
    setopen(false);
  };

  function testForString(value: unknown): string {
    return String(value);
  }
  return (
    <header className={classes.navBar}>
      <div className={classes.logo}>
        <Link to="/">ReactColorPicker</Link>
      </div>
      {showSlider && (
        <div className={classes.sliderContainer}>
          <span>{`Level ${level}`}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              step={100}
              min={100}
              max={900}
              onAfterChange={changeLevel}
            ></Slider>
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select
          value={format}
          onChange={(
            event: React.ChangeEvent<{ name?: string; value: unknown }>
          ) =>
            handleFormatChange(
              event as React.ChangeEvent<{
                name?: string | undefined;
                value: string;
              }>
            )
          }
        >
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={
          <span id="message-id">Format changed to {format!.toUpperCase()}</span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            //   className={classes.close}
            onClick={handleCloseSnackBar}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      ></Snackbar>
    </header>
  );
};
export default withStyles(styles)(NavBar);
