import { Hobbies } from "./hobbies.js";

export type LoginUser = {
  email: string;
  passwd: string;
}

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  hobbies: Hobbies[];   // No es obligatorio tener este array pero agiliza el acceso a las notas del usuario
};
