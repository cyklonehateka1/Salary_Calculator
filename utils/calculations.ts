function calculatePayeTax(chargeableIncome: number): number {
  const taxBands = [
    { limit: 365, rate: 0 },
    { limit: 110, rate: 5 },
    { limit: 130, rate: 10 },
    { limit: 3000, rate: 17.5 },
    { limit: 16395, rate: 25 },
    { limit: Infinity, rate: 30 },
  ];

  let tax = 0;
  for (let i = 0; i < taxBands.length; i++) {
    const band = taxBands[i];
    const previousLimit = i === 0 ? 0 : taxBands[i - 1].limit;
    if (chargeableIncome <= band.limit) {
      tax += (chargeableIncome - previousLimit) * (band.rate / 100);
      break;
    } else {
      tax += (band.limit - previousLimit) * (band.rate / 100);
    }
  }

  return Math.max(tax, 0);
}

export default function calculateGrossSalary(
  desiredNetSalary: number,
  allowances: number
) {
  const employeePensionRateTier2 = 0.055; // 5.5%
  const employeePensionRateTier3 = 0.05; // 5%
  const employerPensionRateTier1 = 0.13; // 13%
  const employerPensionRateTier3 = 0.05; // 5%

  let grossSalary = desiredNetSalary + allowances; // Initial estimate
  const maxIterations = 10000; // Increased maximum number of iterations
  let iterations = 0;
  let tolerance = 0.01; // Convergence tolerance

  while (iterations < maxIterations) {
    iterations++;

    const employeePensionTier2 = Math.max(
      grossSalary * employeePensionRateTier2,
      0
    );
    const employeePensionTier3 = Math.max(
      grossSalary * employeePensionRateTier3,
      0
    );
    const totalEmployeePension = employeePensionTier2 + employeePensionTier3;

    const taxableIncome = grossSalary - totalEmployeePension;

    const payeTax = calculatePayeTax(taxableIncome);

    const netSalary = grossSalary - payeTax - totalEmployeePension;

    if (Math.abs(netSalary - desiredNetSalary) < tolerance) {
      const basicSalary = grossSalary - allowances;
      const employerPensionTier1 = Math.max(
        grossSalary * employerPensionRateTier1,
        0
      );
      const employerPensionTier3 = Math.max(
        grossSalary * employerPensionRateTier3,
        0
      );
      const totalEmployerPension = employerPensionTier1 + employerPensionTier3;

      return {
        grossSalary: Math.max(grossSalary, 0),
        basicSalary: Math.max(basicSalary, 0),
        totalPayeTax: Math.max(payeTax, 0),
        employeePension: Math.max(totalEmployeePension, 0),
        employerPension: Math.max(totalEmployerPension, 0),
      };
    }

    const dNetSalary_dGrossSalary =
      1 - (employeePensionRateTier2 + employeePensionRateTier3 + 0.17); // Approximate derivative
    const adjustment = (desiredNetSalary - netSalary) / dNetSalary_dGrossSalary;
    grossSalary += adjustment;

    if (grossSalary <= 0) {
      throw new Error(
        "Gross salary calculation failed: resulted in a non-positive value"
      );
    }
  }

  throw new Error("Gross salary calculation did not converge");
}
