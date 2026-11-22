const reportStorageKey = "quietquest-simulated-reports-v1";
const seededReportCount = 1;
const noiseLabels = ["Very quiet", "Quiet", "Moderate", "Loud", "Very loud"];
const crowdLabels = ["Almost empty", "A few people", "Half full", "Busy", "Very crowded"];

const studySpaces = [
  {
    id: "angus-library",
    name: "Angus L. Macdonald Library",
    location: "Quiet floor · Main campus",
    noiseRating: 1,
    crowdRating: 2,
    icon: "▤",
  },
  {
    id: "mulroney-lounge",
    name: "Mulroney Hall Lounge",
    location: "Open seating · Mulroney Hall",
    noiseRating: 3,
    crowdRating: 3,
    icon: "⌂",
  },
  {
    id: "bloomfield-nook",
    name: "Bloomfield Centre Nook",
    location: "Lounge area · Bloomfield Centre",
    noiseRating: 4,
    crowdRating: 5,
    icon: "☕",
  },
];

const spaceGrid = document.querySelector("#space-grid");
const demoStatus = document.querySelector("#demo-status");
const resetButton = document.querySelector("#reset-demo");
const spaceCards = new Map();
let reports = [];
let storageError = null;

function readReports() {
  const savedReports = window.localStorage.getItem(reportStorageKey);
  if (savedReports === null) {
    return [];
  }

  const parsedReports = JSON.parse(savedReports);
  const validSpaceIds = new Set(studySpaces.map((space) => space.id));
  if (
    !Array.isArray(parsedReports) ||
    !parsedReports.every(
      (report) =>
        report &&
        validSpaceIds.has(report.spaceId) &&
        Number.isInteger(report.noiseRating) &&
        report.noiseRating >= 1 &&
        report.noiseRating <= 5 &&
        Number.isInteger(report.crowdRating) &&
        report.crowdRating >= 1 &&
        report.crowdRating <= 5,
    )
  ) {
    throw new Error("Saved simulated reports have an unexpected format.");
  }

  return parsedReports;
}

try {
  reports = readReports();
} catch (error) {
  storageError = error;
}

function getQuietScore(noiseRating, crowdRating) {
  return Math.round(((10 - noiseRating - crowdRating) / 8) * 100);
}

function getScoreDetails(score) {
  if (score >= 80) {
    return { label: "Very Quiet", color: "green" };
  }
  if (score >= 50) {
    return { label: "Moderate", color: "yellow" };
  }
  return { label: "Noisy", color: "red" };
}

function getSpaceSummary(space) {
  const spaceReports = reports.filter((report) => report.spaceId === space.id);
  const reportCount = seededReportCount + spaceReports.length;
  const noiseAverage =
    (space.noiseRating +
      spaceReports.reduce((total, report) => total + report.noiseRating, 0)) /
    reportCount;
  const crowdAverage =
    (space.crowdRating +
      spaceReports.reduce((total, report) => total + report.crowdRating, 0)) /
    reportCount;

  return {
    score: getQuietScore(noiseAverage, crowdAverage),
    noise: noiseLabels[Math.round(noiseAverage) - 1],
    crowd: crowdLabels[Math.round(crowdAverage) - 1],
    reportCount,
  };
}

function setDemoStatus(message, isError = false) {
  demoStatus.textContent = message;
  demoStatus.classList.toggle("demo-status-error", isError);
}

function makeRatingSelect(space, fieldName, labelText, descriptions) {
  const label = document.createElement("label");
  label.className = "report-field";

  const labelTextElement = document.createElement("span");
  labelTextElement.textContent = labelText;

  const select = document.createElement("select");
  select.id = `${space.id}-${fieldName}`;
  select.name = fieldName;
  select.required = true;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Choose a level";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.append(placeholder);

  descriptions.forEach((description, index) => {
    const option = document.createElement("option");
    option.value = String(index + 1);
    option.textContent = `${index + 1} — ${description}`;
    select.append(option);
  });

  label.htmlFor = select.id;
  label.append(labelTextElement, select);
  return label;
}

