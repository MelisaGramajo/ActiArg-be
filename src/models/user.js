import mongoose from 'mongoose';

//creamos una variable para manejar los roles
let validRoles={
  values:['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol vàlido'
};

const userSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  name: { type: String },
  lastname: { type: String },
  phone: { type: String },
  dni: { type: String },
  role:{ type: String, default:'USER_ROLE', enum:validRoles }
 
});
const user = mongoose.model('user', userSchema);

export default user;
