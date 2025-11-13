import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' //responsavel por fazer as requisições
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.api

  constructor(  private httpClient: HttpClient) {

  }

  obterUsuarios(nome: string, senha: string){
    return this.httpClient.post<Usuario>(this.url + '/login',{
      nome,
      senha
    })
  }
}
