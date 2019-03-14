import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {ApiUrl} from './config';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  search(keyword: string) {
    console.log(keyword);
    if (!keyword.trim()) {
      return of([]);
    }
    return this.http.get<Question[]>(`${ApiUrl.search}?keyword=${keyword}`).pipe(
      catchError(err => of(err))
    );
  }

}
