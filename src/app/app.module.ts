import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from '@angular/forms';
import { QuizService } from './services/quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ResultsComponent } from './components/results/ResultsComponent';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QuizComponent,
    LoginComponent,
    WelcomeComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
