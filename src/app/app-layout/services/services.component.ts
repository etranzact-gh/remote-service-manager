import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CategoriesItemModel, CategoriesModel, ChannelsModel, ServicesItemModel, ServicesModel, updateServiceModel } from '../../models/categoriesmodel';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { createServiceModel } from '../../models/postModels';
import { DataService } from '../../services/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';


@Component({
  selector: 'app-services',
  imports: [NzTableModule, NzDropDownModule, NzModalModule, FormsModule, NzFormModule,
    CommonModule, NzSpinComponent, NzPaginationModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {

  servicesData!:ServicesModel;
  isVisible = false;
  loadingState=false;
  Loading = false;
  ServicesList: ServicesItemModel[]=[];
  Load = false;
  createServiceForm!:createServiceModel;
  isEdit = false;
  serviceForm:any={};
  isLoading = false;
  isDelete = false;
  categories!:CategoriesModel;
  Categories: any[] = [];
  searchValue ='';
  filteredServices: any[] = [];
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15];
  paginatedData: any[] = [];
  channelData!: ChannelsModel;
  Channels: any[] = [];

  constructor(private router:Router,  private categoryService:CategoriesService, private dataService:DataService,
    private notification:NzNotificationService){
    this.servicesData = new ServicesModel();
    this.createServiceForm = new createServiceModel();
  }

  ngOnInit(): void {
    this.listServices();
    this.listCategories();
    this.listChannels();
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

  submit(createServiceForm:NgForm){
     this.isLoading = true;
      const payload: createServiceModel ={
           name:createServiceForm.value.name, description:createServiceForm.value.description,
           token:createServiceForm.value.token,
            channel_id:createServiceForm.value.channel
         }
    this.dataService.createService(this.createServiceForm).subscribe({
      next:(response)=>{
        this.isLoading=false;
        // console.log('response', response);
           if(response.error=='00'){
          this.createNotification('top','success','Success!', response.message);
          this.isVisible = false;
          createServiceForm.resetForm();
          this.listServices();
        }
          if(response.error=='01'){
          this.createNotification('top','info','Info!', response.message);
            this.isVisible = false;
            createServiceForm.resetForm();
            this.listServices();
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
            this.isVisible = false;
            createServiceForm.resetForm();
        } 
      },
      error:(error)=>{
         this.isLoading=false;
        // console.log('error creating accounting', error);
        this.isVisible = false;
        this.createNotification('top','error', 'Service Not Created!',error.message)
        createServiceForm.resetForm();
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

  listChannels() {
    this.categoryService.getChannels(this.channelData).subscribe({
      next: (response) => {
        // console.log('response', response);
        this.Channels = response.data;
      },
      error: (error) => {
        // console.log('error', error)
      },
      complete: () => { }
    })
  }


  listServices(){
    this.loadingState = true;
    // console.log('loader', this.loadingState)
    this.categoryService.getServices(this?.servicesData).subscribe({
      next:(response)=>{
        this.loadingState = false;
        this.ServicesList = response.data || [];
        this.filteredServices = [...this.ServicesList];
        this.updatePagination(); 
        // console.log('services', response);
      //   if (this.serviceForm?.channel_id) {
      //    this.serviceForm.channel_id = this.serviceForm.channel_id;
      //  }
      },
      error:(error)=>{
        // console.log('error', error)
      },
      complete:()=>{}
    })
  }

  deleteModal(item:any){
    this.isDelete= true;
    this.serviceForm={
      id:item.id
    }
  }

  confirmDelete(){
    this.Load = true;
    this.categoryService.deleteService(this.serviceForm.id).subscribe({
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

  closeDelete(){
    this.isDelete = false
  }

  editModal(item:any){
    this.isEdit= true;
     const firstChannel =  item.description?.split(',')[0]?.trim();
    // console.log('details', item);
    this.serviceForm = {
      name: item.name,
      description: item.description,
      token: item.token, id:item.id,
      channel_id: firstChannel,
      institution: item.institution||[]
    }
    // console.log('Selected:', item.channel_name);
    // console.log('Options:', this.Channels.map(c => c.name));
  }

  editService(){
    this.Loading= true;
    const payload:updateServiceModel ={
      name: this.serviceForm.name, description: this.serviceForm.description,
      token: this.serviceForm.token, id:this.serviceForm.id,
      channel_id: this.serviceForm.channel_id
    }
    // console.log ('id', payload.id)
    this.categoryService.updateService(payload).subscribe({
      next:(response)=>{
         if(response.error=='00'){
          this.createNotification('top','success','Success!', response.message);
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
        }
        this.Loading = false;
        this.isEdit =false;
        this.listServices();
      },
      error:(error)=>{
         this.createNotification('top','error','Error!',error.message)   
      },
      complete:()=>{}
    })
  }

 
  createNotification(position:'top',type:'success' | 'error'| 'warning' | 'info', title: string, message: string){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  };
 
    listCategories(){
    // this.loadingState = true;
    this.categoryService.getCategories(this.categories).subscribe({
      next:(response:any)=>{
        this.Categories= response.data
        // console.log('all data', response)
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

  this.paginatedData = this.filteredServices.slice(start, end);
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

  filterServices() {
  const search = this.searchValue.toLowerCase();
  this.filteredServices = this.ServicesList.filter((service: any) =>
    service.name.toLowerCase().includes(search)
  );
  this.pageIndex = 1;
  this.updatePagination();
}
}
