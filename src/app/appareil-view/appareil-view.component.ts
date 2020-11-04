import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;

  appareils: any[];
  appareilSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(() => {
      resolve(date);
    }, 2000);
  })



  constructor(private appareilService: AppareilService) { 
  }

  ngOnInit(): void {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe( (appareils: any[]) => {
      this.appareils = appareils;
    });
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    // console.log('On allume tout');
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }

}
