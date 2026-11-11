"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import profileImage from "../assets/image.png";

type Project = {
  number: string;
  year: string;
  title: string;
  description: string;
  role: string;
  tools: string;
  color: string;
  category: string;
};

const projects: Project[] = [
  {
    number: "01",
    year: "2026",
    title: "Home Furniture Business System: Design Request and BoQ Management",
    description:
      "An Odoo proof of concept for a home-furniture business. The custom module connects BoQ lines to Sales Orders, Invoice, and Inventory, creating a complete business flow from design request through order and stock operations.",
    role: "Odoo Technical Developer",
    tools: "Odoo · Python · PostgreSQL · XML · Sales · Inventory",
    color: "#111111",
    category: "Odoo",
  },
  {
    number: "02",
    year: "2025",
    title: "Bhai",
    description:
      "A personal tasking chatbot designed to help manage tasks and provide personal support through academic struggles.",
    role: "Full-stack Developer",
    tools: "Python · FastAPI · Google Cloud Platform · HTML/CSS/JS",
    color: "#2fb344",
    category: "AI",
  },
  {
    number: "03",
    year: "2025",
    title: "Tesachor-website",
    description:
      "A responsive website supporting Cambodia’s tourism industry, with a focus on user experience, clear presentation and accessible design.",
    role: "Web Developer, UI Designer",
    tools: "Node.js · React · Bootstrap",
    color: "#1f7ad0",
    category: "Web",
  },
  {
    number: "04",
    year: "2026",
    title: "Air Quality ETL Pipeline",
    description:
      "A production-style pipeline ingesting real-time air-quality data from the AQICN API, transforming it with PySpark and orchestrating hourly runs with Airflow. Insights are served through a Streamlit dashboard backed by MySQL and deployed with Docker Compose.",
    role: "Data Engineer, Reporter",
    tools: "Apache Spark · Airflow · MySQL · Streamlit · Docker Compose",
    color: "#1f7ad0",
    category: "Data Science",
  },
  {
    number: "05",
    year: "2026",
    title: "IoT Water Level Monitoring System",
    description:
      "A real-time water-level monitor using an ESP8266, a water-level sensor and OLED display. Readings stream to a MySQL/MariaDB database and live web dashboard, covering the full IoT loop from sensing to visualization.",
    role: "Developer, Reporter",
    tools: "ESP8266 · MySQL/MariaDB · HTML/CSS",
    color: "#2fb344",
    category: "IoT",
  },
  {
    number: "06",
    year: "2024",
    title: "Bank Queue Management System",
    description:
      "A queue-scheduling application designed to optimize customer flow and reduce waiting time in banking operations.",
    role: "Developer, Report Assistant",
    tools: "C++",
    color: "#8a6bbd",
    category: "Software",
  },
  {
    number: "07",
    year: "2026",
    title: "ESP8266 RFID Access Control System",
    description:
      "An embedded access-control system using an ESP8266 NodeMCU, MFRC522 RFID reader and SSD1306 OLED display. Card UIDs are read over SPI with real-time LED feedback.",
    role: "Embedded Developer",
    tools: "C/C++ · Arduino IDE · ESP8266 · MFRC522 · SSD1306",
    color: "#f0b43c",
    category: "Embedded",
  },
  {
    number: "08",
    year: "2025",
    title: "Email Spam / Ham Detection",
    description:
      "A web-based machine-learning application classifying messages as Spam or Ham. The pipeline covers preprocessing, TF-IDF feature extraction, model training and performance evaluation.",
    role: "ML Engineer, Report Coordinator",
    tools: "Python · Scikit-learn · Flask · Pandas",
    color: "#111111",
    category: "Machine Learning",
  },
];

