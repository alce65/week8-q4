import createDebug from 'debug';
import { Repository } from '../repo.js';
import { Auth } from '../../services/auth.js';
import { UserModel } from './users.mongo.model.js';
import { LoginUser, User } from '../../entities/user.js';
import { HttpError } from '../../types/http.error.js';

const debug = createDebug('W7E:users:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }
  
  async create(newItem: Omit<User, 'id'>): Promise<User> {
    newItem.passwd = await Auth.hash(newItem.passwd);
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async login(loginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({ email: loginUser.email }).exec();
    if (!result || !(await Auth.comparison(loginUser.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetByid not possible');
    return result;
  }


  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }


    async update(id: string, updatedItem: Partial<User>): Promise<User> {
    if (id === updatedItem.id) throw new HttpError(406, 'Not Acceptable', 'You can´t add yourself');
    const result = await UserModel.findByIdAndUpdate(updatedItem.id, { $push: { friends: id } }, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }
  

}





