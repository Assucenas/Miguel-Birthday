import { useState, useEffect, useRef, useCallback } from 'react';
import { Car } from './Car';
import { Track } from './Track';
import { StartScreen } from './StartScreen';
import { FinalScreen } from './FinalScreen';

const MESSAGE = "Feliz Aniversário Miguel";

// Path points - straight horizontal line
const generateMessagePath = (): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  const startX = 50;
  const y = 350; // Fixed Y position for straight line
  const totalWidth = 700;
  const totalPoints = MESSAGE.length * 11; // 11 points per letter
  
  for (let i = 0; i <= totalPoints; i++) {
    const x = startX + (i / totalPoints) * totalWidth;
    points.push({ x, y });
  }
  
  return points;
};

export const RacingGame = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [visiblePath, setVisiblePath] = useState<{ x: number; y: number }[]>([]);
  const [revealedLetters, setRevealedLetters] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathPoints = useRef(generateMessagePath());
  
  const pointsPerLetter = 11; // 11 points per letter (0 to 10 inclusive)
  const totalLetters = MESSAGE.length;
  
  useEffect(() => {
    // Create audio element for car engine
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQI0NZ2RhYuOo7K2rpaFe3lqYV9kal5YYHqRo6q2w83R0MvDt6eXi4aHioiGg4KChoqMjI2OkJKVl5mam5uamZaUkY6LiIWCf3x6eHd3d3h5ent9f4GDhYeJi42PkZOVl5iZmpqamZiXlZORj42LiYaDgX98enl3dnV1dXV2d3h5ent9f4GDhYeJi42PkZOVl5iZmpqamZiXlZORj42LiYaDgX98enl3dnV1dXV2d3h5ent9f4GDhYeJi42PkZOVl5iZmpqamZiXlZORj42LiYaDgX58');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    if (gameState === 'playing' && !isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [gameState, isMuted]);
  
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const interval = setInterval(() => {
      setCurrentPathIndex(prev => {
        const next = prev + 1;
        if (next >= pathPoints.current.length) {
          setGameState('finished');
          return prev;
        }
        
        // Update visible path
        setVisiblePath(pathPoints.current.slice(0, next + 1));
        
        // Calculate revealed letters
        const letters = Math.floor(next / pointsPerLetter);
        setRevealedLetters(Math.min(letters, totalLetters));
        
        return next;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [gameState, totalLetters]);
  
  const handleStart = useCallback(() => {
    setGameState('playing');
    setCurrentPathIndex(0);
    setVisiblePath([]);
    setRevealedLetters(0);
  }, []);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);
  
  const currentPosition = visiblePath.length > 0 
    ? visiblePath[visiblePath.length - 1] 
    : { x: 50, y: 300 };
  
  // Calculate car rotation based on path direction
  const getCarRotation = () => {
    if (visiblePath.length < 2) return 0;
    const prev = visiblePath[visiblePath.length - 2];
    const curr = visiblePath[visiblePath.length - 1];
    return Math.atan2(curr.y - prev.y, curr.x - prev.x) * (180 / Math.PI);
  };
  
  if (gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }
  
  if (gameState === 'finished') {
    return <FinalScreen message={MESSAGE} />;
  }
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-game-grass">
      {/* Grass pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 rounded-full bg-game-grass-dark"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Trees */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${Math.random() < 0.5 ? Math.random() * 15 : 85 + Math.random() * 15}%`,
            }}
          >
            🌳
          </div>
        ))}
      </div>
      
      {/* Track */}
      <Track path={visiblePath} />
      
      {/* Revealed message text */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-wide">
          {MESSAGE.slice(0, revealedLetters)}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
      
      {/* Car */}
      <Car 
        x={currentPosition.x} 
        y={currentPosition.y} 
        rotation={getCarRotation()} 
      />
      
      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-30 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      
      {/* Progress indicator */}
      <div className="absolute bottom-4 left-4 z-30 bg-white/80 rounded-full px-4 py-2 shadow-lg">
        <span className="text-sm font-bold text-game-track">
          {Math.round((currentPathIndex / pathPoints.current.length) * 100)}%
        </span>
      </div>
    </div>
  );
};
