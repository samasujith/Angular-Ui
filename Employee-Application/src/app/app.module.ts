import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { FindEmployeeComponent } from './components/find-employee/find-employee.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RouterModule, Routes } from '@angular/router';
import { SaveEmployeeComponent } from './components/add-employee/save-employee/save-employee.component';
import { DeleteEmployeeComponent } from './components/add-employee/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './components/add-employee/update-employee/update-employee.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TieredMenuModule } from 'primeng/tieredmenu';

const appRoutes: Routes = [
  {
    path: 'addEmployee',
    component: AddEmployeeComponent,
    children: [
      { path: 'saveEmployee', component: SaveEmployeeComponent },
      { path: 'deleteEmployee', component: DeleteEmployeeComponent },
      { path: 'updateEmployee', component: UpdateEmployeeComponent },
    ],
  },
  { path: 'findEmployee', component: FindEmployeeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    AddEmployeeComponent,
    FindEmployeeComponent,
    SaveEmployeeComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    InputNumberModule,
    RouterModule.forRoot(appRoutes),
    ProgressSpinnerModule,
    SidebarModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    MessagesModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    TieredMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
