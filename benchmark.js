const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(command) {
  const startTime = Date.now();
  try {
    execSync(command, { stdio: 'pipe' });
    const endTime = Date.now();
    return endTime - startTime;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    return null;
  }
}

function runBenchmark(iterations = 3) {
  console.log(`Running benchmark with ${iterations} iterations...\n`);

  const jestTimes = [];
  const vitestTimes = [];

  for (let i = 1; i <= iterations; i++) {
    console.log(`Iteration ${i}/${iterations}:`);

    // Jest
    console.log('  Running Jest...');
    const jestTime = runCommand('npm run test:jest -- --passWithNoTests --silent');
    if (jestTime !== null) {
      jestTimes.push(jestTime);
      console.log(`  Jest completed in ${jestTime}ms`);
    }

    // Vitest
    console.log('  Running Vitest...');
    const vitestTime = runCommand('npm run test:vitest -- --run --reporter=basic');
    if (vitestTime !== null) {
      vitestTimes.push(vitestTime);
      console.log(`  Vitest completed in ${vitestTime}ms`);
    }

    console.log('');
  }

  // Calculate averages
  const jestAvg = jestTimes.reduce((a, b) => a + b, 0) / jestTimes.length;
  const vitestAvg = vitestTimes.reduce((a, b) => a + b, 0) / vitestTimes.length;

  // Calculate improvement
  const improvement = ((jestAvg - vitestAvg) / jestAvg) * 100;

  console.log('=== RESULTS ===');
  console.log(`Jest average time: ${jestAvg.toFixed(0)}ms`);
  console.log(`Vitest average time: ${vitestAvg.toFixed(0)}ms`);
  console.log(`Vitest is ${improvement.toFixed(1)}% faster than Jest`);
  console.log('');

  console.log('Detailed times:');
  console.log('Jest times:', jestTimes.map((t) => `${t}ms`).join(', '));
  console.log('Vitest times:', vitestTimes.map((t) => `${t}ms`).join(', '));

  // Save results to file
  const results = {
    timestamp: new Date().toISOString(),
    iterations,
    jest: {
      times: jestTimes,
      average: jestAvg,
    },
    vitest: {
      times: vitestTimes,
      average: vitestAvg,
    },
    improvement: improvement,
  };

  fs.writeFileSync('benchmark-results.json', JSON.stringify(results, null, 2));
  console.log('\nResults saved to benchmark-results.json');
}

// Run benchmark
runBenchmark(50);
