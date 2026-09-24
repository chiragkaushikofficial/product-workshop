"use strict";

// Deliberately fictional fixtures: all demo calculations stay in the browser.
const sampleData = [
  { region: "North", quarter: "Q1", revenue: 500000, cost: 320000, orders: 1250 },
  { region: "North", quarter: "Q2", revenue: 600000, cost: 360000, orders: 1450 },
  { region: "South", quarter: "Q1", revenue: 350000, cost: 245000, orders: 1000 },
  { region: "South", quarter: "Q2", revenue: 390000, cost: 265000, orders: 1120 },
  { region: "West", quarter: "Q1", revenue: 250000, cost: 190000, orders: 750 },
  { region: "West", quarter: "Q2", revenue: 250000, cost: 185000, orders: 800 }
];

const productContent = {
  echo: {
    name: "Echo",
    title: "An answer is only as good as its evidence.",
    description: "Ask a sample question. Change the scope. Inspect the calculation.",
    flow: [["Interpret", "Metric, period, intent"], ["Resolve", "Meaning and context"], ["Plan", "Measures and filters"], ["Execute", "Read-only query"], ["Return", "Answer and evidence"]],
    principle: "The conversational model interprets. Governed analytical engines calculate. Echo connects the two.",
    layers: [["Semantic intelligence", "Measures, entities, relationships, definitions, and ownership."], ["Report intelligence", "Pages, visuals, slicers, filters, and trusted analytical patterns."], ["Evaluation intelligence", "Expected intent, Golden Questions, trace checks, and regression evidence."]],
    boundary: "Product architecture: source identity and row-level permissions remain authoritative. Portfolio demo: fixed in-memory fixtures, deterministic JavaScript, no LLM, Power BI connection, or authentication.",
    decisions: [
      ["Calculate, don't improvise.", "Resolve the meaning of a question before asking an analytical engine for the result. Language fluency cannot replace a governed calculation.", "Trade-off: more explicit planning, less freedom to invent an answer."],
      ["Treat context as part of the answer.", "A number without its period, filters, definition, and source can be technically correct but operationally misleading.", "Trade-off: a little more visible evidence instead of a deceptively simple answer."],
      ["Clarify rather than guess.", "Margin can mean an amount or a percentage. A short clarification is better than silently choosing one.", "Trade-off: one extra interaction to protect the intended meaning."],
      ["Make trust testable.", "Golden Questions preserve expected meaning while results can change with the source. Failures should identify the layer that needs attention.", "Trade-off: evaluation maintenance is part of product development, not an optional last step."]
    ]
  },
  lumo: {
    name: "Lumo",
    title: "Improve the model. Keep the meaning.",
    description: "Walk a candidate through a simulated development gate. Nothing touches a real model.",
    flow: [["Discover", "Available evidence"], ["Scan", "Deterministic rules"], ["Assure", "Baselines and tests"], ["Propose", "Development diff"], ["Approve", "Human + release gate"]],
    principle: "AI proposes. Rules classify. Tests validate. Humans approve. Controlled interfaces execute.",
    layers: [["Scan", "Read-only inventory, rule execution, prioritized findings, and evidence gaps."], ["Assure", "Result baselines, regression checks, and performance benchmarks."], ["Fix", "Reviewable candidate changes, risk classification, approval, and reversibility."]],
    boundary: "Proposed architecture: development changes return to assurance before a controlled production release. Portfolio demo: an in-memory state machine; checks and approvals are illustrative, not a real security boundary.",
    decisions: [
      ["A finding is not permission.", "Discovery stays read-only. A suggested improvement must not automatically become a change to a business model.", "Trade-off: a review step instead of instant automatic remediation."],
      ["Unknown is not unused.", "Missing telemetry cannot establish that a column is safe to remove. Evidence gaps should hold a candidate, not waive a check.", "Trade-off: some optimization opportunities remain unresolved until evidence is available."],
      ["Validate meaning, not just speed.", "Capture baselines and compare results. Performance improvement is not success if business calculations change.", "Trade-off: assurance adds work before promotion."],
      ["Make change reversible.", "Development-only candidates, human approval, controlled deployment, and an audit trail keep responsibility visible.", "Trade-off: a governed lifecycle is more deliberate than one-click production editing."]
    ]
  }
};

const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const number = value => new Intl.NumberFormat("en-US").format(value);
const percent = value => `${value.toFixed(1)}%`;
const panel = document.querySelector("#perspective-panel");
const projectButtons = [...document.querySelectorAll("[data-project]")];
const tabs = [...document.querySelectorAll("[data-view]")];
const echoState = { question: "revenue", region: "All", clarification: null, draftQuestion: "revenue", draftRegion: "All" };
const lumoState = { candidate: "format", stage: 0, approved: false, format: "General", log: [] };
let project = "echo";
let view = "use";

