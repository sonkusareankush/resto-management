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
    
    localStorage.removeItem('userId');

    // localStorage.removeItem('user');
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  isLoggedIn(): boolean {
    // return !!localStorage.getItem('user');
    return !!localStorage.getItem('userId');

  }

    // Expose the user object via a getter
    get user(): Realm.User | null {
      return this._user;
      
    } 
}
