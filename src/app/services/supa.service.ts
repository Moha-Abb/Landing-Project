import { Injectable } from '@angular/core';
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
          emailRedirectTo: 'https://lpprojectpro.vercel.app/welcome',
        },
      });


      return { data, error };
    } catch (error) {
      return { error };
    }
  }
  async signInWithPhone(phone: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithOtp({
      phone: phone,
    })
    return { data, error };

  }

  async verifyPhoneNumber(phone: string, pin: string): Promise<any> {
    const { data, error } = await this.supabase.auth.verifyOtp({
      phone: phone,
      token: pin,
      type: 'sms'
    })
    return { data, error };

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
        iduser: userID,
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
  async getResponses(idUser: string): Promise<{ respuestas: any; }[] | null> {
    const { data, error } = await this.supabase
      .from('respuestas')
      .select('respuestas')
      .eq('iduser', idUser);

    if (error) {
      console.error('Error al obtener el número de intentos del usuario:', error);

    }

    return data;
  }

  async updateUserInfoName(name: string): Promise<any> {
    const { data: user, error } = await this.supabase.auth.updateUser({ data: { name: name } });

    if (error) {
      console.error('Error al actualizar la información del usuario:', error);
    }

    return { user, error };
  }
  async updateUserInfoEmail(email: string): Promise<any> {
    const { data: user, error } = await this.supabase.auth.updateUser({ data: { email: email } });

    if (error) {
      console.error('Error al actualizar la información del usuario:', error);
    }

    return { user, error };
  }
  async updateUserInfoImage(image: object): Promise<any> {
    const { data: user, error } = await this.supabase.auth.updateUser({ data: { image: image } });

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

  async saveImageToStorage(userId: string, blob: Blob): Promise<string> {
    const file = new File([blob], `${userId}.png`, { type: 'image/png' });

    const { data, error } = await this.supabase.storage.from('resultsfoto').upload(`results/${userId}.png`, file);
    console.log(data)
    console.log(error)

    if (error) {
      throw error;
    }
    return data.path

  }
  async getImageToStorageUrl(userId: string): Promise<string> {
    const { data } = await this.supabase
      .storage
      .from('resultsfoto')
      .getPublicUrl(`results/${userId}.png`)

    return data.publicUrl;
  }
}
