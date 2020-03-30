import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DragableColorBox from '../../form/DragableColorBox';

interface DragableColorListProps {
  colorObjs: { name: string; color: string }[];
  selectColor: (name: string) => void;
  deleteColor: (name: string) => void;
}

const DragableColorList = SortableContainer<DragableColorListProps>(
  ({ colorObjs, selectColor, deleteColor }: DragableColorListProps) => {
    return (
      <div style={{ height: '100%' }}>
        {colorObjs.map((colorObj: { name: string; color: string }, i) => (
          <DragableColorBox
            index={i}
            selectColor={selectColor}
            deleteColor={deleteColor}
            key={colorObj.name}
            color={colorObj.color}
            name={colorObj.name}
          ></DragableColorBox>
        ))}
      </div>
    );
  }
);
export default DragableColorList;