const skillGroups = [
  [
    "Data Science",
    "Numbers into decisions",
    "Python, R, PySpark, Pandas, Scikit-learn",
    "#1f7ad0",
  ],
  [
    "IoT Development",
    "Sensor to dashboard",
    "ESP8266, Arduino, MQTT, SPI/I2C, DHT11",
    "#2fb344",
  ],
  [
    "Data Pipelines",
    "Reliable, repeatable flow",
    "Apache Spark, Airflow, Docker Compose, MySQL",
    "#f0b43c",
  ],
  [
    "Web & Visualisation",
    "Make systems understandable",
    "Django, Streamlit, HTML/CSS, Power BI",
    "#111111",
  ],
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = useMemo(
    () =>
      filter === "All"
        ? showAllProjects
          ? projects
          : projects.slice(0, 4)
        : projects.filter((project) => project.category === filter),
    [filter, showAllProjects],
  );
  const filters = [
    "All",
    "Odoo",
    "AI",
    "Web",
    "Data Science",
    "IoT",
    "Embedded",
    "Machine Learning",
    "Software",
  ];
  const handleFilter = (item: string) => {
    setFilter(item);
    setShowAllProjects(item !== "All");
  };

  useEffect(() => {
    const onScroll = () =>
      setProgress(
        Math.min(
          100,
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100,
        ),
      );
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [filter, showAllProjects]);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className="clean-nav">
        <div className="nav-inner">
          <a className="logo" href="#home">
            SHIN
          </a>
          <button className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "Close" : "Menu"}
          </button>
          <ul className={menuOpen ? "open" : ""}>
            {[
              "home",
              "about",
              "skills",
              "projects",
              "activities",
              "contacts",
            ].map((link) => (
              <li key={link}>
                <a href={`#${link}`} onClick={() => setMenuOpen(false)}>
                  {link[0].toUpperCase() + link.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <header className="hero" id="home">
        <div className="hero-in">
          <Image
            className="hero-photo"
            src={profileImage}
            alt="Vanna NEANG standing in a white shirt and black trousers"
            width={640}
            height={1048}
            priority
          />
          <div className="hero-t">
            <p className="jp">こんにちは！</p>
            <h1>This is Vanna NEANG!</h1>
            <p>
              Fifth-year Data Science student and Odoo Solutions Architect at the Institute of Technology of Cambodia, specializing in bridging complex business operations with robust technical systems. 
              Hands-on experience architecting custom enterprise resource planning workflows, real-time data pipelines, and IoT sensor integrations. 
              Passionate about translating messy operational challenges into scalable, data-driven software solutions.
            </p>
            <p>
              Odoo Solutions Architect | ERP Systems & Workflow Automation | Data Engineer | UX/UI Design | IoT & Embedded Systems
            </p>
            <a className="btn" href="#about">
              Read More
            </a>
          </div>
        </div>
      </header>
      <section className="ed white" id="about">
        <div className="ed-in">
          <div className="sk-wrap" data-reveal>
            <div>
              <h2>
                Personal
                <br />
                document
              </h2>
              <div className="ab-lead">
                <p>
                  It&apos;s all about me. Some details explain more than
                  achievements do.
                </p>
                <p>
                  I enjoy working where data meets the physical world:
                  connecting an idea to a sensor, a dataset to a decision, or a
                  technical system to the people who use it.
                </p>
                <p>This page is for that.</p>
              </div>
              <div className="sk-grid">
                <article className="sk reveal-card" data-reveal>
                  <i style={{ background: "#1f7ad0" }} />
                  <h3>Current chapter</h3>
                  <em>Data Science @ ITC</em>
                  <p>
                    Fifth-year engineering student in the Department of Applied Mathematics and Statistics.
                  </p>
                </article>
                <article className="sk reveal-card" data-reveal>
                  <i style={{ background: "#2fb344" }} />
                  <h3>Focus area</h3>
                  <em>Data + connected systems</em>
                  <p>
                    Interested in the space where sensors, software and useful
                    information come together.
                  </p>
                </article>
                <article className="sk reveal-card" data-reveal>
                  <i style={{ background: "#f0b43c" }} />
                  <h3>Default setting</h3>
                  <em>Analytical + collaborative</em>
                  <p>
                    Strong analytical mindset, creative problem-solving and a
                    preference for thoughtful team work.
                  </p>
                </article>
                <article className="sk reveal-card" data-reveal>
                  <i style={{ background: "#111" }} />
                  <h3>Languages</h3>
                  <em>Khmer | English</em>
                  <p>
                    Khmer native. English intermediate. Comfortable learning
                    across technical and functional contexts.
                  </p>
                </article>
              </div>
              <div className="mark">S</div>
            </div>
            <p className="vt" aria-hidden="true">
              ABOUT ME
            </p>
          </div>
        </div>
      </section>
      <section className="ed" id="skills">
        <div className="ed-in">
          <div className="sk-wrap" data-reveal>
            <div>
              <h2>
                What I<br />
                work with
              </h2>
              <div className="sk-grid">
                {skillGroups.map(([title, sub, tools, color]) => (
                  <article className="sk reveal-card" data-reveal key={title}>
                    <i style={{ background: color }} />
                    <h3>{title}</h3>
                    <em>{sub}</em>
                    <p>{tools}</p>
                  </article>
                ))}
              </div>
              <div className="mark">S</div>
            </div>
            <p className="vt" aria-hidden="true">
              SKILLS &amp; TOOLS
            </p>
          </div>
        </div>
      </section>
      <section className="ed white projects" id="projects">
        <div className="ed-in">
          <div className="project-head" data-reveal>
            <h2>
              Selected
              <br />
              projects
            </h2>
            <div className="filters">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            {visibleProjects.map((project) => (
              <article
                className="pj reveal-card"
                data-reveal
                key={project.number}
                onClick={() => setSelected(project)}
                tabIndex={0}
                onKeyDown={(event) =>
                  event.key === "Enter" && setSelected(project)
                }
              >
                <div
                  className="pl"
                  style={{ "--c": project.color } as React.CSSProperties}
                >
                  <span className="project-glyph">
                    {project.category === "IoT"
                      ? "⌁"
                      : project.category === "Data Science"
                        ? "◌"
                        : project.category === "Embedded"
                          ? "▦"
                          : project.category === "Machine Learning"
                            ? "∿"
                            : "↗"}
                  </span>
                </div>
                <div className="pt">
                  <div className="n">
                    <span>Part.</span>
                    <b>{project.number}</b>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <small>
                    <i className="sq" style={{ background: project.color }} />
                    {project.role}
                    <br />
                    <span className="tool-line">{project.tools}</span>
                    <span className="stack-divider"> | </span>
                    <span className="case-link">View details ↗</span>
                  </small>
                </div>
              </article>
            ))}
          </div>
          {filter === "All" && (
            <button
              type="button"
              className="see-more"
              aria-expanded={showAllProjects}
              onClick={() => setShowAllProjects((current) => !current)}
            >
              {showAllProjects ? "Show fewer projects" : "See more projects"}{" "}
              <span>{showAllProjects ? "↑" : "↓"}</span>
            </button>
          )}
        </div>
      </section>
      <section className="ed" id="activities">
        <div className="ed-in">
          <h2 data-reveal>
            Education
            <br />
            and activities
          </h2>
          <div className="edu-row">
            <article
              className="ec reveal-card"
              data-reveal
              style={{ "--c": "#2fb344" } as React.CSSProperties}
            >
              <b>2009 — 2016</b>
              <h3>Akaliphal Primary School</h3>
              <p>Primary school&apos;s diploma</p>
              <p className="m">
                Grade A<br />
                General basic learning
              </p>
            </article>
            <article
              className="ec reveal-card"
              data-reveal
              style={{ "--c": "#f0b43c" } as React.CSSProperties}
            >
              <b>2017 — 2023</b>
              <h3>Hun Sen Teuk Phos High School</h3>
              <p>High school&apos;s diploma</p>
              <p className="m">
                Grade B<br />
                Mathematics, Physics, Chemistry, Khmer Literature, History
              </p>
            </article>
            <article
              className="ec now reveal-card"
              data-reveal
              style={{ "--c": "#111" } as React.CSSProperties}
            >
              <b>2023 — Present</b>
              <h3>Institute of Technology of Cambodia</h3>
              <p>Dept. of Applied Mathematics and Statistics</p>
              <p>Engineering&apos;s Degree of Data Science</p>
              <p className="m">
                4th year, GPA 3.0 / 4.0<br /> 
                Statistics, Machine Learning, Data
                Analysis, Artificial Intelligence
              </p>
            </article>
          </div>
          <div className="bento">
            <div
              className="tile int dk reveal-card"
              data-reveal
              style={{ "--c": "#111" } as React.CSSProperties}
            >
              <h3>Internship</h3>
              <p className="big">3 months</p>
              <p className="role">Odoo Technical Intern</p>
              <p className="note">
                INNO LABS KH CO,. LTD
                <br />
                Building and customising Odoo for business workflows.
              </p>
            </div>
            <div
              className="tile s2 light reveal-card"
              data-reveal
              style={{ "--c": "#1f7ad0" } as React.CSSProperties}
            >
              <h3>Learning participation</h3>
              <span className="cnt">3 sessions</span>
              <ul>
                <li>
                  <b>7–11 Jul 2025</b>
                  <span>
                    Management of Large Information Systems with Knowledge Graph
                    <small>
                      Institute of Technology of Cambodia. Prof. Christophe
                      Debruyne, Belgium
                    </small>
                  </span>
                </li>
                <li>
                  <b>26 Apr 2025</b>
                  <span>
                    2025 ASEAN Data Science Explorers Program
                    <small>
                      Online training on visualisation tools. ASEAN Data
                      Scientist Team
                    </small>
                  </span>
                </li>
                <li>
                  <b>25 Jul 2024</b>
                  <span>
                    Development of Agricultural Machinery (Japan Smart Farming)
                    <small>
                      Institute of Technology of Cambodia. Prof. Dr. Mikio
                      Umeda, Japan
                    </small>
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="tile reveal-card"
              data-reveal
              style={{ "--c": "#2fb344" } as React.CSSProperties}
            >
              <h3>Charity and volunteering</h3>
              <span className="cnt">3 roles</span>
              <ul>
                <li>
                  <b>Dec 2024</b>
                  <span>Volunteer, Celebrating Cambodia</span>
                </li>
                <li>
                  <b>May, Dec 2024</b>
                  <span>
                    Member, Youth-Heart Charity<small>ITC</small>
                  </span>
                </li>
                <li>
                  <b>Nov 2024</b>
                  <span>
                    Member, Cambodian Red Cross<small>ITC branch</small>
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="tile s2 reveal-card"
              data-reveal
              style={{ "--c": "#f0b43c" } as React.CSSProperties}
            >
              <h3>Competitions</h3>
              <span className="cnt">4 entries</span>
              <ul>
                <li>
                  <b>Oct 2026</b>
                  <span>
                    RUPP Odoo Pitching Competition<small>RUPP</small>
                  </span>
                </li>
                <li>
                  <b>May 2026</b>
                  <span>
                    International Conference on AI and Computing Innovation
                    (ICAICI 2026)
                  </span>
                </li>
                <li>
                  <b>Apr 2025</b>
                  <span>ASEAN Data Science Explorers Program 2025</span>
                </li>
                <li>
                  <b>Mar 2025</b>
                  <span>
                    Next Gen Impact Competition<small>AUPP</small>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="contact" id="contacts">
        <div className="contact-in" data-reveal>
          <h2>Contacts</h2>
          <p>
            Have a project, an internship or an idea? Send a message and I will
            reply soon.
          </p>
          <div className="contact-logos">
            <a
              className="contact-logo"
              href="mailto:vanna.neang2129@gmail.com"
              aria-label="Email Vannabe"
            >
              <span className="logo-mark email-mark">@</span>
              <span>
                <b>Email</b>
                <small>vanna.neang2129@gmail.com</small>
              </span>
            </a>
            <a
              className="contact-logo"
              href="https://www.linkedin.com/in/neang-vanna2129/"
              target="_blank"
              rel="noreferrer"
              aria-label="Vannabe on LinkedIn"
            >
              <span className="logo-mark">in</span>
              <span>
                <b>LinkedIn</b>
                <small>neang-vanna2129</small>
              </span>
            </a>
            <a
              className="contact-logo"
              href="https://github.com/Vannabe-ur"
              target="_blank"
              rel="noreferrer"
              aria-label="Vannabe on GitHub"
            >
              <span className="logo-mark github-mark">&lt;/&gt;</span>
              <span>
                <b>GitHub</b>
                <small>Vannabe-ur</small>
              </span>
            </a>
          </div>
          <footer>© 2026 Vannabe (SHIN). All rights reserved.</footer>
        </div>
      </section>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setSelected(null)} aria-label="Close">
              ×
            </button>
            <p className="modal-kicker">
              Project / {selected.number} · {selected.year}
            </p>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <p>
              <b>Role:</b> {selected.role}
              <br />
              <b>Tools:</b> {selected.tools}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
