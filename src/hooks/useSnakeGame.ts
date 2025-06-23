import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Direction, Challenge } from '../types/game';
import { 
  GRID_SIZE, 
  INITIAL_SNAKE, 
  INITIAL_DIRECTION, 
  INITIAL_SPEED,
  SPEED_INCREASE,
  CHALLENGES
} from '../constants/gameConstants';
import {
  generateFood,
  generateObstacles,
  checkCollision,
  isOutOfBounds,
  getNextHeadPosition,
  getOppositeDirection,
  saveHighScore,
  getHighScore
} from '../utils/gameUtils';

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: generateFood(INITIAL_SNAKE),
    direction: INITIAL_DIRECTION,
    score: 0,
    highScore: getHighScore(),
    level: 1,
    lives: 3,
    gameStatus: 'menu',
    speed: INITIAL_SPEED,
    obstacles: [],
    powerUps: []
  });

  const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const currentChallengeRef = useRef<Challenge | null>(null);

  const moveSnake = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prevState => {
      const head = prevState.snake[0];
      const newHead = getNextHeadPosition(head, prevState.direction);

      // Check wall collision
      if (isOutOfBounds(newHead)) {
        saveHighScore(prevState.score);
        return { ...prevState, gameStatus: 'gameOver' };
      }

      // Check self collision
      if (checkCollision(newHead, prevState.snake)) {
        saveHighScore(prevState.score);
        return { ...prevState, gameStatus: 'gameOver' };
      }

      // Check obstacle collision
      if (checkCollision(newHead, prevState.obstacles)) {
        const newLives = prevState.lives - 1;
        if (newLives <= 0) {
          saveHighScore(prevState.score);
          return { ...prevState, lives: 0, gameStatus: 'gameOver' };
        }
        return {
          ...prevState,
          lives: newLives,
          snake: INITIAL_SNAKE,
          direction: INITIAL_DIRECTION
        };
      }

      let newSnake = [newHead, ...prevState.snake];
      let newScore = prevState.score;
      let newFood = prevState.food;
      let newLevel = prevState.level;
      let newSpeed = prevState.speed;

      // Check food collision
      if (newHead.x === prevState.food.position.x && newHead.y === prevState.food.position.y) {
        newScore += prevState.food.points;
        
        // Handle special food types
        if (prevState.food.type === 'shrink' && newSnake.length > 1) {
          newSnake = newSnake.slice(0, Math.max(1, newSnake.length - 2));
        }
        
        // Generate new food
        newFood = generateFood([...newSnake, ...prevState.obstacles]);
        
        // Level progression
        if (newScore > 0 && newScore % 100 === 0) {
          newLevel += 1;
          newSpeed = Math.max(50, prevState.speed - SPEED_INCREASE);
        }
      } else {
        newSnake.pop();
      }

      // Check challenge completion
      const challenge = currentChallengeRef.current;
      if (challenge) {
        if (newScore >= challenge.targetScore || 
            (challenge.timeLimit && prevState.timeLeft !== undefined && prevState.timeLeft <= 0)) {
          saveHighScore(newScore);
          return { 
            ...prevState, 
            score: newScore,
            gameStatus: 'levelComplete'
          };
        }
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        level: newLevel,
        speed: newSpeed,
        highScore: Math.max(prevState.highScore, newScore)
      };
    });
  }, [gameState.gameStatus]);

  const startGame = useCallback((challenge?: Challenge) => {
    currentChallengeRef.current = challenge || null;
    
    const obstacles = challenge?.hasObstacles ? 
      generateObstacles(Math.floor(GRID_SIZE * GRID_SIZE * 0.1), INITIAL_SNAKE) : [];
    
    const speed = challenge?.speedMultiplier ? 
      INITIAL_SPEED / challenge.speedMultiplier : INITIAL_SPEED;

    setGameState({
      snake: INITIAL_SNAKE,
      food: generateFood([...INITIAL_SNAKE, ...obstacles]),
      direction: INITIAL_DIRECTION,
      score: 0,
      highScore: getHighScore(),
      level: 1,
      lives: 3,
      gameStatus: 'playing',
      speed,
      obstacles,
      powerUps: [],
      timeLeft: challenge?.timeLimit
    });
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'playing' ? 'paused' : 'playing'
    }));
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      if (prev.gameStatus !== 'playing') return prev;
      if (newDirection === getOppositeDirection(prev.direction)) return prev;
      
      return { ...prev, direction: newDirection };
    });
  }, []);

  const resetGame = useCallback(() => {
    currentChallengeRef.current = null;
    setGameState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: INITIAL_DIRECTION,
      score: 0,
      level: 1,
      lives: 3,
      gameStatus: 'menu',
      speed: INITIAL_SPEED,
      obstacles: [],
      powerUps: [],
      timeLeft: undefined
    }));
  }, []);

  const completeChallenge = useCallback((challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId) {
        return { ...challenge, completed: true };
      }
      // Unlock next challenge
      const currentIndex = prev.findIndex(c => c.id === challengeId);
      if (currentIndex >= 0 && currentIndex < prev.length - 1) {
        const nextChallenge = prev[currentIndex + 1];
        if (!nextChallenge.unlocked) {
          return challenge.id === nextChallenge.id ? 
            { ...challenge, unlocked: true } : challenge;
        }
      }
      return challenge;
    }));
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, gameState.speed);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [moveSnake, gameState.speed, gameState.gameStatus]);

  // Timer for time-limited challenges
  useEffect(() => {
    let timerRef: NodeJS.Timeout;
    
    if (gameState.gameStatus === 'playing' && gameState.timeLeft !== undefined) {
      timerRef = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft !== undefined) {
            const newTimeLeft = prev.timeLeft - 1;
            if (newTimeLeft <= 0) {
              saveHighScore(prev.score);
              return { ...prev, timeLeft: 0, gameStatus: 'gameOver' };
            }
            return { ...prev, timeLeft: newTimeLeft };
          }
          return prev;
        });
      }, 1000);
    }

    return () => {
      if (timerRef) clearInterval(timerRef);
    };
  }, [gameState.gameStatus, gameState.timeLeft]);

  return {
    gameState,
    challenges,
    startGame,
    pauseGame,
    changeDirection,
    resetGame,
    completeChallenge
  };
};