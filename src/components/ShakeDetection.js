import { useEffect } from 'react';

const ShakeDetection = () => {
  useEffect(() => {
    // Function to handle device motion events
    const handleMotionEvent = (event) => {
      const { acceleration, interval } = event;

      // Calculate the overall acceleration
      const totalAcceleration =
        Math.abs(acceleration.x) + Math.abs(acceleration.y) + Math.abs(acceleration.z);

      // You can adjust this threshold based on your requirements
      const shakeThreshold = 15;

      // Check if the total acceleration exceeds the threshold
      if (totalAcceleration > shakeThreshold) {
        // Device shake detected, do something
        console.log('Device Shake Detected!');
      }
    };

    // Add event listener for device motion
    window.addEventListener('devicemotion', handleMotionEvent);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent);
    };
  }, []); // Run effect only once when the component mounts

  return <div>Shake Detection Example</div>;
};

export default ShakeDetection;
