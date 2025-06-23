import React, { useEffect } from 'react';
import { Pause, Play, Home, Clock, Heart, Trophy } from 'lucide-react';
import { GameState, Direction } from '../types/game';
import { GRID_SIZE } from '../constants/gameConstants';
import { formatTime } from '../utils/gameUtils';

interface GameBoardProps {
  gameState: GameState;
  onChangeDirection: (direction: Direction) => void;
  onPause: () => void;
  onHome: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onChangeDirection,
  onPause,
  onHome
}) => {
  const { snake, food, score, level, lives, gameStatus, obstacles, timeLeft, highScore } = gameState;

  // Global keyboard event listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent default behavior for game keys
      if (['w', 's', 'a', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          onChangeDirection('UP');
          break;
        case 's':
        case 'arrowdown':
          onChangeDirection('DOWN');
          break;
        case 'a':
        case 'arrowleft':
          onChangeDirection('LEFT');
          break;
        case 'd':
        case 'arrowright':
          onChangeDirection('RIGHT');
          break;
        case ' ':
          onPause();
          break;
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onChangeDirection, onPause]);

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = food.position.x === x && food.position.y === y;
    const isObstacle = obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);

    let cellClass = 'w-full h-full transition-all duration-150';

    if (isSnakeHead) {
      cellClass += ' bg-gradient-to-r from-green-400 to-green-300 rounded-lg shadow-lg shadow-green-400/50 animate-pulse';
    } else if (isSnakeBody) {
      cellClass += ' bg-gradient-to-r from-green-500 to-green-600 rounded';
    } else if (isFood) {
      const foodColors = {
        normal: 'bg-gradient-to-r from-red-400 to-red-300 shadow-lg shadow-red-400/50',
        golden: 'bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg shadow-yellow-400/50 animate-pulse',
        shrink: 'bg-gradient-to-r from-purple-400 to-purple-300 shadow-lg shadow-purple-400/50'
      };
      cellClass += ` ${foodColors[food.type]} rounded-full animate-bounce`;
    } else if (isObstacle) {
      cellClass += ' bg-gradient-to-r from-gray-600 to-gray-700 rounded shadow-lg';
    } else {
      cellClass += ' bg-gray-900/30';
    }

    return (
      <div key={`${x}-${y}`} className="aspect-square">
        <div className={cellClass} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6 bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{level}</div>
              <div className="text-sm text-gray-400">Level</div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                />
              ))}
            </div>
            {timeLeft !== undefined && (
              <div className="flex items-center gap-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-yellow-400 mr-4">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-semibold">{highScore}</span>
            </div>
            <button
              onClick={onPause}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {gameStatus === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={onHome}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div 
              className="grid gap-1 bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 mx-auto"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                maxWidth: '600px'
              }}
            >
              {Array.from({ length: GRID_SIZE }, (_, y) =>
                Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
              )}
            </div>

            {/* Pause Overlay */}
            {gameStatus === 'paused' && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-black/80 p-8 rounded-2xl text-center border border-white/20">
                  <Pause className="w-16 h-16 text-white mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Game Paused</h2>
                  <p className="text-gray-300 mb-4">Press Space or click the pause button to continue</p>
                  <button
                    onClick={onPause}
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Resume Game
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden">
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              <div></div>
              <button
                onClick={() => onChangeDirection('UP')}
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors text-2xl font-bold"
              >
                ↑
              </button>
              <div></div>
              <button
                onClick={() => onChangeDirection('LEFT')}
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors text-2xl font-bold"
              >
                ←
              </button>
              <div></div>
              <button
                onClick={() => onChangeDirection('RIGHT')}
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors text-2xl font-bold"
              >
                →
              </button>
              <div></div>
              <button
                onClick={() => onChangeDirection('DOWN')}
                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors text-2xl font-bold"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:w-64 space-y-4">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Food Types</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-300 rounded-full"></div>
                  <span className="text-sm text-gray-300">Normal (+10 pts)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Golden (+50 pts)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-300 rounded-full"></div>
                  <span className="text-sm text-gray-300">Shrink (+5 pts, -2 length)</span>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Controls</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <div><span className="font-semibold text-green-400">WASD</span> or <span className="font-semibold text-green-400">Arrow Keys</span>: Move</div>
                <div><span className="font-semibold text-blue-400">Space</span>: Pause/Resume</div>
                <div><span className="font-semibold text-purple-400">Mobile</span>: Touch buttons</div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Tips</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <div>• Collect golden food for bonus points</div>
                <div>• Purple food shrinks your snake</div>
                <div>• Avoid walls and obstacles</div>
                <div>• Speed increases every 100 points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};