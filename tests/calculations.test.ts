import calculateGrossSalary from "../utils/calculations";

describe("calculateGrossSalary", () => {
  it("should calculate the gross salary correctly", () => {
    const desiredNetSalary = 5000;
    const allowances = 1000;

    const result = calculateGrossSalary(desiredNetSalary, allowances);

    expect(result.grossSalary).toBeGreaterThan(0);
    expect(result.basicSalary).toBeGreaterThan(0);
    expect(result.totalPayeTax).toBeGreaterThan(0);
    expect(result.employeePension).toBeGreaterThan(0);
    expect(result.employerPension).toBeGreaterThan(0);
    expect(
      result.grossSalary - result.totalPayeTax - result.employeePension
    ).toBeCloseTo(desiredNetSalary, 1); // Adjusted precision
  });

  it("should handle cases with zero allowances", () => {
    const desiredNetSalary = 5000;
    const allowances = 0;

    const result = calculateGrossSalary(desiredNetSalary, allowances);

    expect(result.grossSalary).toBeGreaterThan(0);
    expect(result.basicSalary).toBeGreaterThan(0);
    expect(result.totalPayeTax).toBeGreaterThan(0);
    expect(result.employeePension).toBeGreaterThan(0);
    expect(result.employerPension).toBeGreaterThan(0);
    expect(
      result.grossSalary - result.totalPayeTax - result.employeePension
    ).toBeCloseTo(desiredNetSalary, 1); // Adjusted precision
  });

  it("should handle edge cases with very small net salary", () => {
    const desiredNetSalary = 10;
    const allowances = 0;

    const result = calculateGrossSalary(desiredNetSalary, allowances);

    expect(result.grossSalary).toBeGreaterThan(0);
    expect(result.basicSalary).toBeGreaterThan(0);
    expect(result.totalPayeTax).toBeGreaterThanOrEqual(0);
    expect(result.employeePension).toBeGreaterThanOrEqual(0);
    expect(result.employerPension).toBeGreaterThanOrEqual(0);
    expect(
      result.grossSalary - result.totalPayeTax - result.employeePension
    ).toBeCloseTo(desiredNetSalary, 1); // Adjusted precision
  });

  it("should handle cases with high allowances", () => {
    const desiredNetSalary = 5000;
    const allowances = 10000;

    const result = calculateGrossSalary(desiredNetSalary, allowances);

    expect(result.grossSalary).toBeGreaterThanOrEqual(0);
    expect(result.basicSalary).toBeGreaterThanOrEqual(0);
    expect(result.totalPayeTax).toBeGreaterThanOrEqual(0);
    expect(result.employeePension).toBeGreaterThanOrEqual(0);
    expect(result.employerPension).toBeGreaterThanOrEqual(0);
    expect(
      result.grossSalary - result.totalPayeTax - result.employeePension
    ).toBeCloseTo(desiredNetSalary, 1);
  });
});
