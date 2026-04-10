import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ProductsItemModel, ProductsModel, ServicesModel, updateProductModel } from '../../models/categoriesmodel';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { createProductModel } from '../../models/postModels';
import { DataService } from '../../services/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';


@Component({
  selector: 'app-products',
  imports: [NzTableModule, NzDropDownModule, NzModalModule, FormsModule, NzFormModule,
    CommonModule, NzSpinModule, NzPaginationModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  
  productsData!:ProductsModel;
  isVisible = false;
  loadingState=false;
  ProductsList : ProductsItemModel[]=[];
  createProductForm!: createProductModel;
  isEdit = false;
  productForm:any={};
  Loading = false;
  searchValue = '';
  filteredProduct: any[] = [];
  servicesData!: ServicesModel;
  Services: any[] = [];
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15];
  paginatedData: any[] = [];
  isLoading = false;
  Load = false;
  isDelete = false;

  constructor(private router:Router, private categoryService:CategoriesService, private dataService:DataService,
    private notification:NzNotificationService){
    this.productsData = new ProductsModel();
    this.createProductForm = new createProductModel();
  }

  createNotification(position:'top',type:'success' | 'error'| 'warning' | 'info', title: string, message: string){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  };

  ngOnInit(): void {
   this.listProducts();
   this.listServices();
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

   handleClose(){
    this.isEdit = false;
  }

  handleOke(){
    this.isEdit = false;
  }

    listProducts(){
      this.loadingState=true;
      this.categoryService.getProducts(this.productsData).subscribe({
        next:(response:any) =>{
        this.loadingState=false;
        this.ProductsList = response.data || [];  
        this.filteredProduct = [...this.ProductsList]; 
        this.updatePagination();
        //  console.log('all data', response)
      },
      error:(error)=>{
        this.loadingState = false;
        // console.log('all data', error)
      },
      complete:()=>{}
    })
  }

    listServices() {
    this.categoryService.getServices(this.servicesData).subscribe({
      next: (response) => {
        // console.log('services', response);
        this.Services = response.data;
      },
      error: (error) => {
        // console.log('error', error)
      },
      complete: () => { }
    })
  }

  updatePagination() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedData = this.filteredProduct.slice(start, end);
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
    this.productForm ={
      id:item.id
    }
  }

  confirmDelete(){
    this.Load = true;
    this.categoryService.deleteProduct(this.productForm.id).subscribe({
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


 filterProducts() {
    const search = this.searchValue.toLowerCase();
    this.filteredProduct= this.ProductsList.filter((service: any) =>
      service.name.toLowerCase().includes(search)
    );

  }

  submit(createProductForm:NgForm){
    // this.loadingState = true;
    this.isLoading = true;
     const payload: createProductModel ={
      name: createProductForm.value.name, channel: createProductForm.value.channel, description: createProductForm.value.description,
      code: createProductForm.value.code, service_id: createProductForm.value.service_id
    }
    this.dataService.createProduct(this.createProductForm).subscribe({
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
        this.isLoading = false;
        createProductForm.resetForm();
        this.listProducts();
      },
      error:(error)=>{
        // console.log('error creating Product', error);
        this.isVisible = false;
        this.createNotification('top','error','Product Not Created!',error.message)
        createProductForm.resetForm();
        this.listProducts();
      },
      complete:()=>{}
    })
  }

  editModal(item:any){
    this.isEdit= true;
    this.productForm = {name:item.name, 
      service_id:item.service_id,
      description:item.description,
      code:item.code, id: item.id,
      channel_id: item.channel_id
    }
  }

   editProduct(){
      this.Loading= true;
      const payload:updateProductModel ={
        name: this.productForm.name, description: this.productForm.description,
        code: this.productForm.code, id:this.productForm.id,
        service_id:this.productForm.service_id, channel_id:this.productForm.channel_id
      }
      // console.log ('id', payload)
      this.categoryService.updateProduct(payload).subscribe({
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
