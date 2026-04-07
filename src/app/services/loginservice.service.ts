import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { logoutModel } from '../models/datamodel';

export interface PortalConfig{
  pub_key : string;
  session_timeout: string;
}

export interface SigninPayload{
  data : any;
  pub_key: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient) { }

  portalAction(): Observable <any>{
  return this.http.get<PortalConfig>(environment.loginApi + '/PortalSettings?action=config', {})
  }

  signin(encryptedData:{payload: string}): Observable<any>{
    return this.http.post<SigninPayload>(environment.loginApi + '/Authenticator', encryptedData)
  }

  signOut(item:logoutModel):Observable<any>{
    return this.http.get<logoutModel>(environment.loginApi + '/Logout')
  }
}
