import React from 'react';

export default (props) => {
  return (
    <div>
      <h3>Top To Bottom</h3>
      {props.clueData
        .filter((item) => item.direction === 'top')
        .map((item) => (
          <p className="clue" onClick={() => props.handleClueClick(item)}>
            {item.clueNo}: {item.clueText}
          </p>
        ))}
      <h3>Left To Right</h3>
      {props.clueData
        .filter((item) => item.direction === 'left')
        .map((item) => (
          <p className="clue" onClick={() => props.handleClueClick(item)}>
            {item.clueNo}: {item.clueText}
          </p>
        ))}
    </div>
  );
};
