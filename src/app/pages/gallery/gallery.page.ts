import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/service/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  constructor(
    public service : PhotoService
  ) {}

  async ngOnInit(){
    await this.service.loadSaved();

  }

addPhotoToGallery(){
  this.service.addNewToGallery();

}
}
