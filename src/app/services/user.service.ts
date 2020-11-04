import { User }  from '../models/User.model';
import { Subject } from 'rxjs-compat/Subject';


export class UserService {
  private users: User[] = [
    new User('Gogo', 'Rémy', 'gogo@gogo.com', 'thé', ['coder', 'jouer'])
  ]
  userSubject = new Subject<User[]>();
  
  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}