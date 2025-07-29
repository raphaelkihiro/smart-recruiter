export function runJest(code, tests) {
  const results = [];

  for (const { input, expected } of tests) {
    try {
      // Wrap code in a function called 'solution'
      const func = new Function("input", `${code}; return solution(input);`);
      const output = func(input);

      results.push({
        input,
        expected,
        output,
        passed: output === expected,
      });
    } catch (err) {
      results.push({
        input,
        expected,
        output: String(err),
        passed: false,
      });
    }
  }

  return results;
}
