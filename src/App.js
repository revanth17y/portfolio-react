import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Photo from './Images/Photo.png';
import AboutImage from './Images/about-me.png';

const projects = [
  {
    title: 'Brain Tumor Detection',
    desc: 'MobileNetV2 & transfer learning on MRI scans. Achieved 94% accuracy with real-time classification.',
    color: '#d4eaf7',
    link: 'https://github.com/revanth17y/Brain-Tumour-Detection-Using-Deep-learning',
  },
  {
    title: 'Live Face Attendance System',
    desc: 'Flask & OpenCV powered real-time face recognition with SQLite attendance logging.',
    color: '#fdf3dc',
    link: 'https://github.com/revanth17y/Live_Attendance_System',
  },
  {
    title: 'Blockchain Credential Verification',
    desc: 'Decentralized system for issuing and verifying academic credentials on blockchain.',
    color: '#e8f5e9',
    link: 'https://github.com/revanth17y/',
  },
];

const certifications = [
  { name: 'MongoDB Basics',          issuer: 'MongoDB University', icon: 'fa-solid fa-database',   accent: '#4DB33D' },
  { name: 'Web Development',         issuer: 'CodSoft',            icon: 'fa-solid fa-code',        accent: '#0066FF' },
  { name: 'Soft Skills Development', issuer: 'NPTEL',              icon: 'fa-solid fa-comments',    accent: '#FF6B35' },
  { name: 'Programming in Java',     issuer: 'NPTEL',              icon: 'fa-brands fa-java',       accent: '#E76D00' },
];

