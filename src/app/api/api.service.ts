import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public respuesta: any;
  url = 'http://api.4planning.cl';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }


  validousuario_suscribe(data) {
    //Valida el usuario y retorna informacion del usuario, grupo al que pertenece, asignatura, sesiones y puntajes obtenidos
    //console.log(data)
    return this.http.post(this.url + '/api/v1/sesion', data, this.httpOptions)
    .pipe(
     
    );
  }
  validousuario(data) {
    //Valida el usuario y retorna informacion del usuario, grupo al que pertenece, asignatura, sesiones y puntajes obtenidos
    //console.log(data)
    return this.http.post(this.url + '/api/v1/sesion', data, this.httpOptions)
    .pipe(
     
    ).toPromise();
  }

  reset_contrasena(data) {
    //console.log("datos sesiones x grupo",data)
    return this.http.post(this.url + '/api/v1/reset/password', data, this.httpOptions);
  }


  contenido_actividades(date:any) {
    //Retorna las sessiones que han cambiado luego de la fecha proporcionada
    return this.http.get(this.url + '/api/v1/sesiones?updated_at=' + date, this.httpOptions);
  }

  retorno_grupo(data:any) {
    //Retorna el grupo y los compañeros de curso que han cambiado luego de la fecha proporcionada
    return this.http.get(this.url + '/api/v1/classmates?api_token=' + data.api_token + "&update=" + data.update).toPromise();
  }

  mensajesdelmuro(data:any) {
    //console.log("mensajes muro",data)

    if (!data.startinid || data.startinid == null) {
      //console.log("sin start")
      return this.http.get(this.url + '/api/v1/getsharedwithme/filtered?api_token=' + data.api_token + '&filterby=' + data.filtro + '&page=' + data.page).toPromise();
    } else {
      //console.log("con start")
      return this.http.get(this.url + '/api/v1/getsharedwithme/filtered?api_token=' + data.api_token + '&filterby=' + data.filtro + '&startinid=' + data.startinid + '&page=' + data.page).toPromise();
    }
  }

  revisarcomentariodelmuro(data:any) {
    /*console.log("contenido de getcomments")
    console.log(data);*/
    //Retorna los comentarios de una notificacion especifica    
    //console.log(data);
    return this.http.get(this.url + '/api/v1/getcomments?api_token=' + data.api_token + '&notificationId=' + data.notificationId + '&page=' + data.page).toPromise();
  }

  GetOneSignal(data:any) {
    //Entrega las ID de onesignal utilizadas para notificaciones push
    return this.http.get(this.url + '/api/v1/getonesignal?api_token=' + data.api_token + "&update=" + data.update).toPromise();
  }

  retornocontenidoayuda(data:any) {
    //Retorna la ayuda del sistema
    return this.http.get(this.url + '/api/v1/gethelp?update=' + data).toPromise();
  }

  likeNotification(data:any) {
    //Retorna los likes de las notificaciones 
    return this.http.get(this.url + '/api/v1/gethelp?api_key=' + data.api_key + '&notificationId=' + data.notificationId + '&liked=' + data.liked).toPromise();
  }

  insertopushtokendeonesignal(data:any) {
    //Actualiza y/o elimina el push token de un usuario
    return this.http.post(this.url + '/api/v1/device', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }

  SesionOneSignal(data:any) {
    //Actualiza y/o elimina el push token de un usuario
    return this.http.post(this.url + '/api/v1/updatepushtoken', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }

  actualizalike(data:any) {
    //Permite cambiar el estado del me gusta sobre una notificacion en particular
    //console.log(data)
    return this.http.get(this.url + '/api/v1/likeNotification?api_token=' + data.api_token + '&notificationId=' + data.notificationId);
  }


  /// estas no las estoy ocupando
  creacomentario(data:any) {
    //Permite cambiar el estado del me gusta sobre una notificacion en particular
    return this.http.post(this.url + '/api/v1/create/comment', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }

  perfil(data:any) {
    //Permite cambiar el estado del me gusta sobre una notificacion en particular
    return this.http.post(this.url + '/api/v1/updateuserprofile', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }

  guardorespuestas(data:any) {
    //console.log("estos son los datos de guardo respuesta");
    //console.log(data);
    //Guarda la respuesta de una actividad
    //return this.http.post('/v1/savehttp://152.74.151.154/PDAA_backend/public//apiResponse/', data, {headers: {"content-Type" : "application/json"}}).toPromise();
    return this.http.post(this.url + '/api/v1/saveResponse', data, { headers: { "content-Type": "application/json" } }).toPromise();

  }

  retorna_social_actividadvisual(data:any) {
    //Entrega la cantidad de me gusta y comentarios sobre una actividad visual especifica
    return this.http.get(this.url + '/api/v1/getactividadvisualinteractions?api_token=' + data.api_token + '&actividad_id=' + data.id + '&grupo_id=' + data.grupo_id).toPromise();
  }

  retorna_comentarios_actividadvisual(data:any) {
    //Entrega la cantidad de me gusta y comentarios sobre una actividad visual especifica
    return this.http.get(this.url + '/api/v1/getcommentsofactivityvisual?api_token=' + data.api_token + '&actividadvisualid=' + data.actividadvisualid + '&grupo_id=' + data.grupo_id).toPromise();
  }

  publica_comentario_avisual(data:any) {
    //console.log(data:any)
    //Guarda un comentario en una actividad visual especifica
    return this.http.post(this.url + '/api/v1/comment/actividadvisual', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }

  actualiza_megusta_actividadvisual(data:any) {
    //Cambia el estado sobre el megusta de una actividad visual en particular
    //console.log(data:any)
    return this.http.get(this.url + '/api/v1/updatelikeactividadvisual?api_token=' + data.api_token + '&actividadvisualid=' + data.actividadvisualid + '&grupo_id=' + data.grupo_id).toPromise();
  }

  social_megustapush_actividadvisual(data:any) {
    //Cambia el estado de uno o varios perfiles para configurar la recepción de notificaciones push
    return this.http.get(this.url + '/api/v1/updatenotificationspreferences?api_token=' + data.api_token + '&actividadvisualid=' + data.id).toPromise();
  }
  /// fin estas no las estoy ocupando

  finishedactivities(data:any) {
    return this.http.get(this.url + '/api/v1/finishedactivities?api_token=' + data);
  }

  gamificacion(data:any) {
    return this.http.get(this.url + '/api/v1/gamificacion/myscore?api_token=' + data).toPromise();
  }

  sesiones_porgrupos(data:any) {
    //console.log("datos sesiones x grupo",data)
    return this.http.get(this.url + '/api/v1/get/session/activebygroup?api_token=' + data.api_token + '&grupo_id=' + data.grupo_id).toPromise();
  }

  preguntas_frecuentes(data:any) {
    //console.log("datos sesiones x grupo",data)
    return this.http.post(this.url + '/api/v1/create/consulta', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }
  valoro_sesion(data:any) {
    //console.log("datos sesiones x grupo",data)
    return this.http.post(this.url + '/api/v1/saveValorizationSession', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }

  elimino_comentario(data:any) {
    //console.log("datos sesiones x grupo",data)
    return this.http.post(this.url + '/api/v1/delete/comment', data, { headers: { "content-Type": "application/json" } }).toPromise();
  }

  actividad_final(data:any) {
    //console.log("datos sesiones x grupo",data)
    return this.http.get(this.url + '/api/v1/get/finalsession?api_token=' + data.token + '&update=' + data.update).toPromise();
  }

  retorna_actividades_finalizadas(data:any) {
    //console.log("datos sesiones x grupo",data)
    return this.http.get(this.url + '/api/v1/getspecificanswerbyuser?api_token=' + data.token + '&actividad_id=' + data.id).toPromise();
  }

  retorna_perfil_usuario(data:any){
    return this.http.get(this.url + '/api/v1/userprofile?email=' + data).toPromise();

  }

  guardo_actividad_final(data:any) {
    console.log("datos actividad final",data)
    return this.http.post(this.url + '/api/v1/saveResponse/finalsession', data, this.httpOptions);
  }


  reviso_datos(data:any) {
    //console.log("datos que recibo", data)
    this.respuesta = "";
    this.retorna_actividades_finalizadas(data)
      .then((dat: any) => {
        //console.log("estos son los datos", dat)
        let actividad = dat.callback;
        let nombre_Actividad:any;
        if (actividad != null) {
          nombre_Actividad = dat.callback.tipo_actividad.codigo;
        }else{
          this.respuesta = null;
        }

        switch (nombre_Actividad) {

          case "actividad-visual":
            //console.log(nombre_Actividad)
            break;

          case "actividad-slide":
            //console.log(nombre_Actividad);
            this.respuesta = dat.callback.actividad_slides[0].respuestas_actividad_slides[0].respuesta;
            //console.log(this.respuesta)
            break;

          case "actividad-responder-texto":
            //console.log(nombre_Actividad, data.id)
            switch (data.id) {
              case 3:
                let respuesta1 = dat.callback.respuesta_actividades[0].recurso_respuesta[0].texto;
                let respuesta2 = dat.callback.respuesta_actividades[0].recurso_respuesta[1].texto;
                this.respuesta = { respuesta1: respuesta1, respuesta2: respuesta2 };
                //console.log(this.respuesta)
                break;

              default:
                break;
            }
            break;

          case "actividad-compromiso-accion":
            //console.log(nombre_Actividad)
            if (data.id == 4) {
              let imag = []
              for (let index = 0; index < dat.callback.respuesta_actividades[0].recurso_respuesta.length; index++) {
                imag.push(dat.callback.respuesta_actividades[0].recurso_respuesta[index])
              }

              this.respuesta = imag
            }
            break;

          case "actividad-responder-preguntas":
            //console.log(nombre_Actividad)
            switch (data.id) {
              case 7:
                this.respuesta = JSON.parse(dat.callback.estructura_pregunta.respuestas_preguntas[0].estructura_respuesta);
                break;
              case 17:
                this.respuesta = JSON.parse(dat.callback.estructura_pregunta.respuestas_preguntas[0].estructura_respuesta);
                break;
              case 27:
                this.respuesta = JSON.parse(dat.callback.estructura_pregunta.respuestas_preguntas[0].estructura_respuesta);
                break;

              default:
                break;
            }
            break;

          case "Respuesta-simple-JSON":
            //console.log(nombre_Actividad)
            switch (data.id) {
              case 8:
                this.respuesta = JSON.parse(dat.callback.actividad_json[0].respuesta);
                break;
              case 18:
                this.respuesta = JSON.parse(dat.callback.actividad_json[0].respuesta);
                break;
              case 22:
                this.respuesta = JSON.parse(dat.callback.actividad_json[0].respuesta);
                break;
              case 32:
                this.respuesta = JSON.parse(dat.callback.actividad_json[0].respuesta);
                break;
              case 35:
                this.respuesta = JSON.parse(dat.callback.actividad_json[0].respuesta);
                break;
              case 39:
                this.respuesta = JSON.parse(dat.callback.actividad_json[0].respuesta);
                break;
              default:
                break;
            }
            break;

          case "actividad-slide-multiples-preguntas":
            //console.log(nombre_Actividad);
            this.respuesta = JSON.parse(dat.callback.actividad_slide_multiples_respuestas[0].respuestas_multiples_actividades_slides[0].respuesta);
            break;

          case "grafico-de-torta":
            //console.log(nombre_Actividad)
            switch (data.id) {
              case 12:
                this.respuesta = JSON.parse(dat.callback.actividad_graficos[0].respuesta_actividad_graficos[0].respuestas_pregunta);
                break;

              default:
                break;
            }
            break;

          case "actividad-calendario":
            //console.log(nombre_Actividad)
            break;


          default:
            break;
        }
      })
    }
}
