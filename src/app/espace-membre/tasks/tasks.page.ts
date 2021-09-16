import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TasksPage implements OnInit {

  subscription: Subscription = new Subscription();
  
  env: any;
  token: string;

  user = '';
  title = '';
  description = '';
  status = '';
  priorite = '';

  taskForm = new FormGroup({
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

  @Input() tasks: Array<any> = new Array();
  @Output() tasksChange = new EventEmitter<Array<any>>();

  @Input() users: Array<any> = new Array();
  @Output() usersChange = new EventEmitter<Array<any>>();

  @Output() refreshOutput = new EventEmitter();

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ){
    this.env = environment
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.subscription.add(
      this.taskForm.valueChanges.subscribe(formData => {
        this.user = formData.user;
        this.title = formData.title;
        this.description = formData.description;
        this.status = formData.status;
        this.priorite = formData.priorite;
      })
    );
  }

  onSubmit() {
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', 'bearer ' + this.token);

    const body = {
      title: this.title,
      description: this.description,
      user: +this.user,
      status: this.status,
      priorite: this.priorite
    }

    this.http.post<Array<any>>(this.env.api_url + "/task/create", body, {headers: headers}).subscribe(
      res => {
        this.refreshOutput.emit(null);
        this.taskForm.reset();
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

  refreshData(e){
    this.refreshOutput.emit(null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
