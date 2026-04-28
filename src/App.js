import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Photo from './Images/Photo.png';
import AboutImage from './Images/about-me.png';
import Cert1 from './Images/cert1.jpg';
import Cert2 from './Images/cert2.jpg';
import Cert3 from './Images/cert3.jpg';
import Cert4 from './Images/cert4.jpg';
import Cert5 from './Images/cert5.jpg';
import Cert6 from './Images/cert6.jpg';
import Cert7 from './Images/cert7.jpg';
import Cert8 from './Images/cert8.jpg';

import InterCert from './Images/inter.jpg';
import SscCert from './Images/ssc.jpg';

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
  { name: 'MongoDB Basics',          issuer: 'MongoDB University', icon: 'fa-solid fa-database',  color: '#d4eaf7' },
  { name: 'Web Development',         issuer: 'CodSoft',            icon: 'fa-solid fa-code',       color: '#fdf3dc' },
  { name: 'Soft Skills Development', issuer: 'NPTEL',              icon: 'fa-solid fa-comments',   color: '#e8f5e9' },
  { name: 'Programming in Java',     issuer: 'NPTEL',              icon: 'fa-brands fa-java',      color: '#f3e5f5' },
];

function App() {
  const typingRef     = useRef(null);
  const scrollHintRef = useRef(null);
  const heroRef       = useRef(null);
  const [showHeader, setShowHeader] = useState(false);
  const [activeCerts, setActiveCerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const section = document.querySelector(".education-section");
    const hint = document.querySelector(".edu-click-hint");

    if (!section || !hint) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hint.classList.add("animate");
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);

    return () => observer.disconnect();
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
      {/* ── Load Caveat handwriting font from Google Fonts ── */}
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* ══ HEADER ══ */}
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
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="header-resume-btn">
            <i className="fa-solid fa-file-lines" />
            <span>Resume</span>
          </a>
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
          <div className="float-card fc-left">
            <i className="fa-solid fa-graduation-cap fc-fa-icon" />
            <h4>CS @ RMKEC&nbsp;'26</h4>
            <p>AI &amp; software focus</p>
          </div>
          <div className="photo-orbit">
            <div className="photo-ring" />
            <div className="photo-glow-circle">
              <img src={Photo} alt="Yaram Revanth Kumar" className="hero-photo" />
            </div>
          </div>
          <div className="float-card fc-right">
            <i className="fa-solid fa-microchip fc-fa-icon" />
            <h4>AI/ML Intern</h4>
            <p>MedSocio HealthTech</p>
          </div>
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

          {/* ── First card with handwritten hint ── */}
          <div className="container edu-hint-wrap">

            {/*
              Handwritten "click on card to explore" hint with a curvy drawn arrow.
              Matches the reference image: script text + a curving arrow pointing down-left at the card.
            */}
            <div className="edu-click-hint" aria-hidden="true">
              {/* Two-line handwritten text */}
              <span className="hint-label">click on card</span>
              <span className="hint-label">to explore!</span>

              {/*
                Arrow starts top-right (near the text), curves gently,
                arrowhead points LEFT toward card 1's right edge.
              */}
              <svg
                className="hint-arrow-svg"
                width="80"
                height="95"
                viewBox="0 0 80 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Path curves from top-right, sweeps down into the card top */}
                <path
                  className="hint-arrow-path"
                  d="M 70,6 C 80,30 72,58 52,76 C 42,84 32,90 24,90"
                  stroke="#222"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Arrowhead — tip at (24,90), arriving from top-right, pointing left */}
                <g className="hint-arrowhead">
                  <line x1="24" y1="90" x2="34" y2="83" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="24" y1="90" x2="30" y2="92" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            <div className="edu-card"
                onClick={() => {
                  setActiveCerts([Cert1, Cert2, Cert3, Cert4, Cert5, Cert6, Cert7, Cert8]);
                  setCurrentIndex(0);
                }}>
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

          <div className="container">
            <div className="edu-card"
                onClick={() => {
                  setActiveCerts([InterCert]);
                  setCurrentIndex(0);
                }}>
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

          <div className="container">
            <div className="edu-card"
                 onClick={() => {
                   setActiveCerts([SscCert]);
                   setCurrentIndex(0);
                  }}>
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
            { cat: 'Languages',          icon: 'fa-solid fa-terminal',    tags: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'] },
            { cat: 'Frameworks & Tools', icon: 'fa-solid fa-toolbox',     tags: ['React', 'Flask', 'OpenCV', 'Git', 'REST APIs', 'SQLite'] },
            { cat: 'AI / ML',            icon: 'fa-solid fa-brain',       tags: ['TensorFlow', 'Keras', 'MobileNetV2', 'LLMs', 'Transfer Learning'] },
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
                 style={{ backgroundColor: cert.color }}
                 onClick={() => window.open('https://github.com/revanth17y/', '_blank')}>
              <div className="cert-top">
                <i className={`${cert.icon} cert-icon`} />
                <span className="cert-badge">Certified</span>
              </div>
              <h4 className="cert-name">{cert.name}</h4>
              <p className="cert-issuer">{cert.issuer}</p>
              <div className="cert-footer">
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
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="contact-btn-outline">
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
            <p className="footer-tagline">
              Building intelligent, scalable solutions<br />
              at the intersection of AI and software.
            </p>
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

          <div className="footer-col">
            <h5>Navigation</h5>
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <a href="mailto:yrevanthkumar17@gmail.com">yrevanthkumar17@gmail.com</a>
            <a href="https://github.com/revanth17y/" target="_blank" rel="noreferrer">GitHub Profile</a>
            <a href="https://www.linkedin.com/in/yaram-revanth-kumar/" target="_blank" rel="noreferrer">LinkedIn Profile</a>
          </div>
        </div>

        <div className="footer-divider" />
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Yaram Revanth Kumar &mdash; All rights reserved.
        </p>
      </footer>


      {activeCerts.length > 0 && (
      <div className="cert-overlay" onClick={() => setActiveCerts([])}>

        <div 
          className="cert-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={activeCerts[currentIndex]} alt="Certificate" />

          {/* arrows only if multiple */}
          {activeCerts.length > 1 && (
            <>
              <button 
                className="cert-nav left"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? activeCerts.length - 1 : prev - 1
                  )
                }
              >
                ‹
              </button>

              <button 
                className="cert-nav right"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === activeCerts.length - 1 ? 0 : prev + 1
                  )
                }
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className="cert-exit-text">
          click on empty space to exit
        </div>

      </div>
    )}


    </div>
  );
}

export default App;