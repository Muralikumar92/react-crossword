import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './components/Board';
import ClueContainer from './components/ClueContainer';

import {
  getcluesWithSelectedItems,
  valueIndices,
  isValueIndex,
  dimentions,
} from './utils/clues';
import './style.css';

interface AppProps {}
interface Selection {
  startIndex: [];
  length: number;
  direction: string;
  selectedIndices: any;
}
interface AppState {
  name: string;
  guess: {};
  selection: Selection;
  currentIndex: number[];
  inCorrectIndices: {};
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      guess: {},
      selection: null,
      currentIndex: [],
      inCorrectIndices: {},
    };
    this.handleClueClick = this.handleClueClick.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onShowAns = this.onShowAns.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getKeyBoardListenerFunction =
      this.getKeyBoardListenerFunction.bind(this);
  }

  addKeyBoardEventListener() {
    //document.addEventListener('keyup', this.getKeyBoardListenerFunction());
  }

  removeKeyBoardEventListener() {
    //document.removeEventListener('keyup', this.getKeyBoardListenerFunction());
  }

  getKeyBoardListenerFunction(e) {
    console.log('keyup event = ' + e.key);
    let indexX = this.state?.currentIndex[0];
    let indexY = this.state?.currentIndex[1];
    if (indexX >= 0 && indexY >= 0) {
      //handle ArrowKeys
      if (e.key.startsWith('Arrow')) {
        let nextIndex;
        if (e.key === 'ArrowUp') {
          let nexXindex = indexX - 1;
          nextIndex = this.getNextIndex(nexXindex, indexY);
        } else if (e.key === 'ArrowDown') {
          let nexXindex = indexX + 1;
          nextIndex = this.getNextIndex(nexXindex, indexY);
        } else if (e.key === 'ArrowLeft') {
          let nexYindex = indexY - 1;
          nextIndex = this.getNextIndex(indexX, nexYindex);
        } else if (e.key === 'ArrowRight') {
          let nexYindex = indexY + 1;
          nextIndex = this.getNextIndex(indexX, nexYindex);
        }
        if (nextIndex) {
          let i = nextIndex[0];
          let j = nextIndex[1];
          let selection = this.state.selection;
          //if arrow moves away from selectied index find optimam selection
          if (
            !selection.selectedIndices[i] ||
            !selection.selectedIndices[i][j]
          ) {
            let newSelection = getcluesWithSelectedItems.find(
              (cluesItem) =>
                cluesItem.selectedIndices[i] && cluesItem.selectedIndices[i][j]
            );
            let selectionStart = getcluesWithSelectedItems.find(
              (clueItem) =>
                clueItem.startIndex[0] === i && clueItem.startIndex[1] === j
            );
            selection = selectionStart || newSelection;
          }

          this.setState({ selection, currentIndex: nextIndex });
        }
      } else if (e.key === 'Escape') {
        this.removeKeyBoardEventListener();
        //clear slection and currentIndex on escape
        this.setState({ selection: null, currentIndex: [] });
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        let tempGuess = { ...this.state.guess };
        if (tempGuess[indexX] && tempGuess[indexX][indexY]) {
          //if value present in currentIndex just delete the value
          tempGuess[indexX][indexY] = '';
          this.setState({
            guess: tempGuess,
          });
        } else {
          //if value not present in currentIndex delete the preious index value and go back
          let nextIndex;
          if (this.state.selection?.direction === 'top') {
            let preX = indexX - 1;
            nextIndex = this.getNextIndex(preX, indexY);
            if (preX !== -1 && tempGuess[preX] && tempGuess[preX][indexY]) {
              tempGuess[preX][indexY] = '';
            }
          } else if (this.state.selection?.direction === 'left') {
            let preY = indexY - 1;
            if (preY !== -1 && tempGuess[indexX] && tempGuess[indexX][preY]) {
              tempGuess[indexX][preY] = '';
            }
            nextIndex = this.getNextIndex(indexX, preY);
          }

          this.setState({
            guess: tempGuess,
            currentIndex: nextIndex,
          });
        }
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        // let nextIndex;
        // if (indexX >= 0 && indexY >= 0 && this.state.selection?.direction) {
        //   let tempGuess = { ...this.state.guess };
        //   if (!tempGuess[indexX]) {
        //     tempGuess[indexX] = {};
        //   }
        //   tempGuess[indexX][indexY] = e.key.toUpperCase();
        //   if (this.state.selection.direction === 'top') {
        //     nextIndex = this.getNextIndex(indexX + 1, indexY);
        //   } else {
        //     nextIndex = this.getNextIndex(indexX, indexY + 1);
        //   }
        //   this.setState({
        //     guess: tempGuess,
        //     currentIndex: nextIndex,
        //   });
        // }
      } else {
        e.preventDefault();
      }
    }
    // };
  }

  getNextIndex(x, y) {
    if (isValueIndex(x, y)) {
      return [x, y];
    }
    return this.state.currentIndex;
  }

  handleClueClick(item) {
    this.addKeyBoardEventListener();
    console.log(item.direction + ' ' + item.clueNo);
    this.setState({
      selection: item,
      currentIndex: [...item.startIndex],
      inCorrectIndices: {}, //clear inCorrectIndex
    });
  }

  handleTileClick(i, j) {
    this.addKeyBoardEventListener();

    console.log('index' + i + ' , ' + j);
    let selectionStart = getcluesWithSelectedItems.find(
      (clueItem) => clueItem.startIndex[0] === i && clueItem.startIndex[1] === j
    );

    let selection = getcluesWithSelectedItems.find(
      (cluesItem) =>
        cluesItem.selectedIndices[i] && cluesItem.selectedIndices[i][j]
    );
    if (isValueIndex(i, j)) {
      this.setState({
        selection: selectionStart || selection,
        currentIndex: [i, j],
        inCorrectIndices: {}, //clear inCorrectIndex
      });
    }
  }

  handleInput(e) {
    if (e.target.value === '') {
      //delete and backspace is handled in keydown even
      e.preventDefault();
      return;
    }
    let indexX = this.state?.currentIndex[0];
    let indexY = this.state?.currentIndex[1];
    let nextIndex;
    if (indexX >= 0 && indexY >= 0 && this.state.selection?.direction) {
      let value = e.target.value;
      if (this.state.guess[indexX] && this.state.guess[indexX][indexY]) {
        value = value.replace(this.state.guess[indexX][indexY], '');
      }
      if (value.length > 1) {
        e.preventDefault();
        return;
      }

      let tempGuess = { ...this.state.guess };
      if (!tempGuess[indexX]) {
        tempGuess[indexX] = {};
      }
      tempGuess[indexX][indexY] = value.toUpperCase();
      if (this.state.selection.direction === 'top') {
        nextIndex = this.getNextIndex(indexX + 1, indexY);
      } else {
        nextIndex = this.getNextIndex(indexX, indexY + 1);
      }

      this.setState({
        guess: tempGuess,
        currentIndex: nextIndex,
      });
    } else {
      console.log('input tile not selected');
      e.preventDefault();
    }
  }

  onCheck() {
    let inCorrectIndices = {};
    let complete = true;
    for (let i = 0; i < dimentions.row; i++) {
      for (let j = 0; j < dimentions.column; j++) {
        if (isValueIndex(i, j)) {
          let guess = this.state.guess;
          if (guess[i] && guess[i][j] && valueIndices[i][j] === guess[i][j]) {
          } else {
            if (!inCorrectIndices[i]) {
              inCorrectIndices[i] = {};
            }
            inCorrectIndices[i][j] = true;
            complete = false;
          }
        }
      }
    }

    //clear slection and currentIndex on check

    if (complete) {
      inCorrectIndices.won = true;
      setTimeout(function () {
        alert('won');
      }, 0);
    }
    this.setState({ inCorrectIndices, selection: null, currentIndex: [] });
  }

  onShowAns() {
    this.setState({ guess: valueIndices });
  }

  render() {
    return (
      <div>
        <Board
          guess={this.state.guess}
          selectedIndices={this.state.selection?.selectedIndices}
          currentIndex={this.state.currentIndex}
          inCorrectIndices={this.state.inCorrectIndices}
          handleTileClick={this.handleTileClick}
          handleInput={this.handleInput}
          onKeyPressFunc={this.getKeyBoardListenerFunction}
        />
        <button onClick={this.onCheck}>Check</button>
        <button onClick={this.onShowAns}>Show Ans</button>
        <ClueContainer
          clueData={getcluesWithSelectedItems}
          handleClueClick={this.handleClueClick}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
