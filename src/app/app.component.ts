import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firebaseConfig = {
    apiKey: 'AIzaSyCXenDFrC2ahriYim0K0XA4l_GLOtLngWU',
    authDomain: 'qbank-d2679.firebaseapp.com',
    databaseURL: 'https://qbank-d2679.firebaseio.com',
    projectId: 'qbank-d2679',
  };
  fileName: string;

  onFileChange(file: any) {
    const reader = new FileReader();

    // @ts-ignore
    if (event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
      };
    }
  }
}

