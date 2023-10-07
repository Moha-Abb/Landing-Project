import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AllowGuardService } from '../services/allow-guard.service';
import { SupaService } from '../services/supa.service';
export const guardGuard = async () => {


  //const supaService = inject(SupaService)
  const router = inject(Router)
  const supaService = inject(SupaService)

  const allowGuardService = inject(AllowGuardService)
  return (await supaService.getCurrentUser()).data.user == null ? router.navigate(['/main']) : true

  /*   let isAuthenticated = false;
  
    // Suscríbete al observable isAuthenticated$
    const subscription = allowGuardService.isAuthenticated$.subscribe(
      (authenticated: boolean) => {
        isAuthenticated = authenticated;
        if (isAuthenticated) {
          // El usuario está autenticado, permite el acceso
          subscription.unsubscribe(); // Desuscribirse después de manejar el evento
        }
      }
    );
  
    // Retorna true si el usuario está autenticado, de lo contrario, redirige a otra página
    if (isAuthenticated) {
      return true;
    } else {
      router.navigate(['/main']); // o la ruta que corresponda
      return false;
    } */
}

