import React from 'react';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  onRestart: () => void;
  onHome: () => void;
  challengeCompleted?: boolean;
  challengeName?: string;
}

export const GameOver: React.FC<GameOverProps> = ({
  score,
  highScore,
  isNewHighScore,
  onRestart,
  onHome,
  challengeCompleted = false,
  challengeName
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 shadow-2xl">
          {challengeCompleted ? (
            <>
              <div className="mb-6">
                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
                <h1 className="text-3xl font-bold text-white mb-2">Challenge Complete!</h1>
                <p className="text-yellow-400 text-lg font-semibold">{challengeName}</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <div className="text-6xl mb-4">💀</div>
                <h1 className="text-3xl font-bold text-white mb-2">Game Over</h1>
                <p className="text-gray-400">Better luck next time!</p>
              </div>
            </>
          )}

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 mb-6 border border-blue-500/30">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{score}</div>
              <div className="text-gray-300 mb-4">Final Score</div>
              
              {isNewHighScore && (
                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">New High Score!</span>
                  <Trophy className="w-5 h-5" />
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Trophy className="w-4 h-4" />
                <span>Best: {highScore}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
            
            <button
              onClick={onHome}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Main Menu
            </button>
          </div>

          {/* Motivational Message */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-gray-400 italic">
              {score < 50 ? "Keep practicing! Every expert was once a beginner." :
               score < 100 ? "Great progress! You're getting the hang of it." :
               score < 200 ? "Impressive! You're becoming a snake master." :
               "Incredible! You're a true snake legend!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};