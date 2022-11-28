import { Component } from '@angular/core';
import * as moment from 'moment';
import { GlobalService } from '../api/global.service';
import { ApiService } from '../api/api.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cate1: any[];
  start: any;
  hora3 : any[];
  horas3 : [];
  hora4 : [];
  titulo : [];
  titulo3 : [];
  hora5 : [];
  para_Acti_35 : [];
  para_Acti_32 : [];
  respuesta1S3 : []
  filter:any;
  pagina:any;
  niveles:any;
  sesion_final_activo;
  lista_priorizada;
  constructor(

    public global: GlobalService,
    public api: ApiService,
    public storage: Storage

  ) {

    this.cargamensajesdelmuro();
  }
  grafico_horas;
  grafico_cate;
  pregunta1;
  pregunta2;
  respuesta1;
  respuesta2
  para_Acti_39_positivo;
  para_Acti_39_negativo;

  puntos_test;



  tamano_mensajes;
  txt_feedback_cuestionario4;
  txt_feedback_cuestionario6;

  hora1;
  hora2;

  sesiones_terminadas;
  mensajesmuros= [];
  respuesta2S3 = [];
  mi_meta;
  sesion_final_activo_grupo;
  sesion_final_preguntas = [];
  sesion_final_info_sesion;
  sesion_final_info_actividad;
  actividad_responder_textos;
  pregunta;
  respuesta;
  comentario;
  datos_calendario: any;
  dato;
  cosas_por_hacer;

  cargamensajesdelmuro() {
    console.log("load msj muro")
    this.cate1 = [];
    this.hora3 = [];
    this.horas3 = [];
    this.hora4 = [];
    this.titulo = [];
    this.titulo3 = [];
    this.hora5 = [];
    this.para_Acti_35 = [];
    this.para_Acti_32 = [];
    this.respuesta1S3 = []
    //let datos_carga_mensajes = { api_token: this.global.Token_4planning, filtro: "ALL", startinid: "", page: this.pagina,  }

    this.start = this.global.startinid;



    if (!this.start || this.start == null) {
      //console.log("sin start")
     let datos_carga_mensajes = { api_token: this.global.Token_4planning, filtro: this.filter, page: this.pagina, }
    } else {
      //console.log("con start")
     // datos_carga_mensajes = { api_token: this.global.Token_4planning, filtro: this.filter, startinid: this.start, page: this.pagina, }
    }


    let datos_carga_mensajes = { api_token: this.global.Token_4planning, filtro: "ALL", startinid: "", page: this.pagina, }

    /*this.api.actividad_final({ token: this.global.Token_4planning, update: "2018-05-01 00:00:00" })
      .then((dea: any) => {
        console.log("datos actividad final", dea);

        if (dea.callback != null) {
          this.sesion_final_activo = dea.callback.activo;
          this.sesion_final_activo_grupo = dea.callback.datos_actividad.activo;
          this.sesion_final_info_sesion = dea.callback.datos_actividad.informacion_sesion;
          this.sesion_final_info_actividad = dea.callback.datos_actividad.informacion_actividad;

          this.sesion_final_preguntas = [];

          let preguntas_final = JSON.parse(dea.callback.datos_actividad.enunciados);
          let alternativas_final = JSON.parse(dea.callback.datos_actividad.estructura_clasificacion);

          for (let index = 0; index < preguntas_final.length; index++) {
            //console.log("preguntas",preguntas_final[index]);

            let pusheo_preguntas_alternativas = { pregunta: preguntas_final[index]["question-" + (index + 1)], alternativas: alternativas_final }

            //console.log("preguntas alternativa",pusheo_preguntas_alternativas)
            this.sesion_final_preguntas.push(pusheo_preguntas_alternativas)
          }
        }else{
          console.log("no hay datos de l actividad final")
        }






        //console.log("preguntas alternativa", this.sesion_final_preguntas);
        //console.log("Activo1", this.sesion_final_activo, "Activo2", this.sesion_final_activo_grupo);


      })*/
 
    this.niveles = [];
    this.api.mensajesdelmuro(datos_carga_mensajes)
      .then((data: any) => {
        this.mensajesmuros = data.callback;
        //esta es donde muestro los mensajes del muro
        console.log("mensajes del muro")
        console.log(this.mensajesmuros);
        //let asd = [];

        //console.log("antes ", this.mensajesmuros.length)
        this.tamano_mensajes = this.mensajesmuros.length;
        //console.log("start: " + this.start)
        if (this.mensajesmuros.length > 0) {
          this.global.startinid = this.mensajesmuros[0].notificacion_id;
        }
        /*if (!this.start || this.start == null || this.start === undefined) {
          //console.log("asigno valor a startind")
          
         // console.log(this.global.startinid)
        }else{
          console.log("primera carga del id de los mensajes");
        }*/



        for (let index = 0; index < this.mensajesmuros.length; index++) {

          if (this.mensajesmuros[0].notificacion_id)

            switch (this.mensajesmuros[index].type) {
              case "profesor":
                this.niveles.push("nivel-5");
                break;
              case "respuesta_actividad":
                //console.log("tipo actividad " + index + " :" + this.mensajesmuros[index].data.tipo_actividad.codigo)
                if (this.mensajesmuros[index].data.tipo_actividad.codigo == "actividad-responder-preguntas") {
                  this.actividad_responder_textos = JSON.parse(this.mensajesmuros[index].data.estructura_pregunta.respuestas_preguntas[0].estructura_respuesta);
                  //console.log("responder preguntas")
                } else if (this.mensajesmuros[index].data.tipo_actividad.codigo == "grafico-de-torta") {
                  let datos_grafico = JSON.parse(this.mensajesmuros[index].data.actividad_graficos[0].respuesta_actividad_graficos[0].datos_graficos);
                  let respuestas_grafico = JSON.parse(this.mensajesmuros[index].data.actividad_graficos[0].respuesta_actividad_graficos[0].respuestas_pregunta);
                  //console.log(datos_grafico, respuestas_grafico)
                  this.grafico_horas = datos_grafico;
                  //this.grafico_cate = datos_grafico.categorias;
                  this.pregunta1 = datos_grafico.pregunta1;
                  this.pregunta2 = datos_grafico.pregunta2;
                  this.respuesta1 = respuestas_grafico.respuesta.r1;
                  this.respuesta2 = respuestas_grafico.respuesta.r2;
                  // console.log("responder torta")
                }

                switch (this.mensajesmuros[index].data.sesiones_fk) {

                  case 2:
                    if (this.mensajesmuros[index].data.id == 7) {
                      let datos = JSON.parse(this.mensajesmuros[index].data.estructura_pregunta.respuestas_preguntas[0].estructura_respuesta);
                      //console.log("datos_nuevos", datos);
                      this.pregunta = datos.cuestionario[0].pregunta;
                      this.respuesta = datos.cuestionario[0].respuesta;
                      this.comentario = datos.cuestionario[0].comentario;

                    } else if (this.mensajesmuros[index].data.id == 8) {
                      //console.log("mi mensaje nuevo");
                      let datos = JSON.parse(this.mensajesmuros[index].data.actividad_json[0].respuesta);
                      // console.log(datos);
                      let mis_meta = datos.metas.compartido;
                      switch (mis_meta) {
                        case "meta1":
                          this.mi_meta = datos.metas.meta1;
                          //console.log("meta1", this.mi_meta)
                          break;
                        case "meta2":
                          this.mi_meta = datos.metas.meta2;
                          //console.log("meta2", this.mi_meta)
                          break;

                        default:
                          break;
                      }
                      //console.log(nombre_)
                    }

                    break;
                  case 3:
                    if (this.mensajesmuros[index].data.id == 13) {
                      this.horas3 = [];
                      this.datos_calendario = JSON.parse(this.mensajesmuros[index].data.actividad_calendarios[0].respuesta_actividad_calendario[0].eventos);


                    } else if (this.mensajesmuros[index].data.id == 11) {
                      let mensajes = JSON.parse(this.mensajesmuros[index].data.actividad_slide_multiples_respuestas[0].respuestas_multiples_actividades_slides[0].respuesta);
                      console.log(mensajes)
                      let dato = { id: this.mensajesmuros[index].answer_author.id, parse: mensajes }
                     // this.respuesta1S3.push(dato)
                      console.log("aer", this.respuesta1S3)
                    }
                    break;
                  case 4:
                    if (this.mensajesmuros[index].data.id == 17) {
                      let puntaje_del_test = JSON.parse(this.mensajesmuros[index].data.estructura_pregunta.respuestas_preguntas[0].estructura_respuesta);
                      this.puntos_test = puntaje_del_test.puntaje_cuestionario;


                      this.storage.get("txt_feedback_id_17")
                        .then((da: any) => {
                          this.txt_feedback_cuestionario4 = da;
                        })



                    } else if (this.mensajesmuros[index].data.id == 18) {
                      this.cosas_por_hacer = JSON.parse(this.mensajesmuros[index].data.actividad_json[0].respuesta);
                    }
                    break;
                  case 5:
                    if (this.mensajesmuros[index].data.id == 22) {
                      let lista = JSON.parse(this.mensajesmuros[index].data.actividad_json[0].respuesta);
                      this.lista_priorizada = lista;
                    }
                    break;
                  case 6:
                    if (this.mensajesmuros[index].data.id == 27) {
                      let puntaje_del_test = JSON.parse(this.mensajesmuros[index].data.estructura_pregunta.respuestas_preguntas[0].estructura_respuesta);
                      this.puntos_test = puntaje_del_test.puntaje_cuestionario;


                      this.storage.get("txt_feedback_id_27")
                        .then((da: any) => {
                          this.txt_feedback_cuestionario6 = da;
                        })



                    } else if (this.mensajesmuros[index].data.id == 26) {
                       this.datos_calendario = JSON.parse(this.mensajesmuros[index].data.actividad_calendarios[0].respuesta_actividad_calendario[0].eventos);

                      let cate = this.datos_calendario.datos;
                      this.hora1 = this.datos_calendario.cate.categoria1.horas_totales;
                      this.hora2 = this.datos_calendario.cate.categoria2.horas_totales;

                      let dat = this.datos_calendario.cate.categoria3.dato;
                      for (let index = 0; index < dat.length; index++) {
                        this.hora3.push(this.datos_calendario.cate.categoria3.dato[index].horas_totales);
                        //this.hora4.push(this.datos_calendario.cate.categoria3.dato[index].horas_extra_totales);
                       // this.titulo.push(this.datos_calendario.cate.categoria3.dato[index].title);

                      }

                      for (let index = 0; index < cate.length; index++) {
                        this.cate1.push(cate[index]);
                      }



                    }

                    else {
                      //console.log("excelente")
                    }
                    break;
                  case 7:

                    if (this.mensajesmuros[index].data.id == 32) {
                      let parseado: any;
                      parseado = JSON.parse(this.mensajesmuros[index].data.actividad_json[0].respuesta);
                      //console.log("parseado", parseado)
                      //this.para_Acti_32 = parseado.meta;
                      //si queda la pata eliminar estas 3 lineas que vienen y descomentar la linea que esta arriba
                       this.dato = { id: this.mensajesmuros[index].answer_author.id, parse: parseado.meta }
                      //console.log(dato)
                    //  this.para_Acti_32.push(dato);
                      ////////////// hasta aca
                    }

                    else if (this.mensajesmuros[index].data.id == 31) {
                      this.hora3 = [];
                      let datos_calendario = JSON.parse(this.mensajesmuros[index].data.actividad_calendarios[0].respuesta_actividad_calendario[0].eventos);
                      //console.log("calendario 7: ", datos_calendario);

                      let cate = datos_calendario.cate;
                      let horas_totales_act7: number = 0;
                      for (let index = 0; index < cate.length; index++) {
                        if (cate[index].sesion == "sesion7") {
                         // this.hora5.push(cate[index]);

                          let hora_inicio = cate[index].startTime;
                          let hora_fin = cate[index].endTime;
                          let da_ini = moment(hora_inicio).format('HH');
                          let da_fin = moment(hora_fin).format('HH');
                          horas_totales_act7 = horas_totales_act7 + parseInt(da_fin) - parseInt(da_ini);
                          this.hora3.push(horas_totales_act7)
                        }


                      }


                    }

                    break;

                  case 8:

                    if (this.mensajesmuros[index].data.id == 35) {
                      let parseado: any;
                      parseado = JSON.parse(this.mensajesmuros[index].data.actividad_json[0].respuesta);
                      //console.log("parseado", this.mensajesmuros[index].answer_author.id, parseado)
                      let dato = { id: this.mensajesmuros[index].answer_author.id, parse: parseado }
                      //console.log(dato)
                    //  this.para_Acti_35.push(dato);
                    }

                    break;


                  case 9:
                    if (this.mensajesmuros[index].data.id == 39) {
                      let parseado: any;
                      parseado = JSON.parse(this.mensajesmuros[index].data.actividad_json[0].respuesta);
                      console.log("parseado case9", parseado)
                      this.para_Acti_39_positivo = parseado.positivo;
                      this.para_Acti_39_negativo = parseado.negativo;

                    }

                    break;

                  default:
                    break;
                }

                if (this.mensajesmuros[index].data.sesiones_fk == 1 || this.mensajesmuros[index].data.sesiones_fk == 2) {
                  this.niveles.push("nivel-1")
                } else if (this.mensajesmuros[index].data.sesiones_fk == 3 || this.mensajesmuros[index].data.sesiones_fk == 4) {
                  this.niveles.push("nivel-2")
                } else if (this.mensajesmuros[index].data.sesiones_fk == 5 || this.mensajesmuros[index].data.sesiones_fk == 6 || this.mensajesmuros[index].data.sesiones_fk == 7) {
                  this.niveles.push("nivel-3")
                } else if (this.mensajesmuros[index].data.sesiones_fk == 8 || this.mensajesmuros[index].data.sesiones_fk == 9) {
                  this.niveles.push("nivel-4")
                }


                break;

              case "sistema":
                this.niveles.push("nivel-6");
                break;
              default:
                break;
            }
        }


      })
      .catch((err) => {
        //console.log("error de niveles", err)
        this.global.mensaje("error cargando datos de niveles, intente refrescar", 3000, "top")

      })



    /*this.api.finishedactivities(this.global.Token_4planning)
      .subscribe((data: any) => {
        this.sesiones_terminadas = data.callback;
      })*/

  }
}
