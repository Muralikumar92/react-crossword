import React from 'react';
import Tile from './Tile';
import { dimentions } from '../utils/clues';

export default ({
  guess,
  selectedIndices,
  currentIndex,
  inCorrectIndices,
  handleTileClick,
  handleInput,
  onKeyPressFunc,
}) => (
  <div className="board" focus="true">
    {board(
      guess,
      selectedIndices,
      currentIndex,
      inCorrectIndices,
      handleTileClick,
      handleInput,
      onKeyPressFunc
    )}{' '}
  </div>
);

const board = (
  guess,
  selectedIndices,
  currentIndex,
  inCorrectIndices,
  handleTileClick,
  handleInput,
  onKeyPressFunc
) => {
  const boards = Array(dimentions.row)
    .fill(1)
    .map((a, i) => {
      return (
        <div className="row">
          {Array(dimentions.column)
            .fill(1)
            .map((b, j) => (
              <Tile
                {...{
                  i,
                  j,
                  guess,
                  selectedIndices,
                  currentIndex,
                  inCorrectIndices,
                  handleTileClick,
                  handleInput,
                  onKeyPressFunc,
                }}
              />
            ))}
        </div>
      );
    });
  return boards;
};
