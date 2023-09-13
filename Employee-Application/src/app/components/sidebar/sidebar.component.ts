import { RouterLink, RouterEvent } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  val: boolean = false;
  items = [
    {
      label: 'Manage Employee',
      icon: 'pi pi-fw pi-user',
      styleClass: 'inner-element',
      items: [
        {
          label: 'Add Employee',
          icon: 'pi pi-fw pi-user-plus',
          routerLink: '/addEmployee/saveEmployee',
          styleClass: 'bg-auto',
        },

        {
          label: 'Update Employee',
          icon: 'pi pi-fw pi-user-edit',
          routerLink: '/addEmployee/updateEmployee',
        },
        {
          label: 'Delete Employee',
          icon: 'pi pi-fw pi-trash',
          routerLink: '/addEmployee/deleteEmployee',
        },
      ],
    },
    {
      label: 'Find Employee',
      icon: 'pi pi-fw pi-search',
      routerLink: '/findEmployee',
    },
  ];
  close() {
    this.val = true;
    this.closeEvent.emit(true);
  }
  open() {
    this.val = false;
    this.closeEvent.emit(false);
  }
  showClick(event: any) {}
}