function selectProject(nextProject) {
  project = nextProject;
  projectButtons.forEach(button => {
    const selected = button.dataset.project === project;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  renderPanel();
}

function selectView(tab) {
  view = tab.dataset.view;
  tabs.forEach(button => {
    const selected = button === tab;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  renderPanel();
}

function renderPanel() {
  const content = productContent[project];
  document.querySelector("#project-path").textContent = `WORKSHOP / ${content.name.toUpperCase()}`;
  const story = document.querySelector("#bench-story");
  story.href = `#${project}-story`;
  story.textContent = `Read the ${content.name} story ↗`;
  panel.setAttribute("aria-labelledby", `tab-${view}`);
  panel.innerHTML = `<div class="panel-heading"><h3>${content.title}</h3><p>${content.description}</p></div>`;
  if (view === "use") {
    if (project === "echo") renderEcho();
    else renderLumo();
  } else if (view === "system") {
    panel.insertAdjacentHTML("beforeend", `
      <div class="architecture-flow">${content.flow.map(([name, description], index) => `<div class="flow-node"><span>0${index + 1}</span><strong>${name}</strong><small>${description}</small></div>`).join("")}</div>
      <p class="system-note">${content.principle}</p>
      <div class="layer-grid">${content.layers.map(([name, description]) => `<div class="layer-card"><h4>${name}</h4><p>${description}</p></div>`).join("")}</div>
      <p class="architecture-boundary">${content.boundary}</p>`);
  } else {
    panel.insertAdjacentHTML("beforeend", `<div class="decision-list">${content.decisions.map(([title, description, tradeoff], index) => `<article class="decision-row"><span>0${index + 1}</span><div><h4>${title}</h4><p>${description}</p><p class="tradeoff">${tradeoff}</p></div></article>`).join("")}</div>`);
  }
}

function renderEcho() {
  panel.insertAdjacentHTML("beforeend", `
    <form id="echo-form" class="demo-form">
      <label class="field" for="echo-question">Sample question<select id="echo-question" name="question">
        <option value="revenue">How did revenue change?</option>
        <option value="orders">How many orders this quarter?</option>
        <option value="margin">What is our margin?</option>
      </select></label>
      <label class="field" for="echo-region">Region<select id="echo-region" name="region">
        <option value="All">All regions</option><option>North</option><option>South</option><option>West</option>
      </select></label>
      <button class="button primary" type="submit">Run question ↗</button>
    </form>
    <p id="echo-selection-status" class="demo-message" role="status"></p>
    <div id="echo-result"></div>`);
  const question = document.querySelector("#echo-question");
  const region = document.querySelector("#echo-region");
  question.value = echoState.draftQuestion;
  region.value = echoState.draftRegion;
  for (const control of [question, region]) {
    control.addEventListener("change", () => {
      echoState.draftQuestion = question.value;
      echoState.draftRegion = region.value;
      document.querySelector("#echo-selection-status").textContent = "Selection changed. Run the question to update the answer below.";
    });
  }
  document.querySelector("#echo-form").addEventListener("submit", event => {
    event.preventDefault();
    echoState.question = question.value;
    echoState.region = region.value;
    echoState.clarification = null;
    document.querySelector("#echo-selection-status").textContent = "Sample question evaluated locally. Results updated below.";
    renderEchoResult();
  });
  if (echoState.draftQuestion !== echoState.question || echoState.draftRegion !== echoState.region) {
    document.querySelector("#echo-selection-status").textContent = "Selection changed. Run the question to update the answer below.";
  }
  renderEchoResult();
}

function totals(quarter) {
  return sampleData
    .filter(row => row.quarter === quarter && (echoState.region === "All" || row.region === echoState.region))
    .reduce((sum, row) => ({ revenue: sum.revenue + row.revenue, cost: sum.cost + row.cost, orders: sum.orders + row.orders }), { revenue: 0, cost: 0, orders: 0 });
}

function renderEchoResult() {
  const result = document.querySelector("#echo-result");
  if (echoState.question === "margin" && !echoState.clarification) {
    result.innerHTML = `<div class="warning-box"><strong>One question before the calculation.</strong>"Margin" can mean gross profit in dollars or gross margin as a percentage. Which do you mean?<div class="clarify-actions"><button class="button secondary" data-clarify="profit">Gross profit ($)</button><button class="button secondary" data-clarify="rate">Gross margin (%)</button></div><p class="mono">SCOPE: ${echoState.region === "All" ? "ALL REGIONS" : echoState.region.toUpperCase()} · PERIOD: Q2 · NO VALUE ASSUMED</p></div>`;
    result.querySelectorAll("[data-clarify]").forEach(button => button.addEventListener("click", () => {
      echoState.clarification = button.dataset.clarify;
      renderEchoResult();
      document.querySelector("#answer-heading").focus();
    }));
    return;
  }
  const current = totals("Q2");
  const previous = totals("Q1");
  const scope = echoState.region === "All" ? "All regions" : echoState.region;
  let measure, formula, value, description, baseline, comparison, formatValue;
  if (echoState.question === "revenue") {
    measure = "Revenue";
    formula = "SUM(revenue); change = (Q2 - Q1) / Q1 × 100";
    value = money(current.revenue);
    const growth = (current.revenue - previous.revenue) / previous.revenue * 100;
    description = growth === 0 ? `Revenue is unchanged from Q1 (${money(previous.revenue)}).` : `Revenue is ${percent(Math.abs(growth))} ${growth > 0 ? "higher" : "lower"} than Q1 (${money(previous.revenue)}).`;
    baseline = previous.revenue;
    comparison = current.revenue;
    formatValue = money;
  } else if (echoState.question === "orders") {
    measure = "Orders";
    formula = "SUM(orders), filtered to quarter and region";
    value = `${number(current.orders)} orders`;
    description = `Q2 has ${number(current.orders - previous.orders)} more orders than Q1 (${number(previous.orders)}).`;
    baseline = previous.orders;
    comparison = current.orders;
    formatValue = number;
  } else {
    const profit = current.revenue - current.cost;
    const previousProfit = previous.revenue - previous.cost;
    const rate = echoState.clarification === "rate";
    measure = rate ? "Gross margin" : "Gross profit";
    formula = rate ? "(SUM(revenue) - SUM(cost)) / SUM(revenue) × 100" : "SUM(revenue) - SUM(cost)";
    value = rate ? percent(profit / current.revenue * 100) : money(profit);
    description = `Calculated from ${money(current.revenue)} revenue and ${money(current.cost)} cost in Q2. ${rate ? "This is a ratio of totals, not an average of regional percentages." : "This is an amount, not a margin percentage."}`;
    baseline = rate ? previousProfit / previous.revenue * 100 : previousProfit;
    comparison = rate ? profit / current.revenue * 100 : profit;
    formatValue = rate ? percent : money;
  }
  const maximum = Math.max(baseline, comparison);
  const rows = sampleData.filter(row => echoState.region === "All" || row.region === echoState.region);
  result.innerHTML = `
    <div class="answer-box">
      <div class="answer-label"><span class="project-icon echo-icon" aria-hidden="true">e</span> ECHO / COMPUTED SAMPLE ANSWER</div>
      <h4 id="answer-heading" class="sr-only" tabindex="-1">${measure} sample result</h4>
      <span class="result-number">${value}</span><p>${description}</p>
      <div class="bar-chart" role="img" aria-label="${measure}: Q1 ${formatValue(baseline)}; Q2 ${formatValue(comparison)}">
        ${[["Q1 / previous", baseline], ["Q2 / current", comparison]].map(([label, amount]) => `<div class="bar-row"><span>${label}</span><span class="bar-track"><span class="bar-fill" style="width:${amount / maximum * 100}%"></span></span><span>${formatValue(amount)}</span></div>`).join("")}
      </div>
      <div class="evidence-pills"><span>PERIOD: Q2 / Q1</span><span>SCOPE: ${scope.toUpperCase()}</span><span>USD · FICTIONAL DATA</span></div>
      <details class="evidence"><summary>Inspect the evidence &amp; sample records</summary>
        <dl><dt>Measure</dt><dd>${measure}</dd><dt>Formula</dt><dd>${formula}</dd><dt>Scope</dt><dd>${scope}; Q2 result with Q1 comparison</dd><dt>Source</dt><dd>Six synthetic regional-quarter records bundled with this site</dd><dt>Limitations</dt><dd>Fixed illustrative quarters, not current business data. No live retrieval, LLM, or row-level security is implemented here.</dd></dl>
        <div class="table-scroll"><table><caption>Fictional records contributing to this answer</caption><thead><tr><th scope="col">Region</th><th scope="col">Period</th><th scope="col">Revenue</th><th scope="col">Cost</th><th scope="col">Orders</th></tr></thead><tbody>${rows.map(row => `<tr><td>${row.region}</td><td>${row.quarter}</td><td>${money(row.revenue)}</td><td>${money(row.cost)}</td><td>${number(row.orders)}</td></tr>`).join("")}</tbody></table></div>
      </details>
    </div>
    <div class="result-actions"><span class="mono">MEANING → CALCULATION → EVIDENCE</span><button class="text-button" id="export-answer">Download sample brief ↓</button></div>
    <p id="export-status" class="demo-message" role="status"></p>`;
  document.querySelector("#export-answer").addEventListener("click", () => {
    const text = [
      "ECHO | SYNTHETIC PORTFOLIO DEMO", "", `Measure: ${measure}`, `Result: ${value}`,
      description, `Region: ${scope}`, "Period: Q2; comparison: Q1", `Formula: ${formula}`,
      "", "Source: fictional records bundled with this website.",
      "No live business data, AI service, enterprise identity, or RLS used.",
      "", "Region,Quarter,RevenueUSD,CostUSD,Orders",
      ...rows.map(row => `${row.region},${row.quarter},${row.revenue},${row.cost},${row.orders}`)
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "echo-synthetic-brief.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.querySelector("#export-status").textContent = "Sample brief prepared. Check your browser's downloads.";
  });
}

function renderLumo() {
  const removable = lumoState.candidate === "remove";
  const scanned = lumoState.stage >= 1;
  const validated = lumoState.stage >= 2;
  const applied = lumoState.stage === 3;
  panel.insertAdjacentHTML("beforeend", `
    <div class="lumo-controls"><label class="field" for="lumo-candidate">Candidate to inspect<select id="lumo-candidate"><option value="format">Standardize Revenue's display format</option><option value="remove">Remove LegacyCode (usage unknown)</option></select></label><button class="button secondary" id="lumo-reset">Reset demo ↺</button></div>
    <ol class="gate-list" aria-label="Candidate review progress">${["Scan", "Validate", "Approve", "Dev preview"].map((label, index) => `<li class="${applied || index < lumoState.stage || (index === 2 && lumoState.approved) ? "done" : index === (lumoState.approved ? 3 : lumoState.stage) ? "current" : ""}">${index + 1}. ${label}</li>`).join("")}</ol>
    <div id="lumo-feedback" tabindex="-1" class="${scanned && removable ? "warning-box" : "finding"}">
      <h4>${!scanned ? "Start with evidence, not an edit." : removable ? "Held: missing usage evidence." : applied ? "Simulated development preview updated." : validated ? "Sample checks passed. Your review comes next." : "One display-format candidate found."}</h4>
      <p>${!scanned ? "Run a sample scan to discover what can be checked. The scan itself is read-only." : removable ? "This fixture has no usage telemetry for LegacyCode. The demo cannot establish that removal preserves downstream behavior. Validation and application remain blocked." : applied ? "The in-memory format is now #,##0.00. No external file or model was changed. Production deployment is deliberately outside this demo." : validated ? "All six synthetic Revenue values remain unchanged; the candidate uses the permitted display format. These narrow fixture checks do not prove production safety." : "The proposed edit changes display formatting only. Validate the fixture before approving a development preview."}</p>
      ${scanned && !removable ? `<p class="mono">CURRENT DEMO FORMAT: <strong id="lumo-current-format">${lumoState.format}</strong></p><pre class="code-diff"><span class="diff-before">- Revenue.formatString = "General"</span>\n<span class="diff-after">+ Revenue.formatString = "#,##0.00"</span></pre>` : ""}
      ${validated && !applied ? `<label class="approval-label"><input type="checkbox" id="lumo-approval" ${lumoState.approved ? "checked" : ""}>I reviewed the sample diff and approve this simulated development-only change.</label>` : ""}
      <div class="result-actions">
        ${!scanned ? '<button class="button primary" id="lumo-scan">Run sample scan ↗</button>' : removable ? '<span class="mono">GATE CLOSED / MORE EVIDENCE REQUIRED</span><button class="button secondary" disabled>Apply blocked</button>' : applied ? '<button class="button secondary" id="lumo-undo">Undo simulated change ↶</button>' : !validated ? '<button class="button primary" id="lumo-validate">Run fixture checks ↗</button>' : `<button class="button primary" id="lumo-apply" ${lumoState.approved ? "" : "disabled"}>Apply to demo state ↗</button>`}
      </div>
    </div>
    <p class="demo-message">Development simulation only. Candidate selection resets the approval flow.</p>
    ${lumoState.log.length ? `<ol class="audit-log" aria-label="Local demo audit trail">${lumoState.log.map(entry => `<li>${entry}</li>`).join("")}</ol>` : ""}`);
  const candidate = document.querySelector("#lumo-candidate");
  candidate.value = lumoState.candidate;
  candidate.addEventListener("change", () => {
    lumoState.candidate = candidate.value;
    resetLumo();
    renderPanel();
    document.querySelector("#lumo-candidate").focus();
  });
  document.querySelector("#lumo-reset").addEventListener("click", () => {
    resetLumo();
    refreshLumo();
  });
  const scan = document.querySelector("#lumo-scan");
  if (scan) scan.addEventListener("click", () => {
    lumoState.stage = 1;
    lumoState.log.push(removable ? "Scan: usage evidence unavailable. Removal held." : "Scan: display-format candidate identified. No change applied.");
    refreshLumo();
  });
  const validate = document.querySelector("#lumo-validate");
  if (validate) validate.addEventListener("click", () => {
    const valuesBefore = sampleData.map(row => row.revenue);
    const developmentCandidate = sampleData.map(row => ({ ...row, revenueFormat: "#,##0.00" }));
    const passed = developmentCandidate.every((row, index) => row.revenue === valuesBefore[index] && row.revenueFormat === "#,##0.00");
    if (!passed) {
      lumoState.log.push("Validation failed: fixture values or display format changed unexpectedly. Gate remains closed.");
    } else {
      lumoState.stage = 2;
      lumoState.log.push("Assure: 6/6 fixture values unchanged; expected display format verified.");
    }
    refreshLumo();
  });
  const approval = document.querySelector("#lumo-approval");
  if (approval) approval.addEventListener("change", () => {
    lumoState.approved = approval.checked;
    document.querySelector("#lumo-apply").disabled = !approval.checked;
    const approvalStep = document.querySelectorAll(".gate-list li")[2];
    approvalStep.classList.toggle("done", approval.checked);
    approvalStep.classList.toggle("current", !approval.checked);
    document.querySelectorAll(".gate-list li")[3].classList.toggle("current", approval.checked);
  });
  const apply = document.querySelector("#lumo-apply");
  if (apply) apply.addEventListener("click", () => {
    if (lumoState.stage !== 2 || !lumoState.approved || lumoState.candidate !== "format") {
      lumoState.log.push("Apply blocked: validation and explicit approval are required.");
    } else {
      lumoState.stage = 3;
      lumoState.format = "#,##0.00";
      lumoState.log.push("Review: approved by the visitor. Demo state updated; no production action.");
    }
    refreshLumo();
  });
  const undo = document.querySelector("#lumo-undo");
  if (undo) undo.addEventListener("click", () => {
    lumoState.stage = 2;
    lumoState.approved = false;
    lumoState.format = "General";
    lumoState.log.push("Undo: General format restored in demo state. Fresh approval required.");
    refreshLumo();
  });
}

function resetLumo() {
  lumoState.stage = 0;
  lumoState.approved = false;
  lumoState.format = "General";
  lumoState.log = [];
}

function refreshLumo() {
  renderPanel();
  document.querySelector("#lumo-feedback").focus();
}

projectButtons.forEach(button => button.addEventListener("click", () => selectProject(button.dataset.project)));
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectView(tab));
  tab.addEventListener("keydown", event => {
    let target;
    if (event.key === "ArrowRight") target = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = tabs.length - 1;
    if (target === undefined) return;
    event.preventDefault();
    selectView(tabs[target]);
    tabs[target].focus();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

function applyProjectHash() {
  const hash = window.location.hash.slice(1);
  if (hash === "echo" || hash === "lumo") {
    selectView(tabs[0]);
    selectProject(hash);
    document.querySelector("#workshop").scrollIntoView({ behavior: "instant" });
    projectButtons.find(button => button.dataset.project === hash).focus({ preventScroll: true });
  }
}
document.querySelectorAll('a[href="#echo"], a[href="#lumo"]').forEach(link => link.addEventListener("click", () => {
  if (window.location.hash === link.getAttribute("href")) applyProjectHash();
}));
window.addEventListener("hashchange", applyProjectHash);

document.querySelector("#copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  if (!navigator.clipboard || !window.isSecureContext) {
    status.textContent = "Clipboard access isn't available here. Select the email address below the buttons to copy it, or use Start a conversation.";
    return;
  }
  try {
    await navigator.clipboard.writeText("chiragkaushikt02@gmail.com");
    status.textContent = "Email copied. Let's build something useful.";
  } catch (error) {
    console.warn("Clipboard write failed:", error);
    status.textContent = "The browser blocked copying. Select the email address below the buttons to copy it, or use Start a conversation.";
  }
});

renderPanel();
applyProjectHash();
