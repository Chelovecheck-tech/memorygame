import React from 'react';
import './Card.css';

const Card = ({ value, index, isFlipped, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(index)}>
      {isFlipped ? <div className="card-value">{value}</div> : <div className="card-back">?</div>}
    </div>
  );
};

export default Card;
