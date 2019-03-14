import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  @Input() questions: Array<Question>;

  constructor() {
  }

  ngOnInit() {
  }

}
