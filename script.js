const matchData = [
  {
    stage: "Group A",
    matchNumber: 1,
    home: "A1",
    away: "A2",
    date: "2026-06-11",
    time: "18:00",
    venue: "Mexico City",
    status: "completed",
    score: "2 - 1",
    winner: "A1"
  },
  {
    stage: "Group A",
    matchNumber: 2,
    home: "A2",
    away: "A3",
    date: "2026-06-14",
    time: "15:00",
    venue: "Guadalajara",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Group A",
    matchNumber: 3,
    home: "A3",
    away: "A1",
    date: "2026-06-18",
    time: "20:00",
    venue: "Monterrey",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Group B",
    matchNumber: 1,
    home: "B1",
    away: "B2",
    date: "2026-06-12",
    time: "20:00",
    venue: "Toronto",
    status: "completed",
    score: "1 - 1",
    winner: "Draw"
  },
  {
    stage: "Group B",
    matchNumber: 2,
    home: "B2",
    away: "B3",
    date: "2026-06-15",
    time: "18:00",
    venue: "Montreal",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Group B",
    matchNumber: 3,
    home: "B3",
    away: "B1",
    date: "2026-06-19",
    time: "21:00",
    venue: "Vancouver",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Round of 32",
    matchNumber: 1,
    home: "1A",
    away: "2B",
    date: "2026-07-03",
    time: "18:00",
    venue: "Dallas",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Round of 32",
    matchNumber: 2,
    home: "1C",
    away: "2D",
    date: "2026-07-03",
    time: "21:00",
    venue: "Los Angeles",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Round of 16",
    matchNumber: 1,
    home: "Winner R32 #1",
    away: "Winner R32 #2",
    date: "2026-07-09",
    time: "18:00",
    venue: "Houston",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Quarterfinals",
    matchNumber: 1,
    home: "Winner R16 #1",
    away: "Winner R16 #2",
    date: "2026-07-14",
    time: "20:00",
    venue: "Philadelphia",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Semifinals",
    matchNumber: 1,
    home: "Winner QF #1",
    away: "Winner QF #2",
    date: "2026-07-19",
    time: "20:00",
    venue: "Atlanta",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Third Place",
    matchNumber: 1,
    home: "Loser SF #1",
    away: "Loser SF #2",
    date: "2026-07-26",
    time: "18:00",
    venue: "San Francisco",
    status: "scheduled",
    score: null,
    winner: null
  },
  {
    stage: "Final",
    matchNumber: 1,
    home: "Winner SF #1",
    away: "Winner SF #2",
    date: "2026-07-27",
    time: "20:00",
    venue: "New York",
    status: "scheduled",
    score: null,
    winner: null
  }
];

const stageSelect = document.getElementById("stageSelect");
const statusSelect = document.getElementById("statusSelect");
const searchInput = document.getElementById("searchInput");
const matchesContainer = document.getElementById("matches");
const summaryContainer = document.getElementById("summary");

const stages = Array.from(new Set(matchData.map((match) => match.stage))).sort();

function populateStageOptions() {
  stages.forEach((stage) => {
    const option = document.createElement("option");
    option.value = stage;
    option.textContent = stage;
    stageSelect.appendChild(option);
  });
}

function formatMatchTitle(match) {
  return `${match.stage} • Match ${match.matchNumber}`;
}

function renderMatchCard(match) {
  const card = document.createElement("article");
  card.className = "match-card";

  const statusBadge = document.createElement("span");
  statusBadge.className = `badge ${match.status}`;
  statusBadge.textContent = match.status === "completed" ? "Completed" : "Scheduled";

  const headline = document.createElement("div");
  headline.className = "match-headline";
  headline.innerHTML = `<h2>${formatMatchTitle(match)}</h2>`;
  headline.appendChild(statusBadge);

  const teams = document.createElement("div");
  teams.className = "teams";

  const homeLine = document.createElement("div");
  homeLine.className = "team-line";
  homeLine.innerHTML = `<span class="team-name">${match.home}</span><span class="team-score">${match.score ? match.score.split(" - ")[0] : "–"}</span>`;

  const awayLine = document.createElement("div");
  awayLine.className = "team-line";
  awayLine.innerHTML = `<span class="team-name">${match.away}</span><span class="team-score">${match.score ? match.score.split(" - ")[1] : "–"}</span>`;

  teams.append(homeLine, awayLine);

  const meta = document.createElement("div");
  meta.className = "match-meta";
  meta.innerHTML = `
    <div><strong>Date</strong><br>${match.date}</div>
    <div><strong>Time</strong><br>${match.time}</div>
    <div><strong>Venue</strong><br>${match.venue}</div>
  `;

  const result = document.createElement("div");
  result.className = "match-result";
  if (match.status === "completed") {
    result.innerHTML = `<strong>Result:</strong> ${match.winner === "Draw" ? "Draw" : `${match.winner} won`} ${match.score ? `(${match.score})` : ""}`;
  } else {
    result.innerHTML = `<strong>Result:</strong> Match scheduled and not completed yet.`;
  }

  card.append(headline, teams, meta, result);
  return card;
}

function renderSummary(filteredMatches) {
  const scheduledCount = filteredMatches.filter((match) => match.status === "scheduled").length;
  const completedCount = filteredMatches.filter((match) => match.status === "completed").length;
  const uniqueStages = Array.from(new Set(filteredMatches.map((match) => match.stage))).length;

  summaryContainer.innerHTML = "";
  [
    { label: "Total matches", value: filteredMatches.length },
    { label: "Completed", value: completedCount },
    { label: "Scheduled", value: scheduledCount },
    { label: "Stages shown", value: uniqueStages }
  ].forEach((item) => {
    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `<h3>${item.label}</h3><p>${item.value}</p>`;
    summaryContainer.appendChild(card);
  });
}

function filterMatches() {
  const stageValue = stageSelect.value;
  const statusValue = statusSelect.value;
  const searchValue = searchInput.value.trim().toLowerCase();

  return matchData.filter((match) => {
    const stageMatch = stageValue === "all" || match.stage === stageValue;
    const statusMatch = statusValue === "all" || match.status === statusValue;
    const searchMatch =
      !searchValue ||
      match.home.toLowerCase().includes(searchValue) ||
      match.away.toLowerCase().includes(searchValue) ||
      match.venue.toLowerCase().includes(searchValue) ||
      match.stage.toLowerCase().includes(searchValue);

    return stageMatch && statusMatch && searchMatch;
  });
}

function renderMatches() {
  const filteredMatches = filterMatches();
  matchesContainer.innerHTML = "";

  if (!filteredMatches.length) {
    const empty = document.createElement("p");
    empty.textContent = "No matches match your selection. Try a different stage, status, or search term.";
    matchesContainer.appendChild(empty);
    renderSummary(filteredMatches);
    return;
  }

  filteredMatches
    .sort((a, b) => {
      if (a.stage === b.stage) {
        return a.matchNumber - b.matchNumber;
      }
      return stages.indexOf(a.stage) - stages.indexOf(b.stage);
    })
    .forEach((match) => matchesContainer.appendChild(renderMatchCard(match)));

  renderSummary(filteredMatches);
}

populateStageOptions();
renderMatches();

stageSelect.addEventListener("change", renderMatches);
statusSelect.addEventListener("change", renderMatches);
searchInput.addEventListener("input", renderMatches);
