import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-md-edit-trab',
  templateUrl: './md-edit-trab.page.html',
  styleUrls: ['./md-edit-trab.page.scss'],
})
export class MdEditTrabPage implements OnInit {
  mode:any;
  selected:any;
  getTitle='';
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), title:this.getTitle,create:moment().unix(), previously:Array, sesion: "sesion6" };
  tempeventSource = [];
  categorys;/* = [{ name: 'cat1' }, { name: 'cat2' }, { name: 'cat3' }, { name: 'cat4' }, { name: 'cat5' }, { name: 'cat6' }, { name: 'cat7' }, { name: 'cat8' }, { name: 'cat9' }, { name: 'cat10' }, { name: 'cat11' }, { name: 'cat12' }, { name: 'cat13' }, { name: 'cat14' }, { name: 'cat15' }]*/
  nombre_categoria;
  mintime= new Date().toISOString();
  constructor() { }

  ngOnInit() {
  }

}
