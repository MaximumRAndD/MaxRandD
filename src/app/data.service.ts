import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataService
{
  private formSource = new Subject<any>();

  formData$ = this.formSource.asObservable();

  formData(form: any): void
  {
    this.formSource.next(form);
  }
}
