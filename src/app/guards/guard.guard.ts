import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupaService } from '../services/supa.service';
export const guardGuard = async () => {


  const router = inject(Router)
  const supaService = inject(SupaService)

  return (await supaService.getCurrentUser()).data.user == null ? router.navigate(['/main']) : true


}

