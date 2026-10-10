/* ==========================================================================
   FATIMAH ZAHRA — INTERACTIVE AI PORTFOLIO SCRIPTS
   Includes: Neural Canvas, Typewriter, Interactive Skills Explorer,
   Live Project Simulators, Voice-Enabled AI Assistant, and LinkedIn Share Helper
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  initThemeToggle();
  initMobileNav();
  initTypewriter();
  initTiltCard();
  initSkillsExplorer();
  initAIAssistant();
  initContactAndShare();
  initModalClose();
  initNeuralCanvas();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("fz-portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  toggleBtn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fz-portfolio-theme", next);
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION & ACTIVE SCROLL SPY
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-link");

  menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 140;
    document.querySelectorAll("section[id]").forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach((l) => l.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        activeLink?.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. HERO TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const phrases = [
    "Intelligent AI & ML Systems",
    "Computer Vision & CNN Models",
    "Voice AI & NLP Applications",
    "Predictive Data Dashboards",
    "Full-Stack Python Web Apps"
  ];
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    el.textContent = currentPhrase.substring(0, charIdx);

    let delay = isDeleting ? 40 : 85;
    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = 1900;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  }

  setTimeout(tick, 1000);
}

/* --------------------------------------------------------------------------
   4. 3D TILT INTERACTION ON HERO PROFILE CARD
   -------------------------------------------------------------------------- */
