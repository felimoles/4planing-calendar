import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { MdCalendPageModule } from 'src/app/components/md-calend/md-calend.module';
import {MdCalendPage} from '../../components/md-calend/md-calend.page';
import {MdTrabPage} from '../../components/md-trab/md-trab.page';
import {MdEditTrabPage}from '../../components/md-edit-trab/md-edit-trab.page';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { CalendarComponent } from 'ionic2-calendar';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild('templateweek') elemElem;
  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;
  eventSource = [];
  selectedDay = new Date;
  viewTitleMonth: string;
  viewTitleYear: string;
  viewTitle: string;
  eventMaster = [];
  c = 0;
  cal = false;
  col= true;
  weeky;
  calendar = {
    step: 30 as Step,
    locale: 'en-GB',
    mode: 'week' as CalendarMode,
    currentDate: this.selectedDay,
    formatTitle: 'dd MMMM yyyy',
    formatWeekTitle: 'MMMM yyyy',
    allday: 'Hora',
    //queryMode: 'remote',
    dateFormatter: {

      formatMonthViewDayHeader: function (date: Date) {
        let dstring;
        let day = date.getDay();
        day == 0 ? dstring = "D " : ""
        day == 1 ? dstring = "L " : ""
        day == 2 ? dstring = "M " : ""
        day == 3 ? dstring = "M " : ""
        day == 4 ? dstring = "J " : ""
        day == 5 ? dstring = "V " : ""
        day == 6 ? dstring = "S " : ""
        return dstring;
      },
      formatWeekViewDayHeader: function (date: Date) {
        let dstring;
        let day = date.getDay();
        day == 0 ? dstring = "D " : ""
        day == 1 ? dstring = "L " : ""
        day == 2 ? dstring = "M " : ""
        day == 3 ? dstring = "M " : ""
        day == 4 ? dstring = "J " : ""
        day == 5 ? dstring = "V " : ""
        day == 6 ? dstring = "S " : ""
        return dstring + date.getDate().toString();
      },
      formatWeekViewHourColumn: function (date: Date) {
        moment.locale('en-gb');
        date.getHours().toString();
        return moment(date).format('LT');
      },
      formatDayViewHourColumn: function (date: Date) {
        moment.locale('en-gb');
        date.getHours().toString();
        return moment(date).format('LT');
      },
    }
  };

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    //this.loadEvents();
  }
  onViewTitleChanged(title) {
    console.log(title)
    title = title.split(' ');
    this.viewTitleYear = title.pop();
    this.viewTitleMonth = title.join(' ');
    if (this.calendar.mode == 'day') {
      moment.locale('es');
      this.viewTitleMonth = moment(this.selectedDay).format("dddd") + ' ' + this.viewTitleMonth;
   //  console.log(this.viewTitleMonth);
    }
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    console.log(ev);
  }

  async addEvent(title) {
    
    console.log("d");
    this.selectedDay.setMinutes(0);
    const modal = await this.modalCtrl.create({
      component: MdCalendPage,
      componentProps:{selectedDay: this.selectedDay, title: title}
    });
    modal.present();
    
    //let modal2 = this.modalCtrl.create('ModalCalendComponent', { selectedDay: this.selectedDay, title: title });
   // modal.present();
   const { data } = await modal.onWillDismiss();
    //console.log(data);

      if (data) {
        console.log("data ok");
        
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        if (eventData.title == "Sueño" || eventData.title == 'Social/Familia') {
          console.log("here");
          let em = this.eventMaster;
          this.eventMaster = [];
          let events = this.eventSource;
          this.eventSource = [];
          em.push(eventData);
          events.push(eventData);
          this.myCal.loadEvents();
         console.log(this.eventSource)
          setTimeout(() => {
            this.eventSource = events;
            this.eventMaster = em;
          });
        } else {
          console.log("asig")
          let mdtr = await this.modalCtrl.create({ 
            component: MdTrabPage,
            componentProps:{event:eventData}
          });
          mdtr.present();
          const { data,role } = await mdtr.onWillDismiss();
            if(data && role  === 'save'){
              console.log("trabp",data);
              let em = this.eventMaster;
              this.eventMaster = [];
              let d2 = data;
              em.push(d2);
              this.eventMaster = em;

              let events = this.eventSource;
              events.push(data);
              let nw = data.trabAut;
              let es = this.eventSource;
              this.eventSource = [];
              //nw.startTime = new Date(nw.startTime);
              // nw.endTime = new Date(nw.endTime);
              console.log(nw)
              for (var i = 0; i < nw.length; i++) {
                es.push(nw[i]);
              }
             
              this.eventSource = es;
             
              this.myCal.loadEvents();
              console.log(es);
            }

        }
        
      }else{
        console.log('cancel')
       
      }
  

  }
  onCurrentDateChanged = (event) => {
    this.selectedDay = event;
    console.log(event);
    var tempwk = moment(event).week();

    if (this.c != 0) {
      if (this.weeky == tempwk) {
        this.weeky = tempwk
        this.calendar.mode != 'month' ? this.calendar.mode = 'day' : this.calendar.mode = 'month';
        //this.calendar.mode == 'day' ? this.calendIcon = 'list-box' : this.calendIcon = 'list';
      } else {
        this.weeky = tempwk;
      }
    } else {
      this.weeky = tempwk;
      this.c = 1;
    }

  }

  async editEvent(event){
    const modal = await this.modalCtrl.create({
      component: MdEditTrabPage,
      componentProps:{event: event, all: this.eventMaster, btndel: true}
    });
    modal.present();

  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
}
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 22; i += 1) {
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;
        if (eventType === 0) {
            startTime = new Date();
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date();
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date();
            endTime = new Date();
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
    }

    return events;
}

}
