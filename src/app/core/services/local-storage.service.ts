import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    setItem(key: string, data: any): void {
        localStorage.setItem(key, data);
    }

    setToken(data: any): void {
        localStorage.setItem('token', data);

    }

    getToken(): string {
       return  localStorage.getItem('token');
    }

    removeToken(): void {
        return  localStorage.removeItem('token');
    }


    getItem(key: string): string {
       return  localStorage.getItem(key);
    }
}
