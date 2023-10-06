import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _responses = new BehaviorSubject<any>(null);
  responses$ = this._responses.asObservable();

  setResponses(responses: any): void {
    this._responses.next(responses);
  }

  constructor() { }
}
