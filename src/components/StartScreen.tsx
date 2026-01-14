interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-game-grass flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {Math.random() > 0.5 ? '🌳' : '🌲'}
          </div>
        ))}
      </div>
      
      {/* Checkered pattern top */}
      <div className="absolute top-0 left-0 right-0 h-8 flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
          />
        ))}
      </div>
      
      {/* Checkered pattern bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Racing flags */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🏁</span>
          <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🏎️</span>
          <span className="text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>🏁</span>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          🎂 Corrida Especial! 🎂
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
          Uma mensagem especial te espera na pista!
        </p>
        
        {/* Start button */}
        <button
          onClick={onStart}
          className="group relative bg-game-car hover:bg-red-700 text-white font-bold text-xl md:text-2xl py-4 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="flex items-center gap-3">
            🚦 INICIAR CORRIDA 🚦
          </span>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-game-car rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
        </button>
        
        {/* Instructions */}
        <p className="mt-8 text-white/70 text-sm">
          Clique para começar e veja a mágica acontecer! ✨
        </p>
      </div>
      
      {/* Decorative car */}
      <div className="absolute bottom-20 animate-pulse">
        <span className="text-5xl">🏎️</span>
      </div>
    </div>
  );
};
