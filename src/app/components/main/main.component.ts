import { Component, ViewChild } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public showMainMenu: boolean;
  public showQuizScreen: boolean;
  public showLoginScreen: boolean;

  @ViewChild('quiz', { static: true }) quiz!: QuizComponent;
  @ViewChild('login', { static: true }) login!: LoginComponent;


  constructor() {
    this.showMainMenu = true;
    this.showQuizScreen = false;
    this.showLoginScreen = false;
    localStorage.removeItem('responsesTest');
    localStorage.removeItem('temporaryData');
  }

  quizQuestions(): void {
    this.showQuizScreen = true;
    this.showMainMenu = false;
  }

  finalResult(responses: any): void {

    this.showQuizScreen = false;

    this.showLoginScreen = true;

  }
}
