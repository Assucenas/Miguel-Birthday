interface TrackProps {
  path: { x: number; y: number }[];
}

export const Track = ({ path }: TrackProps) => {
  if (path.length < 2) return null;
  
  // Create SVG path string
  const pathString = path.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${acc} L ${point.x} ${point.y}`;
  }, '');
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Track shadow */}
      <path
        d={pathString}
        fill="none"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'blur(4px)', transform: 'translate(4px, 4px)' }}
      />
      
      {/* Main track - asphalt */}
      <path
        d={pathString}
        fill="none"
        stroke="hsl(var(--game-track))"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* White border left */}
      <path
        d={pathString}
        fill="none"
        stroke="white"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
        style={{ opacity: 0.8 }}
      />
      
      {/* Main track overlay */}
      <path
        d={pathString}
        fill="none"
        stroke="hsl(var(--game-track))"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Yellow center line - dashed */}
      <path
        d={pathString}
        fill="none"
        stroke="hsl(var(--game-line))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10 10"
      />
    </svg>
  );
};
