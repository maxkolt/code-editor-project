import React from 'react';

const ResultDisplay = ({ result }) => {
  return (
    <div className="result-display">
      <pre>{result}</pre>
    </div>
  );
};

export default ResultDisplay;
