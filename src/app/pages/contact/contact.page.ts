import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  users : any[] = [];
  constructor(
    private service: ContactService) { }

  ngOnInit() {
    this.getUsers()
  }
  private getUsers(){
    this.service.getAll().subscribe(response => this.users = [...response.users])

  }

}
