import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect(() => {

    // ===== EDU CARD =====
    document.querySelectorAll('.edu-card').forEach(card => {
      const frontContent = card.querySelector('.front-content');
      const backContent = card.querySelector('.back-content');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const deltaX = (x - midX) / midX;
        const deltaY = (y - midY) / midY;

        const rotateY = deltaX * 10;
        const rotateX = -deltaY * 10;

        card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

        frontContent.style.transform = `rotateY(${-rotateY * 2.5}deg) rotateX(${-rotateX * 2.5}deg)`;
        backContent.style.transform = `rotateY(${-rotateY * 2.5}deg) rotateX(${-rotateX * 2.5}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        frontContent.style.transform = 'rotateY(0deg) rotateX(0deg)';
        backContent.style.transform = 'rotateY(0deg) rotateX(0deg)';
      });
    });

    // ===== TYPING =====
    const typer = document.querySelector('.typing');
    if (typer) {
      typer.addEventListener('animationend', e => {
        if (e.animationName === 'typing') {
          typer.classList.add('finished');
        }
      });
    }

    // ===== SCROLL REVEAL =====
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(section => observer.observe(section));

    // ===== TIMELINE =====
    const timelineCards = document.querySelectorAll('.timeline-card');

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.3 });

    timelineCards.forEach(card => timelineObserver.observe(card));

    // ===== CAROUSEL =====
    const autoScrollCarousel = () => {
      const carousel = document.querySelector('.carousel');
      if (!carousel) return;

      const cardWidth = carousel.offsetWidth + 30;

      if (carousel.scrollLeft + cardWidth >= carousel.scrollWidth - 1) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    };

    const interval = setInterval(autoScrollCarousel, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <>

      {/* HERO */}
      <section className="hero-section">
        <div>
          <h1>Hi, I'm</h1>
          <h1 className="typing">Yaram Revanth Kumar</h1>

          <div className="social-icons">
            <a href="https://github.com/revanth17y/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/yaram-revanth-kumar/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="mailto:yrevanthkumar17@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="education-section reveal">
        <h2 className="section-title">Education</h2>
        <div className="edu-container">

          <div className="container">
            <div className="edu-card">
              <div className="front" style={{ backgroundColor: "powderblue" }}>
                <div className="front-content">
                  <h3>B.E. in Computer Science</h3>
                  <p>R.M.K. Engineering College, Tiruvallur<br />2022 - 2026<br />CGPA: 7.86</p>
                </div>
              </div>
              <div className="back">
                <div className="back-content">
                  <p>Specialization in AI & Software Development</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="edu-card">
              <div className="front" style={{ backgroundColor: "wheat" }}>
                <div className="front-content">
                  <h3>Intermediate Education</h3>
                  <p>Narayana Junior College, Nellore<br />2020 - 2022<br />Percentage: 75.70%</p>
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
            <div className="edu-card">
              <div className="front" style={{ backgroundColor: "thistle" }}>
                <div className="front-content">
                  <h3>Secondary School (SSC)</h3>
                  <p>Ratnam High School, Nellore<br />2019 - 2020<br />Percentage: 97.67%</p>
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

      {/* EXPERIENCE */}
      <section className="experience-section reveal">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">

          <div className="timeline-card left">
            <h3>AI/ML Engineering Intern — MedSocio HealthTech (June – July 2024)</h3>
            <ul>
              <li>Researched and integrated medical LLMs for healthcare tools.</li>
              <li>Built a prototype AI recommendation system with backend integration.</li>
              <li>Worked on data handling, API design, and scalable system architecture.</li>
            </ul>
            <button onClick={() => window.open('ssc_certificate.pdf')}>
              Certificate
            </button>
          </div>

          <div className="timeline-card right">
            <h3>AI/ML Engineering Intern — MedSocio HealthTech (June – July 2024)</h3>
            <ul>
              <li>Researched and integrated medical LLMs for healthcare tools.</li>
              <li>Built a prototype AI recommendation system with backend integration.</li>
              <li>Worked on data handling, API design, and scalable system architecture.</li>
            </ul>
            <button onClick={() => window.open('ssc_certificate.pdf')}>
              Certificate
            </button>
          </div>

        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects-section reveal">
        <h2 className="section-title">Projects</h2>
        <div className="carousel-wrapper">
          <div className="carousel">

            <div className="project-card" style={{ backgroundColor: "powderblue" }}>
              <h3>Brain Tumor Detection</h3>
              <p>Used MobileNetV2 & transfer learning on MRI data. Achieved 94% accuracy.</p>
              <a href="https://github.com/revanth17y/Brain-Tumour-Detection-Using-Deep-learning" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i> Demo
              </a>
            </div>

            <div className="project-card" style={{ backgroundColor: "wheat" }}>
              <h3>Live Face Attendance System</h3>
              <p>Built with Flask, OpenCV. Real-time face recognition and SQLite-based logging.</p>
              <a href="https://github.com/revanth17y/Live_Attendance_System" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i> Demo
              </a>
            </div>

          </div>
          <div className="carousel-dots"></div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section reveal">
        <h2 className="section-title">Skills</h2>
        <ul>
          <li>Java, HTML, CSS, JavaScript</li>
          <li>SQL</li>
          <li></li>
          <li>Git, REST APIs, Problem Solving, Self-Learning</li>
        </ul>
      </section>

      {/* CERTIFICATIONS */}
      <section className="certifications-section reveal">
        <h2 className="section-title">Certifications</h2>
        <ul>
          <li>MongoDB Course Completion</li>
          <li>Web Development – CodSoft</li>
          <li>NPTEL: Soft Skills Development & Programming in Java</li>
        </ul>
      </section>

      {/* CONFERENCES */}
      <section className="conferences-section reveal">
        <h2 className="section-title">Conferences</h2>
        <div className="card">
          <h3>4th International Black Sea Scientific Research Congress</h3>
          <p>Presented paper on "Space Exploration and Astronomy", Rize, Türkiye – June 2023</p>
        </div>
      </section>

    </>
  );
}

export default App;