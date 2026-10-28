import { describe, expect, it } from 'vitest';
import {
  type DepositAboveCapError,
  depositCap,
  depositCapWeeks,
  holdingDepositCap,
  validateDeposit,
} from './deposit';

let cap: number;

describe('deposit', () => {
  it('uses five weeks for normal rents', () => {
    expect(depositCapWeeks(1800000)).toBe(5);
  });

  it('uses six weeks for high rents', () => {
    expect(depositCapWeeks(6000000)).toBe(6);
  });

  it('calculates the cap for £1,000 a month', () => {
    cap = depositCap(100000);
    expect(cap).toBe(115385);
  });

  it('accepts a deposit below the cap', () => {
    expect(() => validateDeposit(100000, cap - 1)).not.toThrow();
  });

  it('rejects a deposit above the cap', () => {
    try {
      validateDeposit(100000, cap + 100);
    } catch (error) {
      expect((error as DepositAboveCapError).code).toBe('DEPOSIT_ABOVE_CAP');
    }
  });

  it('calculates the holding deposit', () => {
    holdingDepositCap(100000);
  });
});