function updateSpaceCard(space) {
  const elements = spaceCards.get(space.id);
  const summary = getSpaceSummary(space);
  const scoreDetails = getScoreDetails(summary.score);

  elements.noiseValue.textContent = summary.noise;
  elements.crowdValue.textContent = summary.crowd;
  elements.scoreValue.textContent = `${summary.score}/100`;
  elements.progressTrack.className = `score-track score-${scoreDetails.color}`;
  elements.progressTrack.setAttribute(
    "aria-label",
    `${summary.score} out of 100, ${scoreDetails.label}`,
  );
  elements.progressTrack.setAttribute("aria-valuenow", String(summary.score));
  elements.progressFill.style.width = `${summary.score}%`;
  elements.scoreLabel.className = `score-label score-label-${scoreDetails.color}`;
  elements.scoreLabel.textContent = scoreDetails.label;
  elements.reportCount.textContent = `${summary.reportCount} sample report${
    summary.reportCount === 1 ? "" : "s"
  }`;
}

function createSpaceCard(space) {
  const card = document.createElement("article");
  card.className = "space-card";

  const topLine = document.createElement("div");
  topLine.className = "card-topline";

  const icon = document.createElement("span");
  icon.className = "space-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = space.icon;

  const sampleLabel = document.createElement("span");
  sampleLabel.className = "sample-label";
  sampleLabel.textContent = "Simulated data";
  topLine.append(icon, sampleLabel);

  const name = document.createElement("h3");
  name.id = `${space.id}-name`;
  name.textContent = space.name;

  const location = document.createElement("p");
  location.className = "space-location";
  location.textContent = space.location;

  const levels = document.createElement("div");
  levels.className = "levels";

  const noiseLevel = document.createElement("span");
  noiseLevel.className = "level";
  const noiseName = document.createElement("strong");
  noiseName.textContent = "Noise:";
  const noiseValue = document.createElement("span");
  noiseValue.className = "level-value";
  noiseLevel.append(noiseName, noiseValue);

  const crowdLevel = document.createElement("span");
  crowdLevel.className = "level";
  const crowdName = document.createElement("strong");
  crowdName.textContent = "Crowd:";
  const crowdValue = document.createElement("span");
  crowdValue.className = "level-value";
  crowdLevel.append(crowdName, crowdValue);
  levels.append(noiseLevel, crowdLevel);

  const reportCount = document.createElement("p");
  reportCount.className = "report-count";

  const scorePanel = document.createElement("div");
  scorePanel.className = "quiet-score";

  const scoreHeading = document.createElement("div");
  scoreHeading.className = "score-heading";

  const scoreTitle = document.createElement("span");
  scoreTitle.className = "score-title";
  scoreTitle.textContent = "QuietScore";

  const scoreValue = document.createElement("span");
  scoreValue.className = "score-value";
  scoreHeading.append(scoreTitle, scoreValue);

  const progressTrack = document.createElement("div");
  progressTrack.className = "score-track";
  progressTrack.setAttribute("role", "progressbar");
  progressTrack.setAttribute("aria-valuemin", "0");
  progressTrack.setAttribute("aria-valuemax", "100");

  const progressFill = document.createElement("span");
  progressFill.className = "score-fill";
  progressTrack.append(progressFill);

  const scoreLabel = document.createElement("span");
  scorePanel.append(scoreHeading, progressTrack, scoreLabel);

  const reportToggle = document.createElement("button");
  reportToggle.className = "report-toggle";
  reportToggle.type = "button";
  reportToggle.textContent = "Report Conditions";

  const reportForm = document.createElement("form");
  reportForm.className = "report-form";
  reportForm.id = `${space.id}-report-form`;
  reportForm.hidden = true;
  reportForm.setAttribute(
    "aria-label",
    `Submit simulated conditions for ${space.name}`,
  );
  reportForm.append(
    makeRatingSelect(space, "noiseRating", "Noise level", noiseLabels),
    makeRatingSelect(space, "crowdRating", "Crowd level", crowdLabels),
  );

  const formNote = document.createElement("p");
  formNote.className = "form-note";
  formNote.textContent = "Simulated report; saved only in this browser.";

  const submitButton = document.createElement("button");
  submitButton.className = "submit-report";
  submitButton.type = "submit";
  submitButton.textContent = "Submit Sample Report";
  reportForm.append(formNote, submitButton);

  const feedback = document.createElement("p");
  feedback.className = "report-feedback";
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");

  reportToggle.setAttribute("aria-expanded", "false");
  reportToggle.setAttribute("aria-controls", reportForm.id);
  reportToggle.addEventListener("click", () => {
    reportForm.hidden = !reportForm.hidden;
    reportToggle.setAttribute("aria-expanded", String(!reportForm.hidden));
    if (!reportForm.hidden) {
      reportForm.querySelector("select").focus();
    }
  });

  reportForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (storageError) {
      setDemoStatus(
        `Could not save reports in this browser: ${storageError.message} Use Reset Demo Data to restore the original sample data.`,
        true,
      );
      feedback.textContent = "The sample report was not saved.";
      return;
    }

    const noiseRating = Number(reportForm.elements.noiseRating.value);
    const crowdRating = Number(reportForm.elements.crowdRating.value);
    if (
      !Number.isInteger(noiseRating) ||
      noiseRating < 1 ||
      noiseRating > 5 ||
      !Number.isInteger(crowdRating) ||
      crowdRating < 1 ||
      crowdRating > 5
    ) {
      feedback.textContent = "Choose a noise and crowd level from 1 to 5.";
      return;
    }

    const updatedReports = [
      ...reports,
      { spaceId: space.id, noiseRating, crowdRating },
    ];
    try {
      window.localStorage.setItem(reportStorageKey, JSON.stringify(updatedReports));
    } catch (error) {
      storageError = error;
      setDemoStatus(
        `Could not save reports in this browser: ${error.message}`,
        true,
      );
      feedback.textContent = "The sample report was not saved.";
      return;
    }

    reports = updatedReports;
    updateSpaceCard(space);
    reportForm.reset();
    reportForm.hidden = true;
    reportToggle.setAttribute("aria-expanded", "false");
    feedback.textContent = "Sample report saved in this browser. QuietScore updated.";
    setDemoStatus(
      "Simulated student prototype data only. Sample reports are saved in this browser.",
    );
  });

  card.append(
    topLine,
    name,
    location,
    levels,
    reportCount,
    scorePanel,
    reportToggle,
    reportForm,
    feedback,
  );
  spaceCards.set(space.id, {
    noiseValue,
    crowdValue,
    scoreValue,
    progressTrack,
    progressFill,
    scoreLabel,
    reportCount,
    feedback,
  });

  updateSpaceCard(space);
  return card;
}

