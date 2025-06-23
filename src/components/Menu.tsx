import React from 'react';
import { Play, Trophy, Settings, Zap, Target, Clock, Shield } from 'lucide-react';
import { Challenge } from '../types/game';

interface MenuProps {
  onStartGame: () => void;
  onStartChallenge: (challenge: Challenge) => void;
  challenges: Challenge[];
  highScore: number;
}

export const Menu: React.FC<MenuProps> = ({ 
  onStartGame, 
  onStartChallenge, 
  challenges,
  highScore 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-red-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Modern Title */}
          <div className="text-center mb-16">
            <div className="relative mb-8">
              {/* Snake Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-300 to-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-green-500 to-green-700 rounded-full"></div>
                  <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-green-600 to-green-800 rounded-full"></div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-4 tracking-tight">
                SNAKE
              </h1>
              
              {/* Subtitle */}
              <div className="relative">
                <p className="text-2xl md:text-3xl font-light text-gray-300 mb-2">
                  Classic Reimagined
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
              </div>
            </div>
            
            {/* High Score Display */}
            <div className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-bold text-white">Best Score: {highScore}</span>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            {/* Classic Mode */}
            <button
              onClick={onStartGame}
              className="group relative bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white p-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 border border-green-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-3">Classic Mode</h2>
                <p className="text-green-100 text-lg">Experience the timeless snake game with modern graphics and smooth gameplay</p>
              </div>
            </button>

            {/* Settings */}
            <button className="group relative bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white p-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 border border-gray-600/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Settings className="w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-3">Settings</h2>
                <p className="text-gray-300 text-lg">Customize controls, difficulty, and visual preferences</p>
              </div>
            </button>
          </div>

          {/* Challenges Section */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white">Challenges</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full ml-4"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {challenges.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => challenge.unlocked && onStartChallenge(challenge)}
                  disabled={!challenge.unlocked}
                  className={`
                    relative p-6 rounded-2xl text-left transition-all duration-300 border-2 group
                    ${challenge.unlocked 
                      ? challenge.completed
                        ? 'bg-gradient-to-br from-yellow-600/20 to-yellow-400/20 border-yellow-400/50 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/25 hover:scale-105'
                        : 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/25 hover:scale-105'
                      : 'bg-gray-800/50 border-gray-700/50 cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  {/* Challenge Status Icons */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      challenge.unlocked 
                        ? challenge.completed 
                          ? 'bg-yellow-500/20' 
                          : 'bg-blue-500/20'
                        : 'bg-gray-600/20'
                    }`}>
                      {challenge.completed ? (
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      ) : challenge.hasObstacles ? (
                        <Shield className="w-5 h-5 text-blue-400" />
                      ) : challenge.timeLimit ? (
                        <Clock className="w-5 h-5 text-red-400" />
                      ) : (
                        <Target className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    
                    {challenge.completed && (
                      <div className="bg-yellow-500/20 px-2 py-1 rounded-full">
                        <span className="text-xs text-yellow-400 font-bold">COMPLETED</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${
                    challenge.unlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {challenge.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 leading-relaxed ${
                    challenge.unlocked ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {challenge.description}
                  </p>
                  
                  {/* Challenge Stats */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white/10 px-3 py-1 rounded-full font-semibold">
                      🎯 {challenge.targetScore} pts
                    </span>
                    {challenge.timeLimit && (
                      <span className="bg-red-500/20 px-3 py-1 rounded-full text-red-300 font-semibold">
                        ⏱️ {challenge.timeLimit}s
                      </span>
                    )}
                    {challenge.hasObstacles && (
                      <span className="bg-orange-500/20 px-3 py-1 rounded-full text-orange-300 font-semibold">
                        🚧 Obstacles
                      </span>
                    )}
                    {challenge.speedMultiplier > 1 && (
                      <span className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-300 font-semibold">
                        ⚡ {challenge.speedMultiplier}x Speed
                      </span>
                    )}
                  </div>

                  {/* Hover Effect */}
                  {challenge.unlocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-6 bg-black/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/10">
              <div className="text-gray-300">
                <span className="font-semibold text-green-400">WASD</span> or <span className="font-semibold text-blue-400">Arrow Keys</span> to move
              </div>
              <div className="w-1 h-6 bg-gray-600 rounded-full"></div>
              <div className="text-gray-300">
                <span className="font-semibold text-yellow-400">Space</span> to pause
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};