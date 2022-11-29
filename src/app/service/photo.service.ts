import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { UserPhoto } from '../interfaces/user-photo';
import {Filesystem, Directory} from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos : UserPhoto[] = []
  private PHOTO_STORAGE: string = 'photos';

  constructor() { }

  /**
   * permet l'ajout de nouvelle photo dans notre gallerie
   */
  public async addNewToGallery(){

    
    //prend la photo
    const capturedPhoto = await Camera.getPhoto(
      {
        resultType: CameraResultType.Uri,
        source : CameraSource.Camera,
        quality: 100
      }
    )

    const saveImageFile = await this.savePicture(capturedPhoto);

    //Stocker dans le tableau
    this.photos.unshift(saveImageFile)
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })



  }

  /**
   * permet d'afficher photo sauvegardé dans  le téléphone
   */
  public async loadSaved(){
    const photoList = await Preferences.get({key : this.PHOTO_STORAGE})
    this.photos = JSON.parse(photoList.value!) || [];
    for (let photo of this.photos) {
      const readFile = await Filesystem.readFile({
        path: photo.filePath,
        directory: Directory.Data
      })
      photo.webview = `data:image/jpeg;base64,${readFile.data}`;
    }
  }

  private async savePicture(photo: Photo): Promise<UserPhoto>{
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })

    return {
      filePath : fileName,
      webview: photo.webPath!
    } as UserPhoto

  }

  /**
   * retourner un fichier type Photo en base 64
   * @param photo 
   * @returns 
   */
  private async readAsBase64(photo: Photo): Promise<string>{
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;

    }

    /**
     **permer la conversion d'un blob en base 64
     * @param blob 
     * @returns {Promise}
     */
    private convertBlobToBase64(blob:Blob){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(blob);
      })

    }
  
  


}