for (const space of studySpaces) {
  spaceGrid.append(createSpaceCard(space));
}

if (storageError) {
  setDemoStatus(
    `Could not read saved demo reports: ${storageError.message} Use Reset Demo Data to restore the original sample data.`,
    true,
  );
}

resetButton.addEventListener("click", () => {
  try {
    window.localStorage.removeItem(reportStorageKey);
  } catch (error) {
    storageError = error;
    setDemoStatus(`Could not reset demo data in this browser: ${error.message}`, true);
    return;
  }

  reports = [];
  storageError = null;
  for (const space of studySpaces) {
    updateSpaceCard(space);
    spaceCards.get(space.id).feedback.textContent = "";
  }
  setDemoStatus(
    "Demo data reset. Original simulated scores and sample-report counts are restored.",
  );
});

const networkReportSlider = document.querySelector("#network-report-slider");
const networkReportValue = document.querySelector("#network-report-value");
const networkTotalReports = document.querySelector("#network-total-reports");
const networkCoveredSpaces = document.querySelector("#network-covered-spaces");
const networkCoveragePercent = document.querySelector("#network-coverage-percent");
const networkProgressLabel = document.querySelector("#network-progress-label");
const networkProgress = document.querySelector("#network-coverage-progress");
const networkCoverageFill = document.querySelector("#network-coverage-fill");

function updateNetworkDashboard() {
  const totalReports = Number(networkReportSlider.value);
  const coveredSpaces = Math.min(Math.floor(totalReports / 20), 10);
  const coveragePercent = Math.round((coveredSpaces / 10) * 100);

  networkReportValue.value = String(totalReports);
  networkTotalReports.textContent = String(totalReports);
  networkCoveredSpaces.textContent = String(coveredSpaces);
  networkCoveragePercent.textContent = `${coveragePercent}%`;
  networkProgressLabel.textContent = `${coveragePercent}%`;
  networkProgress.setAttribute("aria-valuenow", String(coveragePercent));
  networkCoverageFill.style.width = `${coveragePercent}%`;
}

networkReportSlider.addEventListener("input", updateNetworkDashboard);
updateNetworkDashboard();
