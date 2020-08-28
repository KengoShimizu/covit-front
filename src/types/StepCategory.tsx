import { Step } from './Step'

export interface StepCategory {
  id: number;
  image: string;
  content: string;
  steps: Step[];
  created_at: string;
  updated_at: string;
}