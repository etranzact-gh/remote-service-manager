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
    return this.http.get<CategoriesModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/category/getCategories?status=all')
  }

  getInstitutions(item:InstitutionsModel):Observable<any>{
    return this.http.get<InstitutionsModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/institution/getInstitutions')
  }

  getServices(item:ServicesModel):Observable <any>{
    return this.http.get<ServicesModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/service/getServices?channel_id=all')
  }

  getProducts(item:ProductsModel):Observable<any>{
    return this.http.get<ProductsModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/product/getProducts?channel_id=all&service_id=all&status=all')
  }

  getChannels(item:ChannelsModel):Observable<any>{
    return this.http.get<ChannelsModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/channel/getChannels?category_id=all')
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
