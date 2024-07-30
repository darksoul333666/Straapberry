import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class MediaCaptureService {

  constructor() { }

  public async takePhoto(): Promise<string> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 30,
    });
    return capturedPhoto.webPath as string;
  }

  public async selectPictureFromGallery(): Promise<string> {
    const capturedPhoto = await Camera.pickImages({
      quality: 30,
      limit:1,
    });
    return capturedPhoto.photos[0].webPath as string;
  }
}
