import mongoose from 'mongoose';

//creamos una variable para manejar los roles
let validRoles={
  values:['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol vàlido'
};

let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
  email: { 
    type: String,
    lowercase: true,
    trim: true,
    required: 'El email es requerido',
    validate: [validateEmail, 'Ingresar un email válido'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Ingresar un email válido']
  },
  password: { type: String },
  name: { type: String },
  lastname: { type: String },
  phone: { type: String },
  dni: { type: String },
  role:{ type: String, default:'USER_ROLE', enum:validRoles }
 
});
const user = mongoose.model('user', userSchema);

export default user;
