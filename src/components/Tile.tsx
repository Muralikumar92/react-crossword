import React, { useEffect } from 'react';
import { isClueIndex, clueIndices, isValueIndex } from '../utils/clues';

export default (props) => {
  const {
    i,
    j,
    guess,
    selectedIndices,
    currentIndex,
    inCorrectIndices,
    handleTileClick,
    handleInput,
    onKeyPressFunc,
  } = props;
  let incorrectindex =
    inCorrectIndices[i] && inCorrectIndices[i][j] ? 'true' : 'false';

  useEffect(() => {
    if (isFocused(i, j, currentIndex) === 'true' && isValueIndex(i, j)) {
      document.getElementById('tileInput-' + i + '-' + j)?.focus();
    }
    if (Object.keys(inCorrectIndices).length !== 0) {
      document
        .getElementById('tile-' + i + '-' + j)
        ?.setAttribute('incorrectindex', incorrectindex);
      document
        .getElementById('tileInput-' + i + '-' + j)
        ?.setAttribute('incorrectindex', incorrectindex);
    } else {
      document
        .getElementById('tile-' + i + '-' + j)
        ?.removeAttribute('incorrectindex');
      document
        .getElementById('tileInput-' + i + '-' + j)
        ?.removeAttribute('incorrectindex');
    }
  });

  return (
    <div
      id={'tile-' + i + '-' + j}
      className="tile"
      present={isValueIndex(i, j) ? 'true' : 'false'}
      focus={isFocused(i, j, currentIndex)}
      onClick={(e) => handleTileClick(i, j)}
    >
      <div className="clueIndex">
        {isClueIndex(i, j) ? clueIndices[i][j] : ''}
      </div>
      {isValueIndex(i, j) && (
        <input
          id={'tileInput-' + i + '-' + j}
          className="tileInput"
          value={guess[i] ? guess[i][j] : ''}
          onChange={handleInput}
          focus={isFocused(i, j, currentIndex)}
          onKeyDown={onKeyPressFunc}
          highlight={
            selectedIndices && selectedIndices[i] && selectedIndices[i][j]
              ? 'true'
              : 'false'
          }
        />
      )}
    </div>
  );
};

function onInput(e) {
  console.log('onInput ' + e);
}

const isFocused = (i, j, currentIndex) => {
  return currentIndex[0] === i && currentIndex[1] === j ? 'true' : 'false';
};
