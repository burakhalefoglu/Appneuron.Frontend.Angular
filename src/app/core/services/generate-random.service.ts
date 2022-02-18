import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateRandomService {


  public generateRandomColor() {

    let randNumber = Math.floor(Math.random() * 7);

    switch (randNumber) {

      case 0: return '#25d5e4';
      case 1: return '#009688';
      case 2: return '#ffbb44';
      case 3: return '#e95f2b';
      case 4: return '#f8538d';
      case 5: return '#445ede';
      case 6: return '#B21AD6';
      default: return '#25d5e4';
    }
  }

}
