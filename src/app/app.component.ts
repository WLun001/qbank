import {Component} from '@angular/core';
import {UploadService} from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileName: string;

  constructor(private uploadService: UploadService) {

  }

  onFileChange(file: any) {
    const reader = new FileReader();

    // @ts-ignore
    if (event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadService.uploadFile(reader.result).subscribe(value => {
            console.log(value);
          }
        );
      }
      ;
    }
  }
}

