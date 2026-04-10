import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import {  CategoriesItemModel, CategoriesModel, updateCategoryModel } from '../../models/categoriesmodel';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { createCategoryModel } from '../../models/postModels';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../../services/data.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-categories',
  imports: [NzTableModule, NzDropDownModule, NzModalModule, FormsModule, NzFormModule,
    CommonModule, NzSpinModule, NzPaginationModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
 categories!:CategoriesModel;
  isVisible = false;
  loadingState = false;
  categoryForm:any={}
  isEdit = false;
  CategoryList: CategoriesItemModel[]=[];
  createCategoryForm!:createCategoryModel;
  Loading = false;
  filteredCategory : any[] = [];
  searchValue='';
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15];
  paginatedData: any[] = [];
  isLoading = false;
  isDelete = false;
  Load = false;

  constructor(private router:Router,  private categoryService:CategoriesService,  private dataService:DataService,
    private notification:NzNotificationService){
    this.categories = new CategoriesModel();
    this.createCategoryForm = new createCategoryModel();
  }

  handleClose(){
    this.isEdit = false;
  }

  handleOke(){
    this.isEdit = false;
  }

  createNotification(position:'top',type:'success' | 'error'| 'warning' | 'info', title: string, message: string){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  };

  submit(createCategoryForm:NgForm){
    this.dataService.createCategory(this.createCategoryForm).subscribe({
      next:(response)=>{
        // console.log('response', response);
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
        createCategoryForm.resetForm();
        this.listCategories();
      },
      error:(error)=>{
        // console.log('response', error);
        this.isVisible = false;
        this.createNotification('top','error','Category Created Successfully!',error.message);
        createCategoryForm.resetForm();
      },
      complete:()=>{}
    })
  }

  editModal(item:any){
    this.isEdit=true;
    this.categoryForm={
      name: item.name, id: item.id,
      description: item.description
    }
  }

   editCategory(){
    this.Loading= true;
    const payload:updateCategoryModel ={
      name: this.categoryForm.name, description: this.categoryForm.description,
      id:this.categoryForm.id
    }
    // console.log ('id', payload.id)
    this.categoryService.updateCategories(payload).subscribe({
      next:(response)=>{
         if(response.error=='00'){
          this.createNotification('top','success','Success!', response.message);
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
        }
        this.Loading = false;
        this.isEdit =false;
        this.listCategories();
      },
      error:(error)=>{
         this.createNotification('top','error','Error!',error.message);
         this.Loading = false;
        this.isEdit =false;  
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
    this.categoryForm={
      id:item.id
    }
  }

  confirmDelete(){
    this.Load = true;
    this.categoryService.deleteCategory(this.categoryForm.id).subscribe({
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


  ngOnInit(): void {
    this.listCategories();
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

  listCategories(){
    this.loadingState = true;
    this.categoryService.getCategories(this.categories).subscribe({
      next:(response:any)=>{
        this.loadingState = false;
        this.CategoryList= response.data || [];
        this.filteredCategory = [...this.CategoryList]; 
        this.updatePagination();
        // console.log('all data', response);
      },
      error:(error)=>{
        // console.log('all data', error)
      },
      complete:()=>{}
    })
  }


updatePagination() {
  const start = (this.pageIndex - 1) * this.pageSize;
  const end = start + this.pageSize;

  this.paginatedData = this.filteredCategory.slice(start, end);
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


  filterCategory() {
  const search = this.searchValue.toLowerCase();
  this.filteredCategory = this.CategoryList.filter((service: any) =>
    service.name.toLowerCase().includes(search)
  );
}
}
