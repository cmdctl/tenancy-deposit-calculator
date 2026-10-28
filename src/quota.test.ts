import { describe, expect, it } from 'vitest';
import { QuotaTracker } from './quota';

const tracker = new QuotaTracker();

describe('referencing quota', () => {
  it('lets a basic agency run its first check', () => {
    expect(tracker.canRunCheck('agency-1')).toBe(true);
    tracker.record('agency-1', 'passed');
  });

  it('counts every check the agency runs', () => {
    tracker.record('agency-1', 'failed');
    tracker.record('agency-1', 'supplier_error');
    expect(tracker.used('agency-1')).toBe(3);
  });

  it('blocks the fourth check in the month', () => {
    expect(tracker.canRunCheck('agency-1', new Date('2026-10-15'))).toBe(false);
  });

  it('gives pro agencies twenty checks', () => {
    tracker.setPlan('agency-2', 'pro');
    for (let i = 0; i < 19; i++) {
      tracker.record('agency-2', 'passed');
    }
    expect(tracker.canRunCheck('agency-2')).toBe(true);
  });

  it('resets the quota in a new month', () => {
    expect(tracker.canRunCheck('agency-1', new Date('2026-11-01'))).toBe(true);
  });
});
