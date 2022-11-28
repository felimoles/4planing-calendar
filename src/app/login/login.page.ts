import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams,IonModal, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import {HomePage} from '../home/home.page';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('username') email;
  @ViewChild('pass') password;
  @ViewChild(IonModal) modal: IonModal;
  api_usuarios;
  consultocompas;
  retorno;
  usuarios_grupo;
  user: any;
  agreeTerms: boolean = false;
  title = "qw";
  estado_conexion: Boolean = true;
  bloqueo_boton = true;
  intento_numero = 0;
  constructor(
    public navCtrl: NavController,
    //public navParams: NavParams,
    public alertCtrl: AlertController,
    //public sqlite: SqliteProvider,
    public api: ApiService,
    public loadingCtrl: LoadingController,
    //public web: InAppBrowser,
    //public global: GlobalProvider,
    public storage: Storage,
    private router: Router
    //public event: Events,
    //public ga: GoogleAnalytics,

  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

correo_profe = "";

   login() {
    this.bloqueo_boton = true;
    if (!this.agreeTerms) {

      let needAgree = this.alertCtrl.create({
        header: 'Alerta',
        subHeader: 'Debes estar de acuerdo con los términos y condiciones antes de acceder a la plataforma',
        buttons: ['ok']
      });
      //needAgree.present();
    } else {

      let datosvalido = { username: this.email.value, password: this.password.value };

      //////////////validacion de usuario con token
      console.log("datos para validar usuario", datosvalido)

      this.api.retorna_perfil_usuario(datosvalido.username)
        .then((data: any) => {
          let perf = data.callback
          console.log("perfil de: " + perf);
          if (perf == "profesor") {
            this.correo_profe = this.email.value;
            this.email.value = "edu4p." + this.email.value;
            this.login();
          } else {
            
            let contraseña_lenght = this.password.value.length;

            if (contraseña_lenght < 6) {

              let alert = this.alertCtrl.create({
                header: 'Error',
                subHeader: 'su contraseña no cumple con el minimo de caracteres valido',
                buttons: ['ok']
              });
              this.agreeTerms = false;
              this.email.value = "";
              //alert.present();

            } else {
              this.api.validousuario(datosvalido)
                .then(
                  (data: any) => {
                    console.log("respuesta de la validacion", data)
                    this.api_usuarios = data;

                    if (this.api_usuarios.callback == null) {

                      let alert = this.alertCtrl.create({
                        header: 'Error',
                        subHeader: 'nombre de usuario o contraseña incorrectos, intentelo nuevamente',
                        buttons: ['ok']
                      });
                      this.agreeTerms = false;
                      this.email.value = "";
                     // alert.present();

                    } else {
                      switch (this.api_usuarios.callback.user.perfil.nombre) {
                        case "Estudiante":
                          let valid = this.api_usuarios.valid;
                          let code = this.api_usuarios.code;
                          let activo;
                          activo = this.api_usuarios.callback.user.grupos.length;

                          console.log("Grupos: ", this.api_usuarios.callback.user.grupos)
                          console.log("perfil", this.api_usuarios.callback.user.perfil)
                          console.log("activo", activo)

                          if (valid == true && code == 200 && activo == 1) {
                           // this.loguendo();
                            console.log("datos del usuario");
                            console.log(this.api_usuarios);
                            if(this.correo_profe == ""){
                              this.user = {
                                id_db: this.api_usuarios.callback.user.id,
                                grupo: this.api_usuarios.callback.user.grupos[0].nombre,
                                id_grupo: this.api_usuarios.callback.user.grupos[0].id,
                                name: this.api_usuarios.callback.user.nombre,
                                apellido: this.api_usuarios.callback.user.apellido_paterno + " " + this.api_usuarios.callback.user.apellido_materno,
                                email: this.email.value,
                                pass: this.password.value,
                                token: this.api_usuarios.callback.user.api_token,
                                avatar: this.api_usuarios.callback.user.imagen.medium_size,
                                universidad: this.api_usuarios.callback.user.grupos[0].asignatura.carrera.facultad.universidad.nombre,
                                organismo: this.api_usuarios.callback.user.grupos[0].asignatura.carrera.facultad.nombre,
                                carrera: this.api_usuarios.callback.user.grupos[0].asignatura.carrera.nombre,
                                fecha_update: this.api_usuarios.callback.user.updated_at,
                                asignatura: this.api_usuarios.callback.user.grupos[0].asignatura.nombre,
                                puntaje: this.api_usuarios.callback.user.puntaje,
                                rut: this.api_usuarios.callback.user.run,
                                fecha_nacimiento: this.api_usuarios.callback.user.fecha_nacimiento,
                                comuna: this.api_usuarios.callback.user.comuna,
                                region: this.api_usuarios.callback.user.region,
                                sexo: this.api_usuarios.callback.user.sexo,
                                matricula: this.api_usuarios.callback.user.matricula,
                                apodo: this.api_usuarios.callback.user.pseudonimo
  
                              };
                            }else{
                              this.user = {
                                id_db: this.api_usuarios.callback.user.id,
                                grupo: this.api_usuarios.callback.user.grupos[0].nombre,
                                id_grupo: this.api_usuarios.callback.user.grupos[0].id,
                                name: this.api_usuarios.callback.user.nombre,
                                apellido: this.api_usuarios.callback.user.apellido_paterno + " " + this.api_usuarios.callback.user.apellido_materno,
                                email: this.correo_profe,
                                pass: this.password.value,
                                token: this.api_usuarios.callback.user.api_token,
                                avatar: this.api_usuarios.callback.user.imagen.medium_size,
                                universidad: this.api_usuarios.callback.user.grupos[0].asignatura.carrera.facultad.universidad.nombre,
                                organismo: this.api_usuarios.callback.user.grupos[0].asignatura.carrera.facultad.nombre,
                                carrera: this.api_usuarios.callback.user.grupos[0].asignatura.carrera.nombre,
                                fecha_update: this.api_usuarios.callback.user.updated_at,
                                asignatura: this.api_usuarios.callback.user.grupos[0].asignatura.nombre,
                                puntaje: this.api_usuarios.callback.user.puntaje,
                                rut: this.api_usuarios.callback.user.run,
                                fecha_nacimiento: this.api_usuarios.callback.user.fecha_nacimiento,
                                comuna: this.api_usuarios.callback.user.comuna,
                                region: this.api_usuarios.callback.user.region,
                                sexo: this.api_usuarios.callback.user.sexo,
                                matricula: this.api_usuarios.callback.user.matricula,
                                apodo: this.api_usuarios.callback.user.pseudonimo
  
                              };
                            }
                            
                            console.log("mail: ",this.user.email)
                          //  this.global.Token_4planning = this.api_usuarios.callback.user.api_token;
                          //  this.global.id_user_4planning = this.api_usuarios.callback.user.id;
                          //  this.global.grupo_id = this.api_usuarios.callback.user.id_grupo;//console.log("3: ",this.api_usuarios.callback.user.id_grupo)

                          /*  this.ga.setUserId(this.user.token)
                              .then(() => console.log("userId Guardado"))
                              .catch(() => console.log("error guardando userId"))*/

                            this.storage.set("usuario", this.user)
                              .then(
                                () => {
                                  //this.handlerNotifications();
                               /*   this.navCtrl.navigateRoot(HomePage, {
                                    segmento: "muro"
                                  });*/
                                  this.router.navigate(['/home'])
                                  this.storage.set("segmento", "muro")
                                    .then(() => {
                                      //console.log("segmento login guardado")
                                    })
                                })



                            this.consultocompas = { api_token: this.user.token, update: "0001-01-01 00:00:00" }
                            let usu = [];
                            this.api.retorno_grupo(this.consultocompas)
                              .then((dat) => {
                                this.retorno = dat;
                                //console.log("retorno :", this.retorno)
                                this.usuarios_grupo = this.retorno.callback[0].users;
                                //console.log("usuarios del grupo",this.usuarios_grupo)
                                for (let index = 0; index < this.usuarios_grupo.length; index++) {
                                  let usuarios = {
                                    id_db: this.usuarios_grupo[index].id,
                                    nombres: this.usuarios_grupo[index].nombre,
                                    apellidos: this.usuarios_grupo[index].apellido_paterno + " " + this.usuarios_grupo[index].apellido_materno,
                                    avatar: this.usuarios_grupo[index].imagen.medium_size,
                                    perfil: this.usuarios_grupo[index].perfil.nombre,
                                    fecha_update: this.usuarios_grupo[index].updated_at
                                  }

                                  usu.push(usuarios)

                                }

                                this.storage.set("grupo_usuario", usu)
                                  .then(
                                    (data: any) => {
                                      console.log("usuarios del grupo agregados", data)
                                    })

                              })
                              .catch(() => {
                                console.log("error cargando la lista de usuarios")
                              })
                            //console.log("usuarios: ", usu)



                          } else if (valid == true && code == 200 && activo == 0) {
                            let alert = this.alertCtrl.create({
                              header: 'Error',
                              subHeader: 'usuario no agrupado, contactese con el administrador',
                              buttons: ['ok']
                            });
                            this.agreeTerms = false;
                            this.email.value = "";
                           // alert.present();
                          }


                          break;

                        case "Profesor":
                          console.log("inicio: ", this.email.value)
                          this.email.value = "edu4p." + this.email.value;
                          console.log("despues: ", this.email.value)
                          this.login();
                          break;

                        default:
                          break;
                      }
                    }



                  }


                ).catch((err: any) => {
                  console.log("error", err)
                  this.agreeTerms = false;
                  this.email.value = "";




                  if (datosvalido.password.length < 6) {

                    let alert = this.alertCtrl.create({
                      header: 'Error',
                      subHeader: 'su contraseña no cumple con el minimo de caracteres valido',
                      buttons: ['ok']
                    });
                    this.agreeTerms = false;
                    this.email.value = "";
                   // alert.present();
                  } else if (datosvalido.password.length > 6 && this.api_usuarios.callback.user.grupos != []) {



                    setTimeout(() => {
                      if (this.intento_numero < 5) {
                        /* if (this.api_usuarios.callback.users.grupos === undefined || this.api_usuarios.callback.users == null || this.api_usuarios.callback.users.grupos == []) {
                           this.global.mensaje("usuario no agrupado", 2500, "top");
                         } else {*/
                      //  this.global.mensaje("error de conexion reintentando", 2500, "top");
                        this.intento_numero = this.intento_numero + 1;
                        //}

                      } else {
                    //    this.global.mensaje("error de conexion revise conexion a internet e intenta nuevamente", 2500, "top");
                        this.bloqueo_boton = false;
                        this.intento_numero = 0;
                      }
                    }, 3000)




                  }



                })
            }


            ////////////// fin validacion de usuario con token

          }

          /*console.log("inicio: ", this.email.value)
          
          console.log("despues: ", this.email.value)*/



        })
        .catch((err) => console.log("error devolviendo el tipo de perfil", err))

    }

  }

  checj() {
    if (this.agreeTerms == false) {
      this.bloqueo_boton = true;
    } else {
      this.bloqueo_boton = false;
    }
  }

  /*olvide() {
    this.navCtrl.push('OlvidePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  /*legal() {
    if (this.estado_conexion == true) {
      let web = 'http://www.google.com';
      this.web.create(web, '_self', 'location=no');
    } else {
      this.global.mensaje("estas desconectado de internet, debes conectarte para continuar", 3000, "top");
    }
  }

  loguendo() {
    let loading = this.loadingCtrl.create({
      content: `cargando datos del muro ...`,
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  ayuda(){
    let modal_ayuda = this.modalCtrl.create('AyudaPage')
    modal_ayuda.present();
    this.navCtrl.push('AyudaPage');
    console.log("go ayuda")
  }*/
}
