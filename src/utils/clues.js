export const clues = [
  {
    clueNo: 1,
    startIndex: [0, 3],
    text: 'SEE',
    clueText: 'clue A',
    direction: 'top',
  },
  {
    clueNo: 2,
    startIndex: [2, 1],
    text: 'DENNV',
    clueText: 'clue B',
    direction: 'top',
  },
  {
    clueNo: 3,
    startIndex: [2, 2],
    text: 'EEOEE',
    clueText: 'clue C',
    direction: 'top',
  },
  {
    clueNo: 4,
    startIndex: [2, 5],
    text: 'AEH',
    clueText: 'clue D',
    direction: 'top',
  },

  {
    clueNo: 2,
    startIndex: [2, 1],
    text: 'MURALI',
    clueText: 'clue E',
    direction: 'left',
  },
  {
    clueNo: 5,
    startIndex: [3, 0],
    text: 'FEE',
    clueText: 'clue F',
    direction: 'left',
  },
  {
    clueNo: 6,
    startIndex: [3, 5],
    text: 'ES',
    clueText: 'clue G',
    direction: 'left',
  },
  {
    clueNo: 7,
    startIndex: [4, 1],
    text: 'NORTH',
    clueText: 'clue H',
    direction: 'left',
  },
  {
    clueNo: 8,
    startIndex: [5, 1],
    text: 'NEST',
    clueText: 'clue I',
    direction: 'left',
  },
  {
    clueNo: 9,
    startIndex: [6, 1],
    text: 'WET',
    clueText: 'clue J',
    direction: 'left',
  },
  {
    clueNo: 10,
    startIndex: [1, 1],
    text: 'DEPTH',
    clueText: 'clue K',
    direction: 'left',
  },
];

export const valueIndices = {};

export const getcluesWithSelectedItems = clues.map((clue) => {
  //valueIndices also updated inside getSelectedIndices method
  clue.selectedIndices = getSelectedIndices(clue);
  return clue;
});

export const { clueIndices, dimentions } = clues.reduce(
  (obj, clue) => {
    updateClueIndices(obj, clue);
    updateDimensions(obj, clue);
    return obj;
  },
  { clueIndices: {}, dimentions: { row: 0, column: 0 } }
);

// export const dimentions = getcluesWithSelectedItems.reduce(
//   (obj, clue) => {
//     updateDimensions(obj, clue);
//     return obj;
//   },
//   { dimentions: { row: 0, column: 0 } }
// );

function updateClueIndices(obj, clue) {
  let i = clue.startIndex[0];
  let j = clue.startIndex[1];
  if (!obj.clueIndices[i]) {
    obj.clueIndices[i] = {};
  }
  obj.clueIndices[i][j] = clue.clueNo;
}

function updateDimensions(obj, clue) {
  let i = 0,
    j = 0;
  if (clue.direction === 'top') {
    i = clue.startIndex[0] + clue.text.length;
    j = clue.startIndex[1];
  }
  if (clue.direction === 'left') {
    i = clue.startIndex[0];
    j = clue.startIndex[1] + clue.text.length;
  }
  if (obj.dimentions.row < i) {
    obj.dimentions.row = i;
  }
  if (obj.dimentions.column < j) {
    obj.dimentions.column = j;
  }
  return obj;
}

console.log('dimension = ' + JSON.stringify(dimentions));

export function isClueIndex(i, j) {
  return clueIndices[i] && clueIndices[i][j];
}

export function isValueIndex(i, j) {
  return valueIndices[i] && valueIndices[i][j];
}

export function getSelectedIndices(clueItem) {
  let indexstart = clueItem?.startIndex;
  let length = clueItem.text.length;
  let selectedIndices = {};
  if (clueItem?.direction === 'top') {
    for (let i = indexstart[0], n = 0; n < length; n++, i++) {
      if (!selectedIndices[i]) {
        selectedIndices[i] = {};
      }
      selectedIndices[i][indexstart[1]] = clueItem.text.charAt(n);
      if (!valueIndices[i]) {
        valueIndices[i] = {};
      }
      valueIndices[i][indexstart[1]] = clueItem.text.charAt(n);
    }
  } else if (clueItem?.direction === 'left') {
    for (let i = indexstart[1], n = 0; n < length; n++, i++) {
      if (!selectedIndices[indexstart[0]]) {
        selectedIndices[indexstart[0]] = {};
      }
      selectedIndices[indexstart[0]][i] = clueItem.text.charAt(n);
      if (!valueIndices[indexstart[0]]) {
        valueIndices[indexstart[0]] = {};
      }
      valueIndices[indexstart[0]][i] = clueItem.text.charAt(n);
    }
  }
  return selectedIndices;
}

console.log(valueIndices);
