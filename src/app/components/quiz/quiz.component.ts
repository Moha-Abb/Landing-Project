import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  @Output() finalResult = new EventEmitter()
  @Output() responses = new EventEmitter()

  questions: string[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
  currentQuestionIndex: number = 0;
  currentAnswer: string = '';
  responsesTest: string[] = [];

  constructor() {

  }

  nextQuestion(): void {
    if (this.currentAnswer) {
      this.responsesTest.push(this.currentAnswer);
      this.currentAnswer = '';

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {


        localStorage.setItem('responsesTest', JSON.stringify(this.responsesTest));
        this.finalResult.emit(true)

      }
    } else {
      alert('Por favor, responde la pregunta antes de pasar a la siguiente.');
    }
  }
}
