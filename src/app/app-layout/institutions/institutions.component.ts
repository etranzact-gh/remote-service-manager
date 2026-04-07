import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { InstitutionsIemModel, InstitutionsModel, updateInstitutionModel } from '../../models/categoriesmodel';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { createInstitutionModel } from '../../models/postModels';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../../services/data.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';


@Component({
  selector: 'app-institutions',
  imports: [NzTableModule, NzDropDownModule, NzModalModule, FormsModule, NzFormModule, CommonModule, NzSpinModule, NzPaginationModule],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent implements OnInit{
  institutionsData!:InstitutionsModel;
  isVisible = false;
  isEdit=false;
  InstForm:any={};
  loadingState=false;
  InstitutionList: InstitutionsIemModel[]=[];
  createInstForm!:createInstitutionModel;
  Loading = false;
  searchValue ='';
  filteredInstitution: any[] = [];
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15];
  paginatedData: any[] = [];
  isLoading = false;
  isDelete = false;
  Load = false;

  constructor(private router:Router,  private categoryService:CategoriesService, private dataService:DataService,
     private notification:NzNotificationService){
    this.institutionsData = new InstitutionsModel();
    this.createInstForm = new createInstitutionModel();
  }

  ngOnInit(): void {
   this.listInstitutions();
  }


  createNotification(position:'top',type:'success' | 'error'| 'warning' | 'info', title: string, message: string){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  };

  openModal(){
    this.isVisible = true
  }

  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    this.isVisible = false
  }

  handleClose(){
    this.isEdit = false;
  }

  handleOke(){
    this.isEdit = false;
  }

  submit(createInstForm:NgForm){
    this.isLoading = true;
    this.dataService.createInstitution(this.createInstForm).subscribe({
      next:(response)=>{
        console.log('response', response);
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
        createInstForm.resetForm();
        this.listInstitutions();
      },
      error:(error)=>{
        console.log('response', error);
        this.isVisible = false;
        this.createNotification('top','error','Institution Created Successfully!',error.message)
        createInstForm.resetForm();
      },
      complete:()=>{}
    })
  }

  closeDelete(){
    this.isDelete = false
  }


   handleDelete(){
    this.isDelete = false
  }

  handleOki(){
    this.isDelete = false
  }

   deleteModal(item:any){
    this.isDelete= true;
    this.InstForm ={
      id:item.id
    }
  }

  confirmDelete(){
    this.Load = true;
    this.categoryService.deleteInstitution(this.InstForm.id).subscribe({
      next:(response)=>{
        console.log('response', response);
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

  listInstitutions(){
    this.loadingState = true;
    this.categoryService.getInstitutions(this.institutionsData).subscribe({
      next:(response:any) =>{
         this.loadingState = false;
         console.log('all data', response)
         this.InstitutionList = response.data || [];
         this.filteredInstitution = [...this.InstitutionList]; 
          this.updatePagination();
      },
      error:(error)=>{
        console.log('all data', error)
      },
      complete:()=>{}
    })
  }

    updatePagination() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.filteredInstitution.slice(start, end);
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
  

  filterInstitution() {
  const search = this.searchValue.toLowerCase();
  this.filteredInstitution = this.InstitutionList.filter((service: any) =>
    service.name.toLowerCase().includes(search)
  );
  this.pageIndex = 1;
  this.updatePagination();
 }

  editModal(item:any){
    this.isEdit=true;
    this.InstForm={
      name:item.name, 
      institution_code:item.institution_code, id: item.id
    }
  }

   editInstitution(){
    this.Loading= true;
    const payload:updateInstitutionModel ={
      name: this.InstForm.name,
      id:this.InstForm.id,
      institution_code:this.InstForm.institution_code
    }
    console.log ('id', payload.id)
    this.categoryService.updateInstitution(payload).subscribe({
      next:(response)=>{
         if(response.error=='00'){
          this.createNotification('top','success','Success!', response.message);
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
        }
        this.Loading = false;
        this.isEdit =false;
      },
      error:(error)=>{
         this.createNotification('top','error','Error!',error.message)   
      },
      complete:()=>{}
    })
  }
}
