import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    public api: ApiService,
  ) {

  this.inicio();
   }

  ngOnInit() {
  }

  async inicio() {
    let revalido = { username: 'test.apple@4planning.cl', password:'test.apple@4planning.cl' };

                    this.api.validousuario_suscribe(revalido)
                      .subscribe((dat: any) => {
                        console.log("revalido: " , dat)
                        })
                 






                        

}
}
