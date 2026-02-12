import { useState, useEffect, useRef } from "react";
import "../styles/memories.css";
import song from '../assets/music/into_you.mp3'
import pic1 from '../assets/supes1.jpg'
import pic2 from '../assets/supes2.jpg'
import pic3 from '../assets/supes3.jpg'
import pic4 from '../assets/supes4.jpg'
import pic5 from '../assets/supes5.jpg'
import pic6 from '../assets/supes6.jpg'
import pic7 from '../assets/supes7.jpg'
import pic8 from '../assets/supes8.jpg'
import pic9 from '../assets/supes9.jpg'
import pic10 from '../assets/supes10.jpg'
import pic11 from '../assets/supes11.jpg'
import pic12 from '../assets/supes12.jpg'

const MEMORIES = [
  {
    src: pic1,
    caption: "Remember This?",
    date: "",
  },
  {
    src: pic2,
    caption: "Golden hour, golden us",
    date: "",
  },
  {
    src: pic3,
    caption: "adventure",
    date: "",
  },
  {
    src: pic4,
    caption: "You makes every place home",
    date: "",
  },
  {
    src: pic12,
    caption: "Picture Perfect",
    date: "",
  },
  {
    src: pic5,
    caption: "Remember This?",
    date: "",
  },
  {
    src: pic6,
    caption: "adventure",
    date: "",
  },
  {
    src: pic7,
    caption: "Just Us",
    date: "",
  },
  {
    src: pic8,
    caption: "Picture perfect",
    date: "",
  },
  {
    src: pic9,
    caption: "just us",
    date: "",
  },
  {
    src: pic10,
    caption: "Still my favourite person",
    date: "",
  },
  {
    src: pic11,
    caption: "Here's to every moment",
    date: "",
  },
];


function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      setLoaded(true);
    }
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  

  return (
    <div className="music-player">
      {src && <audio ref={audioRef} src={src} loop preload="metadata" />}
      <button
        className="music-btn"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        disabled={!loaded && !!src}
      >
        {playing ? "⏸" : "▶"}
      </button>
      <div className="music-label">
        {playing ? "Now playing…" : src ? "Play our song" : "Add your song"}
        <span>background music</span>
      </div>
    </div>
  );
}

/*  Timeline IMage */
function TimelineItem({ memory, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isRight = index % 2 !== 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`timeline-item${isRight ? " right" : ""}${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
    >
      <div className="timeline-dot" />
      <div className="polaroid">
        <div className="polaroid-img-wrap">
          <img src={memory.src} alt={memory.caption} loading="lazy" />
        </div>
        <p className="polaroid-caption">
          {memory.caption}
          <span className="polaroid-date">{memory.date}</span>
        </p>
      </div>
    </div>
  );
}


export default function MemoriesPage() {
  const MUSIC_FILE = song; 

  return (
    <div className="memories-page">
      <MusicPlayer src={MUSIC_FILE} />

      <section className="memories-hero">
        <p className="hero-eyebrow">a love story in pictures</p>
        <h1 className="hero-title">Our<br /><em>Memories</em></h1>
        <p className="hero-message">
          Every photo is a chapter. Every moment, a sentence I never want to forget.
          These are the small, ordinary, extraordinary things that make us <em>us</em>.
        </p>
        <div className="hero-scroll-hint" aria-hidden="true">
          <p>scroll</p>
          <span className="scroll-line" />
        </div>
      </section>

      <section className="timeline-section" aria-label="Memory timeline">
        <div className="timeline-spine" aria-hidden="true" />
        {MEMORIES.map((memory, i) => (
          <TimelineItem key={i} memory={memory} index={i} />
        ))}
      </section>

      <section className="memories-closing">
        <span className="closing-heart">♥</span>
        <h2 className="closing-title">and still counting…</h2>
        <p className="closing-body">
         I love you sooo much and I’m thankful for everyday you’re in my life. Everyday I wake up excited to love you again and again. 
         You’re such an incredible person- your intelligent mind, your kind heart, your beautiful smile. The list is endless, I could sing your praises all day. 
         Every time I look into your eyes I see the man 
         I can’t wait to spend the rest of my life with. All my days feel lighter and brighter with you in it. <br /> Thank you for being my Superman❤️.
        </p>
      </section>
    </div>
  );
}