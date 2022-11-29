import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private URL_PATH = "/users"

  constructor(private htpp: HttpClient) { }

  getAll(): Observable<any> {
    return this.htpp.get(environment.url + this.URL_PATH)

  }
}
