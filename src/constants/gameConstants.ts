import { Challenge } from '../types/game';

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [{ x: 10, y: 10 }];
export const INITIAL_DIRECTION = 'RIGHT' as const;
export const INITIAL_SPEED = 150;
export const SPEED_INCREASE = 10;
export const POINTS_PER_FOOD = 10;
export const GOLDEN_FOOD_POINTS = 50;
export const SHRINK_FOOD_POINTS = 5;

export const DIFFICULTY_SETTINGS = {
  easy: { speed: 200, speedIncrease: 5 },
  medium: { speed: 150, speedIncrease: 10 },
  hard: { speed: 100, speedIncrease: 15 }
};

export const CHALLENGES: Challenge[] = [
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Reach 200 points at double speed',
    unlocked: true,
    completed: false,
    targetScore: 200,
    hasObstacles: false,
    speedMultiplier: 2
  },
  {
    id: 'obstacle-course',
    name: 'Obstacle Course',
    description: 'Navigate through obstacles and reach 150 points',
    unlocked: false,
    completed: false,
    targetScore: 150,
    hasObstacles: true,
    speedMultiplier: 1
  },
  {
    id: 'time-attack',
    name: 'Time Attack',
    description: 'Score 100 points in 60 seconds',
    unlocked: false,
    completed: false,
    targetScore: 100,
    timeLimit: 60,
    hasObstacles: false,
    speedMultiplier: 1
  },
  {
    id: 'master-challenge',
    name: 'Snake Master',
    description: 'Complete all challenges to unlock this ultimate test',
    unlocked: false,
    completed: false,
    targetScore: 500,
    timeLimit: 120,
    hasObstacles: true,
    speedMultiplier: 1.5
  }
];