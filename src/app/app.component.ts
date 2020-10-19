import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDrDsV4tN-TN4eueW4V3GEoocOygFaaXKw',
      authDomain: 'blog-d91f5.firebaseapp.com',
      databaseURL: 'https://blog-d91f5.firebaseio.com',
      projectId: 'blog-d91f5',
      storageBucket: 'blog-d91f5.appspot.com',
      messagingSenderId: '62113263796',
      appId: '1:62113263796:web:751a2bc8699d787e8ce7e1',
      measurementId: 'G-E2GKVQ1FV0'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
