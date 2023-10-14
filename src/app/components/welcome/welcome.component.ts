import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { SupaService } from '../../services/supa.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  dataUser: any
  responsesTest: any
  isDownloading: boolean = false;

  private respuestasGuardadas: boolean = false;
  @ViewChild('resultCanvas', { static: false }) resultCanvas: ElementRef | undefined;
  imageGeneratedUrl!: string;

  constructor(private supaService: SupaService, private route: Router,
    private http: HttpClient, private meta: Meta) {

  }

  ngOnInit(): void {
    /* this.metaService.updateMetaTags({
      title: 'Titulo del project y test',
      type: 'website',
      imageSrc: '<https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSm0cFem_Bw0uo3QZSLGxC7wO6gSzjdFc0bA&usqp=CAU>',
      url: '<https://projectlanding.vercel.app/main>',
      description: 'pequeña descripcion',
      cardType: 'summary_large_image',
    }); */
    const temporaryDataString = localStorage.getItem('temporaryData');
    if (temporaryDataString) {
      const temporaryData = JSON.parse(temporaryDataString);
      this.name = temporaryData.name;
      this.phone = temporaryData.phone;
    }

    const responsesTestString = localStorage.getItem('responsesTest');
    if (responsesTestString) {
      this.responsesTest = JSON.parse(responsesTestString);
    }
    this.checkAuthentication();
  }


  async checkAuthentication() {
    try {
      this.dataUser = await this.supaService.getCurrentUser();
      this.email = this.dataUser.data.user.email;
      if (this.dataUser.data.user?.aud == "authenticated") {
        if (!this.dataUser.data.user.user_metadata || Object.keys(this.dataUser.data.user.user_metadata).length === 0) {
          await this.supaService.updateUserInfo(this.name);
        }

        if (true) {
          await this.supaService.saveUserResponses(this.dataUser.data.user.id, this.responsesTest);
          localStorage.removeItem('responsesTest')
          this.respuestasGuardadas = true;
          const imageGenerated = await this.generateImage()
          await this.supaService.saveImageToStorage(this.dataUser.data.user.id, imageGenerated)
          this.imageGeneratedUrl = await this.supaService.getImageToStorageUrl(this.dataUser.data.user.id)
          this.meta.updateTag({ property: 'og:image', content: this.imageGeneratedUrl });
          this.meta.updateTag({ name: 'twitter:image', content: this.imageGeneratedUrl });

        }
        return { error: null };
      } else {
        this.route.navigate(['/main']);
        return false
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
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
        url: 'https://lpprojectpro.vercel.app/',
        // files: [new File([blob], 'image.png', { type: 'image/png' })]

      });
      console.log('Contenido compartido con éxito.');
    } catch (error) {
      console.error('Error al compartir contenido:', error);
    }
  }

  async descargar() {
    this.isDownloading = true;
    const destinatario = this.email;
    if (!this.dataUser.data.user.email) {
      await this.supaService.updateUserInfoEmail(this.email);
    }
    // Cambia la URL a la URL de tu función serverless en Supabase
    this.http.post('/api/sendMail', { destinatario, respuestas: this.responsesTest })
      .subscribe(
        () => {
          console.log('Correo enviado con éxito');
          this.isDownloading = false;
        },
        (Error) => {
          console.error('Error al enviar el correo:', Error);
          this.isDownloading = false;
        }
      );
  }

  async generateImage(): Promise<Blob> {
    // Deberías tener una referencia del elemento canvas en tu plantilla HTML
    // Asume que tienes <canvas #resultCanvas></canvas> en welcome.component.html
    const canvas = this.resultCanvas?.nativeElement;
    const ctx = canvas.getContext('2d');

    // Personaliza tu imagen:
    ctx.fillText(`Resultado: ${this.responsesTest}`, 50, 50);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: Blob | PromiseLike<Blob>) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Error generating image"));
        }
      });
    });
  }
}

