import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  private SecretKey_authentication = "586E327235753878214125442A472D4B6150645367566B597033733676397924";
  private Iv_authentication = "2A462D4A404E635266556A586E3272357538782F413F4428472B4B6250645367";

  get secretKey_authentication() {
    return this.SecretKey_authentication;
  }

  get iv_authentication() {
    return this.Iv_authentication;
  }
  
}
