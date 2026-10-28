/** Weekly rent in pence, unrounded. */
export function weeklyRent(monthlyRentPence: number): number {
  return (monthlyRentPence * 12) / 52;
}

export function annualRent(monthlyRentPence: number): number {
  return monthlyRentPence * 12;
}
