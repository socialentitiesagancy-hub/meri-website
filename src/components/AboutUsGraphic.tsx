import React from 'react';

export const AboutUsGraphic: React.FC = () => {
  // Top word: S O C I A L (6 letters)
  const topItems = [
    { letter: 'S', color: '#FFFFFF', label: 'Strategy', x: 180 },
    { letter: 'O', color: '#3A4830', label: 'Optimization', x: 308 },
    { letter: 'C', color: '#FFFFFF', label: 'Creativity', x: 436 },
    { letter: 'I', color: '#3A4830', label: 'Innovation', x: 564 },
    { letter: 'A', color: '#FFFFFF', label: 'Analytics', x: 692 },
    { letter: 'L', color: '#3A4830', label: 'Leads', x: 820 },
  ];

  // Bottom word: E N T I T I E S (8 letters)
  const bottomItems = [
    { letter: 'E', color: '#FFFFFF', label: 'Engagement', x: 105 },
    { letter: 'N', color: '#3A4830', label: 'Networking', x: 218 },
    { letter: 'T', color: '#FFFFFF', label: 'Technology', x: 331 },
    { letter: 'I', color: '#3A4830', label: 'Insights', x: 444 },
    { letter: 'T', color: '#FFFFFF', label: 'Transformation', x: 557 },
    { letter: 'I', color: '#3A4830', label: 'Impact', x: 670 },
    { letter: 'E', color: '#FFFFFF', label: 'Excellence', x: 783 },
    { letter: 'S', color: '#3A4830', label: 'Solutions', x: 896 },
  ];

  return (
    <div className="w-full overflow-hidden select-none bg-white">
      <svg
        viewBox="0 0 1000 520"
        className="w-full h-auto block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="aboutBgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F5D44" />
            <stop offset="50%" stopColor="#738264" />
            <stop offset="100%" stopColor="#BAB494" />
          </linearGradient>
        </defs>

        {/* Outer Background */}
        <rect width="1000" height="520" fill="url(#aboutBgGradient)" />

        {/* TOP WORD: SOCIAL */}
        {topItems.map((item, idx) => (
          <g key={`top-${idx}`}>
            {/* Top Label */}
            <text
              x={item.x}
              y="56"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="18.5"
              fontStyle="italic"
              fontWeight="400"
              style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}
            >
              {item.label}
            </text>

            {/* Indicator Line */}
            <line
              x1={item.x}
              y1="70"
              x2={item.x}
              y2="118"
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="2"
            />

            {/* Letter */}
            <text
              x={item.x}
              y="222"
              textAnchor="middle"
              fill={item.color}
              fontSize="120"
              fontWeight="800"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {item.letter}
            </text>
          </g>
        ))}

        {/* BOTTOM WORD: ENTITIES */}
        {bottomItems.map((item, idx) => (
          <g key={`bottom-${idx}`}>
            {/* Letter */}
            <text
              x={item.x}
              y="352"
              textAnchor="middle"
              fill={item.color}
              fontSize="110"
              fontWeight="800"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {item.letter}
            </text>

            {/* Indicator Line */}
            <line
              x1={item.x}
              y1="372"
              x2={item.x}
              y2="424"
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="2"
            />

            {/* Bottom Label */}
            <text
              x={item.x}
              y="454"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="17.5"
              fontStyle="italic"
              fontWeight="400"
              style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}
            >
              {item.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};


