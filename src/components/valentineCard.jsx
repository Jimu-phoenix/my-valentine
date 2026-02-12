import { useState, useRef, useCallback } from "react";
import "../styles/valentine.css";
import { useNavigate } from "react-router-dom";


function HeartsBackground() {
  const hearts = ["💗", "💕", "🌸", "💖", "💝", "💓", "🌷", "💗"];
  return (
    <div className="hearts-bg" aria-hidden="true">
      {hearts.map((h, i) => (
        <span key={i} className="heart-float">{h}</span>
      ))}
    </div>
  );
}


function SuccessMessage() {

    const navigate = useNavigate();

    const handleLane = ()=>{
        navigate('/memories')
    } 

  return (
    <div className="success-message" role="status" aria-live="polite">
      <span className="success-emoji">💞</span>
      <h2 className="success-title">Yay! I knew it!</h2>
      <p className="success-body">
        You&rsquo;ve made my heart so happy&nbsp;🌷
        <br />
        Happy Valentine&rsquo;s Day, my love.
      </p>
      <button className="btn btn-yes btn-lane" onClick={handleLane}>Come with me</button>
    </div>
  );
}


export default function ValentineCard() {
  const [answered, setAnswered] = useState(false);
  const noRef = useRef(null);


  const evadeNo = useCallback(() => {
    const btn = noRef.current;
    if (!btn) return;


    btn.classList.add("escaping");

    const margin = 20;
    const bw = btn.offsetWidth  || 90;
    const bh = btn.offsetHeight || 44;
    const maxX = window.innerWidth  - bw - margin;
    const maxY = window.innerHeight - bh - margin;

    const newX = Math.floor(Math.random() * maxX) + margin;
    const newY = Math.floor(Math.random() * maxY) + margin;

    btn.style.left = `${newX}px`;
    btn.style.top  = `${newY}px`;
  }, []);

  const handleYes = useCallback(() => {
    setAnswered(true);
  }, []);

  return (
    <div className="valentine-scene">
      <HeartsBackground />

      <article className="valentine-card" role="main">
        {answered ? (
          <SuccessMessage />
        ) : (
          <>
          
            <span className="card-emoji" aria-hidden="true">💌</span>
            <h1 className="card-title">Will you be<br />my Valentine?</h1>
            <p className="card-subtitle">a question from the heart</p>

            
            <div className="card-divider" aria-hidden="true">
              <span className="card-divider-line" />
              <span className="card-divider-heart">♥</span>
              <span className="card-divider-line" />
            </div>

            <div className="btn-group">
              <button
                className="btn btn-yes"
                onClick={handleYes}
                aria-label="Yes, I will be your Valentine"
              >
                Yes 💗
              </button>

              <button
                ref={noRef}
                className="btn btn-no"
                onMouseEnter={evadeNo}
                onTouchStart={evadeNo}
                onClick={evadeNo}
                aria-label="No button — try to click it!"
              >
                No 🙈
              </button>
            </div>
          </>
        )}
      </article>
    </div>
  );
}