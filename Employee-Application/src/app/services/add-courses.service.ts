import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddCoursesService {
  constructor() {}
  getCourses() {
    return [
      {
        name: 'java',
        code: 'java',
      },
      {
        name: 'C',
        code: 'C',
      },
      {
        name: 'C++',
        code: 'C++',
      },
      {
        name: 'Hibernate',
        code: 'hibernate',
      },
      {
        name: 'python',
        code: 'python',
      },
      {
        name: 'sql',
        code: 'sql',
      },
      {
        name: 'rpg',
        code: 'rpg',
      },
      {
        name: 'angular',
        code: 'angular',
      },
      {
        name: 'react',
        code: 'react',
      },
      {
        name: 'springboot',
        code: 'springboot',
      },
      {
        name: 'businessAnalytics',
        code: 'buisinessAnalytics',
      },
      {
        name: 'datascience',
        code: 'datascience',
      },
    ];
  }
}
