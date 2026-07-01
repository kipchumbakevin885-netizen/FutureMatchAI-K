/* ============================================================
   FutureMatch AI — charts.js
   Chart.js setup helpers. Every function returns the created
   chart instance in case the caller needs to update it later.
   ============================================================ */

const FMCharts = (function () {

  const palette = {
    primary: "#2563EB",
    secondary: "#14B8A6",
    accent: "#F59E0B",
    danger: "#EF4444",
    gridColor: "rgba(148,163,184,0.2)",
    textColor: getComputedStyle(document.documentElement).getPropertyValue("--text-muted") || "#64748B"
  };

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = "#64748B";

  /* Skills Distribution — Doughnut */
  function skillsDistributionChart(canvasId, dataMap) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(dataMap),
        datasets: [{
          data: Object.values(dataMap),
          backgroundColor: [palette.primary, palette.secondary, palette.accent, "#8B5CF6", "#EC4899", "#0EA5E9"],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { position: "bottom", labels: { padding: 16, usePointStyle: true, boxWidth: 8 } }
        }
      }
    });
  }

  /* Career Match — Horizontal Bar */
  function careerMatchChart(canvasId, careers) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: careers.map(c => c.title),
        datasets: [{
          label: "Match %",
          data: careers.map(c => c.matchScore),
          backgroundColor: palette.primary,
          borderRadius: 8,
          barThickness: 18
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { max: 100, grid: { color: palette.gridColor }, ticks: { callback: v => v + "%" } },
          y: { grid: { display: false } }
        }
      }
    });
  }

  /* Employment Trends — Line */
  function employmentTrendsChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul"];
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "ICT Roles",
            data: [320, 355, 390, 410, 460, 500, 540],
            borderColor: palette.primary,
            backgroundColor: "rgba(37,99,235,0.12)",
            tension: 0.4, fill: true, pointRadius: 3
          },
          {
            label: "Technical Trades",
            data: [250, 260, 275, 290, 300, 320, 335],
            borderColor: palette.secondary,
            backgroundColor: "rgba(20,184,166,0.12)",
            tension: 0.4, fill: true, pointRadius: 3
          },
          {
            label: "Business & Creative",
            data: [180, 195, 200, 215, 230, 245, 260],
            borderColor: palette.accent,
            backgroundColor: "rgba(245,158,11,0.12)",
            tension: 0.4, fill: true, pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: {
          y: { grid: { color: palette.gridColor }, beginAtZero: true },
          x: { grid: { display: false } }
        }
      }
    });
  }

  /* Student Progress — Radar */
  function studentProgressChart(canvasId, dataMap) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: "radar",
      data: {
        labels: Object.keys(dataMap),
        datasets: [{
          label: "Skill Level",
          data: Object.values(dataMap),
          backgroundColor: "rgba(37,99,235,0.15)",
          borderColor: palette.primary,
          pointBackgroundColor: palette.primary,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            beginAtZero: true, max: 100,
            grid: { color: palette.gridColor },
            angleLines: { color: palette.gridColor },
            pointLabels: { font: { size: 11 } }
          }
        }
      }
    });
  }

  /* Generic simple Bar (used for admin: students/employers/jobs growth) */
  function growthBarChart(canvasId, labels, data, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{ data, backgroundColor: color || palette.primary, borderRadius: 6, barThickness: 22 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: palette.gridColor }, beginAtZero: true },
          x: { grid: { display: false } }
        }
      }
    });
  }

  /* Generic simple Doughnut (used for admin field distribution) */
  function fieldDistributionChart(canvasId, dataMap) {
    return skillsDistributionChart(canvasId, dataMap);
  }

  return {
    skillsDistributionChart,
    careerMatchChart,
    employmentTrendsChart,
    studentProgressChart,
    growthBarChart,
    fieldDistributionChart
  };
})();
