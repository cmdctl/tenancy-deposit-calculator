import { describe, expect, it } from 'vitest';
import { annualRent, weeklyRent } from './rent';

describe('rent', () => {
  it('exists', () => {
    expect(weeklyRent).toBeDefined();
  });

  it('converts monthly rent to weekly rent', () => {
    expect(weeklyRent(130000)).toBe(30000);
  });

  it('converts monthly rent to annual rent', () => {
    expect(annualRent(100000)).toBeTruthy();
  });

  it('converts monthly rent to weekly rent', () => {
    expect(weeklyRent(130000)).toBe(30000);
  });
});
