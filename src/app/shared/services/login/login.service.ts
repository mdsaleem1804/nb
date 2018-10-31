import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../models/user';
import { SharedLib } from '../../shared.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = SharedLib.adminApiUrl;

  constructor(private _http: HttpClient) { }

  login(_admin: Admin) {
    return this._http.post('http://localhost:8088/api/Master/login', _admin)
  }
}
