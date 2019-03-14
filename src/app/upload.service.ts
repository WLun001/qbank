import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrl} from './config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  uploadFile(fileContent: string | ArrayBuffer | null) {
    return this.http.post(ApiUrl.upload, {
      data: fileContent
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  testUplaod(fileContent: string | ArrayBuffer | null) {
    const data = fileContent.toString() as any;
    const startIndex = data.indexOf(',') + 1;
    const formattedData = data.slice(startIndex).toString();
    const jsonData = JSON.parse(atob(formattedData));
    const sqData = [];
    (jsonData.SurveyElements as Array<any>).forEach(value => {
      if (value.Element === 'SQ') {
        sqData.push(value);
      }
    });
    console.log(sqData);
  }
}
