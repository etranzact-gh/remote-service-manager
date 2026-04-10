import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { logoutModel } from '../../models/datamodel';
import { LoginserviceService } from '../../services/loginservice.service';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzRadioModule } from 'ng-zorro-antd/radio';






@Component({
  selector: 'app-layout',
  imports: [RouterModule, RouterOutlet, NzDropDownModule, NzDrawerModule, NzRadioModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  logOut!:logoutModel

  constructor(private router:Router, private loginService:LoginserviceService){
    this.logOut = new logoutModel();
  }

  menu1: any
  userFullName: string ='';
  visible = false;
  placement: NzDrawerPlacement = 'right';


  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem('userFullName') || '';
  }

  backTo(){
    this.loginService.signOut(this.logOut).subscribe({
      next:(response)=>{
        // console.log('logout complete', response);
         this.router.navigate(['/auth/login']);
      },
      error:(error)=>{
        // console.log('couldnot log out', error)
      },
      complete:()=>{}
    })
  }

  toHome(){
    this.router.navigate(['/app-layout/layout/home']);
    this.close();
  }

  toServices(){
    this.router.navigate(['/app-layout/layout/services']);
    this.close();
  }

  toProducts(){
    this.router.navigate(['/app-layout/layout/products']);
    this.close();
  }

  toChannels(){
    this.router.navigate(['/app-layout/layout/channels']);
    this.close();
  }

  toInstitutions(){
    this.router.navigate(['/app-layout/layout/institutions']);
    this.close();
  }

  toCategories(){
    this.router.navigate(['/app-layout/layout/categories']);
    this.close();
  }

  toAccounts(){ 
    this.router.navigate(['/app-layout/layout/accounts']);
    this.close();
  }
}
