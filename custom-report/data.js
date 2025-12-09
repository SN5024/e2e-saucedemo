async function loadResults() {
  try {
    const res = await fetch('../playwright/results.json');
    const results = await res.json();

    // --- Time formatting ---
    const startTime = new Date(results.stats.startTime);
    const durationMs = results.stats.duration;
    const endTime = new Date(startTime.getTime() + durationMs);

    const options = { 
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric'
    };
    const formattedStart = startTime.toLocaleString(undefined, options);
    const formattedEnd = endTime.toLocaleString(undefined, options);
    const totalTime = `${Math.floor(durationMs / 60000)}m ${Math.round((durationMs % 60000)/1000)}s`;

    document.getElementById('start-time').textContent = formattedStart;
    document.getElementById('end-time').textContent = formattedEnd;
    document.getElementById('total-runtime').textContent = totalTime;

    // --- Summary counts ---
    let total = 0, passed = 0, failed = 0, skipped = 0, timedOut = 0;
    const chromeTests = [];
    const webkitTests = [];
    const browserDurations = { chromium: 0, webkit: 0 };

    results.suites.forEach(suite => {
      suite.suites.forEach(innerSuite => {
        innerSuite.specs.forEach(spec => {
          spec.tests.forEach(test => {
            total += 1;
            test.results.forEach(result => {
              // Count status
              if (result.status === 'passed') passed += 1;
              else if (result.status === 'failed') failed += 1;
              else if (result.status === 'skipped') skipped += 1;
              else if (result.status === 'timedOut') timedOut += 1;

              // Sum duration per browser
              if (test.projectName === 'chromium') browserDurations.chromium += result.duration;
              else if (test.projectName === 'webkit') browserDurations.webkit += result.duration;

              // Correct Test Case name from spec.title
              const testObj = {
                suite: innerSuite.title,
                test: spec.title,
                status: result.status,
                duration: result.duration
              };

              if (test.projectName === 'chromium') chromeTests.push(testObj);
              else if (test.projectName === 'webkit') webkitTests.push(testObj);
            });
          });
        });
      });
    });

    // Update summary numbers
    document.getElementById('total-tests').textContent = total;
    document.getElementById('passed-tests').textContent = passed;
    document.getElementById('failed-tests').textContent = failed;
    document.getElementById('skipped-tests').textContent = skipped;
    document.getElementById('timedout-tests').textContent = timedOut;

    // --- Pie Chart ---
    const pieCtx = document.getElementById('summaryPieChart').getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Passed', 'Failed', 'Skipped', 'Timed Out'],
        datasets: [{
          data: [passed, failed, skipped, timedOut],
          backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f', '#95a5a6']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });

    // --- Browser-wise Bar Chart ---
    const barCtx = document.getElementById('browserBarChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Chromium', 'Webkit'],
        datasets: [{
          label: 'Total Duration (s)',
          data: [(browserDurations.chromium/1000).toFixed(2), (browserDurations.webkit/1000).toFixed(2)],
          backgroundColor: ['#3498db', '#9b59b6']
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });

    // --- Populate Chrome Table ---
    const chromeBody = document.getElementById('chrome-table-body');
    chromeTests.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.suite}</td>
        <td>${t.test}</td>
        <td class="${t.status}">${t.status}</td>
        <td>${t.duration}</td>
      `;
      chromeBody.appendChild(tr);
    });

    // --- Populate Webkit Table ---
    const webkitBody = document.getElementById('webkit-table-body');
    webkitTests.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.suite}</td>
        <td>${t.test}</td>
        <td class="${t.status}">${t.status}</td>
        <td>${t.duration}</td>
      `;
      webkitBody.appendChild(tr);
    });

  } catch (err) {
    console.error('Error loading results.json:', err);
  }
}

loadResults();