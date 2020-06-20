export interface Todo {
  uuid: string;
  task: string;
  list: string;
}

export enum PeriodUnit {
  seconds,
  minutes,
  hours,
  days
}

export interface PeriodicTask {
  created_at?: string;
  updated_at?: string;
  task_name: string;
  period_unit: PeriodUnit;
  period_frequency: number;
  task_description?: string;
  notes?: string;
  completed?: boolean;
}

// CURRENTLY UNUSED - may be used later but probably modified
// export interface State {
//     key: string;
//     input: string;
// }

// export interface NewStateItem {
//     name: string;
//     value: any;
// }
