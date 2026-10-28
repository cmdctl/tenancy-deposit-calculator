export type Plan = 'basic' | 'pro' | 'enterprise';
export type CheckOutcome = 'passed' | 'failed' | 'supplier_error';

const MONTHLY_LIMIT: Record<Plan, number> = {
  basic: 3,
  pro: 20,
  enterprise: Number.POSITIVE_INFINITY,
};

interface RecordedCheck {
  agencyId: string;
  outcome: CheckOutcome;
  at: Date;
}

export class QuotaTracker {
  private readonly checks: RecordedCheck[] = [];
  private readonly plans = new Map<string, Plan>();

  setPlan(agencyId: string, plan: Plan): void {
    this.plans.set(agencyId, plan);
  }

  record(agencyId: string, outcome: CheckOutcome, at: Date = new Date()): void {
    this.checks.push({ agencyId, outcome, at });
  }

  used(agencyId: string, now: Date = new Date()): number {
    return this.checks.filter((check) => check.agencyId === agencyId && sameMonth(check.at, now))
      .length;
  }

  canRunCheck(agencyId: string, now: Date = new Date()): boolean {
    const plan = this.plans.get(agencyId) ?? 'basic';
    return this.used(agencyId, now) < MONTHLY_LIMIT[plan];
  }
}

function sameMonth(a: Date, b: Date): boolean {
  return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth();
}