function App() {
  const typingRef     = useRef(null);
  const scrollHintRef = useRef(null);
  const heroRef       = useRef(null);
  const [showHeader, setShowHeader] = useState(false);

  /* ── Typing end ── */
  useEffect(() => {
    const typer = typingRef.current;
    if (!typer) return;
    const handler = (e) => {
      if (e.animationName === 'typing') typer.classList.add('finished');
    };
    typer.addEventListener('animationend', handler);
    return () => typer.removeEventListener('animationend', handler);
  }, []);

  /* ── Scroll hint fade ── */
  useEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;
    const onScroll = () => {
      hint.style.opacity = Math.max(0, 1 - window.scrollY / 160);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Header: visible only after hero leaves viewport ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowHeader(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  /* ── Generic reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('active');
        else e.target.classList.remove('active');
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Timeline reveal ── */
  useEffect(() => {
    const cards = document.querySelectorAll('.timeline-card');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.3 });
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  /* ── Edu card 3-D tilt ── */
  useEffect(() => {
    document.querySelectorAll('.edu-card').forEach(card => {
      const front = card.querySelector('.front-content');
      const back  = card.querySelector('.back-content');
      card.addEventListener('mousemove', (e) => {
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        const ry = dx * 10, rx = -dy * 10;
        card.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
        const tf = `rotateY(${-ry * 2.5}deg) rotateX(${-rx * 2.5}deg)`;
        front.style.transform = tf;
        if (back) back.style.transform = tf;
        const sh = `${-dx * 20}px ${-dy * 20}px 20px rgba(0,0,0,0.5)`;
        front.style.textShadow = sh;
        if (back) back.style.textShadow = sh;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        front.style.transform = 'none';
        if (back) back.style.transform = 'none';
        front.style.textShadow = 'none';
        if (back) back.style.textShadow = 'none';
      });
    });
  }, []);

  const allProjects = [...projects, ...projects];

  return (
    <div>

      {/* ══ HEADER (shown only after scrolling past hero) ══ */}
      <header className={`site-header ${showHeader ? 'header-visible' : ''}`}>
        <div className="header-inner">
          <span className="header-logo">YRK</span>
          <nav className="header-nav">
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="hero-section" ref={heroRef}>

        <div className="hero-text">
          <h1>Hi, I'm</h1>
          <h1><span className="typing" ref={typingRef}>Yaram Revanth Kumar</span></h1>
          <p className="hero-intro">
            Final-year CSE student passionate about building{' '}
            <strong>AI-driven solutions</strong> that solve real-world problems
            through smart, scalable, and impactful technology.
          </p>
          <div className="social-icons">
            <a href="https://github.com/revanth17y/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github" /><span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/yaram-revanth-kumar/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin" /><span>LinkedIn</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yrevanthkumar17@gmail.com&su=Hello&body=Hi%20Revanth"
               target="_blank" rel="noreferrer">
              <i className="fa-solid fa-envelope" /><span>Email</span>
            </a>
          </div>
        </div>

        <div className="hero-right">
          {/* Left card */}
          <div className="float-card fc-left">
            <i className="fa-solid fa-graduation-cap fc-fa-icon" />
            <h4>CS @ RMKEC&nbsp;'26</h4>
            <p>AI &amp; software focus</p>
          </div>

          {/* Photo */}
          <div className="photo-orbit">
            <div className="photo-ring" />
            <div className="photo-glow-circle">
              <img src={Photo} alt="Yaram Revanth Kumar" className="hero-photo" />
            </div>
          </div>

          {/* Right card */}
          <div className="float-card fc-right">
            <i className="fa-solid fa-microchip fc-fa-icon" />
            <h4>AI/ML Intern</h4>
            <p>MedSocio HealthTech</p>
          </div>

          {/* Bottom card */}
          <div className="float-card fc-bottom">
            <i className="fa-solid fa-diagram-project fc-fa-icon" />
            <h4>Key Projects</h4>
            <p>Brain Tumor Detection&nbsp;· Blockchain Credentials</p>
          </div>
        </div>

        <div className="scroll-hint" ref={scrollHintRef}>
          <span>Scroll Down</span>
          <div className="scroll-chevron">
            <i className="fa-solid fa-chevron-down" />
          </div>
        </div>
      </section>


      {/* ══ EDUCATION ══ */}
      <section className="education-section reveal" id="education">
        <h2 className="section-title">Education</h2>
        <div className="edu-container">

          {/* Card 1 — "Click me!" hint on RIGHT side */}
          <div className="container edu-hint-wrap">
            {/* Hint: fades out after 5s, positioned right of card */}
            <div className="edu-click-hint">
              <span className="hint-label">Click&nbsp;me!</span>
              <svg className="hint-arrow-svg" width="76" height="80"
                   viewBox="0 0 76 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="edu-arrowhead" markerWidth="10" markerHeight="10"
                    refX="2" refY="3.5" orient="auto">
                    <path d="M9,0 L0,3.5 L9,7 Z" fill="#555" />
                  </marker>
                </defs>
                {/* Curved arrow: starts from hint label area (top-right), loops down-left to card */}
                <path className="hint-arrow-path"
                  d="M 66,6 C 80,26 74,54 50,68 C 36,76 22,72 10,62"
                  stroke="#555"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  markerEnd="url(#edu-arrowhead)"
                />
              </svg>
            </div>

            <div className="edu-card"
                 onClick={() => window.open('https://github.com/revanth17y/', '_blank')}>
              <div className="front" style={{ backgroundColor: 'powderblue' }}>
                <div className="front-content">
                  <h3>B.E. in Computer Science</h3>
                  <p>R.M.K. Engineering College, Tiruvallur<br />2022 – 2026&nbsp;·&nbsp;CGPA: 7.86</p>
                </div>
              </div>
              <div className="back">
                <div className="back-content">
                  <p>Specialization in AI &amp; Software Development</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="container">
            <div className="edu-card"
                 onClick={() => window.open('https://github.com/revanth17y/', '_blank')}>
              <div className="front" style={{ backgroundColor: 'wheat' }}>
                <div className="front-content">
                  <h3>Intermediate Education</h3>
                  <p>Narayana Junior College, Nellore<br />2020 – 2022&nbsp;·&nbsp;75.70%</p>
                </div>
              </div>
              <div className="back">
                <div className="back-content">
                  <p>Board of Intermediate Education, Andhra Pradesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="container">
            <div className="edu-card"
                 onClick={() => window.open('https://github.com/revanth17y/', '_blank')}>
              <div className="front" style={{ backgroundColor: 'thistle' }}>
                <div className="front-content">
                  <h3>Secondary School (SSC)</h3>
                  <p>Ratnam High School, Nellore<br />2019 – 2020&nbsp;·&nbsp;97.67%</p>
                </div>
              </div>
              <div className="back">
                <div className="back-content">
                  <p>Board of Secondary Education, Andhra Pradesh</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ══ EXPERIENCE ══ */}
      <section className="experience-section reveal" id="experience">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">

          <div className="timeline-card left">
            <h3>AI/ML Engineering Intern — MedSocio HealthTech</h3>
            <p className="timeline-date">
              <i className="fa-regular fa-calendar" />&nbsp;June – July 2024
            </p>
            <ul>
              <li>Researched and integrated medical LLMs for healthcare tools.</li>
              <li>Built a prototype AI recommendation system with backend integration.</li>
              <li>Worked on data handling, API design, and scalable system architecture.</li>
            </ul>
            <button onClick={() => window.open('ssc_certificate.pdf')}>
              <i className="fa-solid fa-certificate" />&nbsp;Certificate
            </button>
          </div>

          <div className="timeline-card right">
            <h3>Web Development Intern — CodSoft</h3>
            <p className="timeline-date">
              <i className="fa-regular fa-calendar" />&nbsp;2024
            </p>
            <ul>
              <li>Built responsive web interfaces using HTML, CSS, and JavaScript.</li>
              <li>Implemented UI/UX best practices for client-facing projects.</li>
              <li>Collaborated with team on delivery and code reviews.</li>
            </ul>
            <button onClick={() => window.open('ssc_certificate.pdf')}>
              <i className="fa-solid fa-certificate" />&nbsp;Certificate
            </button>
          </div>

        </div>
      </section>


      {/* ══ PROJECTS ══ */}
      <section className="projects-section reveal" id="projects">
        <h2 className="section-title">Projects</h2>
        <div className="projects-showcase">

          <div className="projects-img-panel">
            <img src={AboutImage} alt="Revanth Kumar" />
            <div className="projects-img-overlay">
              <span>What I</span>
              <span className="projects-img-build">Build</span>
            </div>
          </div>

          <div className="projects-marquee-wrap">
            <div className="projects-track">
              {allProjects.map((p, i) => (
                <div className="project-card" key={i} style={{ background: p.color }}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <a href={p.link} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github" /> View on GitHub
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ══ SKILLS ══ */}
      <section className="skills-section reveal" id="skills">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {[
            { cat: 'Languages',          icon: 'fa-solid fa-terminal',   tags: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'] },
            { cat: 'Frameworks & Tools', icon: 'fa-solid fa-toolbox',    tags: ['React', 'Flask', 'OpenCV', 'Git', 'REST APIs', 'SQLite'] },
            { cat: 'AI / ML',            icon: 'fa-solid fa-brain',      tags: ['TensorFlow', 'Keras', 'MobileNetV2', 'LLMs', 'Transfer Learning'] },
            { cat: 'Other',              icon: 'fa-solid fa-layer-group', tags: ['MongoDB', 'Blockchain', 'Problem Solving', 'Self-Learning'] },
          ].map((group, i) => (
            <div className="skill-group" key={i}>
              <div className="skill-cat-row">
                <i className={group.icon} />
                <h4 className="skill-cat">{group.cat}</h4>
              </div>
              <div className="skill-tags">
                {group.tags.map((tag, j) => (
                  <span className="skill-tag" key={j}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ══ CERTIFICATIONS ══ */}
      <section className="certifications-section reveal">
        <h2 className="section-title">Certifications</h2>
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <div className="cert-card" key={i}
                 style={{ '--accent': cert.accent }}
                 onClick={() => window.open('https://github.com/revanth17y/', '_blank')}>
              <div className="cert-icon-wrap">
                <i className={cert.icon} />
              </div>
              <div className="cert-body">
                <h4>{cert.name}</h4>
                <p>{cert.issuer}</p>
              </div>
              <div className="cert-footer-row">
                <span className="cert-link">
                  View Certificate&nbsp;<i className="fa-solid fa-arrow-up-right-from-square" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ══ CONFERENCES ══ */}
      <section className="conferences-section reveal">
        <h2 className="section-title">Conferences</h2>
        <div className="conf-card">
          <div className="conf-badge">
            <i className="fa-solid fa-scroll" />&nbsp;Paper Presentation
          </div>
          <h3>4th International Black Sea Scientific Research Congress</h3>
          <p className="conf-topic">"Space Exploration and Astronomy"</p>
          <div className="conf-meta">
            <span><i className="fa-solid fa-location-dot" />&nbsp;Rize, Türkiye</span>
            <span><i className="fa-solid fa-calendar-days" />&nbsp;June 2023</span>
          </div>
        </div>
      </section>


      {/* ══ CONTACT ══ */}
      <section className="contact-section reveal" id="contact">
        <div className="contact-inner">
          <div className="contact-left">
            <h2 className="contact-title">Let's Connect</h2>
            <p className="contact-sub">
              Open to internships, collaborations, and exciting opportunities.
              Feel free to reach out — I'd love to hear from you.
            </p>
            <div className="contact-links">
              <a href="mailto:yrevanthkumar17@gmail.com" className="contact-link-item">
                <i className="fa-solid fa-envelope" />
                <span>yrevanthkumar17@gmail.com</span>
              </a>
              <a href="https://github.com/revanth17y/" target="_blank" rel="noreferrer" className="contact-link-item">
                <i className="fa-brands fa-github" />
                <span>github.com/revanth17y</span>
              </a>
              <a href="https://www.linkedin.com/in/yaram-revanth-kumar/" target="_blank" rel="noreferrer" className="contact-link-item">
                <i className="fa-brands fa-linkedin" />
                <span>linkedin.com/in/yaram-revanth-kumar</span>
              </a>
            </div>
          </div>

          <div className="contact-right">
            <a href="mailto:yrevanthkumar17@gmail.com" className="contact-btn">
              <i className="fa-solid fa-paper-plane" />&nbsp;Send a Message
            </a>
            <a href="https://github.com/revanth17y/" target="_blank" rel="noreferrer" className="contact-btn-outline">
              <i className="fa-solid fa-file-lines" />&nbsp;View Resume
            </a>
          </div>
        </div>
      </section>


      {/* ══ FOOTER ══ */}
      <footer className="site-footer-bottom">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">YRK</span>
            <p>Yaram Revanth Kumar &mdash; CSE @ RMKEC '26</p>
          </div>

          <div className="footer-col">
            <h5>Navigation</h5>
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-col">
            <h5>Follow Me</h5>
            <div className="footer-social-icons">
              <a href="https://github.com/revanth17y/" target="_blank" rel="noreferrer" aria-label="GitHub">
                <i className="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/yaram-revanth-kumar/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin" />
              </a>
              <a href="mailto:yrevanthkumar17@gmail.com" aria-label="Email">
                <i className="fa-solid fa-envelope" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />
        <p className="footer-copy">&copy; {new Date().getFullYear()} Yaram Revanth Kumar. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;