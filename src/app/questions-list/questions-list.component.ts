import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  questions$: Observable<Question[]>;
  private searchTerm = new Subject<string>();

  constructor(private searchService: SearchService) {
  }

  onSearch(term: string) {
    this.searchTerm.next(term);
  }

  ngOnInit() {
    this.questions$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchService.search(term))
    );
    this.questions$.subscribe(x => console.log(x));
  }

}
