import { useEffect, useState } from 'react';

interface FinalScreenProps {
  message: string;
}

export const FinalScreen = ({ message }: FinalScreenProps) => {
  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-game-grass flex flex-col items-center justify-center relative overflow-hidden">
      {/* Checkered borders */}
      <div className="absolute top-0 left-0 right-0 h-8 flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
          />
        ))}
      </div>
      
      {/* Background trees */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 20}%`,
            }}
          >
            🌳
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div 
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        {/* Trophy and decorations */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="text-6xl animate-bounce">🏆</span>
          <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
          <span className="text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>🏆</span>
        </div>
        
        {/* Message in track style */}
        <div className="bg-game-track rounded-3xl p-8 shadow-2xl border-4 border-white relative">
          {/* Yellow dashed line decoration */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-game-line opacity-50" 
               style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--game-line)) 0px, hsl(var(--game-line)) 10px, transparent 10px, transparent 20px)' }} 
          />
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg relative z-10">
            {message}
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="mt-8 text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
          🎂 Que seu dia seja incrível! 🎂
        </p>
        
        {/* Racing flags celebration */}
        <div className="flex justify-center gap-8 mt-8">
          <span className="text-5xl animate-pulse">🏁</span>
          <span className="text-5xl animate-pulse" style={{ animationDelay: '0.3s' }}>🏎️</span>
          <span className="text-5xl animate-pulse" style={{ animationDelay: '0.6s' }}>🏁</span>
        </div>
        
        {/* Cake emoji */}
        <div className="mt-8">
          <span className="text-8xl animate-bounce">🎂</span>
        </div>
      </div>
    </div>
  );
};
