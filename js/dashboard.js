/* ============================================================
   FutureMatch AI — dashboard.js
   Renders the student dashboard using the logged-in profile
   stored in localStorage (FMAuth) and the AI simulation engine.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  requireAuth();
  const profile = FMAuth.getUser();
  if (!profile) return;

  renderWelcome(profile);
  renderMatchRing(profile);
  renderStats(profile);
  renderInsights(profile);
  renderCareerMini(profile);
  renderRoadmap(profile);
  renderInternships(profile);
  renderSkillsProgress(profile);
  renderSavedJobs(profile);
  renderProfileCard(profile);
});

function initials(name) {
  if (!name) return "S";
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function renderWelcome(profile) {
  const firstName = (profile.name || "Student").split(" ")[0];
  document.getElementById("welcomeName").textContent = `Welcome back, ${firstName}! 👋`;
  document.getElementById("welcomeSub").textContent =
    `You're enrolled in ${profile.course || "your course"} at ${profile.institution || "your institution"}. Here's your career snapshot today.`;
  document.getElementById("topbarAvatar").textContent = initials(profile.name);
  document.getElementById("profilePanelName").textContent = profile.name || "Student";
}

function renderMatchRing(profile) {
  const score = FutureMatchAI_Engine.overallMatchScore(profile);
  const circle = document.getElementById("matchRing");
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;
  setTimeout(() => { circle.style.strokeDashoffset = offset; }, 200);
  document.getElementById("matchScoreText").textContent = score + "%";
}

function renderStats(profile) {
  const careers = FutureMatchAI_Engine.recommendCareers(profile);
  const topCareerIds = careers.slice(0, 5).map(c => c.id);
  const matchedJobs = JOBS.filter(j => topCareerIds.includes(j.field));
  const saved = JSON.parse(localStorage.getItem("futurematch_saved_jobs") || "[]");

  animateStat("statCareers", careers.filter(c => c.matchScore >= 60).length);
  animateStat("statJobs", matchedJobs.length);
  animateStat("statSaved", saved.length);
  animateStat("statSkills", (profile.skills || []).length);
}

function animateStat(id, target) {
  const el = document.getElementById(id);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current;
  }, 30);
}

function renderInsights(profile) {
  const insights = FutureMatchAI_Engine.generateInsights(profile);
  const container = document.getElementById("insightsList");
  container.innerHTML = insights.map(i => `
    <div class="insight-item">
      <div class="insight-icon"><i class="${i.icon}"></i></div>
      <p>${i.text}</p>
    </div>
  `).join("");
}

function renderCareerMini(profile) {
  const careers = FutureMatchAI_Engine.recommendCareers(profile, 4);
  const container = document.getElementById("careerMiniList");
  container.innerHTML = careers.map(c => `
    <div class="career-mini-card">
      <div class="career-mini-icon"><i class="${c.icon}"></i></div>
      <div class="flex-grow-1">
        <div class="fw-bold" style="font-size:0.92rem;">${c.title}</div>
        <div class="text-muted" style="font-size:0.78rem;">${c.salaryRange}</div>
      </div>
      <div class="match-pct">${c.matchScore}%</div>
    </div>
  `).join("");
}

function renderRoadmap(profile) {
  const roadmap = FutureMatchAI_Engine.buildLearningRoadmap(profile);
  const list = document.getElementById("roadmapList");
  list.innerHTML = roadmap.map(step => `
    <li class="${step.done ? "done" : ""}">
      <div class="roadmap-dot"><i class="fa-solid ${step.done ? "fa-check" : "fa-circle"}" style="font-size:${step.done ? '0.7rem' : '0.4rem'};"></i></div>
      <div>
        <div class="roadmap-stage">${step.stage}</div>
        <h6>${step.title}</h6>
      </div>
    </li>
  `).join("");
}

function renderInternships(profile) {
  const careers = FutureMatchAI_Engine.recommendCareers(profile, 5).map(c => c.id);
  const internships = JOBS.filter(j => careers.includes(j.field) && j.type !== "Full-time").slice(0, 3);
  const container = document.getElementById("internshipList");
  if (!internships.length) {
    container.innerHTML = `<p class="text-muted" style="font-size:0.85rem;">No internships matched yet — update your skills to see more.</p>`;
    return;
  }
  container.innerHTML = internships.map(j => `
    <div class="saved-job-item">
      <div class="job-logo-sm">${j.logo}</div>
      <div class="flex-grow-1">
        <div class="fw-bold" style="font-size:0.86rem;">${j.title}</div>
        <div class="text-muted" style="font-size:0.76rem;">${j.company} · ${j.location}</div>
      </div>
    </div>
  `).join("");
}

function renderSkillsProgress(profile) {
  const skills = profile.skills && profile.skills.length ? profile.skills : ["Problem Solving"];
  const container = document.getElementById("skillsProgressList");
  container.innerHTML = skills.slice(0, 5).map((s, i) => {
    const level = 55 + ((i * 13) % 40); // deterministic pseudo-progress
    return `
    <div class="skill-progress-item">
      <div class="lbl-row"><span>${s}</span><span>${level}%</span></div>
      <div class="progress-track"><div class="fill" style="width:${level}%;"></div></div>
    </div>`;
  }).join("");
}

function renderSavedJobs(profile) {
  const savedIds = JSON.parse(localStorage.getItem("futurematch_saved_jobs") || "[]");
  const saved = JOBS.filter(j => savedIds.includes(j.id));
  const container = document.getElementById("savedJobsList");
  if (!saved.length) {
    container.innerHTML = `<p class="text-muted" style="font-size:0.85rem;">You haven't saved any jobs yet. <a href="jobs.html">Browse jobs</a></p>`;
    return;
  }
  container.innerHTML = saved.map(j => `
    <div class="saved-job-item">
      <div class="job-logo-sm">${j.logo}</div>
      <div class="flex-grow-1">
        <div class="fw-bold" style="font-size:0.86rem;">${j.title}</div>
        <div class="text-muted" style="font-size:0.76rem;">${j.company}</div>
      </div>
    </div>
  `).join("");
}

function renderProfileCard(profile) {
  document.getElementById("profileAvatarBig").textContent = initials(profile.name);
  document.getElementById("profileNameBig").textContent = profile.name || "Student";
  document.getElementById("profileEmailBig").textContent = profile.email || "—";
  document.getElementById("profileInstitution").textContent = profile.institution || "—";
  document.getElementById("profileCourse").textContent = profile.course || "—";
  document.getElementById("profileSkillsCount").textContent = (profile.skills || []).length;
}
