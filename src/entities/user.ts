import { ImgData } from '../types/img.data';
import joi from 'joi';

export type LoginUser = {
  email: string;
  passwd: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  avatar: ImgData;
  friends: User[];
  enemies: User[];
  role: 'Admin' | 'User';
};

export const userJoiSchema = joi.object<User>({
  email: joi.string().email().required().messages({
    'string.base': 'Formato no válido',
    'string.email': 'Formato de email no válido',
    'string.required': 'Valor requerido',
  }),
  passwd: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
  age: joi.number().min(18).max(100),
});
