import { Component, OnInit,ViewChild} from '@angular/core';
import {NavController,NavParams,ModalController,ActionSheetController} from '@ionic/angular';

import {MdAddTrabPage} from '../../components/md-add-trab/md-add-trab.page';
import {MdEditTrabPage} from '../../components/md-edit-trab/md-edit-trab.page';
import { CalendarComponent } from 'ionic2-calendar';
@Component({
  selector: 'app-md-trab',
  templateUrl: './md-trab.page.html',
  styleUrls: ['./md-trab.page.scss'],
  
})
export class MdTrabPage implements OnInit {
  

  eventSr = []
  titleEv: any;
  delbtn: false;
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), title: '', trabAut: this.eventSr,type:'asignatura', create: Number }
  constructor(
    public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController
  ) {


   }

  ngOnInit() {
  }


  save() {
    this.event.trabAut = this.eventSr;
    console.log("tt",this.event)
    this.modalCtrl.dismiss(this.event,'save');
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
  /*delete() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Vas a eliminar un elemento',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.viewCtrl.dismiss(this.event, 'delete')
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

            console.log(this.event);


          }
        }
      ]
    });
    actionSheet.present();
  }*/

  async addTrA() {
    let modaltrab = await this.modalCtrl.create(
      { component: MdAddTrabPage,
        componentProps: {create: this.event.create,title: this.event.title} });
    modaltrab.present();
    const { data } = await modaltrab.onWillDismiss();
      //console.log(data.create);
      if (data) {
        let ev = data;
        ev.startTime = new Date(data.startTime);
        ev.endTime = new Date(data.endTime);
        this.eventSr.push(ev);
     
       
        console.log(this.eventSr);
      }
    
  }

  async editEv() {
    let x = this.event;
    let mdedit = await this.modalCtrl.create({ 
      component:MdEditTrabPage,
      componentProps:{ evento: x }});
    mdedit.present();
    const { data } = await mdedit.onWillDismiss();
      if (data) {
        let d = data;
        this.event.title = d.title;
        this.event.startTime = d.startTime;
        this.event.endTime = d.endTime;
      }
   
  }

}
