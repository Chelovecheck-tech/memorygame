import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';

// Генерация карт в зависимости от уровня сложности
const generateCards = (level) => {
  const cardValues = ['🍎', '🍌', '🍉', '🍓', '🍍', '🥝', '🍇', '🍒', '🥥', '🍋', '🍊', '🍓', '🍏', '🍑', '🍍', '🍒', '🍓', '🥭', '🍇', '🍏', '🍉', '🍋', '🍑', '🍊', '🍎', '🍌', '🍉', '🍓', '🍍', '🥝', '🍇', '🍒', '🥥', '🍋', '🍊', '🍓', '🍏', '🍑', '🍍', '🍒', '🍓', '🥭', '🍇', '🍏', '🍉', '🍋', '🍑', '🍊'];
  
  let numPairs = 0;
  if (level === 20) {
    numPairs = 10; // 20 карточек = 10 пар
  } else if (level === 40) {
    numPairs = 20; // 40 карточек = 20 пар
  } else if (level === 60) {
    numPairs = 30; // 60 карточек = 30 пар
  }
  
  const cards = cardValues.slice(0, numPairs); // Обрезаем массив до нужного количества пар
  return [...cards, ...cards].sort(() => Math.random() - 0.5); // Перемешиваем карты
};

const App = () => {
  const [level, setLevel] = useState(20); // Начальный уровень (20 карт)
  const [cards, setCards] = useState(generateCards(20)); // Генерация карт для начального уровня
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  // Проверка на победу
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      alert(`Поздравляем! Вы победили за ${moves} ходов и набрали ${score} баллов!`);
    }
  }, [matchedCards, cards, moves, score]);

  const flipCard = (index) => {
    if (
      flippedCards.length < 2 && // Не больше двух карт
      !flippedCards.includes(index) && // Карта еще не перевернута
      !matchedCards.includes(cards[index]) // Карта не совпала
    ) {
      setFlippedCards((prevFlipped) => [...prevFlipped, index]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstIndex, secondIndex] = flippedCards;

      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prevMatched) => [...prevMatched, cards[firstIndex]]);
        setScore((prevScore) => prevScore + 10);
        setFlippedCards([]);
      } else {
        setScore((prevScore) => prevScore - 2);
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  }, [flippedCards, cards, matchedCards]);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setCards(generateCards(newLevel)); // Обновляем карты в зависимости от уровня
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
  };

  // Определяем класс для текущего уровня
  const levelClass = level === 20 ? '' : level === 40 ? 'medium' : 'hard';

  return (
    <div className={`App ${levelClass}`}>
      <h1>Игра "Память"</h1>
      <div className="controls">
        <button onClick={() => handleLevelChange(20)} className={level === 20 ? 'active' : ''}>Легкий</button>
        <button onClick={() => handleLevelChange(40)} className={level === 40 ? 'active' : ''}>Средний</button>
        <button onClick={() => handleLevelChange(60)} className={level === 60 ? 'active' : ''}>Сложный</button>
      </div>
      <p>Ходов: {moves}</p>
      <p>Баллы: {score}</p>
      <div className="board">
        {cards.map((value, index) => (
          <Card
            key={index}
            index={index}
            value={value}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(value)}
            onClick={flipCard}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
