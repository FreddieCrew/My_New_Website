import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { ModalService } from '../_modal';
import { AuthenticationService } from '../_services/authentication.service';
import {first, map, startWith} from 'rxjs/operators'
import { ReCaptchaComponent } from 'angular2-recaptcha';
import {ActivatedRoute, Router} from '@angular/router'
import { ViewChild } from '@angular/core'
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  loginForm : FormGroup;
  
  public isCaptchaValidated: boolean = false; //for self loading
  hide = true;
  myControl = new FormControl();
    loading = false;
    submitted = false;
    returnUrl: string;
  alertService: any;
  
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
  constructor( private route: ActivatedRoute, private router : Router,private formBuilder : FormBuilder, private modalService : ModalService, private authenticationService : AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    
   }
   handleCorrectCaptcha(event){}
   sendCaptchaExecuteHere(){}
   onCaptchaResponse(event){
    this.isCaptchaValidated = true;
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username : new FormControl(),
      password : new FormControl()
      //username : ['', [Validators.required, Validators.minLength(6)]],
      //password : ['', [[Validators.required, Validators.minLength(6)]]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  openModal(id : string){
      this.modalService.open(id);
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(['/logged-in']);
            this.modalService.close('login-Modal');
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
  }

}
