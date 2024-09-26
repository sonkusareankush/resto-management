import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from 'src/services/auth.service';
import { environment } from '../environments/environment';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { FcmService } from 'src/services/fcm.service';

// // // Firebase modules
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideMessaging, getMessaging } from '@angular/fire/messaging';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService,
    // FcmService,
  // Provide Firebase-related services here using `importProvidersFrom`
  // Add Firebase initialization in the `providers` array
  // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  // provideFirestore(() => getFirestore()),
  // provideMessaging(() => getMessaging())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
