import React, { useState, useRef, useEffect } from 'react';
import './SlotMachine.css';

const SlotMachine = () => {
  const symbols = ['🍒', '🍉', '🍊', '🍓', '🍇', '⭐'];
  const initialReels = ['❓', '❓', '❓']; // Initial display before first spin

  const [reels, setReels] = useState(initialReels);
  const [coins, setCoins] = useState(100);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('Welcome! Spin to start.');
  const [spinCost] = useState(10);
  const [winAmount] = useState(50);

  // Refs for audio elements to potentially handle them more directly if needed
  const spinSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  // Preload audio elements
  useEffect(() => {
    spinSoundRef.current = new Audio('/sounds/spin.mp3');
    winSoundRef.current = new Audio('/sounds/win.mp3');
    spinSoundRef.current.load();
    winSoundRef.current.load();
  }, []);


  const playSound = (soundRef) => {
    if (soundRef.current) {
       soundRef.current.currentTime = 0; // Rewind to start
       soundRef.current.play().catch(error => console.error("Error playing sound:", error));
    } else {
        console.warn("Sound Ref not ready or file not found");
    }
  };

  const spinReels = () => {
    if (spinning) return; // Don't spin if already spinning

    if (coins < spinCost) {
      setMessage(`Not enough coins! Need ${spinCost}.`);
      return;
    }

    setSpinning(true);
    setCoins(coins - spinCost);
    setMessage('Spinning...');
    playSound(spinSoundRef);

    // Create intervals for visual spinning effect
    const spinIntervals = reels.map((_, index) => {
      return setInterval(() => {
        setReels(prevReels => {
          const newReels = [...prevReels];
          newReels[index] = symbols[Math.floor(Math.random() * symbols.length)];
          return newReels;
        });
      }, 100); // Adjust speed of visual spin
    });

    // Stop spinning after a delay
    setTimeout(() => {
      // Clear intervals
      spinIntervals.forEach(intervalId => clearInterval(intervalId));

      // Determine final symbols
      const finalReels = symbols.map(() =>
        symbols[Math.floor(Math.random() * symbols.length)]
      );
      setReels(finalReels);

      // Check for win condition
      if (finalReels.every((symbol) => symbol === finalReels[0])) {
        const newCoins = coins - spinCost + winAmount; // Calculate based on coins *before* this spin cost was deducted
        setCoins(newCoins);
        setMessage(`🎉 Jackpot! You won ${winAmount} coins! 🎉`);
        playSound(winSoundRef);
      } else {
        setMessage(`Lost ${spinCost} coins. Try again!`);
        // No win sound
      }

      setSpinning(false); // Re-enable button

    }, 2000); // Total spin duration
  };

  return (
    <div className="slot-machine">
      <h1>Slot Machine</h1>
      <div className="reels">
        {reels.map((symbol, index) => (
          <div key={index} className={`reel ${spinning ? 'spinning' : ''}`}>
            {symbol}
          </div>
        ))}
      </div>
      <button
        className="spin-button"
        onClick={spinReels}
        disabled={spinning || coins < spinCost}
      >
        {spinning ? 'Spinning...' : `Spin (${spinCost} coins)`}
      </button>
      <p className="coin-display">Coins: {coins}</p>
      <p className="message-display">{message}</p>
       {/* Hidden audio elements for preloading/control if needed, though direct play works */}
       {/* <audio ref={spinSoundRef} src="/sounds/spin.mp3" preload="auto"></audio> */}
       {/* <audio ref={winSoundRef} src="/sounds/win.mp3" preload="auto"></audio> */}
    </div>
  );
};

export default SlotMachine;
