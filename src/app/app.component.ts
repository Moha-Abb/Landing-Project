import { Component, OnInit } from '@angular/core';
import { MetaService } from './services/meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private metaService: MetaService) { }
  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'Titulo del project y test',
      type: 'website',
      imageSrc: '<https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSm0cFem_Bw0uo3QZSLGxC7wO6gSzjdFc0bA&usqp=CAU>',
      url: '<https://projectlanding.vercel.app/main>',
      description: 'pequeña descripcion',
      cardType: 'summary_large_image',
    });

  }


}
