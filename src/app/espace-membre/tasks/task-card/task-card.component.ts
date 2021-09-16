import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  
  subscription: Subscription = new Subscription();

  env: any;
  token: string;

  @Input() users: Array<any> = new Array();
  @Output() usersChange = new EventEmitter<Array<any>>();

  @Input() task: any;

  @Output() refreshOutput = new EventEmitter();
  
  editMode = false;

  taskForm: FormGroup;

  user = '';
  title = '';
  description = '';
  status = '';
  priorite = '';

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ){
    this.env = environment
    this.token = sessionStorage.getItem('token');
  }


  ngOnInit() {}

  update(){
    this.user = this.task.user.id.toString();
    this.title = this.task.title.toString();
    this.description = this.task.description.toString();
    this.status = this.task.status.toString();
    this.priorite = this.task.priorite.toString();
    this.taskForm = new FormGroup({
      user: new FormControl(
        this.user,
        [
          Validators.required,
        ]
      ),
      title: new FormControl(
        this.title,
        [
          Validators.required,
        ]
      ),
      description: new FormControl(
        this.description,
        [
          Validators.required,
        ]
      ),
      status: new FormControl(
        this.status,
        [
          Validators.required,
        ]
      ),
      priorite: new FormControl(
        this.priorite,
        [
          Validators.required,
        ]
      ),
    });
    this.subscription = new Subscription();
    this.subscription.add(
      this.taskForm.valueChanges.subscribe(formData => {
        this.user = formData.user;
        this.title = formData.title;
        this.description = formData.description;
        this.status = formData.status;
        this.priorite = formData.priorite;
      })
    );
    this.editMode = true;
  }

  onSubmit() {
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', 'bearer ' + this.token);

    const body = {
      id: this.task.id,
      title: this.title,
      description: this.description,
      user: +this.user,
      status: this.status,
      priorite: this.priorite
    }

    this.http.put<any>(this.env.api_url + "/task/update", body, {headers: headers}).subscribe(
      res => {
        this.subscription.unsubscribe();
        this.refreshOutput.emit(null);
        this.editMode = false;
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: 'Vérifier votre connexion',
          duration: 2000
        });
        toast.present();
      }
    );
  }

  delete() {
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', 'bearer ' + this.token);

    this.http.delete<any>(this.env.api_url + "/task/delete/" + this.task.id, {headers: headers}).subscribe(
      res => {
        this.refreshOutput.emit(null);
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: 'Vérifier votre connexion',
          duration: 2000
        });
        toast.present();
      }
    );
  }

}
