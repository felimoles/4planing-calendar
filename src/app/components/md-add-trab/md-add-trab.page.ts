import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-md-add-trab',
  templateUrl: './md-add-trab.page.html',
  styleUrls: ['./md-add-trab.page.scss'],
})
export class MdAddTrabPage implements OnInit {
  selected='none';
  categorys = [{ name: 'cat1' }, { name: 'cat2' }, { name: 'cat3' }, { name: 'cat4' }, { name: 'cat5' }, { name: 'cat6' }, { name: 'cat7' }, { name: 'cat8' }, { name: 'cat9' }, { name: 'cat10' }, { name: 'cat11' }, { name: 'cat12' }, { name: 'cat13' }, { name: 'cat14' }, { name: 'cat15' }]

  event={ startTime: new Date().toISOString(), endTime: new Date().toISOString(), title: 'notitle',type:'textr',create:Number }

  constructor(
    public navParams: NavParams,
    public viewCtrl: ModalController
  ) { 

    let stTime = new Date();
    stTime.setMinutes(0);
    this.event.startTime = moment(stTime).format();
    let endTemp = new Date();
    endTemp.setMinutes(0);
    endTemp.setHours(endTemp.getHours() + 1);
    this.event.endTime = moment(endTemp).format();

    this.event.title = this.selected;
    let creat = this.navParams.get('create');
    //this.event.title = this.navParams.get('title');
    this.event.create = creat;
  }

  ngOnInit() {
  }
  cancel(){
    this.viewCtrl.dismiss();
  }

  save(){
    this.event.title = this.selected;
    this.viewCtrl.dismiss(this.event);
  }
  handleChange(e){
    console.log(e.detail.value);
    this.selected = e.detail.value;

  }

}
