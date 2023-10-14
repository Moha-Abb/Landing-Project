import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupaService } from 'src/app/services/supa.service';


@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
    responsesTest: any;

    constructor(private supabase: SupaService, private route: ActivatedRoute) {
    }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.fetchResults(id);
        });

    }


    async fetchResults(id: string): Promise<void> {
        this.responsesTest = await this.supabase.getResponses(id);
    }
}
