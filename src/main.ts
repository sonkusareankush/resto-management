import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  // if ('serviceWorker' in navigator ) { //&& environment.production
  //   navigator.serviceWorker
  //     .register('/firebase-messaging-sw.js')
  //     .then((registration) => {
  //       console.log('Service Worker registered with scope:', registration.scope);
  //     })
  //     .catch((err) => {
  //       console.error('Service Worker registration failed:', err);
  //     });
  // }

  