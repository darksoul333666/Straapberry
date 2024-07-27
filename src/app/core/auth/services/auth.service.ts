import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user';
import { ErrorsLogin, ErrorsRegister } from '../constants/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private SESSION_KEY = 'user-session';
  private USERS_KEY = 'users';
  private SALT_ROUNDS = 10;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    await this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const users = await this.getUsers() || [];
    if (!users.find(user => user.isAdmin)) {
      const adminUser: IUser = {
        name: 'Admin',
        email: 'admin@straapberry.com',
        password: await bcrypt.hash('admin123', this.SALT_ROUNDS),
        isAdmin: true
      };
      users.push(adminUser);
      await this._storage?.set(this.USERS_KEY, JSON.stringify(users));
    }
  }

  async login(user: IUser): Promise<void> {
    const userInStorage = await this.getUserByEmail(user.email);
    if (!userInStorage) {
      throw new Error(ErrorsLogin.EMAIL_NOT_FOUND);
    }
    const passwordMatch = await bcrypt.compare(user.password, userInStorage.password);
    if (!passwordMatch) {
      throw new Error(ErrorsLogin.INVALID_PASSWORD);
    }
    await this._storage?.set(this.SESSION_KEY, JSON.stringify(user));
  }

  async logout(): Promise<void> {
    await this._storage?.remove(this.SESSION_KEY);
  }

  async getSession(): Promise<IUser | null> {
    const session = await this._storage?.get(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getSession();
    return user !== null;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this._storage?.get(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  async addUser(newUser: IUser): Promise<void> {
    const userInStorage = await this.getUserByEmail(newUser.email);
    if (userInStorage) {
      throw new Error(ErrorsRegister.USER_ALREADY_EXISTS);
    }
    newUser.password = await bcrypt.hash(newUser.password, this.SALT_ROUNDS);
    const users = await this.getUsers();
    users.push(newUser);
    await this._storage?.set(this.USERS_KEY, JSON.stringify(users));
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const users = await this.getUsers();
    return users.find(user => user.email === email) || null;
  }
}