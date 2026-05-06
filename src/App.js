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
import cloud from './Images/wind-cloud.jpg';
import SscCert from './Images/ssc.jpg';
import emailjs from '@emailjs/browser';

const projects = [
  {
    title: 'Brain Tumor Detection',
    desc: 'MobileNetV2 & transfer learning on MRI scans. Achieved 94% accuracy with real-time classification.',
    color: '#c0e2f6',
    link: 'https://github.com/revanth17y/Brain-Tumor-Prediction-App',
  },
  {
    title: 'Live Face Attendance System',
    desc: 'Flask & OpenCV powered real-time face recognition with SQLite attendance logging.',
    color: '#f2dfb3',
    link: 'https://github.com/revanth17y/Live_Attendance_System',
  },
  {
    title: 'Blockchain Credential Verification',
    desc: 'Decentralized system for issuing and verifying academic credentials on blockchain.',
    color: '#c5eac8',
    link: 'https://github.com/revanth17y/secure-certificate-verification-system/',
  },
];

const certifications = [
  { name: 'MongoDB Basics',          issuer: 'MongoDB University', icon: 'fa-solid fa-database',  color: '#d4eaf7' },
  { name: 'Web Development',         issuer: 'CodSoft',            icon: 'fa-solid fa-code',       color: '#fdf3dc' },
  { name: 'Soft Skills Development', issuer: 'NPTEL',              icon: 'fa-solid fa-comments',   color: '#e8f5e9' },
  { name: 'Programming in Java',     issuer: 'NPTEL',              icon: 'fa-brands fa-java',      color: '#f3e5f5' },
];

