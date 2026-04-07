import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CategoriesModel, ChannelItemModel, ChannelsModel, updateChannelModel } from '../../models/categoriesmodel';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { createChannelModel } from '../../models/postModels';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../../services/data.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-channels',
  imports: [NzTableModule, NzDropDownModule, NzModalModule, FormsModule, NzFormModule, CommonModule, NzSpinModule, NzPaginationModule],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent implements OnInit {
   constructor(private router:Router,  private categoryService:CategoriesService, private dataService:DataService,
    private notification:NzNotificationService){
    this.channelData = new ChannelsModel();
    this.createChannelForm =new createChannelModel();
  }

  channelData!:ChannelsModel;
  loadingState=false;
  ChannelList:ChannelItemModel[]=[];
  createChannelForm!: createChannelModel;
  channelForm:any={};
  Loading = false;
  searchValue ='';
  filteredChannel :any[]=[];
  Categories: any[] = [];
  categories!: CategoriesModel;
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15];
  paginatedData: any[] = [];
  isLoading = false;
  isDelete = false;
  Load = false;

  createNotification(position:'top',type:'success' | 'error'| 'warning' | 'info', title: string, message: string){
  this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  };


  ngOnInit(): void {
  this.listChannels();
  this.listCategories();
  }

  isEdit = false;

  isVisible = false;
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

   handleDelete(){
    this.isDelete = false
  }

  handleOki(){
    this.isDelete = false
  }

   closeDelete(){
    this.isDelete = false
  }



  listChannels(){
    this.loadingState = true;
    this.categoryService.getChannels(this.channelData).subscribe({
      next:(response)=>{
        this.loadingState=false
        console.log('response',response)
        this.ChannelList= response.data || [];
        this.filteredChannel = [...this.ChannelList]; 
        this.updatePagination();
      },
      error:(error)=>{
        console.log('error', error)
      },
      complete:()=>{}
    })
  }

  updatePagination() {
  const start = (this.pageIndex - 1) * this.pageSize;
  const end = start + this.pageSize;

  this.paginatedData = this.filteredChannel.slice(start, end);
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


  filterChannel() {
  const search = this.searchValue.toLowerCase();

  this.filteredChannel = this.ChannelList.filter((service: any) =>
    service.name.toLowerCase().includes(search)
  );
}

  submit(createChannelForm:NgForm){
    // this.loadingState = true;
    this.isLoading = true;
    this.dataService.createChannel(this.createChannelForm).subscribe({
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
        createChannelForm.resetForm();
        this.listChannels();
      },
      error:(error)=>{
        console.log('error creating channel', error);
        this.isVisible = false;
        this.createNotification('top','error','Channel Not Created!',error.message)
        createChannelForm.resetForm();
      },
      complete:()=>{}
    })
  }

    listCategories() {
    this.categoryService.getCategories(this.categories).subscribe({
      next: (response: any) => {
        console.log('all data', response);
        this.Categories = response.data;
      },
      error: (error) => {
        console.log('all data', error)
      },
      complete: () => { }
    })
  }

  editModal(item:any){
    this.isEdit=true;
    this.channelForm={
      name:item.name,
      category_id:item.category_id,
      url:item.url, id: item.id
    }
  }

   editChannel(){
    this.Loading= true;
    const payload:updateChannelModel ={
      name: this.channelForm.name, description: this.channelForm.description,
      url: this.channelForm.url, id:this.channelForm.id,
      category_id:this.channelForm.category_id
    }
    console.log ('id', payload.id)
    this.categoryService.updateChannel(payload).subscribe({
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

   deleteModal(item:any){
    this.isDelete= true;
    this.channelForm = {
      id:item.id
    }
  }

  confirmDelete(){
    this.Load = true;
    this.categoryService.deleteChannel(this.channelForm.id).subscribe({
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
}