function initTiltCard() {
  const card = document.getElementById("tilt-card");
  if (!card) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;
    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE SKILLS EXPLORER
   -------------------------------------------------------------------------- */
const SKILLS_DATA = [
  // Programming & Web
  { name: "Python", category: "languages", catLabel: "Programming", level: 95, projects: "Voice AI Agent, Agro AI", desc: "Primary language for Machine Learning, Deep Learning, Data Analytics, and Flask backends." },
  { name: "JavaScript", category: "languages", catLabel: "Programming", level: 86, projects: "Voice AI Agent, Agro AI", desc: "Used for interactive frontend UIs, real-time Speech Recognition/TTS integration, and REST APIs." },
  { name: "Java", category: "languages", catLabel: "Programming", level: 82, projects: "Core CS & OOP Engineering", desc: "Strong foundation in Object-Oriented Programming, data structures, and algorithmic problem solving." },
  { name: "C", category: "languages", catLabel: "Programming", level: 80, projects: "Systems & Core CS", desc: "Low-level programming, memory management, and foundational computer science algorithms." },
  { name: "HTML5 & CSS3", category: "languages", catLabel: "Web Tech", level: 92, projects: "Voice AI Agent, Agro AI", desc: "Responsive, clean, and accessible web interfaces with modern layouts and dark/light themes." },

  // Machine Learning & Deep Learning
  { name: "Machine Learning (Supervised & Unsupervised)", category: "ai-ml", catLabel: "AI / ML", level: 92, projects: "Agro AI, Predictive Modeling", desc: "Classification, Regression, Clustering, Random Forests, and end-to-end model evaluation." },
  { name: "Computer Vision & CNNs", category: "ai-ml", catLabel: "Deep Learning", level: 90, projects: "Agro AI Smart Farming", desc: "Convolutional Neural Networks for leaf disease classification and weed detection on PlantVillage data." },
  { name: "Natural Language Processing (NLP)", category: "ai-ml", catLabel: "Deep Learning", level: 90, projects: "Voice AI Healthcare Agent", desc: "Intent recognition, conversational symptom triage, speech-to-text, and text-to-speech pipelines." },
  { name: "Large Language Models (LLMs)", category: "ai-ml", catLabel: "Deep Learning", level: 88, projects: "Voice AI Healthcare Agent", desc: "Autonomous LLM tool-calling, context session management, and adaptive dialogue generation." },
  { name: "Feature Engineering & Predictive Modeling", category: "ai-ml", catLabel: "AI / ML", level: 89, projects: "Agro AI, Data Analytics", desc: "Transforming raw soil and clinical datasets into high-signal predictive features." },
  { name: "Neural Networks", category: "ai-ml", catLabel: "Deep Learning", level: 88, projects: "Deep Learning Research & Projects", desc: "Multi-layer perceptrons, backpropagation, activation functions, and hyperparameter tuning." },

  // Libraries & Data Science
  { name: "PyTorch & TensorFlow", category: "libraries", catLabel: "DL Frameworks", level: 88, projects: "Agro AI (PyTorch CNN)", desc: "Building, training, and checkpointing deep neural networks for image and text tasks." },
  { name: "Scikit-learn", category: "libraries", catLabel: "ML Library", level: 92, projects: "Agro AI Crop Predictor", desc: "Random Forest classifiers, preprocessing pipelines, cross-validation, and model metrics." },
  { name: "Pandas & NumPy", category: "libraries", catLabel: "Data Science", level: 94, projects: "Agro AI & Data Analytics", desc: "High-performance data cleaning, tabular manipulation, numerical computing, and aggregation." },
  { name: "Matplotlib & Data Visualization", category: "libraries", catLabel: "Analytics", level: 90, projects: "Data Science & Analytics", desc: "Statistical charting, exploratory data analysis (EDA), and actionable visual reporting." },

  // Databases & Developer Tools
  { name: "SQL & MySQL", category: "db-tools", catLabel: "Database", level: 88, projects: "Voice AI Agent, Agro AI", desc: "Relational schema design, appointment persistence, soil reading history, and queries." },
  { name: "MongoDB", category: "db-tools", catLabel: "NoSQL DB", level: 84, projects: "Voice AI Healthcare Agent", desc: "Document-based storage for flexible healthcare conversation logs and patient intake records." },
  { name: "Git & GitHub", category: "db-tools", catLabel: "Dev Tools", level: 90, projects: "All Repositories (@Fatimahzahra16)", desc: "Version control, branching workflows, documentation, and collaborative software development." },
  { name: "VS Code, Jupyter & Google Colab", category: "db-tools", catLabel: "Dev Tools", level: 94, projects: "All AI & Web Projects", desc: "GPU-accelerated notebook experimentation in Colab/Jupyter and full-stack development in VS Code." }
];

function initSkillsExplorer() {
  const grid = document.getElementById("skills-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const spotlightTitle = document.getElementById("spotlight-title");
  const spotlightDesc = document.getElementById("spotlight-desc");

  if (!grid) return;

  function renderSkills(category = "all") {
    grid.innerHTML = "";
    const filtered = category === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === category);

    filtered.forEach((skill) => {
      const card = document.createElement("div");
      card.className = "skill-card glass-card";
      card.innerHTML = `
        <div class="skill-card-top">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-cat-badge">${skill.catLabel}</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
        </div>
        <div class="skill-meta-text">Used in: <strong>${skill.projects}</strong></div>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".skill-card").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        spotlightTitle.textContent = `${skill.name} (${skill.level}% Proficiency)`;
        spotlightDesc.textContent = `${skill.desc} — Featured in: ${skill.projects}.`;
      });

      grid.appendChild(card);
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSkills(btn.getAttribute("data-category"));
    });
  });

  renderSkills("all");
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE PROJECT DEMO SIMULATORS (MODAL)
   -------------------------------------------------------------------------- */
window.openProjectDemo = function (projectType) {
  const modal = document.getElementById("demo-modal");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");
  if (!modal || !title || !body) return;

  if (projectType === "voice") {
    title.textContent = "🩺 Voice AI Healthcare Agent — Interactive Triage & Booking Simulator";
    body.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">
        Experience how Fatimah's <strong>Voice AI Agent</strong> processes natural-language patient requests, performs symptom triage, and autonomously executes appointment booking tools.
      </p>
      <div class="sim-box">
        <label style="font-size:0.84rem;color:var(--text-secondary);display:block;margin-bottom:0.5rem;">Select a Simulated Patient Voice Command:</label>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">
          <button class="btn btn-outline btn-sm" onclick="runVoiceSim('triage')">"I have a mild fever and headache since yesterday"</button>
          <button class="btn btn-outline btn-sm" onclick="runVoiceSim('book')">"Book an appointment with Dr. Sarah Smith on Monday at 10 AM"</button>
          <button class="btn btn-outline btn-sm" onclick="runVoiceSim('slots')">"Check available cardiology slots for Dr. Michael Johnson"</button>
        </div>
        <div class="sim-output" id="voice-sim-output">
          <strong>🤖 AI Agent Ready:</strong> Click any voice command above to see the NLP intent recognition, medical triage response, and autonomous database state update.
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
        <span style="font-size:0.8rem;color:var(--text-secondary);">Tech: Python, NLP, Speech Recognition, TTS, MySQL &amp; MongoDB</span>
        <a href="https://github.com/shutupzunaira/voice-ai-agent" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Open Full GitHub Repo</a>
      </div>
    `;
  } else if (projectType === "agro") {
    title.textContent = "🌱 Agro AI Smart Farming — Crop & Disease Predictor Simulator";
    body.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">
        Adjust the soil parameters below to test a live simulation of Fatimah's <strong>Random Forest Crop Recommendation Engine</strong> &amp; <strong>PyTorch CNN Leaf Disease Detector</strong>.
      </p>
      <div class="sim-box">
        <div class="sim-controls-grid">
          <div class="sim-control">
            <label><span>Nitrogen (N)</span><strong id="val-n">90</strong></label>
            <input type="range" id="sim-n" min="10" max="140" value="90" oninput="updateAgroSim()" />
          </div>
          <div class="sim-control">
            <label><span>Soil pH</span><strong id="val-ph">6.5</strong></label>
            <input type="range" id="sim-ph" min="4.5" max="8.5" step="0.1" value="6.5" oninput="updateAgroSim()" />
          </div>
          <div class="sim-control">
            <label><span>Rainfall (mm)</span><strong id="val-rain">210</strong></label>
            <input type="range" id="sim-rain" min="40" max="300" value="210" oninput="updateAgroSim()" />
          </div>
          <div class="sim-control">
            <label><span>Temperature (°C)</span><strong id="val-temp">25</strong></label>
            <input type="range" id="sim-temp" min="15" max="40" value="25" oninput="updateAgroSim()" />
          </div>
        </div>
        <div class="sim-output" id="agro-sim-output">
          <strong>🌾 Recommended Crop: Rice (96.4% Confidence)</strong><br/>
          <span style="font-size:0.84rem;color:var(--text-secondary);">High nitrogen and rainfall (>180mm) with slightly acidic-to-neutral pH (6.5) is optimal for paddy cultivation. CNN Leaf Status: Healthy (PlantVillage 38-class model).</span>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
        <span style="font-size:0.8rem;color:var(--text-secondary);">Tech: Python, Flask, Scikit-learn, PyTorch CNN, SQL</span>
        <a href="https://github.com/shutupzunaira/agro-ai" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Open Full GitHub Repo</a>
      </div>
    `;
  } else if (projectType === "placement") {
    title.textContent = "📊 Student Placement Dashboard — Interactive Analytics Preview";
    body.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">
        Explore sample insights generated by Fatimah's <strong>Python, Pandas &amp; Matplotlib Placement Analytics Pipeline</strong> after data cleaning and statistical preprocessing.
      </p>
      <div class="sim-box">
        <div style="display:flex;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" onclick="updatePlacementView('cgpa')">CGPA vs Placement Rate</button>
          <button class="btn btn-outline btn-sm" onclick="updatePlacementView('skills')">Top In-Demand Skills</button>
        </div>
        <div id="placement-chart-area" class="sim-output">
          <strong>📈 Statistical Insight (CGPA Correlation):</strong>
          <div style="margin-top:0.75rem;display:flex;flex-direction:column;gap:0.5rem;">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.82rem;"><span>CGPA &ge; 8.5 (Including Fatimah's 8.89 Bracket)</span><strong>94% Placed</strong></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:94%"></div></div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.82rem;"><span>CGPA 7.5 – 8.4</span><strong>81% Placed</strong></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:81%"></div></div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.82rem;"><span>CGPA 6.5 – 7.4</span><strong>64% Placed</strong></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:64%"></div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  modal.hidden = false;
};

window.runVoiceSim = function (mode) {
  const out = document.getElementById("voice-sim-output");
  if (!out) return;
  if (mode === "triage") {
    out.innerHTML = `
      <strong>🩺 Triage Assessment (Non-Emergency):</strong><br/>
      • <strong>Detected Symptoms:</strong> Mild fever, headache (Duration: 24h)<br/>
      • <strong>AI Follow-up:</strong> "Are you experiencing any stiff neck, shortness of breath, or vision changes? If not, I recommend scheduling a General Practice consultation with Dr. Sarah Smith."
    `;
  } else if (mode === "book") {
    out.innerHTML = `
      <strong>✅ Autonomous Tool Executed: <code>/api/voice-agent/book-appointment</code></strong><br/>
      • <strong>Doctor:</strong> Dr. Sarah Smith (General Practice)<br/>
      • <strong>Slot:</strong> Monday, 10:00 AM<br/>
      • <strong>Database State:</strong> Persisted in <code>Medical_DB</code> (Status: CONFIRMED)
    `;
  } else {
    out.innerHTML = `
      <strong>📅 Tool Executed: <code>/api/voice-agent/check-slots</code></strong><br/>
      • <strong>Dr. Michael Johnson (Cardiology):</strong> Available at 09:00 AM, 11:30 AM, and 02:30 PM.<br/>
      • <strong>Clinic Hours Validated:</strong> Mon–Fri 9:00 AM – 5:00 PM (HIPAA-aligned session active).
    `;
  }
};

window.updateAgroSim = function () {
  const n = parseFloat(document.getElementById("sim-n")?.value || 90);
  const ph = parseFloat(document.getElementById("sim-ph")?.value || 6.5);
  const rain = parseFloat(document.getElementById("sim-rain")?.value || 210);
  const temp = parseFloat(document.getElementById("sim-temp")?.value || 25);

  document.getElementById("val-n").textContent = n;
  document.getElementById("val-ph").textContent = ph.toFixed(1);
  document.getElementById("val-rain").textContent = rain;
  document.getElementById("val-temp").textContent = temp;

  let crop = "Rice";
  let note = "High rainfall and nitrogen levels favor paddy cultivation.";
  if (rain < 90 && temp > 28) {
    crop = "Millet / Sorghum";
    note = "Drought-tolerant crop ideal for low rainfall and warm temperatures.";
  } else if (n > 100 && rain >= 90 && rain <= 170) {
    crop = "Cotton / Maize";
    note = "High nitrogen with moderate rainfall supports strong vegetative growth.";
  } else if (ph < 5.8 && rain > 150) {
    crop = "Tea / Coffee";
    note = "Acidic soil pH combined with generous rainfall is ideal for plantation crops.";
  } else if (temp < 22) {
    crop = "Wheat / Chickpea";
    note = "Cooler temperature profile suits rabi season cultivation.";
  }

  const out = document.getElementById("agro-sim-output");
  if (out) {
    out.innerHTML = `
      <strong>🌾 Recommended Crop: ${crop} (Random Forest Classifier)</strong><br/>
      <span style="font-size:0.84rem;color:var(--text-secondary);">${note} (N=${n}, pH=${ph.toFixed(1)}, Rain=${rain}mm, Temp=${temp}°C)</span>
    `;
  }
};

window.updatePlacementView = function (view) {
  const area = document.getElementById("placement-chart-area");
  if (!area) return;
  if (view === "skills") {
    area.innerHTML = `
      <strong>🐍 Top Technical Skills Correlated with Offers (Pandas Analysis):</strong>
      <div style="margin-top:0.75rem;display:flex;flex-direction:column;gap:0.5rem;">
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;"><span>Python + Machine Learning / AI</span><strong>92% Selection Rate</strong></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:92%"></div></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;"><span>SQL / MongoDB + Full-Stack Web</span><strong>85% Selection Rate</strong></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:85%"></div></div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;"><span>Data Analytics (Pandas / Matplotlib)</span><strong>80% Selection Rate</strong></div>
          <div class="skill-bar-track"><div class="skill-bar-fill" style="width:80%"></div></div>
        </div>
      </div>
    `;
  } else {
    window.openProjectDemo("placement");
  }
};

function initModalClose() {
  const modal = document.getElementById("demo-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  closeBtn?.addEventListener("click", () => {
    modal.hidden = true;
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.hidden = true;
    }
  });
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE AI PORTFOLIO ASSISTANT (WITH VOICE STT & TTS)
   -------------------------------------------------------------------------- */
function initAIAssistant() {
  const form = document.getElementById("ai-chat-form");
  const input = document.getElementById("ai-chat-input");
  const messages = document.getElementById("ai-chat-messages");
  const chips = document.querySelectorAll(".prompt-chip");
  const ttsBtn = document.getElementById("toggle-tts-btn");
  const ttsLabel = document.getElementById("tts-status-label");
  const clearBtn = document.getElementById("clear-chat-btn");
  const voiceInputBtn = document.getElementById("voice-input-btn");

  let voiceEnabled = false;

  ttsBtn?.addEventListener("click", () => {
    voiceEnabled = !voiceEnabled;
    if (ttsLabel) ttsLabel.textContent = voiceEnabled ? "Voice: On" : "Voice: Off";
    if (!voiceEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  });

  clearBtn?.addEventListener("click", () => {
    messages.innerHTML = `
      <div class="chat-msg bot-msg">
        <div class="msg-avatar"><i data-lucide="bot" class="icon-xs"></i></div>
        <div class="msg-bubble">
          Conversation reset! Ask me anything about <strong>Fatimah Zahra's</strong> AI projects, technical skills, education, or contact info.
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  });

  function speakText(htmlText) {
    if (!voiceEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const plain = htmlText.replace(/<[^>]+>/g, "");
    const utter = new SpeechSynthesisUtterance(plain);
    utter.rate = 1.04;
    window.speechSynthesis.speak(utter);
  }

  function generateAIResponse(query) {
    const q = query.toLowerCase();

    if (q.includes("voice") || q.includes("healthcare") || q.includes("triage") || q.includes("appointment")) {
      return `<strong>Voice AI Agent for Healthcare Website</strong> (<a href="https://github.com/shutupzunaira/voice-ai-agent" target="_blank" style="color:var(--accent-secondary)">GitHub Repo</a>) is an AI-powered medical triage and autonomous appointment scheduling assistant built by Fatimah Zahra. It integrates <strong>Speech Recognition, NLP, Text-to-Speech, and LLM tool-calling</strong> with real database persistence in <strong>MySQL &amp; MongoDB</strong> to book, reschedule, and cancel clinic appointments autonomously.`;
    }
    if (q.includes("agro") || q.includes("farm") || q.includes("crop") || q.includes("disease") || q.includes("plant")) {
      return `<strong>Agro AI Smart Farming Platform</strong> (<a href="https://github.com/shutupzunaira/agro-ai" target="_blank" style="color:var(--accent-secondary)">GitHub Repo</a>) is a full-stack Python &amp; Flask application for smart agriculture. It uses <strong>Machine Learning (Random Forest)</strong> on soil N-P-K, pH, and rainfall for crop recommendation, and <strong>Computer Vision (PyTorch CNN)</strong> for leaf disease and weed detection, complete with farmer authentication and soil analytics dashboards.`;
    }
    if (q.includes("project")) {
      return `Fatimah has built flagship end-to-end AI projects:<br/>1️⃣ <strong>Voice AI Agent for Healthcare Website</strong> (Python, NLP, Speech/TTS, MySQL, MongoDB — <a href="https://github.com/shutupzunaira/voice-ai-agent" target="_blank" style="color:var(--accent-secondary)">GitHub</a>)<br/>2️⃣ <strong>Agro AI Smart Farming Platform</strong> (Python, Flask, Machine Learning, Computer Vision CNN — <a href="https://github.com/shutupzunaira/agro-ai" target="_blank" style="color:var(--accent-secondary)">GitHub</a>).`;
    }
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("ml") || q.includes("deep learning")) {
      return `Fatimah's technical stack includes:<br/>• <strong>Languages:</strong> Python, Java, C, JavaScript<br/>• <strong>AI/ML &amp; DL:</strong> Supervised/Unsupervised Learning, CNNs, Neural Networks, Computer Vision, NLP, LLMs, Feature Engineering<br/>• <strong>Libraries:</strong> NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch, Matplotlib<br/>• <strong>Web &amp; DBs:</strong> HTML, CSS, JS, SQL, MySQL, MongoDB, Git &amp; GitHub.`;
    }
    if (q.includes("education") || q.includes("college") || q.includes("cgpa") || q.includes("bms") || q.includes("degree") || q.includes("school")) {
      return `Fatimah is pursuing her <strong>B.E. in Computer Science Engineering</strong> at <strong>BMS Institute of Technology and Management (BMSIT&amp;M), Bengaluru</strong> with an impressive <strong>CGPA of 8.89/10</strong>. She also scored <strong>85% in Class XII</strong> and <strong>93% in Class X</strong>, and participated in the <strong>HackFest-1.0 National Level Hackathon</strong>.`;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach") || q.includes("location") || q.includes("linkedin") || q.includes("github")) {
      return `You can contact <strong>Fatimah Zahra</strong> directly:<br/>📧 <strong>Email:</strong> <a href="mailto:fz37685@gmail.com" style="color:var(--accent-secondary)">fz37685@gmail.com</a><br/>📞 <strong>Phone:</strong> +91 8630039017<br/>📍 <strong>Location:</strong> Bengaluru, India<br/>🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/fatimah-zahra" target="_blank" style="color:var(--accent-secondary)">linkedin.com/in/fatimah-zahra</a><br/>💻 <strong>GitHub:</strong> <a href="https://github.com/Fatimahzahra16" target="_blank" style="color:var(--accent-secondary)">github.com/Fatimahzahra16</a>`;
    }

    return `Fatimah Zahra is a Computer Science Engineering student at BMSIT&amp;M (<strong>8.89 CGPA</strong>) specializing in <strong>Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, and NLP</strong>. Ask me about her <strong>Voice AI Agent</strong>, <strong>Agro AI</strong>, <strong>technical skills</strong>, or <strong>contact details</strong>!`;
  }

  function appendMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${sender === "user" ? "user-msg" : "bot-msg"}`;
    msg.innerHTML = `
      <div class="msg-avatar"><i data-lucide="${sender === "user" ? "user" : "bot"}" class="icon-xs"></i></div>
      <div class="msg-bubble">${text}</div>
    `;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    if (window.lucide) lucide.createIcons();
  }

  function handleQuery(userText) {
    if (!userText.trim()) return;
    appendMessage(userText, "user");
    setTimeout(() => {
      const reply = generateAIResponse(userText);
      appendMessage(reply, "bot");
      speakText(reply);
    }, 320);
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = "";
    handleQuery(val);
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt");
      handleQuery(prompt);
    });
  });

  // Web Speech API Microphone Input
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition && voiceInputBtn) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    voiceInputBtn.addEventListener("click", () => {
      voiceInputBtn.classList.add("listening");
      recognition.start();
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      voiceInputBtn.classList.remove("listening");
      handleQuery(transcript);
    };

    recognition.onerror = () => {
      voiceInputBtn.classList.remove("listening");
    };

    recognition.onend = () => {
      voiceInputBtn.classList.remove("listening");
    };
  } else if (voiceInputBtn) {
    voiceInputBtn.addEventListener("click", () => {
      showToast("Voice input is supported in Chrome/Edge browsers.");
    });
  }
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM, CLIPBOARD COPY & LINKEDIN SHARE GENERATOR
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

function initContactAndShare() {
  // Copy buttons
  document.querySelectorAll(".copy-btn[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(val);
      showToast(`Copied: ${val}`);
    });
  });

  // Copy Website Link
  const copySiteBtn = document.getElementById("copy-site-link-btn");
  copySiteBtn?.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Live Website Link copied to clipboard!");
  });

  // Prepare LinkedIn Post Modal (Tailored for InAmigos Foundation Task 1!)
  const shareLinkedinBtn = document.getElementById("share-linkedin-btn");
  shareLinkedinBtn?.addEventListener("click", () => {
    const modal = document.getElementById("demo-modal");
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");
    const siteUrl = window.location.href;

    const postTemplate = `🌐 Excited to share my AI-Powered Personal Profile & Portfolio Website built as part of Task 1 with @InAmigos Foundation! 🤖✨

It features:
🔹 My background in Computer Science Engineering (BMSIT&M) & AI/ML skills
🔹 Interactive demos of my projects: Voice AI Healthcare Agent & Agro AI Smart Farming Platform
🔹 A built-in Voice-enabled AI Portfolio Assistant

🔗 Live Website: ${siteUrl}
🔗 LinkedIn: https://www.linkedin.com/in/fatimah-zahra
💻 GitHub: https://github.com/Fatimahzahra16

Thank you @InAmigos Foundation for this hands-on learning opportunity!
#InAmigosFoundation #AIPortfolio #ArtificialIntelligence #MachineLearning #WebDevelopment #Python`;

    title.textContent = "📢 Share Your Portfolio on LinkedIn (Task 1 Helper)";
    body.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:0.85rem;">
        Copy this ready-to-post caption (tagging <strong>InAmigos Foundation</strong>) and share your live link on LinkedIn! Don't forget to take a screenshot for your Google Drive folder.
      </p>
      <textarea id="linkedin-post-text" rows="10" style="width:100%;padding:0.85rem;border-radius:8px;background:var(--bg-primary);color:var(--text-primary);border:1px solid var(--border-color);font-family:var(--font-sans);font-size:0.86rem;margin-bottom:1rem;">${postTemplate}</textarea>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" onclick="copyLinkedInPost()">Copy Caption &amp; Open LinkedIn</button>
      </div>
    `;
    modal.hidden = false;
  });

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("sender-name").value;
    const email = document.getElementById("sender-email").value;
    const subject = document.getElementById("sender-subject").value;
    const message = document.getElementById("sender-message").value;

    const mailtoUrl = `mailto:fz37685@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUrl;

    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = `Thank you, ${name}! Opening your email client to send your message to fz37685@gmail.com.`;
    }
    contactForm.reset();
  });
}

window.copyLinkedInPost = function () {
  const txt = document.getElementById("linkedin-post-text")?.value || "";
  navigator.clipboard.writeText(txt);
  showToast("Caption copied! Opening LinkedIn...");
  setTimeout(() => {
    window.open("https://www.linkedin.com/feed/", "_blank", "noopener");
  }, 600);
};

/* --------------------------------------------------------------------------
   9. NEURAL NETWORK INTERACTIVE PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initNeuralCanvas() {
  const canvas = document.getElementById("neural-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const count = Math.min(55, Math.floor((width * height) / 24000));
  const mouse = { x: null, y: null, radius: 130 };

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      size: Math.random() * 2 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(99, 102, 241, 0.55)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 135) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - mDist / mouse.radius) * 0.35})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}
