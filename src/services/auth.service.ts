import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app: Realm.App;
  public _user: Realm.User | null = null; // Store the user object


  constructor(private router: Router
  ) {
    this.app = new Realm.App({ id: environment.APP_ID });
    this.restoreUserSession();
  }

  async loginWithEmailPassword(email: string, password: string): Promise<Realm.User | null> {
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      const user = await this.app.logIn(credentials);
      if (user) {
        this._user = user; // Store user
        console.log(this._user)
        // localStorage.setItem('user', JSON.stringify(user));

        localStorage.setItem('userId', user.id); // Store the user ID to restore session later
        // Refresh the access token for the new user
        await user.refreshAccessToken();

        await this.router.navigate(['tabs']); // Redirect after login
      }
      return user;
    } catch (err) {
      console.error('Failed to log in', err);
      return null;
    }
  }

  async restoreUserSession() {
    const userId = localStorage.getItem('userId');
    if (userId && this.app.currentUser) {
      try {
        await this.app.currentUser.refreshAccessToken(); // Ensure the token is valid
        this._user = this.app.currentUser; // Set the user if the session is still valid
      } catch (err) {
        console.error('Failed to restore user session', err);
      }
    }
  }

  logout() {
    const user = this.app.currentUser;
    if (user) {
      user.logOut();
    }
    this._user = null; // Clear user
    const userId = localStorage.getItem('userId');
    if (userId) {

      const storedUser = this.app.allUsers[userId];
      if (storedUser) {
        this.app.removeUser(storedUser);
      }
    }

    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.clear();

    // localStorage.removeItem('user');
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  isLoggedIn(): boolean {
    // return !!localStorage.getItem('user');
    return !!localStorage.getItem('userId');

  }

  // Expose the user object via a getter
  get   user(): Realm.User | null {
    if (!this._user) {
      // Optionally attempt to restore the user session
      this.restoreUserSession();
    }
    return this.app.currentUser;//this._user;
  }
}








// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app'; // Import Firebase types
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public _user: firebase.User | null = null; // Store the Firebase user object

//   constructor(
//     private afAuth: AngularFireAuth,
//     private router: Router
//   ) {
//     this.restoreUserSession();
//   }

//   // Login with Email and Password
//   async loginWithEmailPassword(email: string, password: string): Promise<firebase.User | null> {
//     try {
//    //   const userCredential = await this.afAuth.signInWithEmailAndPassword('sonkusareankush@gmail.com', '441208');
//    // console.log('Login successful:', userCredential);
//       const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
//       const user = userCredential.user;

//       if (user) {
//         this._user = user;
//         console.log('User:', this._user);

//         localStorage.setItem('userId', user.uid); // Store the user ID to restore session later
//         await this.router.navigate(['tabs']); // Redirect to tabs or home page after login
//       }

//       return user;
//     } catch (err) {
//       console.error('Failed to log in', err);
//       return null;
//     }
//   }

//   // Restore User Session
//   async restoreUserSession() {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       this.afAuth.authState.subscribe((user) => {
//         if (user) {
//           this._user = user;
//         } else {
//           console.error('No user session to restore');
//         }
//       });
//     }
//   }

//   // Logout
//   async logout() {
//     try {
//       await this.afAuth.signOut();
//       this._user = null; // Clear user session
//       localStorage.removeItem('userId');
//       await this.router.navigate(['/login']); // Redirect to login page after logout
//     } catch (err) {
//       console.error('Failed to log out', err);
//     }
//   }

//   // Check if user is logged in
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('userId');
//   }

//   // Getter to expose the current Firebase user object
//   get user(): firebase.User | null {
//     return this._user;
//   }
// }

