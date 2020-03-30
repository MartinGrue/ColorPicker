import React, { useState } from 'react';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IPalette } from '../../models/IPalette';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import { BaseEmoji } from 'emoji-mart';
import { sizes } from '../../styles/sizes';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';

const drawerWidth = 400;
const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      [sizes.down('m')]: { width: `calc(100% - ${drawerWidth - 100}px)` },
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    navbtns: { margin: '10px', padding: '10px' },

    heading: {
      [sizes.down('m')]: {
        width: (props: any) => (props.open ? '0%' : 'auto')
      } as CreateCSSProperties<any>,

      [sizes.down('xs')]: { width: '0px' }
    }
  });

interface PaletteFormNavProps {
  classes: any;
  open: boolean;
  localsavePalette: (newPaletteName: string, emoji: BaseEmoji) => void;
  setOpen: any;
  palettes: IPalette[];
}
const PaletteFormNav: React.FC<PaletteFormNavProps> = ({
  classes,
  open,
  localsavePalette,
  setOpen,
  palettes
}) => {
  const [modalstage, setmodalstage] = useState<
    'nameStage' | 'emojiStage' | undefined
  >();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap className={classes.heading}>
            Create a new Palette
          </Typography>
          <div className={classes.navbtns}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => setmodalstage('nameStage')}
              style={{margin:'5px'}}
            >
              Save
            </Button>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setmodalstage(undefined)}
              >
                Go back
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      {setmodalstage && (
        <PaletteMetaForm
          modalstage={modalstage}
          setmodalstage={setmodalstage}
          palettes={palettes}
          localsavePalette={localsavePalette}
        ></PaletteMetaForm>
      )}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
