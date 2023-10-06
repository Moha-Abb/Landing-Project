import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  @Output() finalResult = new EventEmitter()
  @Output() responses = new EventEmitter()

  question1Answer: any;
  question2Answer: any;
  responsesTest: [any, any] | undefined

  constructor(private router: Router, private quizService: QuizService) { }

  saveAnswers(): void {


    if (this.question1Answer && this.question2Answer) {
      this.responsesTest = [
        this.question1Answer,
        this.question2Answer]
        ;
      console.log('Saving Answers:', this.responsesTest);
      localStorage.setItem('responsesTest', JSON.stringify(this.responsesTest));
      this.finalResult.emit(true)

      /*       this.router.navigate(['/login'])
       */
    } else {
      alert('Por favor, responde ambas preguntas.');
    }
  }
}
