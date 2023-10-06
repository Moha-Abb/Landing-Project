import { Router } from '@angular/router';
import { SupaService } from '../services/supa.service';
import { inject } from '@angular/core';
export const guardGuard = async () => {

  const supaService = inject(SupaService)
  const router = inject(Router)

  return (await supaService.getCurrentUser()).data.user == null ? router.navigate(['/main']) : true
};
