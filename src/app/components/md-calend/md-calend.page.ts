import { Component, OnInit } from '@angular/core';
import {NavController, NavParams,ModalController} from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-md-calend',
  templateUrl: './md-calend.page.html',
  styleUrls: ['./md-calend.page.scss'],
})
export class MdCalendPage implements OnInit {
  cal= true;
  col=false;
  selected: any;
  stinit = new Date();
  mintime = new Date().toISOString();
  getTitle: any;
  titleEvent: 'any';
  event = { startTime: this.stinit.toISOString(), endTime: new Date().toISOString(), title: "", type: 'sueno', create: moment().unix(), trabAut: [] };

  pickerOptions = {
    buttons: [{
      text: "Fecha",

    }, {
      text: "Hora!",

    }],
 
  };
  constructor(private navParams: NavParams,private modalCtrl: ModalController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.titleEvent = this.navParams.get('title');
    //this.getTitle = this.navParams.get('title');
    this.event.startTime = preselectedDate;
    this.mintime = this.event.startTime;
    let mt = new Date(this.event.startTime)
    mt.setHours(mt.getHours() + 1)
    this.mintime = moment(mt).format();
    //this.event.endTime = preselectedDate;
    let endTemp = new Date(preselectedDate)
    endTemp.setHours(endTemp.getHours() + 1);
    this.event.endTime = moment(endTemp).format();
   }

  ngOnInit() {
  }
  cancel() {
    this.modalCtrl.dismiss();
  }
  onchangeStart(ev) {

    this.mintime = ev;
    let mt = new Date(ev)
    mt.setHours(mt.getHours() + 1)
    this.mintime = moment(mt).format();
    console.log("onchangestartime");
    this.event.endTime = moment(mt).format();
  }
  save() {

    let valid = this.event;
    let t = this.getTitle;
    console.log();
    if (t != null) {
      this.event.title = t;
    } else {
      this.event.title = this.titleEvent;
    }

    let start = moment(valid.startTime).unix()
    let end = moment(valid.endTime).unix()
    let c = this.getColor(this.event.title);
    if (start < end) {
      console.log("create md", this.event.create);
      this.modalCtrl.dismiss(this.event);

    } else {
      this.modalCtrl.dismiss();
    }

    /* let modaltrab = this.modalCtrl.create('ModalTrabPage', {event:valid});
     modaltrab.present();
     modaltrab.onDidDismiss(data =>{
       console.log(data);
       if(data){
         this.viewCtrl.dismiss(this.event)
       }
 
     })*/
     

  }
  getColor(color) {
    console.log(color);
    if (color == 'cat1') {
      return 'rgba(255, 34, 144,0.8)'
    } else if (color == 'cat2') {
      return 'rgba(86, 15, 89, 0.767)'
    } else if (color == 'cat3') {
      return 'rgba(26, 19, 189, 0.767)'
    }
  }

}
