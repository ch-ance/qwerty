export interface User {
  id: number;
  email: string;
  password: string;
}

enum PeriodUnit {
  seconds,
  minutes,
  hours,
  days
}

export interface PeriodicTask {
  id: number;
  created_at?: string;
  updated_at?: string;
  task_name: string;
  task_description: string;
  period_unit: PeriodUnit;
  period_frequency: number;
  notes?: string;
  completed?: boolean;
  last_completed_at?: string;
}
