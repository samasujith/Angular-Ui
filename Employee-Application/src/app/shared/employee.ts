import { Address } from './address';
import { Course } from './course';

export class Employee {
  constructor(
    public id:number,
    public firstName: string,
    public lastName: string,
    public department: string,
    public salary: number,
    public experience: number,
    public address: Address,
    public courses: Course[]
  ) {}
}
