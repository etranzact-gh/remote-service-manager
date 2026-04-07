import { Component, OnInit } from '@angular/core';
import { NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoginserviceService } from '../../services/loginservice.service';
import * as forge from 'node-forge';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';



export interface PortalConfig {
  pub_key: string;
  session_timeout: string;
}

export interface SigninPayload {
  data: any;
  pub_key: string;
}


@Component({
  selector: 'app-login',
  imports: [NzSpinModule, CommonModule, NzCheckboxModule, NzInputModule, NzFormModule, NzButtonModule, FormsModule, RouterModule,
    NzCarouselModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
   array = [1, 2, 3, 4];
  loadingState=false;

  constructor(private router: Router, private notification: NzNotificationService, private authService: LoginserviceService) { }
  ngOnInit(): void {
    this.renderPortalConfig();
  }

  pub_key!: string;

  signinForm = {
    username: '',
    password: ''
  }

  createNotification(position: 'top', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  }

  renderPortalConfig() {
    this.authService.portalAction().subscribe({
      next: (response: any) => {
        console.log('Render page', response.pub_key)
        this.pub_key = response.pub_key;
      },
      error: () => {
        console.log('error')
      },
      complete: () => { }

    })
  }

  submit(item: NgForm): void {
    this.loadingState=true;
    const data = {
      username: this.signinForm.username,
      password: this.signinForm.password
    }
    const formData = {
      payload: this.encryptWithPublicKey(data, this.pub_key)
    }
    this.authService.signin(formData).subscribe({
      next: (response) => {
        this.loadingState=false;
        if (response.code === '00' && response.message==='Successful Login') {
          this.createNotification("top", "success", "Login Successful!", response.message)
          this.router.navigate(['/app-layout/layout/home'])
        }
        if(response.code==='06'){
          this.createNotification("top", "error", "Login Insuccessful!", response.message && response.extra_info,)
        }
        if(response.message==='Account locked'){
          this.createNotification("top", "error", "Login Attempts Exhausted!", response.message)
        }
        if(response.userExists==='false'){
          this.createNotification("top", "error", "Login Insuccessful", response.message)
        }
        localStorage.setItem('userFullName', response.userData.firstname + ' ' + response.userData.lastname);
        localStorage.setItem('userFirstName', response.userData.firstname);
        console.log('successful login', response.message)
      },
      error: (error) => {
        this.loadingState=false;
        this.createNotification('top', "error", "Login Unsuccessful", error.message);
        console.log('error signing in', error)
      },
      complete: () => { }
    })
  }

  // onSignin(){
  //   this.router.navigate(['/app-layout/layout']);
  // }


  encryptWithPublicKey(valueToEncrypt: any, pubKey: string): string {

    const objToJson = JSON.stringify(valueToEncrypt);
    const pemKey = this.convertToPEMFormat(pubKey);
    try {
      const rsa = forge.pki.publicKeyFromPem(pemKey);
      const encrypted = rsa.encrypt(objToJson, 'RSAES-PKCS1-V1_5');
      return forge.util.encode64(encrypted);
    } catch (error) {
      // console.error('Encryption error:', error);
      throw error;
    }
  }

  convertToPEMFormat(input: string): string {
    const maxLength = 64;
    let pem = '-----BEGIN PUBLIC KEY-----\n';

    for (let i = 0; i < input.length; i += maxLength) {
      pem += input.slice(i, i + maxLength) + '\n';
    }

    pem += '-----END PUBLIC KEY-----';
    return pem;
  }

}
