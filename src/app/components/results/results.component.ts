import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SupaService } from 'src/app/services/supa.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  responsesTest: any

  constructor(private supabase: SupaService, private meta: Meta) {
    const responsesTestString = localStorage.getItem('responsesTest');
    if (responsesTestString) {
      this.responsesTest = JSON.parse(responsesTestString);
    }
  }


  ngOnInit() {
    this.meta.updateTag({ property: 'og:image', content: '' });

  }
}