function App() {
  const typingRef = useRef(null);
  const scrollHintRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const [showHeader, setShowHeader] = useState(false);
  const [activeCerts, setActiveCerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Yaram Revanth Kumar",
      };

      const response = await emailjs.send(
        'service_faf0cus',    // Replace with your EmailJS service ID
        'template_wage9kb',   // Replace with your EmailJS template ID
        templateParams,
        'mF9Hw-2WC6hNzFAXd'
      );

      if (response.status === 200) {
        setFormStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;

        if (sectionMiddle >= 0 && sectionMiddle <= window.innerHeight) {
          currentSection = section.id;
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const typer = typingRef.current;
    if (!typer) return;
    const handler = (e) => {
      if (e.animationName === 'typing') typer.classList.add('finished');
    };
    typer.addEventListener('animationend', handler);
    return () => typer.removeEventListener('animationend', handler);
  }, []);

  useEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;
    const onScroll = () => {
      hint.style.opacity = Math.max(0, 1 - window.scrollY / 160);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    const section = document.querySelector(".experience-section");
    const hint = document.querySelector(".exp-hover-hint");

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

  useEffect(() => {
    document.querySelectorAll('.edu-card').forEach(card => {
      const front = card.querySelector('.front-content');
      const back = card.querySelector('.back-content');
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
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
  
useEffect(() => {

  const cols = document.querySelectorAll(
    '.skills-hang-col'
  );

  if (!cols.length) return;

  // =========================
  // SVG ROPES
  // =========================

  const svg =
    document.getElementById(
      'skillsSvg'
    );

  const section =
    document.querySelector(
      '.skills-section'
    );

  const row =
    document.querySelector(
      '.skills-hang-row'
    );

  svg.innerHTML = '';

  const ropes = [];

  cols.forEach(() => {

    const path =
      document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

    path.setAttribute(
      'fill',
      'none'
    );

    path.setAttribute(
      'stroke',
      '#b8c4d6'
    );

    path.setAttribute(
      'stroke-width',
      '2'
    );

    path.setAttribute(
      'stroke-linecap',
      'round'
    );

    path.setAttribute(
      'opacity',
      '0.92'
    );

    svg.appendChild(path);

    ropes.push(path);

  });

  // =========================
  // RESIZE SVG
  // =========================

  function resizeSvg(){

    const rect =
      section.getBoundingClientRect();

    svg.setAttribute(
      'width',
      rect.width
    );

    svg.setAttribute(
      'height',
      rect.height
    );

  }

  resizeSvg();

  window.addEventListener(
    'resize',
    resizeSvg
  );

  // =========================
  // PHYSICS
  // =========================

  const physics = [];

  cols.forEach((col) => {

    physics.push({

      el: col,

      rotation: 0,

      velocity: 0,

      acceleration: 0,

      target: 0,

    });

  });

  let mouseX = 0;
  let mouseY = 0;

  // =========================
  // CURSOR INTERACTION
  // =========================

  function handleMouseMove(e){

    mouseX = e.clientX;
    mouseY = e.clientY;

    physics.forEach((item) => {

      const rect =
        item.el.getBoundingClientRect();

      const cx =
        rect.left +
        rect.width / 2;

      const cy =
        rect.top +
        rect.height / 3;

      const dx =
        mouseX - cx;

      const dy =
        mouseY - cy;

      const dist =
        Math.sqrt(
          dx * dx + dy * dy
        );

      const radius = 220;

      if(dist < radius){

        const strength =
          1 - dist / radius;

        const force =
          dx * 0.12 * strength;

        item.target += force;

      }

    });

  }

  window.addEventListener(
    'mousemove',
    handleMouseMove
  );

  // =========================
  // ANIMATION LOOP
  // =========================

  let raf;

  function animate(){

    const time =
      Date.now() * 0.001;

    physics.forEach((item, index) => {

      // =====================
      // IDLE BREEZE
      // =====================

      const breeze =
        Math.sin(
          time * 1.4 +
          index * 1.8
        ) * 1.4;

      // =====================
      // SPRING BACK
      // =====================

      item.acceleration =
        (0 - item.rotation) * 0.04;

      item.velocity +=
        item.acceleration;

      // =====================
      // CURSOR IMPULSE
      // =====================

      item.velocity +=
        item.target * 0.02;

      // =====================
      // IDLE WIND FORCE
      // =====================

      item.velocity +=
        breeze * 0.055;

      // =====================
      // DAMPING
      // =====================

      item.velocity *= 0.92;

      // =====================
      // UPDATE ROTATION
      // =====================

      item.rotation +=
        item.velocity;

      // =====================
      // DECAY FORCE
      // =====================

      item.target *= 0.82;

      // =====================
      // CLAMP
      // =====================

      item.rotation = Math.max(
        -14,
        Math.min(14, item.rotation)
      );

      // =====================
      // APPLY MOTION
      // =====================

      item.el.style.transform = `
        rotate(${item.rotation}deg)
      `;

      // =====================
      // SVG ROPE UPDATE
      // =====================

      const secRect =
        section.getBoundingClientRect();

      const rowRect =
        row.getBoundingClientRect();

      const rect =
        item.el.getBoundingClientRect();

      // TOP ANCHOR

      const anchorX =
        rect.left +
        rect.width / 2 -
        secRect.left;

      const anchorY =
        rowRect.top -
        secRect.top -
        100;

      // CARD CONNECTION

      const endX =
        rect.left +
        rect.width / 2 -
        secRect.left;

      const endY =
        rect.top -
        secRect.top;

      // CURVE

      const curveX =
        anchorX +
        item.rotation * 1.2;

      const curveY =
        anchorY +
        30 +
        Math.abs(item.rotation) * 0.4;

      ropes[index].setAttribute(
        'd',
        `
        M ${anchorX} ${anchorY}
        Q ${curveX} ${curveY}
        ${endX} ${endY}
      `
      );

      // =====================
      // TAG DELAY EFFECT
      // =====================

      const wraps =
        item.el.querySelectorAll(
          '.skills-tag-wrap'
        );

      wraps.forEach((wrap, idx) => {

        const lag =
          item.rotation *
          (idx + 1) *
          0.9;

        wrap.style.transform = `
          rotate(${lag * 0.22}deg)
          translateX(${lag * 0.55}px)
        `;

      });

    });

    raf =
      requestAnimationFrame(
        animate
      );

  }

  animate();

  return () => {

    cancelAnimationFrame(raf);

    window.removeEventListener(
      'mousemove',
      handleMouseMove
    );

    window.removeEventListener(
      'resize',
      resizeSvg
    );

  };

}, []);

  const allProjects = [...projects, ...projects];
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
        rel="stylesheet"
      />

      <header className={`site-header ${showHeader ? 'header-visible' : ''}`}>
        <div className="header-inner">
          <span className="header-logo"><a href="#hero" style={{ color: "white", textDecoration: "none" }}>YRK</a></span>
          <nav className="header-nav">
            <a href="#education" className={activeSection === "education" ? "active" : ""}>Education</a>
            <a href="#experience" className={activeSection === "experience" ? "active" : ""}>Experience</a>
            <a href="#projects" className={activeSection === "projects" ? "active" : ""}>Projects</a>
            <a href="#skills" className={activeSection === "skills" ? "active" : ""}>Skills</a>
            <a href="#certifications" className={activeSection === "certifications" ? "active" : ""}>Certificates</a>
            <a href="#contact" className={activeSection === "contact" ? "active" : ""}>Contact</a>
          </nav>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="header-resume-btn">
            <i className="fa-solid fa-file-lines" />
            <span>Resume</span>
          </a>
        </div>
      </header>

      <section className="hero-section" id="hero" ref={heroRef}>
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

      <section className="education-section reveal" id="education">
        <h2 className="section-title">Education</h2>
        <div className="edu-container">
          <div className="container edu-hint-wrap">
            <div className="edu-click-hint" aria-hidden="true">
              <span className="hint-label">click on card</span>
              <span className="hint-label">to explore!</span>
              <svg
                className="hint-arrow-svg"
                width="80"
                height="95"
                viewBox="0 0 80 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="hint-arrow-path"
                  d="M 70,6 C 80,30 72,58 52,76 C 42,84 32,90 24,90"
                  stroke="#222"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
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
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section className="experience-section reveal" id="experience">
        <h2 className="section-title">Experience</h2>

        {/* Hint — left of card 1, arrow points right toward it */}
        <div className="exp-hover-hint" aria-hidden="true">
          <span className="exp-hint-label">hover cards</span>
          <span className="exp-hint-label">to explore!</span>
          <svg className="exp-hint-arrow" width="90" height="60"
               viewBox="0 10 1 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="exp-hint-arrow-path"
              d="M 6,6 C 20,30 40,10 67,30 C 76,38 80,46 82,51"
              stroke="#222" strokeWidth="2.5" strokeLinecap="round"
              strokeLinejoin="round" fill="none" />
            <g className="exp-hint-arrowhead">
              <line x1="82" y1="52" x2="70" y2="49" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="82" y1="52" x2="80" y2="41" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <div className="timeline horizontal">

          {/* Card 1 — TOP: expands upward, content always visible at bottom */}
          <div className="timeline-card top pos1">
            <div className="card-main">
              <h3>Web Dev Intern</h3>
              <p className="company-name">CodSoft</p>
              <p className="date-full">Jan – Feb 2024</p>
              <button className="cert-button" onClick={() => window.open('ssc_certificate.pdf')}>
                <i className="fa-solid fa-certificate" /> Certificate
              </button>
              <ul>
                <li>Built responsive UI with HTML, CSS, JS</li>
                <li>Implemented UX best practices</li>
                <li>Team collaboration &amp; code reviews</li>
              </ul>
            </div>
            <div className="timeline-year">2024</div>
          </div>

          {/* Card 2 — BOTTOM: expands downward, content at top */}
          <div className="timeline-card bottom pos2 codsoft">
            <div className="card-main">
              <h3>AI/ML Intern</h3>
              <p className="company-name">MedSocio HealthTech</p>
              <p className="date-full">June – July 2024</p>
              <button className="cert-button" onClick={() => window.open('ssc_certificate.pdf')}>
                <i className="fa-solid fa-certificate" /> Certificate
              </button>
              <ul>
                <li>Integrated medical LLMs for healthcare</li>
                <li>Built AI recommendation system</li>
                <li>Worked on APIs &amp; architecture</li>
              </ul>
            </div>
            <div className="timeline-year">2024</div>
          </div>

          {/* Card 3 — TOP: expands upward, content always visible at bottom */}
          <div className="timeline-card top pos3 maincrafts">
            <div className="card-main">
              <h3>Data Science Intern</h3>
              <p className="company-name">Maincrafts Technology</p>
              <p className="date-full">Feb – Mar 2026</p>
              <button className="cert-button" onClick={() => window.open('ssc_certificate.pdf')}>
                <i className="fa-solid fa-certificate" /> Certificate
              </button>
              <ul>
                <li>Data analysis using Python &amp; pandas</li>
                <li>Worked on real-world datasets</li>
                <li>Built &amp; optimized preprocessing pipelines</li>
              </ul>
            </div>
            <div className="timeline-year">2026</div>
          </div>

        </div>
      </section>

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


<section className="skills-section reveal" id="skills">

  <div className="skills-tree-container">

    <img
      src={cloud}
      alt="wind"
      className="skills-wind-cloud"
    />
    
    <div className="skills-breeze-bg">

    <div className="breeze breeze-1"></div>
    <div className="breeze breeze-2"></div>
    <div className="breeze breeze-3"></div>

    <div className="dust dust-1"></div>
    <div className="dust dust-2"></div>
    <div className="dust dust-3"></div>
    <div className="dust dust-4"></div>

  </div>

    <h2 className="section-title">
      Skills
    </h2>

    {/* ROOT NODE */}

    <div className="skills-root-wrap">

      <div className="skills-root-node">
        MY SKILLS
      </div>

    </div>

    {/* SVG ROPE LAYER */}

    <svg
      className="skills-svg-layer"
      id="skillsSvg"
    ></svg>

    {/* HANGING ROW */}

    <div className="skills-hang-row">

      {[
        {
          icon: 'fa-solid fa-code',

          cat: 'Languages',

          bg: '#dbeafe',

          headerBg: '#1e40af',

          tagBg: '#eff6ff',

          tagBorder: '#bfdbfe',

          tagColor: '#1e40af',

          tags: [
            'Python',
            'HTML',
            'CSS',
            'SQL',
          ],
        },

        {
          icon: 'fa-solid fa-cubes',

          cat: 'Lib & Frameworks',

          bg: '#fef9c3',

          headerBg: '#854d0e',

          tagBg: '#fefce8',

          tagBorder: '#fde68a',

          tagColor: '#854d0e',

          tags: [
            'React',
            'NumPy',
            'Pandas',
            'Matplotlib',
          ],
        },

        {
          icon: 'fa-solid fa-database',

          cat: 'Databases',

          bg: '#dcfce7',

          headerBg: '#14532d',

          tagBg: '#f0fdf4',

          tagBorder: '#bbf7d0',

          tagColor: '#14532d',

          tags: [
            'MongoDB',
            'MySQL',
          ],
        },

        {
          icon:
            'fa-solid fa-screwdriver-wrench',

          cat: 'Tools',

          bg: '#f3e8ff',

          headerBg: '#581c87',

          tagBg: '#faf5ff',

          tagBorder: '#e9d5ff',

          tagColor: '#581c87',

          tags: [
            'Git / GitHub',
            'Postman',
            'VS Code',
            'Google Colab',
          ],
        },

      ].map((group, i) => (

        <div
          className="skills-hang-col"
          key={i}
        >

          {/* MAIN HANGING ROPE */}

          <div className="skills-main-rope"></div>

          {/* CATEGORY CARD */}

          <div
            className="skills-cat-box"
            style={{
              background: group.bg,
              borderColor:
                group.tagBorder,
            }}
          >

            {/* ICON */}

            <div
              className="skills-cat-icon-wrap"
              style={{
                background:
                  group.headerBg,
              }}
            >

              <i
                className={`${group.icon} skills-cat-icon`}
              />

            </div>

            {/* TITLE */}

            <p
              className="skills-cat-name"
              style={{
                color:
                  group.headerBg,
              }}
            >
              {group.cat}
            </p>

          </div>

          {/* TAGS */}

          <div className="skills-tags-chain">

            {group.tags.map((tag, j) => (

              <div
                className="skills-tag-wrap"
                key={j}
              >

                {/* SMALL ROPE */}

                <div className="skills-tag-rope"></div>

                <span
                  className="skills-tag-chip"
                  style={{
                    background:
                      group.tagBg,

                    borderColor:
                      group.tagBorder,

                    color:
                      group.tagColor,

                    '--hover-bg':
                      group.headerBg,
                  }}
                >
                  {tag}
                </span>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>

  </div>

</section>


      <section className="certifications-section reveal" id="certifications">
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

      
      <section className="contact-section reveal" id="contact">
        <div className="contact-floating-shapes">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 2 }}>
          <div className="contact-badge">Open for Immediate Joining</div>
          <h2 className="contact-title">Let's Work Together</h2>
          <p className="contact-subtitle">
            I'm always open to discussing new projects, opportunities, and
            challenging ideas. Let's build something amazing!
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info-section">
            <h3 className="section-header">Get in Touch</h3>

            <div className="contact-info-item">
              <div className="contact-icon">
                <i className="fa-solid fa-envelope" />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>yrevanthkumar17@gmail.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <i className="fa-solid fa-location-dot" />
              </div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>Nellore, India</p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {formStatus.message && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <p className="footer-copy">
            © {new Date().getFullYear()} Yaram Revanth Kumar — All rights reserved.
          </p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/yaram-revanth-kumar/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/revanth17y/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github" />
            </a>
            <a href="mailto:yrevanthkumar17@gmail.com">
              <i className="fa-solid fa-envelope" />
            </a>
          </div>
        </div>
      </footer>



      {activeCerts.length > 0 && (
        <div className="cert-overlay" onClick={() => setActiveCerts([])}>
          <div 
            className="cert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activeCerts[currentIndex]} alt="Certificate" />

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