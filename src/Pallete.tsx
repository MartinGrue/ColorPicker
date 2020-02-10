import React, { useState } from 'react';
import { IPalette } from './models/IPalette';
import { IExtendedPalette } from './models/IExtendedPalette';
import ColorBox from './ColorBox';

import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import { withStyles, createStyles } from '@material-ui/styles';
import { sizes } from './styles/sizes';

const styles = createStyles({
  palette: { height: '100vh', overflow: 'hidden', minWidth:'310px'},
  paletteColors: {
    height: '90%',
    [sizes.down('m')]: { height: '90%' },
    [sizes.down('xs')]: { height: '83%' }
  },
  paletteFooter: {
    backgroundColor: 'white',
    height: '5vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontWeight: 'bold'
  },
  emoji: {
    fontSize: '1rem',
    margin: '0 1 rem'
  }
});
interface PaletteProps {
  palette: IExtendedPalette;
  classes: any;
}
const Pallete: React.FC<PaletteProps> = ({ palette, classes }) => {
  const [level, setlevel] = useState<number>(500);
  const [format, setformat] = useState<string>('hex');
  const { colors, id } = palette;

  const handleChange = (e: any) => {
    setformat(e.target.value);
  };
  const changeLevel = (level: number) => {
    setlevel(level);
  };
  return (
    <div className={classes.palette}>
      <NavBar
        level={level}
        changeLevel={changeLevel}
        handleChange={handleChange}
        format={format}
        showSlider={true}
      ></NavBar>
      <div className={classes.paletteColors}>
        {colors[level].map(color => (
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

export default withStyles(styles)(Pallete);
