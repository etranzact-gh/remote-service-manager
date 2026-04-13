import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountsModel, CategoriesModel, ChannelsModel, deleteAccountModel, deleteCategoryModel, deleteChannelModel, deleteInstitutionModel, deleteServiceModel, InstitutionsModel, ProductsModel, ServicesModel, updateCategoryModel, updateChannelModel, updateInstitutionModel, updateProductModel, updateServiceModel } from '../models/categoriesmodel';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }
  getCategories(item:CategoriesModel):Observable<any>{
    let url = `${environment.loginApi}/Proxy/RemoteServiceManager/api/category/getCategories`;
    let isParam = true;

    if(item.status){
      url += `?status=${item.status}`;
      isParam = false;
    }

    if(item.channel_id){
      url += `${isParam ? '?' : '&'}channel_id=${item.channel_id}`;
    }
    return this.http.get<CategoriesModel>(url)
  }

  getInstitutions(item:InstitutionsModel):Observable<any>{
    return this.http.get<InstitutionsModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/institution/getInstitutions')
  }

  getServices(item:ServicesModel):Observable <any>{
    let url = `${environment.loginApi}/Proxy/RemoteServiceManager/api/service/getServices`;
    let isParam = true;

    if(item.status){
      url += `?status=${item.status}`;
      isParam = false;
    }

    if(item.channel_id){
      url += `${isParam ? '?' : '&'}channel_id=${item.channel_id}`;
    }
    return this.http.get<ServicesModel>(url)
  }

  getProducts(item:ProductsModel):Observable<any>{
    let url = `${environment.loginApi}/Proxy/RemoteServiceManager/api/product/getProducts`;
    let isProduct = true;

    if(item.status){
      url += `${isProduct ? '?' : '&'}status=${item.status}`;
      isProduct = false;
    }
    if(item.channel_id){
      url += `${isProduct ? '?' : '&'}channel_id=${item.channel_id}`;
      isProduct = false;
    }
    if(item.service_id){
      url += `${isProduct ? '?' : '&'}service_id=${item.service_id}`;
      isProduct = false;
    }
    return this.http.get<ProductsModel>(url)
  }

  getChannels(item:ChannelsModel):Observable<any>{
  let url = `${environment.loginApi}/Proxy/RemoteServiceManager/api/channel/getChannels`;
    let isParam = true; 

    if(item.status){
      url += `?status=${item.status}`;
      isParam = false;
    }

    if(item.category_id){
      url += `${isParam ? '?' : '&'}category_id=${item.category_id}`;
    }
  
    return this.http.get<ChannelsModel>(url)
  }

  getAccounts(item:AccountsModel):Observable <any>{
 return this.http.get<AccountsModel>(environment.loginApi +'/Proxy/RemoteServiceManager/api/account/fetchAccounts?phone_number=&status=all');
  }

  updateService(item: updateServiceModel):Observable <any>{
    return this.http.post <updateServiceModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/service/updateService', item);
  }

  updateProduct(item: updateProductModel):Observable<any>{
    return this.http.post<updateProductModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/product/updateProduct', item);
  }

  updateChannel(item: updateChannelModel):Observable<any>{
    return this.http.post<updateProductModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/channel/updateChannel', item);
  }

  updateInstitution(item: updateInstitutionModel):Observable<any>{
   return this.http.post<updateInstitutionModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/institution/updateInstitution', item);
  }

  updateCategories(item: updateCategoryModel):Observable<any>{
    return this.http.post<any>(environment.loginApi + '/Proxy/RemoteServiceManager/api/category/updateCategory', item);
  }
 
  deleteService(id: number):Observable <any>{
    return this.http.delete<deleteServiceModel>(environment.loginApi + `/Proxy/RemoteServiceManager/api/service/deleteService/${id}`);
  }

  deleteProduct(id: number):Observable <any>{
    return this.http.delete<deleteServiceModel>(environment.loginApi + `/Proxy/RemoteServiceManager/api/service/deleteService/${id}`);
  }

  deleteChannel(id: number):Observable <any>{
    return this.http.delete<deleteChannelModel>(environment.loginApi + `/Proxy/RemoteServiceManager/api/channel/deleteChannel/${id}`);
  }

  deleteCategory(id: number):Observable <any>{
    return this.http.delete<deleteCategoryModel>(environment.loginApi + `/Proxy/RemoteServiceManager/api/category/deleteCategory/${id}`);
  }

  deleteInstitution(id: number):Observable <any>{
    return this.http.delete<deleteInstitutionModel>(environment.loginApi + `/Proxy/RemoteServiceManager/api/institution/deleteInstitution/${id}`);
  }

  deleteAccount(id: number):Observable <any>{
    return this.http.delete<deleteAccountModel>(environment.loginApi + `/Proxy/RemoteServiceManager/api/account/deleteAccount/${id}`);
  }

}
