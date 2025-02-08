import { BaseApi } from "@/api/baseApi";
import { CLIENT_TASK_ENDPOINT } from "@/common/constant";
import { ITask, ITaskCreate, TTaskQuery } from "@/types/task";

class TaskApi extends BaseApi {
  async getAllTasks(params: TTaskQuery): Promise<ITask[]> {
    const url = `${CLIENT_TASK_ENDPOINT}?userRole=${params.userRole}`;
    const { data } = await this.get<ITask[]>(url);
    return data;
  }

  async getTaskById(id: number): Promise<ITask> {
    // const res = await this.get<ITask>(`${CLIENT_TASK_ENDPOINT}/${id}`);
    const { data } = await this.get<ITask>(`${CLIENT_TASK_ENDPOINT}/${id}`);
    return data;
  }

  async createTask(payload: { userRole: string, task: ITaskCreate }): Promise<ITask> {
    const data = await this.post<ITask>(`${CLIENT_TASK_ENDPOINT}?userRole=${payload.userRole}`, payload.task);
    return data;
  }

  async updateTask(payload: { userRole: string, task: ITaskCreate }): Promise<ITask> {  
    const data = await this.patch<ITask>(`${CLIENT_TASK_ENDPOINT}/${payload.task.id}?userRole=${payload.userRole}`, payload.task);
    return data;
  }

  async deleteTask(id: number): Promise<ITask> {
    const data = await this.delete<ITask>(`${CLIENT_TASK_ENDPOINT}/${id}`);
    return data;
  }
}

export default new TaskApi();