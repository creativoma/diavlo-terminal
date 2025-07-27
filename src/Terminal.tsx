import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Loading } from './Loading';
import { ExitScreen } from './ExitScreen';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

type AppState = 'loading' | 'terminal' | 'exit';

export const Terminal = () => {
  const [appState, setAppState] = useState<AppState>('loading');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'WELCOME TO THE DIAVLO HACKING TERMINAL' },
    { type: 'output', content: 'NEURAL INTERFACE INITIALIZED...' },
    { type: 'output', content: "TYPE 'HELP' TO ACCESS COMMAND DATABASE." },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentLocation, setCurrentLocation] = useState('mainframe');
  const [inventory, setInventory] = useState<string[]>([]);
  const [locationItems, setLocationItems] = useState<Record<string, string[]>>({
    mainframe: ['data_chip', 'encryption_key'],
    server_room: ['backup_drive', 'neural_implant'],
    data_vault: ['quantum_core', 'security_token'],
    control_center: ['admin_pass', 'crypto_wallet'],
  });
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const locations = {
    mainframe: {
      description:
        "You're connected to the central MAINFRAME. Neon data streams flow around you. Exit ports: NORTH to SERVER_ROOM, EAST to DATA_VAULT.",
      exits: {
        north: 'server_room',
        east: 'data_vault',
      },
    },
    server_room: {
      description:
        'Massive server towers hum with digital energy. The air crackles with electricity. Exits: SOUTH to MAINFRAME, WEST to CONTROL_CENTER.',
      exits: {
        south: 'mainframe',
        west: 'control_center',
      },
    },
    data_vault: {
      description:
        'A secured digital vault filled with encrypted files and firewalls. Security protocols active. Exit: WEST to MAINFRAME.',
      exits: {
        west: 'mainframe',
      },
    },
    control_center: {
      description:
        'The nerve center of the digital realm. Multiple screens display system status. Exits: EAST to SERVER_ROOM, SOUTH to MAINFRAME.',
      exits: {
        east: 'server_room',
        south: 'mainframe',
      },
    },
  } as const;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addToHistory = (
    content: string,
    type: 'input' | 'output' | 'error' = 'output'
  ) => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const parts = cmd.split(' ');
    const action = parts[0];
    const target = parts.slice(1).join(' ');

    addToHistory(`> ${command}`, 'input');

    const currentItems =
      locationItems[currentLocation as keyof typeof locationItems] || [];
    const roomItems =
      locationItems[currentLocation as keyof typeof locationItems];
    const responses = [
      'PING google.com - 64 bytes: time=1337ms TTL=42',
      'PING matrix.net - Connection timeout',
      'PING localhost - 64 bytes: time=0.1ms TTL=255',
      'PING diavlo.corp - Access denied by firewall',
    ];
    const messages = [
      "MESSAGE DECRYPTED: 'The cake is a lie'",
      "MESSAGE DECRYPTED: 'Follow the white rabbit'",
      "MESSAGE DECRYPTED: 'There is no spoon'",
      "MESSAGE DECRYPTED: 'Wake up, Neo'",
      'DECRYPTION FAILED: Insufficient privileges',
    ];

    switch (action) {
      case 'help':
        addToHistory('=== DIAVLO TERMINAL COMMAND DATABASE ===');
        addToHistory('SCAN - Analyze current digital environment');
        addToHistory('JACK [DIRECTION] - Move through the neural network');
        addToHistory('PROBE [OBJECT] - Deep scan digital artifacts');
        addToHistory('DOWNLOAD [ITEM] - Acquire digital assets');
        addToHistory('CACHE - View your digital inventory');
        addToHistory('HACK - Attempt to breach security protocols');
        addToHistory('MATRIX - Display system architecture');
        addToHistory('PING - Test network connectivity');
        addToHistory('DECRYPT - Decode encrypted messages');
        addToHistory('SUDO - Execute admin commands');
        addToHistory('EXIT - Disconnect from terminal');
        break;

      case 'scan':
        if (currentLocation in locations) {
          const location = locations[currentLocation as keyof typeof locations];
          addToHistory('>>> SCANNING ENVIRONMENT <<<');
          addToHistory(location.description);
          const items =
            locationItems[currentLocation as keyof typeof locationItems];
          if (items.length > 0) {
            addToHistory(
              `DIGITAL ARTIFACTS DETECTED: ${items.join(', ').toUpperCase()}`
            );
          }
          const availableExits = Object.keys(location.exits);
          if (availableExits.length > 0) {
            addToHistory(
              `NETWORK PATHWAYS: ${availableExits.join(', ').toUpperCase()}`
            );
          }
        }
        break;

      case 'jack':
        if (!target) {
          addToHistory('JACK WHERE? Specify a network pathway.', 'error');
          break;
        }
        if (currentLocation in locations) {
          const currentLoc =
            locations[currentLocation as keyof typeof locations];
          const nextLocation =
            currentLoc.exits[target as keyof typeof currentLoc.exits];

          if (nextLocation && nextLocation in locations) {
            setCurrentLocation(nextLocation);
            addToHistory(`>>> JACKING INTO ${target.toUpperCase()} <<<`);
            addToHistory('NEURAL LINK ESTABLISHED...');
            setTimeout(() => {
              const newLocation =
                locations[nextLocation as keyof typeof locations];
              addToHistory(newLocation.description);
              const items =
                locationItems[nextLocation as keyof typeof locationItems];
              if (items.length > 0) {
                addToHistory(
                  `DIGITAL ARTIFACTS DETECTED: ${items.join(', ').toUpperCase()}`
                );
              }
            }, 100);
          } else {
            addToHistory('PATHWAY BLOCKED. Access denied.', 'error');
          }
        }
        break;

      case 'probe':
        if (!target) {
          addToHistory('PROBE WHAT? Specify target for deep scan.', 'error');
          break;
        }

        if (currentItems.includes(target)) {
          switch (target) {
            case 'data_chip':
              addToHistory(
                'ENCRYPTED DATA CHIP - Contains classified neural patterns. Military grade encryption detected.'
              );
              break;
            case 'encryption_key':
              addToHistory(
                'QUANTUM ENCRYPTION KEY - 2048-bit encryption. Glows with digital energy.'
              );
              break;
            case 'backup_drive':
              addToHistory(
                'BACKUP DRIVE - Emergency protocols stored. Last backup: 2025.07.26.03:42:15'
              );
              break;
            case 'neural_implant':
              addToHistory(
                'NEURAL IMPLANT - Biotech interface device. Increases processing speed by 300%.'
              );
              break;
            case 'quantum_core':
              addToHistory(
                'QUANTUM CORE - The heart of the digital realm. Pulses with infinite computational power.'
              );
              break;
            case 'security_token':
              addToHistory(
                'SECURITY TOKEN - Admin access credentials. Handle with extreme caution.'
              );
              break;
            case 'admin_pass':
              addToHistory(
                "ADMIN PASSWORD - Root access key: 'Th3_M4tr1x_1s_R34l'. Use wisely."
              );
              break;
            case 'crypto_wallet':
              addToHistory(
                'CRYPTO WALLET - Contains 13.37 DiavloCoin. Digital fortune awaits.'
              );
              break;
            default:
              addToHistory(
                'SCAN COMPLETE - No significant data patterns detected.'
              );
          }
        } else if (inventory.includes(target)) {
          addToHistory(`ANALYZING ${target.toUpperCase()} FROM CACHE...`);
          addToHistory('ITEM VERIFIED - Digital signature intact.');
        } else {
          addToHistory(
            'ARTIFACT NOT FOUND - Target does not exist in current scope.',
            'error'
          );
        }
        break;

      case 'download':
      case 'acquire':
        if (!target) {
          addToHistory('DOWNLOAD WHAT? Specify target artifact.', 'error');
          break;
        }

        if (roomItems.includes(target)) {
          setInventory(prev => [...prev, target]);
          setLocationItems(prev => ({
            ...prev,
            [currentLocation]: prev[
              currentLocation as keyof typeof prev
            ].filter(item => item !== target),
          }));
          addToHistory(`>>> DOWNLOADING ${target.toUpperCase()} <<<`);
          addToHistory('TRANSFER COMPLETE - Artifact secured in cache.');
        } else {
          addToHistory('DOWNLOAD FAILED - Artifact not accessible.', 'error');
        }
        break;

      case 'cache':
      case 'inventory':
        if (inventory.length === 0) {
          addToHistory('CACHE EMPTY - No digital artifacts stored.');
        } else {
          addToHistory('=== DIGITAL CACHE CONTENTS ===');
          addToHistory(
            `STORED ARTIFACTS: ${inventory.join(', ').toUpperCase()}`
          );
          addToHistory(`CACHE UTILIZATION: ${inventory.length}/10 slots`);
        }
        break;

      case 'hack':
        addToHistory('>>> INITIATING HACK SEQUENCE <<<');
        addToHistory('Scanning for vulnerabilities...');
        addToHistory('Buffer overflow detected...');
        addToHistory('Injecting payload...');
        addToHistory('ACCESS GRANTED - Welcome to the shadow network.');
        break;

      case 'matrix':
        addToHistory('=== NETWORK ARCHITECTURE ===');
        addToHistory('MAINFRAME ←→ SERVER_ROOM ←→ CONTROL_CENTER');
        addToHistory('    ↓              ↑');
        addToHistory('DATA_VAULT    (secured)');
        addToHistory('Current location: ' + currentLocation.toUpperCase());
        break;

      case 'ping':
        addToHistory(responses[Math.floor(Math.random() * responses.length)]);
        break;

      case 'decrypt':
        addToHistory(messages[Math.floor(Math.random() * messages.length)]);
        break;

      case 'sudo':
        addToHistory('sudo: Authentication required');
        addToHistory('Password: ********');
        addToHistory('SUDO ACCESS GRANTED - You are now root.');
        addToHistory('With great power comes great responsibility.');
        break;

      case 'contact':
        addToHistory('SYSTEM ADMINISTRATOR: admin@diavlo.corp');
        addToHistory('NEURAL SUPPORT HOTLINE: 1-800-MATRIX');
        addToHistory('EMERGENCY DISCONNECT: CTRL+ALT+JACK');
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'exit':
      case 'quit':
      case 'disconnect':
        setAppState('exit');
        break;

      default:
        addToHistory(`COMMAND NOT RECOGNIZED: ${action}`, 'error');
        addToHistory("Type 'HELP' to access the command database.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      processCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const handleLoadingComplete = () => {
    setAppState('terminal');
  };

  const handleRestart = () => {
    setAppState('loading');
    setHistory([
      { type: 'output', content: 'WELCOME TO THE DIAVLO HACKING TERMINAL' },
      { type: 'output', content: 'NEURAL INTERFACE INITIALIZED...' },
      { type: 'output', content: "TYPE 'HELP' TO ACCESS COMMAND DATABASE." },
    ]);
    setCurrentInput('');
    setCurrentLocation('mainframe');
    setInventory([]);
    setLocationItems({
      mainframe: ['data_chip', 'encryption_key'],
      server_room: ['backup_drive', 'neural_implant'],
      data_vault: ['quantum_core', 'security_token'],
      control_center: ['admin_pass', 'crypto_wallet'],
    });
  };

  if (appState === 'loading') {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  if (appState === 'exit') {
    return <ExitScreen onRestart={handleRestart} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl border-2 border-red-500 bg-black/90 backdrop-blur-sm">
        <div className="border-b border-red-500 px-4 py-2 bg-red-500/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-red-500/25"></div>
            <span className="ml-4 text-red-500 font-mono text-sm">
              DIAVLO TERMINAL v2.1337
            </span>
          </div>
        </div>

        <div
          ref={terminalRef}
          className="h-[420px] overflow-y-auto p-4 font-mono text-sm"
        >
          {history.map((line, index) => (
            <div
              key={index}
              className={`mb-1 ${
                line.type === 'input'
                  ? 'text-red-400'
                  : line.type === 'error'
                    ? 'text-red-400'
                    : 'text-red-500'
              }`}
            >
              {line.content}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-red-500 mr-2">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={e => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-red-400 outline-none font-mono caret-red-400"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="text-red-400 animate-pulse">█</span>
          </form>
        </div>

        <div className="border-t border-red-500 px-4 py-2 bg-red-500/10 text-red-500 font-mono text-xs">
          <div className="flex justify-between">
            <span>NODE: {currentLocation.toUpperCase()}</span>
            <span>CACHE: {inventory.length}/10</span>
            <span>STATUS: NEURAL_LINK_ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
