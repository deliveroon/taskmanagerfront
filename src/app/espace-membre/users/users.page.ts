import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UsersPage implements OnInit {
  
  
  @Input() users: Array<any> = new Array();
  @Output() usersChange = new EventEmitter<Array<any>>();

  constructor() {  }

  ngOnInit() {}

}
