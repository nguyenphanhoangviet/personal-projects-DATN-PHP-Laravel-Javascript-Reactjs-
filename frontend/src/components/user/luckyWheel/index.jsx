import React, { useState, useEffect, useRef } from "react";
import "./luckyWheel.scss";

const LuckyWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [showSpinButton, setShowSpinButton] = useState(true);
  const [spinResult, setSpinResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [wheelData] = useState([
    { label: "Prize 1", color: "#FF5733" },
    { label: "Prize 2", color: "#33FF57" },
    { label: "Prize 3", color: "#5733FF" },
    { label: "Prize 4", color: "#FF33A6" },
    { label: "Prize 5", color: "#FFBF00" },
    { label: "Prize 6", color: "#00FFFF" },
  ]);

  const canvasRef = useRef(null);

  // Draw the wheel on canvas
  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const numSegments = wheelData.length;
    const angle = (2 * Math.PI) / numSegments;
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    wheelData.forEach((segment, index) => {
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, index * angle, (index + 1) * angle);
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    });

    // Add text to each segment
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    wheelData.forEach((segment, index) => {
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(index * angle + angle / 2);
      ctx.fillText(segment.label, radius / 2, 0);
      ctx.restore();
    });
  };

  // Start spinning animation
  const handleSpin = () => {
    if (!playerName || !playerEmail) {
      alert("Please enter both name and email.");
      return;
    }

    setIsSpinning(true);
    setShowSpinButton(false);

    const randomSpinResult = Math.floor(Math.random() * wheelData.length);
    const spinAngle = Math.floor(Math.random() * 360 + 1080); // Random angle (4+ rotations)
    const spinDuration = 3000; // Spin time in ms

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let startTime = null;

    // Rotate the wheel
    const rotateWheel = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const spinProgress = Math.min(progress / spinDuration, 1);
      const rotateAngle = spinAngle * spinProgress;

      // Apply the rotation to the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((Math.PI / 180) * rotateAngle);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      drawWheel();

      if (spinProgress < 1) {
        requestAnimationFrame(rotateWheel);
      } else {
        setIsSpinning(false);
        setSpinResult(wheelData[randomSpinResult].label);
      }
    };

    requestAnimationFrame(rotateWheel);
  };

  const handleClosePopup = () => setShowPopup(false);
  const handleOpenPopup = () => setShowPopup(true);

  useEffect(() => {
    if (canvasRef.current) {
      drawWheel(); // Draw the wheel when component mounts
    }
  }, [wheelData]); // Run only once when the component is mounted

  return (
    <div>
      {/* Floating Button */}
      <button className="floating-button" onClick={handleOpenPopup}>
        <img src="https://static.ladipage.net/5cff118624dbba3522f3cf7a/vong-quay-20210629072033.png" alt="Lucky Wheel" />
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div 
            className="popup-content" 
            onClick={(e) => e.stopPropagation()} // Prevent closing the popup when clicking inside popup-content
          >
            <div className="lucky-wheel-container">
              <div className="wheel-content-wrapper">
                <div className="wheel-content-left">
                  <div
                    className={`wheel-spin ${isSpinning ? "spinning" : ""}`}
                    style={{ width: "400px", height: "400px" }}
                  >
                    <canvas ref={canvasRef} width="400" height="400"></canvas>
                    <div className="wheel-spin-container">
                      <div className="wlwl-pointer-before"></div>
                      <div className="wlwl-pointer-content">
                        <span className="wlwl-location wlwl-pointer"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wheel-content-right">
                  <div className="wheel-description"></div>

                  {spinResult && (
                    <div className="wlwl-congratulations-effect">
                      <p>{spinResult}</p>
                    </div>
                  )}

                  {!spinResult && (
                    <div className="wlwl-user-lucky">
                      <input
                        type="text"
                        className="wlwl-field-input"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                      />
                      <input
                        type="email"
                        className="wlwl-field-input"
                        placeholder="Enter your email"
                        value={playerEmail}
                        onChange={(e) => setPlayerEmail(e.target.value)}
                      />
                      {showSpinButton && (
                        <button
                          className="wlwl-spin-button"
                          onClick={handleSpin}
                        >
                          Spin the Wheel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuckyWheel;
