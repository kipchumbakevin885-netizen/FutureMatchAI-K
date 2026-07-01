/* ============================================================
   FutureMatch AI — ai.js
   Simulated "AI" recommendation engine.
   No backend / no real ML — deterministic scoring functions
   that behave like a recommender so the demo feels realistic.
   ============================================================ */

const FutureMatchAI_Engine = (function () {

  /**
   * Score a single career against a student's profile.
   * Weighs: matching skills (40%), matching interests (30%),
   * course relevance (15%), assessment score (15%).
   */
  function scoreCareer(career, profile) {
    const studentSkills = (profile.skills || []).map(s => s.toLowerCase());
    const studentInterests = (profile.interests || []).map(i => i.toLowerCase());

    const careerSkills = career.skills.map(s => s.toLowerCase());
    const careerInterests = career.interests.map(i => i.toLowerCase());

    const skillMatches = careerSkills.filter(s => studentSkills.includes(s)).length;
    const skillScore = careerSkills.length ? (skillMatches / careerSkills.length) : 0;

    const interestMatches = careerInterests.filter(i => studentInterests.includes(i)).length;
    const interestScore = careerInterests.length ? (interestMatches / careerInterests.length) : 0;

    // Course relevance: rough keyword match between course & career field
    let courseScore = 0.3; // baseline
    if (profile.course) {
      const course = profile.course.toLowerCase();
      if (career.field === "ICT" && /ict|comput|software|it\b/.test(course)) courseScore = 1;
      else if (career.field === "Engineering" && /engineer|electrical|mechanic/.test(course)) courseScore = 1;
      else if (career.field === "Business" && /business|market|commerce/.test(course)) courseScore = 1;
      else if (career.field === "Creative" && /design|art|media/.test(course)) courseScore = 1;
    }

    const assessmentScore = (profile.assessmentTagCounts && profile.assessmentTagCounts[career.id])
      ? Math.min(1, profile.assessmentTagCounts[career.id] / 3)
      : 0.2;

    const total =
      skillScore * 0.40 +
      interestScore * 0.30 +
      courseScore * 0.15 +
      assessmentScore * 0.15;

    // Add small deterministic variance based on demand so results feel alive
    const demandBoost = (career.demand / 100) * 0.05;

    return Math.round(Math.min(100, (total + demandBoost) * 100));
  }

  /**
   * Return careers ranked by match % for a given student profile.
   */
  function recommendCareers(profile, limit = CAREERS.length) {
    return CAREERS
      .map(career => ({ ...career, matchScore: scoreCareer(career, profile) }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  /**
   * Overall "Career Match Score" shown on the dashboard —
   * average of the top 3 recommended careers.
   */
  function overallMatchScore(profile) {
    const top = recommendCareers(profile, 3);
    if (!top.length) return 0;
    const avg = top.reduce((sum, c) => sum + c.matchScore, 0) / top.length;
    return Math.round(avg);
  }

  /**
   * Generate a short list of human-readable AI recommendation
   * messages for the dashboard "AI Recommendations" panel.
   */
  function generateInsights(profile) {
    const top = recommendCareers(profile, 3);
    const insights = [];

    if (top[0]) {
      insights.push({
        icon: "fa-solid fa-star",
        text: `Your strongest match is ${top[0].title} at ${top[0].matchScore}%. Consider exploring internships in this field.`
      });
    }
    if (top[1]) {
      const missing = top[1].skills.filter(s => !(profile.skills || []).map(x=>x.toLowerCase()).includes(s.toLowerCase()));
      if (missing.length) {
        insights.push({
          icon: "fa-solid fa-graduation-cap",
          text: `Learning ${missing[0]} could raise your match for ${top[1].title} significantly.`
        });
      }
    }
    const lowSkillCount = (profile.skills || []).length < 3;
    if (lowSkillCount) {
      insights.push({
        icon: "fa-solid fa-triangle-exclamation",
        text: `Your profile lists only ${((profile.skills||[]).length)} skills. Add more to unlock stronger matches.`
      });
    } else {
      insights.push({
        icon: "fa-solid fa-arrow-trend-up",
        text: `Demand for ${top[0] ? top[0].title : "your top career"} has grown steadily this year in Kenya's job market.`
      });
    }
    insights.push({
      icon: "fa-solid fa-briefcase",
      text: `${JOBS.filter(j => top.some(c => c.id === j.field)).length} open jobs/internships currently match your recommended careers.`
    });

    return insights;
  }

  /**
   * Build a simple learning roadmap (ordered milestones) toward
   * the student's top-matched career.
   */
  function buildLearningRoadmap(profile) {
    const top = recommendCareers(profile, 1)[0];
    if (!top) return [];

    const known = (profile.skills || []).map(s => s.toLowerCase());
    const gaps = top.skills.filter(s => !known.includes(s.toLowerCase()));

    const roadmap = [
      { stage: "Foundation", title: `Master the basics of ${top.title}`, done: known.length > 0 },
      ...gaps.map((skill, i) => ({
        stage: i === 0 ? "Skill Building" : "Specialization",
        title: `Learn ${skill}`,
        done: false
      })),
      { stage: "Practice", title: `Complete a project or internship in ${top.field}`, done: false },
      { stage: "Launch", title: `Apply for entry-level ${top.title} roles`, done: false }
    ];
    return roadmap;
  }

  /**
   * Process quiz answers into a tag-count map used to weight
   * assessment score in scoreCareer().
   */
  function scoreQuizAnswers(answers) {
    // answers: array of { questionId, selectedTags: [] }
    const counts = {};
    answers.forEach(a => {
      (a.selectedTags || []).forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }

  return {
    scoreCareer,
    recommendCareers,
    overallMatchScore,
    generateInsights,
    buildLearningRoadmap,
    scoreQuizAnswers
  };
})();
