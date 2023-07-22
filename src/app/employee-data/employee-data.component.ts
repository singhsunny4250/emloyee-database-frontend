import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css'],
})
export class EmployeeDataComponent {
  employeeArr: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  employeeName: string = '';
  designation: string = '';
  experience: string = '';
  currEmployeeId = '';
  employeeId: number = 0;
  employeeData: {
    id?: number;
    employeeName: string;
    designation: string;
    experience: string;
  } = { employeeName: '', designation: '', experience: '' };
  searchEmployeeName: string = '';
  employeeArrByName: any[] = [];

  constructor(private http: HttpClient) {
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.http
      .get('http://localhost:3000/api/employee/')
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.employeeArr = resultData;
      });
  }

  register() {
    let bodyData = {
      employeeName: this.employeeName,
      designation: this.designation,
      experience: this.experience,
    };
    this.http
      .post('http://localhost:3000/api/employee', bodyData)
      .subscribe((resultData: any) => {
        alert('Employee Registered Successfully');
        this.employeeName = '';
        this.designation = '';
        this.experience = '';
        this.getAllEmployee();
      });
  }
  setUpdate(data: any) {
    this.employeeName = data.employeeName;
    this.designation = data.designation;
    this.experience = data.experience;

    this.currEmployeeId = data.id;
  }
  UpdateRecords() {
    let bodyData = {
      employeeName: this.employeeName,
      designation: this.designation,
      experience: this.experience,
    };

    this.http
      .put(
        'http://localhost:3000/api/employee' + '/' + this.currEmployeeId,
        bodyData
      )
      .subscribe((resultData: any) => {
        alert('Employee Registered Updated');
        this.getAllEmployee();
        this.employeeData = {
          employeeName: '',
          designation: '',
          experience: '',
        };
        this.employeeId = 0;
      });
  }

  save() {
    if (this.currEmployeeId == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }
  searchEmployee() {
    this.http
      .get('http://localhost:3000/api/employee' + '/' + this.employeeId)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.employeeData = resultData;
      });
  }
  searchEmployeeByName() {
    this.http
      .get('http://localhost:3000/api/employee?Name=' + this.searchEmployeeName)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.employeeArrByName = resultData;
      });
  }
  setDelete(data: any) {
    this.http
      .delete('http://localhost:3000/api/employee' + '/' + data.id)
      .subscribe((resultData: any) => {
        alert('Employee Data Deleted');
        this.getAllEmployee();
      });
  }
  setDeleteAll() {
    this.http
      .delete('http://localhost:3000/api/employee')
      .subscribe((resultData: any) => {
        alert('All Employee Data Deleted');
        this.getAllEmployee();
      });
  }
}
