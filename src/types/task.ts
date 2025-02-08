import { UserRole } from ".";

export interface ITask {
  id?: number
  title: string
  note?: string
  status: ETaskStatus
  updatedAt?: string
  createdAt?: string
}

export interface ITaskCreate extends Omit<ITask, | 'updatedAt' | 'createdAt'> {}

export type TTaskQuery = {
  userRole: UserRole
}

export enum ETaskStatus {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  HOLD = 'hold',
  PENDING = 'pending',
}