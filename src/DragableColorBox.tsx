import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { SortableElement } from 'react-sortable-hoc';
import { sizes } from './styles/sizes';
const styles = createStyles({
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-6px',
    [sizes.down('l')]: {
      width: '25%',
      height: '18%'
    },
    [sizes.down('m')]: {
      width: '50%',
      height: '9%'
    },
    [sizes.down('xs')]: {
      width: '100%',
      height: '5%'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0',
    bottom: '0',
    padding: '2%',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  dragMeContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.3)',
    lineHeight: '30px',
    textTransform: 'uppercase',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  deleteIcon: {
    transition: 'all .3s ease-in-out',
    '&:hover': { color: 'white', transform: 'scale(1.5)' }
  }
});
interface DragableColorBoxProps {
  color: string;
  name: string;
  classes: any;
  deleteColor: (color: string) => void;
  selectColor: (color: string) => void;
}
const DragableColorBox = SortableElement<DragableColorBoxProps>(
  ({
    color,
    name,
    deleteColor,
    selectColor,
    classes
  }: DragableColorBoxProps) => {
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: color }}
        onClick={() => selectColor(name)}
      >
        <div className={classes.dragMeContainer}>
          <span>Drag me</span>
        </div>
        <div className={classes.boxContent}>
          <DeleteOutlinedIcon
            className={classes.deleteIcon}
            onClick={() => {
              deleteColor(name);
            }}
          ></DeleteOutlinedIcon>
          <span>{name}</span>
        </div>
      </div>
    );
  }
);

export default withStyles(styles)(DragableColorBox);
