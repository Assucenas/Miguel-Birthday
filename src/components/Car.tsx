interface CarProps {
  x: number;
  y: number;
  rotation: number;
}

export const Car = ({ x, y, rotation }: CarProps) => {
  return (
    <div
      className="absolute z-10 transition-all duration-75 ease-linear"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* Car body */}
      <div className="relative">
        {/* Main body */}
        <div className="w-12 h-6 bg-game-car rounded-lg shadow-lg relative">
          {/* Windshield */}
          <div className="absolute top-1 right-1 w-3 h-4 bg-blue-300 rounded-sm opacity-80" />
          
          {/* Racing stripe */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2" />
          
          {/* Number */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
            1
          </div>
        </div>
        
        {/* Wheels */}
        <div className="absolute -top-1 left-1 w-2 h-2 bg-gray-800 rounded-full" />
        <div className="absolute -bottom-1 left-1 w-2 h-2 bg-gray-800 rounded-full" />
        <div className="absolute -top-1 right-1 w-2 h-2 bg-gray-800 rounded-full" />
        <div className="absolute -bottom-1 right-1 w-2 h-2 bg-gray-800 rounded-full" />
        
        {/* Exhaust smoke effect */}
        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-gray-400 rounded-full opacity-50 animate-ping" />
        </div>
      </div>
    </div>
  );
};
