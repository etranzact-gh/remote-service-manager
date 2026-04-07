import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DataItemModel, DataModel } from '../../models/datamodel';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CategoriesService } from '../../services/categories.service';
import { AccountsModel, CategoriesModel, ChannelsModel, InstitutionsModel, ProductsModel, ServicesModel } from '../../models/categoriesmodel';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule, NgForm } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOptionComponent } from 'ng-zorro-antd/select';
// import { NgSelectModule } from '@ng-select/ng-select';
import { filter } from 'rxjs';
import { createDataModel } from '../../models/postModels';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-home',
  imports: [NzModalModule, NzFormModule, CommonModule, NzSpinModule, FormsModule,
    NzSelectModule, NzInputModule, NzCheckboxModule,NzOptionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService, private categoryService: CategoriesService,  private notification:NzNotificationService) {
    this.dataDetails = new DataModel(),
      this.categories = new CategoriesModel(),
      this.institutionsData = new InstitutionsModel(),
      this.productsData = new ProductsModel(),
      this.servicesData = new ServicesModel(),
      this.channelData = new ChannelsModel(),
      this.manageServiceForm = new createDataModel()
  }

  dataDetails!: DataModel;
  categories!: CategoriesModel;
  institutionsData!: InstitutionsModel;
  isLoading = false;
  servicesData!: ServicesModel;
  Categories: any[] = [];
  nzFilterOption = () => true;
  Services: any[] = [];
  filteredInstitutions: any[] = [];
  searchValue = '';
  allSelected = false;
  Channels: any[] = [];
  manageServiceForm!:createDataModel;
  productsData!: ProductsModel;
  Institutions: any[] = [];
  listofInstitutions : any[]=[]
  isVisible = false;
  Products: any[] = [];
  institution='';
  channelData!: ChannelsModel;
  dataItem: DataItemModel[] = [];
  loadingState = false;
  DataList: DataItemModel[] = [];
  activeFilter: 'All' | 'ACTIVE' | 'Maintenance' | 'BLOCKED' = 'All';
  filteredData: any[] = [];
  userFirstName : string ='';


    createNotification(position:'top',type:'success' | 'error'| 'warning' | 'info', title: string, message: string){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  };


  ngOnInit(): void {
    this.listData('All');
    this.listCategories();
    this.listInstitutions();
    this.listServices();
    this.listProducts();
    this.listChannels();

    this.userFirstName = localStorage.getItem('userFirstName') || '';
  }

  openModal() {
    this.isVisible = true
  }

  handleCancel() {
    this.isVisible = false
  }

  handleOk() {
    this.isVisible = false
  }

  listData(status: 'All' | 'ACTIVE' | 'Maintenance' | 'BLOCKED') {
    this.loadingState = true;
    this.dataService.getData(status).subscribe({
      next: (response: any) => {
        this.loadingState = false;
        console.log('all data', response);
        this.DataList = response.data.products || [];
        // this.institution = response.data.blacklist
        this.filteredData = [...this.DataList]; 
      },
      error: (error) => {
        this.loadingState = false;
        console.log('error listing data', error)
      },
      complete: () => { }
    })
  }

  submit(manageServiceForm: NgForm){
    this.isLoading = true;
    const institutions = manageServiceForm.value.institution;
    const payload:any ={
      category_id: manageServiceForm.value.category_id, channel_id: manageServiceForm.value.channel_id,
       institution: institutions && institutions.length
      ? institutions.join(',')
      : 'ALL', phone_number: manageServiceForm.value.phone_number,
      pin:manageServiceForm.value.pin, product_code:manageServiceForm.value.product_code, status:manageServiceForm.value.status,
      service_id:manageServiceForm.value.service_id,
    }
    if (manageServiceForm.value.institution?.length) {
     payload.institution = manageServiceForm.value.institution.join(',');
    }
    this.dataService.createData(payload).subscribe({
      next:(response)=>{
        console.log('response', response);
        this.isLoading = false;
        this.isVisible = false;
        if(response.error=='00'){
          this.createNotification('top','success','Success!', response.message);
        }
        if(response.error=='01'){
          this.createNotification('top','info','Error!', response.message);
        }
        if(response.error=='06'){
          this.createNotification('top','error','Error!', response.message);
        } 
        manageServiceForm.resetForm();
        this.listData('All');
      },
      error:(error)=>{
        this.isLoading = false
        console.log('error creating account', error);
        this.isVisible = false;
        this.createNotification('top','error',' Not Created!',error.message)
        manageServiceForm.resetForm();
      },
      complete:()=>{}
    })
  }

  filterData() {
  const search = this.searchValue.toLowerCase();
  this.filteredData = this.DataList.filter((service: any) =>
    service.name.toLowerCase().includes(search)
  );
}

  listServices() {
    this.categoryService.getServices(this.servicesData).subscribe({
      next: (response) => {
        console.log('services', response);
        this.Services = response.data;
      },
      error: (error) => {
        console.log('error', error)
      },
      complete: () => { }
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

  listInstitutions() {
    this.categoryService.getInstitutions(this.institutionsData).subscribe({
      next: (response: any) => {
        console.log('all institutions', response);
        this.Institutions = [...response.data];
        this.filteredInstitutions = this.Institutions;
      },
      error: (error) => {
        console.log('all data', error)
      },
      complete: () => { }
    })
  }

  listProducts() {
    this.categoryService.getProducts(this.productsData).subscribe({
      next: (response: any) => {
        console.log('all data', response);
        this.Products = response.data;
      },
      error: (error) => {
        console.log('all data', error)
      },
      complete: () => { }
    })
  }

  listChannels() {
    this.categoryService.getChannels(this.channelData).subscribe({
      next: (response) => {
        console.log('response', response);
        this.Channels = response.data;
      },
      error: (error) => {
        console.log('error', error)
      },
      complete: () => { }
    })
  }

  setFilter(filter: 'All' | 'ACTIVE' | 'Maintenance' | 'BLOCKED') {
    this.activeFilter = filter;
    this.listData(filter);
  }

  // Add these methods to your component
getInstitutionName(id: number): string {
    const institution = this.Institutions.find(inst => inst.id === id);
    return institution ? institution.name : '';
}

removeInstitution(id: number, event: Event): void {
    event.stopPropagation();
    this.manageServiceForm.institution = 
        this.manageServiceForm.institution.filter((i: number) => i !== id);
    this.updateSelectAll();
}

// Update your existing toggleInstitution method
toggleInstitution(id: number) {
  const selected = this.manageServiceForm.institution || [];
  if (selected.includes(id)) {
    this.manageServiceForm.institution = selected.filter(
      (i: number) => i !== id
    );
  } else {
    this.manageServiceForm.institution = [...selected, id];
  }
  this.updateSelectAll();
}

// Update toggleSelectAll
toggleSelectAll(value: boolean) {
    this.allSelected = value;
    if (value) {
        this.manageServiceForm.institution = this.Institutions.map(i => i.id);
    } else {
        this.manageServiceForm.institution = [];
    }
}

  // toggleInstitution(id: number) {
  //   const selected = this.manageServiceForm.institutions || [];
  //   if (selected.includes(id)) {
  //     this.manageServiceForm.institutions =
  //       selected.filter((i: number) => i !== id);
  //   } else {
  //     selected.push(id);
  //     this.manageServiceForm.institutions = selected;
  //   }
  //   this.updateSelectAll();
  // }

  // toggleSelectAll(value: boolean) {
  //   this.allSelected = value;
  //   if (value) {
  //     this.manageServiceForm.institutions =
  //       this.Institutions.map(i => i.id);
  //   } else {
  //     this.manageServiceForm.institutions = [];
  //   }
  // }

  filterInstitutions() {
    const value = this.searchValue.toLowerCase();
    this.filteredInstitutions =
      this.Institutions.filter(i =>
        i.name.toLowerCase().includes(value)
      );
  }

  isSelected(id: number) {
    return this.manageServiceForm.institution?.includes(id);
  }

  updateSelectAll() {
    this.allSelected =
    this.manageServiceForm.institution?.length ===this.Institutions.length;
  }
}
