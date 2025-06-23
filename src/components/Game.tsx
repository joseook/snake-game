import React, { useEffect } from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { Menu } from './Menu';
import { GameBoard } from './GameBoard';
import { GameOver } from './GameOver';
import { Challenge } from '../types/game';

export const Game: React.FC = () => {
  const {
    gameState,
    challenges,
    startGame,
    pauseGame,
    changeDirection,
    resetGame,
    completeChallenge
  } = useSnakeGame();

  const currentChallenge = React.useRef<Challenge | null>(null);

  const handleStartChallenge = (challenge: Challenge) => {
    currentChallenge.current = challenge;
    startGame(challenge);
  };

  const handleRestart = () => {
    if (currentChallenge.current) {
      startGame(currentChallenge.current);
    } else {
      startGame();
    }
  };

  const handleHome = () => {
    currentChallenge.current = null;
    resetGame();
  };

  // Handle challenge completion
  useEffect(() => {
    if (gameState.gameStatus === 'levelComplete' && currentChallenge.current) {
      completeChallenge(currentChallenge.current.id);
    }
  }, [gameState.gameStatus, completeChallenge]);

  const isNewHighScore = gameState.score > 0 && gameState.score === gameState.highScore;
  const challengeCompleted = gameState.gameStatus === 'levelComplete';

  if (gameState.gameStatus === 'menu') {
    return (
      <Menu
        onStartGame={() => startGame()}
        onStartChallenge={handleStartChallenge}
        challenges={challenges}
        highScore={gameState.highScore}
      />
    );
  }

  if (gameState.gameStatus === 'gameOver' || gameState.gameStatus === 'levelComplete') {
    return (
      <GameOver
        score={gameState.score}
        highScore={gameState.highScore}
        isNewHighScore={isNewHighScore}
        onRestart={handleRestart}
        onHome={handleHome}
        challengeCompleted={challengeCompleted}
        challengeName={currentChallenge.current?.name}
      />
    );
  }

  return (
    <GameBoard
      gameState={gameState}
      onChangeDirection={changeDirection}
      onPause={pauseGame}
      onHome={handleHome}
    />
  );
};