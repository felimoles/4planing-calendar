import { Injectable } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public Token_4planning: String;
  public id_user_4planning;
  public Token_OneSignal: String;
  public grupo_id;
  //estado de las sesiones activas o no
  public Estado_Sesion0: Boolean;
  public Estado_Sesion1: Boolean;
  public Estado_Sesion2: Boolean;
  public Estado_Sesion3: Boolean;
  public Estado_Sesion4: Boolean;
  public Estado_Sesion5: Boolean;
  public Estado_Sesion6: Boolean;
  public Estado_Sesion7: Boolean;
  public sesion_fk_global: Number;
  public objetivo_sesion: string;
  public titulo_sesion: string;
  public tituloA0: string;
  public tituloA1: string;
  public tituloA2: string;
  public tituloA3: string;
  public tituloA4: string;
  public tituloA5: string;
  public condicion1;
  public condicion2;
  public condicion3;
  public tab_actual;

  public estado_Actividad0: Boolean;
  public estado_Actividad1: Boolean;
  public estado_Actividad2: Boolean;
  public estado_Actividad3: Boolean;
  public estado_Actividad4: Boolean;
  public estado_Actividad5: Boolean;

  public notificacion_number: Boolean;

  public api_token_onesignal: String;

  //tipo de actividad de cada sesion 
  public actividad_tipo0: String;
  public actividad_tipo1: String;
  public actividad_tipo2: String;
  public actividad_tipo3: String;
  public actividad_tipo4: String;
  public actividad_tipo5: String;
  public actividad_tipo6: String;

  public icono_tab0: String;
  public icono_tab1: String;
  public icono_tab2: String;
  public icono_tab3: String;
  public icono_tab4: String;
  public icono_tab5: String;
  public icono_tab6: String;

  public tab_icon: Array<any> = [];
  public cantidad_tabs_actividades: Number;
  public ruta_default_avatar;
  public url_vimeo: string = "https://player.vimeo.com/video/";
  public error: Boolean;
  public puntaje_total: Number;
  public nivel: String;

  public startinid;

  public savetype = {
    "actividad-slide": "respuesta_actividad_slide", "actividad-responder-texto": "respuesta_actividad_textos", "actividad-compromiso-accion": "respuesta_compromiso_accion",
    "actividad-responder-preguntas": "respuesta_actividad_preguntas", "Respuesta-simple-JSON": "respuesta_actividad_json", "actividad-slide-multiples-preguntas": "respuesta_actividad_slide_multiple_respuesta",
    "grafico-de-torta": "respuesta_grafico_torta", "actividad-calendario": "respuesta_actividad_calendario"
  };

  // feedback
  tipo_feedback;
  id_feedback;
  titulo_estructura_feedback;
  txt_antes_puntaje;
  txt_despues_puntaje;
  puntaje_finalizar_actividad;
  puntaje_compartir_actividad;
  termino_actividad;

  tipo_respuesta;
  respuesta_envio;
  public estructura_feedback;
  parse_estructura_feedback;

  public textos_respuestas_json;
  public respuesta_co
  public valido_respuesta: boolean;
  public contenido_de_actividad;

  public pregunta;
  public respuesta1;
  public respuesta2;
  public respuesta3;
  public imegenes;
  public id_actividad;
  public nombre_actividad;
  public alternativa;
  public meta1;
  public meta2;
  public respuesta_json;
  public codigo_renderizado
  public respuesta_correctaA2;
  public codigo_respuestaA2;
  public codigo_preguntaA2;

  public categorias = [];
  public categorias2 = [];
  public categorias3 = [];
  public intro_torta;

  public tousers = [];

  public imagenes_camara = [];

  public tipo_evento;
  public puntos_cuestionario;

  public respuesta_cuestionario;
  public pregunta1_grafico;
  public pregunta2_grafico;
  public nombres_metas;
  public id_more_photo: number;
  public eventos;
  public subeventos;
  public datos_graficos;
  public feedback_cuestionario;
  public txt_horas_sueno;
  public txt_horas_extra;
  public nivels;
  public tipo_comentario;
  public sesiones_completas;

  public positivos:number = 0;
  public negativos: number = 0;
  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public api: ApiService,
    public modalCtrl: ModalController,

  ) {
    this.ruta_default_avatar = this.api.url + "/uploads_image/";
  }


  mensaje(msg, time, position) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: position
    });

    /*toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();*/
  }
  
  puntos_autoevaluar: number = 0;
  puntos_valorizar_sesion: number = 0;

  respuesta(tousers) {
    this.tipo_respuesta = this.savetype[this.nombre_actividad];
    //console.log(this.tipo_respuesta);
    switch (this.tipo_respuesta) {
      case "respuesta_actividad_slide":
        console.log("tipo de respuesta: " + this.tipo_respuesta);
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, respuesta: this.respuesta1 }
        break;

      case "respuesta_actividad_textos":
        //console.log("tipo de respuesta: " + this.tipo_respuesta);
        let respuestas = [this.respuesta1, this.respuesta2]
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, texto: respuestas }
        break;

      case "respuesta_compromiso_accion":
        //console.log("tipo de respuesta: " + this.tipo_respuesta);
        console.log(this.imagenes_camara)
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, foto: this.imagenes_camara }
        break;

      case "respuesta_actividad_preguntas":
        //console.log("tipo de respuesta: " + this.tipo_respuesta);
        //console.log(this.codigo_respuestaA2);
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, respuesta_json: this.codigo_respuestaA2 }
        break;

      case "respuesta_actividad_json":
        //console.log("tipo de respuesta: " + this.tipo_respuesta);
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, respuesta_json: this.respuesta_json, codigo_renderizado: this.codigo_renderizado }
        break;

      case "respuesta_actividad_slide_multiple_respuesta":
        //console.log("tipo de respuesta: " + this.tipo_respuesta);
        let respuesta = { respuesta1: this.respuesta2, respuesta2: this.respuesta3 };
        let string = JSON.stringify(respuesta)
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, respuesta: string }
        break;

      case "respuesta_grafico_torta":
        //console.log("tipo de respuesta: " + this.tipo_respuesta);
        let datos_grafico_torta = { datos_grafico: this.categorias2, pregunta1: this.pregunta1_grafico, pregunta2: this.pregunta2_grafico };
        let respuesta_grafico_torta = { respuesta: {r1: this.respuesta1, r2: this.respuesta2} };
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, datos_graficos: JSON.stringify(datos_grafico_torta), respuestas_pregunta: JSON.stringify(respuesta_grafico_torta) }
        break;

      case "respuesta_actividad_calendario":
      //console.log("tipo de respuesta: " + this.tipo_respuesta);
        this.respuesta_envio = { api_token: this.Token_4planning, savetype: this.tipo_respuesta, actividad_id: this.id_actividad, tousers: tousers, eventos: this.eventos, sub_eventos: this.subeventos, datos_generacion_grafico: this.datos_graficos}
        console.log("respuesta: ",this.respuesta_envio)
        break;

      default:
        break;
    }


    //console.log("esta es al respuesta: ",this.respuesta_envio)
    this.api.guardorespuestas(this.respuesta_envio)
      .then(
        (data: any) => {
          console.log("respuesta feedback");
          console.log(data)
          if (data.valid == true) {
            let response = data.callback.feedback;
            let puntaje = data.callback;
            if (response == null || response === undefined || this.id_actividad != 32) {
              //console.log("no hay tipo de feedback");
              this.tipo_feedback = "sintipo";
              this.termino_actividad = puntaje.finished_session;


            } else {
              this.tipo_feedback = response.tipo;
              this.id_feedback = response.id;
              this.estructura_feedback = response.estructura;
              this.termino_actividad = puntaje.finished_session;

              this.parse_estructura_feedback = JSON.parse(this.estructura_feedback);
              this.titulo_estructura_feedback = this.parse_estructura_feedback.titulo;
              this.txt_antes_puntaje = this.parse_estructura_feedback.antes_puntaje;
              this.txt_despues_puntaje = this.parse_estructura_feedback.despues_puntaje;
            }


            if(this.termino_actividad == true){
              this.puntos_autoevaluar = puntaje.points_by_sesion_autoevaluar;
              this.puntos_valorizar_sesion = puntaje.points_by_sesion_valorizar;
            }


            this.puntaje_finalizar_actividad = puntaje.puntaje.finalizar_actividad;
            this.puntaje_compartir_actividad = puntaje.puntaje.compartir_actividad;

            this.valido_respuesta = true;

            //this.event.publish("actualizo_estado_Actividad", { a_finalizado: 1, id: this.id_actividad })

            //let feedback_modal = this.modalCtrl.create('FeedbackPage');
            //feedback_modal.present();
          } else {
            //agregar el toast de error compartiendo la cosa :P
            this.mensaje("error compartiendo tu actividad, intentalo nuevamente", 2000, "middle");
            this.valido_respuesta = false;
          }
        }
      ).catch(
        (err) => {
          console.log(err)
        }
      )
  }




}