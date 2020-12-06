import { createStyles } from "@material-ui/styles";
import chroma from "chroma-js";
import { sizes } from "./sizes";

interface ColorBoxProps {
  paletteId?: string;
  name: string;
  background: string;
  colorId?: string;
  showLink: boolean;
}

const ChromaDarker = (props: ColorBoxProps) => {
  return chroma(props.background).luminance() >= 0.5 ? "black" : "white";
};
export default createStyles({
  colorBox: {
    width: "20%",
    height: (props) => (props.showLink ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover button": {
      opacity: 1,
    },
    [sizes.down("l")]: {
      height: (props) => (props.showLink ? "20%" : "38.333%"),
      width: "25%",
    },
    [sizes.down("m")]: {
      height: (props) => (props.showLink ? "10%" : "20%"),
      width: "50%",
    },
    [sizes.down("xs")]: {
      height: (props) => (props.showLink ? "5%" : "10%"),
      width: "100%",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: 0,
    width: "100%",
    height: "100%",
    transition: "transform .1s ease-in-out",
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(100)",
    zIndex: 10,
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "3rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
    },
  },
  copyMessageShow: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: 25,
    transition: "all 0.2s ease-in-out",
    transitionDelay: "0.2s",
  },
  copyText: {
    color: ChromaDarker,
  },
  colorName: {
    color: ChromaDarker,
  },
  more: {
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0",
    bottom: "0",
    color: ChromaDarker,
    width: "60px",
    height: '"30px"',
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyBtn: {
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
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: ChromaDarker,
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    opacity: 0,
  },
});
