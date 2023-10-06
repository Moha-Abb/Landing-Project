import { Component, OnInit } from '@angular/core';
import { SupaService } from '../../services/supa.service';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { MetaService } from '../../services/meta.service';
import { AllowGuardService } from 'src/app/services/allow-guard.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  email: any;
  name: any;
  phone: any;
  result: any;
  responsesTest: any

  private respuestasGuardadas: boolean = false;

  constructor(private supaService: SupaService, private route: Router,
    private metaService: MetaService,
    private allowGuardService: AllowGuardService) {

  }

  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'Titulo del project y test',
      type: 'website',
      imageSrc: '<https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSm0cFem_Bw0uo3QZSLGxC7wO6gSzjdFc0bA&usqp=CAU>',
      url: '<https://projectlanding.vercel.app/main>',
      description: 'pequeña descripcion',
      cardType: 'summary_large_image',
    });
    const temporaryDataString = localStorage.getItem('temporaryData');
    if (temporaryDataString) {
      const temporaryData = JSON.parse(temporaryDataString);
      this.name = temporaryData.name;
      this.phone = temporaryData.phone;
    }

    const responsesTestString = localStorage.getItem('responsesTest');
    if (responsesTestString) {
      this.responsesTest = JSON.parse(responsesTestString);
      console.log(this.responsesTest);
    }
    this.checkAuthentication();
  }


  async checkAuthentication() {
    const dataUser = await this.supaService.getCurrentUser();
    if (dataUser.data.user?.aud == "authenticated") {
      this.allowGuardService.setAuthenticated(true);
      if (!dataUser.data.user.user_metadata || Object.keys(dataUser.data.user.user_metadata).length === 0) {
        await this.supaService.updateUserInfo(dataUser.data.user.id, this.name, this.phone);
        console.log('hey')
      }

      if (!this.respuestasGuardadas) {
        await this.supaService.saveUserResponses(dataUser.data.user.id, this.responsesTest);
        this.respuestasGuardadas = true;
      }
      console.log(dataUser)
      return { error: null };
    } else {
      return false
    }
  }

  async signOut() {
    const { error } = await this.supaService.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    } else {
      console.log('Usuario ha cerrado sesión.');
      localStorage.removeItem('responsesTest');
      localStorage.removeItem('temporaryData');
      this.route.navigate(['/main']);


    }
  }

  async shareContent() {
    try {

      let title = 'Título predeterminado';
      let description = 'Descripción predeterminada';

      const image = await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOEIXpZcXR-N8OH_q0Dj2ou6Vr1U69t4kM-w&usqp=CAU')
      const blob = await image.blob();
      await navigator.share({
        title: title,
        text: description,
        url: 'https://landing-project-vercel.vercel.app/',
        // files: [new File([blob], 'image.png', { type: 'image/png' })]

      });
      console.log('Contenido compartido con éxito.');
    } catch (error) {
      console.error('Error al compartir contenido:', error);
    }
  }
}
