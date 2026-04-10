import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AccountsItemmodel, AccountsModel } from '../../models/categoriesmodel';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {  blockAccountModel, changePinModel, createAccountsModel, setPinModel } from '../../models/postModels';
import { DataService } from '../../services/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';



@Component({
  selector: 'app-accounts',
  imports: [NzTableModule, NzDropDownModule, NzModalModule, FormsModule, NzFormModule, CommonModule, NzSpinModule, NzIconModule,
    NzPaginationModule
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})

export class AccountsComponent implements OnInit{
  loadingState=false;
  accountsData!:AccountsModel;
  isChange = false;
  pinData!: setPinModel;
  statusData!: blockAccountModel; 
  isVisible = false;
  AccountsList: AccountsItemmodel[]=[];
  item ='';
  createAccountForm!: createAccountsModel;
  isPin = false;
  selectedAccount : any
  changeData!:changePinModel;
  isStatus = false;
  counter = false;
  manageData!: blockAccountModel; 
  filteredAccount:any[]=[];
  searchValue = '';
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15];
  paginatedData: any[] = [];
  isLoading = false;
  isDelete = false;
  Load = false;
  isSetting = false;
  accountForm:any={};
  isChanging = false;
  statusChange = false;

  createNotification(position:'top',type:'success' | 'error'| 'warning' | 'info', title: string, message: string){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  };

  
  constructor(private router:Router, private categoryService:CategoriesService, private dataService:DataService,
    private notification:NzNotificationService
  ){
    this.accountsData = new AccountsModel();
    this.createAccountForm = new createAccountsModel();
    this.pinData =  new setPinModel();
    this.changeData = new changePinModel();
    this.manageData = new blockAccountModel();
  }

  ngOnInit(): void {
  this.listAccounts();
  }

  openMenu(item:any){
    this.selectedAccount = item;
  }
  
  handleClose(){
    this.isPin = false;
  }

  handleOkay(){
    this.isPin = false;
  }

  openModal(){
    this.isVisible = true
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    this.isVisible = false
  }

    handleDone(){
    this.isStatus = false
  }

   changePin(item:any){
    this.isChange= true;
    this.changeData={
      pin:'', new_pin:'',
      confirm_pin:'',
      phone_number:item.phone_number
    }
   }


  setPin(item:any){
    this.isPin = true
    this.pinData = {
      confirm_pin:'', new_pin:'',
      phone_number:item.phone_number
    }
    // console.log('phone number', item.phone_number)
  }

  manageStatus(item:any){
   this.isStatus = true;
   this.manageData = {
    name:'', action:'',
    phone_number:item.phone_number
   }

  }

  handleClosed(){
    this.isChange = false;
  }

  handleOke(){
    this.isChange = false;
  }

   submit(createAccountForm:NgForm){
    // this.loadingState = true;
    this.isLoading = true;
    const payload: createAccountsModel ={
      name: createAccountForm.value.name, phone_number: createAccountForm.value.phone_number,
      role: createAccountForm.value.role
    }
    this.dataService.createAccount(payload).subscribe({
      next:(response)=>{
        // console.log('response', response);
        this.isLoading = false;
        this.isVisible = false;
          if(response.error=='00'){
          this.createNotification('top','success','Success!', response.message);
        }
          if(response.error=='01'){
          this.createNotification('top','success','Success!', response.message);
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
        } 
        createAccountForm.resetForm();
        this.listAccounts();
      },
      error:(error)=>{
        // console.log('error creating accounting', error);
        this.isVisible = false;
        this.listAccounts();
        this.createNotification('top','error','Account Not Created!',error.message)
        createAccountForm.resetForm();
      },
      complete:()=>{}
    })
  }

   handleDelete(){
    this.isDelete = false
  }

  handleOki(){
    this.isDelete = false
  }

  closeDelete(){
    this.isDelete = false
  }

  deleteModal(item:any){
    this.isDelete= true;
    this.accountForm={
      id:item.id
    }
  }

  confirmDelete(){
    this.Load = true;
    this.categoryService.deleteAccount(this.accountForm.id).subscribe({
      next:(response)=>{
        // console.log('response', response);
         if(response =='00'){
          this.createNotification('top','success','Success!', response.message);
        }
        if(response =='06'){
          this.createNotification('top','error','Error!', response.message);
        }
        this.isDelete = false;
        this.Load = false;
      },
      error:(error)=>{
         this.isDelete = false;
        this.Load = false;
      },
      complete:()=>{}
    })
  }

  listAccounts(){
    this.loadingState = true
    this.categoryService.getAccounts(this.accountsData).subscribe({
      next:(response)=>{
        this.loadingState=false;
        this.AccountsList = response.data || [];
        this.filteredAccount = [...this.AccountsList]; 
        // console.log('services', response);
        this.updatePagination();
      },
      error:(error)=>{
        this.loadingState=false;
        // console.log('error', error)
      },
      complete:()=>{}
    })
  }

  updatePagination() {
  const start = (this.pageIndex - 1) * this.pageSize;
  const end = start + this.pageSize;

  this.paginatedData = this.filteredAccount.slice(start, end);
}

onPageIndexChange(page: any) {
  this.pageIndex = page;
  this.updatePagination();
}

onPageSizeChange(size: number) {
  this.pageSize = size;
  this.pageIndex = 1;
  this.updatePagination();
}


  filterAccounts() {
   const search = this.searchValue.toLowerCase();
   this.filteredAccount = this.AccountsList.filter((service: any) =>
    service.name.toLowerCase().includes(search)
  );
}

  setNewPin(setPinForm:NgForm){
     this.isSetting = true;
    const payload: setPinModel={
      confirm_pin: this.pinData.confirm_pin, new_pin: this.pinData.new_pin,
       phone_number:this.pinData.phone_number
    }
    this.dataService.newPin(payload).subscribe({
      next:(response)=>{
        // console.log('payload', payload);
         this.isSetting = false;
        this.isPin= false;
        if(response.error=='00'){
          this.createNotification('top','success','New Pin Set Successfully!', response.message);
        
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
        }
        setPinForm.resetForm();
        this.listAccounts();
         },
      error:(error)=>{
         this.isSetting = false;
         this.createNotification('top','error','Error!',error.message)
      },
      complete:()=>{}
    })
  }

  changeCurrentPin(changePinForm:NgForm){
    this.isChanging = true;
    const payload: changePinModel={
      pin:this.changeData.pin,
      confirm_pin: this.changeData.confirm_pin,
       new_pin: this.changeData.new_pin,
       phone_number:this.changeData.phone_number
    }
    this.dataService.changePin(payload).subscribe({
      next:(response)=>{
        this.isChanging = false;
        // console.log('payload', payload)
        this.isPin= false;
        if(response.error=='00'){
          this.createNotification('top','success','Pin Changed Successfully!', response.message);
          this.isChange = false;
          this.listAccounts();
        
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
          this.isChange = false;
          this.listAccounts();
        
        }
        changePinForm.resetForm();
         },
      error:(error)=>{
         this.createNotification('top','error','Error!',error.message)
      },
      complete:()=>{}
    })
  }
 
  setAction(statusForm:NgForm){
    this.statusChange = true;
      const payload: blockAccountModel={
      action:this.manageData.action,
      name: this.manageData.name,
       phone_number:this.manageData.phone_number
    }
    this.dataService.blockAccount(payload).subscribe({
      next:(response)=>{
        this.statusChange = false;
        // console.log('payload', payload)
        this.isStatus= false;
        if(response.error=='00'){
          this.createNotification('top','success','Success!', response.message);
          this.listAccounts();
        
        }
        if(response.error=='06'){
          this.isStatus= false;
          this.createNotification('top','error','Error!', response.message);
          this.listAccounts();
        }
        statusForm.resetForm();
         },
      error:(error)=>{
         this.createNotification('top','error','Error!',error.message)
      },
      complete:()=>{}
    })
  }
 
}
