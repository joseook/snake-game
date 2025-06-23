import { Position, Food, Direction } from '../types/game';
import { GRID_SIZE } from '../constants/gameConstants';

export const generateRandomPosition = (excludePositions: Position[] = []): Position => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (excludePositions.some(pos => pos.x === position.x && pos.y === position.y));
  
  return position;
};

export const generateFood = (excludePositions: Position[]): Food => {
  const foodTypes = ['normal', 'golden', 'shrink'] as const;
  const weights = [0.7, 0.2, 0.1]; // 70% normal, 20% golden, 10% shrink
  
  const random = Math.random();
  let type: typeof foodTypes[number] = 'normal';
  let cumulativeWeight = 0;
  
  for (let i = 0; i < foodTypes.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      type = foodTypes[i];
      break;
    }
  }
  
  const points = type === 'golden' ? 50 : type === 'shrink' ? 5 : 10;
  
  return {
    position: generateRandomPosition(excludePositions),
    type,
    points
  };
};

export const generateObstacles = (count: number, excludePositions: Position[]): Position[] => {
  const obstacles: Position[] = [];
  
  for (let i = 0; i < count; i++) {
    obstacles.push(generateRandomPosition([...excludePositions, ...obstacles]));
  }
  
  return obstacles;
};

export const checkCollision = (head: Position, positions: Position[]): boolean => {
  return positions.some(pos => pos.x === head.x && pos.y === head.y);
};

export const isOutOfBounds = (position: Position): boolean => {
  return position.x < 0 || position.x >= GRID_SIZE || position.y < 0 || position.y >= GRID_SIZE;
};

export const getNextHeadPosition = (head: Position, direction: Direction): Position => {
  const moves = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
  };
  
  const move = moves[direction];
  return {
    x: head.x + move.x,
    y: head.y + move.y
  };
};

export const getOppositeDirection = (direction: Direction): Direction => {
  const opposites = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT'
  } as const;
  
  return opposites[direction];
};

export const saveHighScore = (score: number): void => {
  const highScore = localStorage.getItem('snakeHighScore');
  if (!highScore || score > parseInt(highScore)) {
    localStorage.setItem('snakeHighScore', score.toString());
  }
};

export const getHighScore = (): number => {
  const highScore = localStorage.getItem('snakeHighScore');
  return highScore ? parseInt(highScore) : 0;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};