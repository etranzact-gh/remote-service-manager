import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from '../models/datamodel';
import { environment } from '../environment/environment';
import { blockAccountModel, changePinModel, createAccountsModel, createCategoryModel, createChannelModel, createDataModel, createInstitutionModel, createProductModel, createServiceModel, setPinModel } from '../models/postModels';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(status: 'All' | 'ACTIVE' | 'Maintenance' | 'BLOCKED'):Observable <any>{
    return this.http.get<DataModel>(`${environment.loginApi}/Proxy/RemoteServiceManager/api/mgmt/getData?channel_id=all&status=${status}`);
  }

  createAccount(item: createAccountsModel):Observable <any>{
    return this.http.post<createAccountsModel>(environment.loginApi +'/Proxy/RemoteServiceManager/api/account/createAccount', item);
  }

  createCategory(item: createCategoryModel):Observable<any>{
    return this.http.post<createCategoryModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/category/createCategory', item);
  }

  createInstitution(item:createInstitutionModel):Observable<any>{
    return this.http.post<createInstitutionModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/institution/createInstitution', item);
  }

  createChannel(item:createChannelModel):Observable<any>{
    return this.http.post<createChannelModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/channel/createChannel', item);
  }

  createProduct(item:createProductModel):Observable <any>{
    return this.http.post<createProductModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/product/createProduct', item);
  }

  createService(item:createServiceModel):Observable<any>{
    return this.http.post<createServiceModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/service/createService', item);
  }

  createData(item:createDataModel):Observable<any>{
    return this.http.post<createDataModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/mgmt/processMgmtRequest', item);
  }

  newPin(item: setPinModel):Observable <any>{
    return this.http.post<setPinModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/account/setPin', item);
  }

  changePin(item: changePinModel):Observable <any>{
    return this.http.post<changePinModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/account/changePin', item);
  }

  blockAccount(item: blockAccountModel):Observable<any>{
    return this.http.post<blockAccountModel>(environment.loginApi + '/Proxy/RemoteServiceManager/api/account/manageAccount',item);
  }
}
