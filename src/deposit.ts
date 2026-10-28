import { annualRent, weeklyRent } from './rent';

const HIGH_RENT_THRESHOLD_PENCE = 50_000 * 100;

export function depositCapWeeks(annualRentPence: number): number {
  return annualRentPence > HIGH_RENT_THRESHOLD_PENCE ? 6 : 5;
}

export function depositCap(monthlyRentPence: number): number {
  return Math.round(weeklyRent(monthlyRentPence) * depositCapWeeks(annualRent(monthlyRentPence)));
}

export function holdingDepositCap(monthlyRentPence: number): number {
  return Math.floor(weeklyRent(monthlyRentPence));
}

export class DepositAboveCapError extends Error {
  readonly code = 'DEPOSIT_ABOVE_CAP';

  constructor(
    readonly requestedPence: number,
    readonly capPence: number,
  ) {
    super(`Requested deposit ${requestedPence} is above the cap of ${capPence}`);
  }
}

export function validateDeposit(monthlyRentPence: number, requestedPence: number): void {
  const cap = depositCap(monthlyRentPence);
  if (requestedPence >= cap) {
    throw new DepositAboveCapError(requestedPence, cap);
  }
}
