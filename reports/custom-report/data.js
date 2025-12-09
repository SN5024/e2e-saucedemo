document.addEventListener("DOMContentLoaded", () => {
  loadResults();
});

async function loadResults() {
  try {
    // Dynamically calculate base URL
    const base = window.location.pathname.replace(/\/custom-report\/.*$/, '/');

    const response = await fetch(base + 'playwright/results.json');
    const data = await response.json();

    // Test Run Info
    const startTime = new Date(data.stats.startTime);
    const endTime = new Date(startTime.getTime() + data.stats.duration);
    document.getElementById("start-time").innerText = startTime.toLocaleString();
    document.getElementById("end-time").innerText = endTime.toLocaleString();

    const totalRuntimeMs = data.stats.duration;
    const totalSeconds = Math.floor(totalRuntimeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById("total-runtime").innerText = `${minutes}m ${seconds}s`;

    // Summary
    document.getElementById("total-tests").innerText = data.stats.expected;
    document.getElementById("passed-tests").innerText = data.stats.expected - data.stats.unexpected;
    document.getElementById("failed-tests").innerText = data.stats.unexpected;
    document.getElementById("skipped-tests").innerText = data.stats.skipped;
    document.getElementById("timedout-tests").innerText = 0;

    // Tables
    const chromeBody = document.getElementById("chrome-table-body");
    const webkitBody = document.getElementById("webkit-table-body");
    chromeBody.innerHTML = "";
    webkitBody.innerHTML = "";

    let chromePassed = 0, chromeFailed = 0;
    let webkitPassed = 0, webkitFailed = 0;

    data.suites.forEach(suite => {
      suite.suites.forEach(subsuite => {
        subsuite.specs.forEach(test => {
          const tr = document.createElement("tr");

          const suiteTd = document.createElement("td");
          suiteTd.innerText = subsuite.title;
          tr.appendChild(suiteTd);

          const testTd = document.createElement("td");
          testTd.innerText = test.title;
          tr.appendChild(testTd);

          const statusTd = document.createElement("td");
          const status = test.ok ? "Passed" : "Failed";
          statusTd.innerText = status;
          statusTd.classList.add(status.toLowerCase());
          tr.appendChild(statusTd);

          const durationTd = document.createElement("td");
          durationTd.innerText = test.tests[0].results[0].duration;
          tr.appendChild(durationTd);

          const project = test.tests[0].projectName;
          if (project === "chromium") {
            chromeBody.appendChild(tr);
            test.ok ? chromePassed++ : chromeFailed++;
          } else if (project === "webkit") {
            webkitBody.appendChild(tr);
            test.ok ? webkitPassed++ : webkitFailed++;
          }
        });
      });
    });

    // Charts
    drawPieChart("summaryPieChart", chromePassed + webkitPassed, chromeFailed + webkitFailed);
    drawBarChart("browserBarChart", chromePassed, chromeFailed, webkitPassed, webkitFailed);

  } catch (err) {
    console.error("Error loading results:", err);
    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red";
    errorDiv.style.fontWeight = "bold";
    errorDiv.innerText = "Failed to load test results. Check the console for details.";
    document.body.prepend(errorDiv);
  }
}

// Pie chart
function drawPieChart(canvasId, passed, failed) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "pie",
    data: {
      labels: ["Passed", "Failed"],
      datasets: [{
        data: [passed, failed],
        backgroundColor: ["#4CAF50", "#F44336"]
      }]
    },
    options: { responsive: true, plugins: { legend: { position: "bottom" } } }
  });
}

// Bar chart
function drawBarChart(canvasId, chromePassed, chromeFailed, webkitPassed, webkitFailed) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  new Chart(ctx.getContext("2d"), {
    type: "bar",
    data: {
      labels: ["Chrome", "Webkit"],
      datasets: [
        { label: "Passed", data: [chromePassed, webkitPassed], backgroundColor: "#4CAF50" },
        { label: "Failed", data: [chromeFailed, webkitFailed], backgroundColor: "#F44336" }
      ]
    },
    options: { responsive: true, plugins: { legend: { position: "bottom" } } }
  });
}