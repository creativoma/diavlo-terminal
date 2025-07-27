import type React from 'react';
import { useState, useEffect } from 'react';

interface LoadingProps {
  onComplete: () => void;
}

export const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  const loadingSteps = [
    'INITIALIZING NEURAL INTERFACE',
    'CONNECTING TO DIAVLO NETWORK',
    'DECRYPTING SECURITY PROTOCOLS',
    'LOADING QUANTUM DRIVERS',
    'ESTABLISHING DIGITAL HANDSHAKE',
    'CALIBRATING MATRIX COORDINATES',
    'VERIFYING HACKER CREDENTIALS',
    'NEURAL LINK ESTABLISHED',
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          setTimeout(() => onComplete(), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, [onComplete, loadingSteps.length]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 300);

    return () => clearInterval(dotsInterval);
  }, []);

  const progress = ((currentStep + 1) / loadingSteps.length) * 100;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl border-2 border-red-500 bg-black/90 backdrop-blur-sm">
        <div className="border-b border-red-500 px-4 py-2 bg-red-500/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div
              className="w-3 h-3 rounded-full bg-red-500/50 animate-pulse"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-red-500/25 animate-pulse"
              style={{ animationDelay: '0.4s' }}
            ></div>
            <span className="ml-4 text-red-500 font-mono text-sm">
              DIAVLO TERMINAL v2.1337
            </span>
          </div>
        </div>

        <div className="h-[420px] overflow-y-auto p-4 font-mono text-sm">
          <div className="space-y-3 mb-8">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className={`font-mono text-sm flex items-center gap-3 transition-all duration-300 ${
                  index <= currentStep ? 'text-red-400' : 'text-red-500/30'
                }`}
              >
                <span className="w-4">
                  {index < currentStep
                    ? '✓'
                    : index === currentStep
                      ? '>'
                      : '·'}
                </span>
                <span>
                  {step}
                  {index === currentStep && dots}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-red-500 font-mono text-xs mb-2">
              <span>NEURAL SYNC PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-red-900/30 h-3 border border-red-500/50 relative overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/50 to-transparent animate-pulse" />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent animate-pulse"
                style={{ animationDuration: '2s' }}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
            <div className="text-red-500/70 font-mono text-xs">
              ESTABLISHING CONNECTION...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
