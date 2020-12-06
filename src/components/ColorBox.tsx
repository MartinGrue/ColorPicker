import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { default as styles } from "../styles/ColorBoxStyles";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";

interface ColorBoxProps extends WithStyles<typeof styles> {
  paletteId?: string;
  name: string;
  background: string;
  colorId?: string;
  showLink: boolean;
}
const ColorBox: React.FC<ColorBoxProps> = ({
  paletteId,
  background,
  name,
  colorId,
  showLink,
  classes,
}) => {
  const [copied, setcopied] = useState(false);

  return (
    <CopyToClipboard
      text={background}
      onCopy={() => {
        setcopied(true);
        setTimeout(() => {
          setcopied(false);
        }, 1500);
      }}
    >
      <div
        className={classes.colorBox}
        style={{
          background,
        }}
      >
        <div
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          style={{ background }}
        ></div>
        <div
          className={`${classes.copyMessage} ${
            copied && classes.copyMessageShow
          }`}
        >
          <h1 className={classes.copyText}>Copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyBtn}>Copy</button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${colorId}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className={classes.more}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default withStyles(styles)(ColorBox);
