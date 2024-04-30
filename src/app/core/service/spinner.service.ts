import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public isLoading = false;

  constructor() { }

  show() {
    this.isLoading = true;
  }
  hide() {
    this.isLoading = false;
  }
}
