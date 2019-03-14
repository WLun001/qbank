import {Component} from '@angular/core';
import {UploadService} from './upload.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileName: string;
  isLoading = false;

  constructor(private uploadService: UploadService, private snackBar: MatSnackBar) {
  }

  onFileChange(file: any) {
    this.isLoading = true;
    const reader = new FileReader();

    // @ts-ignore
    if (event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadService.uploadFile(reader.result).subscribe(() => {
          reader.abort();
          this.isLoading = false;
          this.openSnackBar('Success');
          }
        );
      }
      ;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'ok', {
      duration: 2000,
    });
  }
}

