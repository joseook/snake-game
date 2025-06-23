export interface Position {
  x: number;
  y: number;
}

export interface Food {
  position: Position;
  type: 'normal' | 'golden' | 'shrink';
  points: number;
}

export interface GameState {
  snake: Position[];
  food: Food;
  direction: Direction;
  score: number;
  highScore: number;
  level: number;
  lives: number;
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete';
  speed: number;
  obstacles: Position[];
  powerUps: Food[];
  timeLeft?: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Challenge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  targetScore: number;
  timeLimit?: number;
  hasObstacles: boolean;
  speedMultiplier: number;
}

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}