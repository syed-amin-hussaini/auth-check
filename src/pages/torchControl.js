import React, { useEffect, useState } from 'react';

function TorchControl() {
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    async function toggleTorch() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoTrack = stream.getVideoTracks()[0];
        
        // Toggle the torch on or off
        await videoTrack.applyConstraints({ advanced: [{ torch: torchOn }] });
      } catch (error) {
        console.error('Error toggling torch:', error);
      }
    }

    toggleTorch();
  }, [torchOn]);

  return (
    <div>
      <button onClick={() => setTorchOn(!torchOn)}>
        {torchOn ? 'Turn Off Torch' : 'Turn On Torch'}
      </button>
    </div>
  );
}

export default TorchControl;
