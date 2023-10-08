import { Injectable, OnInit } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { envSupa } from 'src/app/environments/supa';
@Injectable({
  providedIn: 'root'
})
export class SupaService {

  private supabase = createClient(envSupa.supabase.url, envSupa.supabase.api_key);

  constructor() { }

  async signInWithEmail(email: string, phone: string): Promise<any> {
    try {
      const { data, error } = await this.supabase.auth.signInWithOtp({
        email,
        phone,
        options: {
          emailRedirectTo: 'http://localhost:4200/welcome',
        },
      });


      return { data, error };
    } catch (error) {
      return { error };
    }
  }

  async saveUserResponses(userId: string, responses: any): Promise<any> {
    const userID = userId.replace(/['"]/g, '');

    // Obtener el número de intentos actual del usuario
    const numeroIntento = await this.getNumeroIntentos(userID);
    const nuevoNumeroIntento = numeroIntento === 0 ? 1 : numeroIntento + 1;

    // Guardar el intento en la tabla 'intentos'
    if (nuevoNumeroIntento == 1) {
      await this.supabase.from('intentos').upsert([
        {
          iduser: userID,
          numerointento: nuevoNumeroIntento,
        }
      ]);
    } else {
      await this.supabase.from('intentos').update([
        {
          numerointento: nuevoNumeroIntento,
        }
      ])
        .eq('iduser', userID)
        ;
    }

    // Obtener el ID del intento recién creado o existente
    const { data: dataIntent, error: errorIntent } = await this.supabase
      .from('intentos')
      .select('id')
      .eq('iduser', userID)
      .order('id', { ascending: false })
      .limit(1);

    const intentoId = dataIntent?.[0]?.id;

    // Guardar las respuestas en la tabla 'respuestas' asociadas al intento creado
    await this.supabase.from('respuestas').upsert([
      {
        intento_id: intentoId,
        respuestas: responses,
      }
    ]);

    return { intentoId, error: null };
  }

  async getNumeroIntentos(idUser: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('intentos')
      .select('numerointento')
      .eq('iduser', idUser);

    if (error) {
      console.error('Error al obtener el número de intentos del usuario:', error);
      return 0;
    }

    return data?.[0]?.numerointento || 0;
  }

  async updateUserInfo(userId: string, name: string, phone: string): Promise<any> {
    const { data: user, error } = await this.supabase.auth.updateUser({ data: { phone: phone, name: name } });

    if (error) {
      console.error('Error al actualizar la información del usuario:', error);
    }

    return { user, error };
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  }

  async getCurrentUser(): Promise<any> {
    return await this.supabase.auth.getUser();
  }
}
