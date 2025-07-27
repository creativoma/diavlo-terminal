import type React from 'react';
import { useState, useEffect } from 'react';

interface ExitScreenProps {
  onRestart: () => void;
}

export const ExitScreen: React.FC<ExitScreenProps> = ({ onRestart }) => {
  const [currentLine, setCurrentLine] = useState(0);

  const shutdownSequence = [
    '>>> INITIATING SHUTDOWN SEQUENCE <<<',
    '',
    'Closing neural pathways...',
    'Disconnecting from mainframe...',
    'Clearing digital cache...',
    'Terminating background processes...',
    'Saving session data...',
    '',
    'NEURAL LINK SEVERED',
    'CONNECTION TERMINATED',
    '',
    'Thank you for using DIAVLO TERMINAL',
    'Remember: The Matrix has you...',
    '',
    'System will auto-restart in 10 seconds',
    'Or click below to restart manually',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= shutdownSequence.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [shutdownSequence.length]);

  useEffect(() => {
    const autoRestart = setTimeout(() => {
      if (currentLine >= shutdownSequence.length - 1) {
        onRestart();
      }
    }, 10000);

    return () => clearTimeout(autoRestart);
  }, [currentLine, onRestart, shutdownSequence.length]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl border-2 border-red-500 bg-black/90 backdrop-blur-sm">
        <div className="border-b border-red-500 px-4 py-2 bg-red-500/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-red-500/25"></div>
            <span className="ml-4 text-red-500 font-mono text-sm">
              DIAVLO TERMINAL - SHUTDOWN
            </span>
          </div>
        </div>
        <div className="h-[420px] overflow-hidden p-4 font-mono text-sm">
          {shutdownSequence.slice(0, currentLine + 1).map((line, index) => (
            <div
              key={index}
              className={`mb-2 ${
                line.includes('>>>') ||
                line.includes('NEURAL LINK') ||
                line.includes('CONNECTION TERMINATED')
                  ? 'text-red-400 font-bold'
                  : line.includes('Thank you') || line.includes('Remember')
                    ? 'text-red-300'
                    : line === ''
                      ? 'h-2'
                      : 'text-red-500'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {line || '\u00A0'}
            </div>
          ))}

          {currentLine < shutdownSequence.length - 1 && (
            <span className="text-red-400 animate-pulse">█</span>
          )}
        </div>

        {currentLine >= shutdownSequence.length - 1 && (
          <div className="border-t border-red-500 p-4 bg-red-500/5">
            <button
              onClick={onRestart}
              className="w-full py-3 px-6 border-2 border-red-500 bg-transparent text-red-400 
                         font-mono hover:bg-red-500/10 hover:text-red-300 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              &gt;&gt;&gt; RESTART NEURAL INTERFACE &lt;&lt;&lt;
            </button>
            <div className="text-center mt-4 text-red-500/70 font-mono text-xs">
              Auto-restart in progress...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
