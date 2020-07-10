const error_types = {
  Error401: function (msg) {
    //no autorizado
    let err = Error.apply(this, [msg]);
    this.name = err.name = 'Error401';
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  Error403: function (msg) {
    //prohibido
    let err = Error.apply(this, [msg]);
    this.name = err.name = 'Error403';
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  Error404: function (msg) {
    //no encontrado
    let err = Error.apply(this, [msg]);
    this.name = err.name = 'Error404';
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  InfoError: function (msg) {
    //todo ok, solo información
    let err = Error.apply(this, [msg]);
    this.name = err.name = 'InfoError';
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  Error504: function (msg) {
    //errores de los servidoresn
    let err = Error.apply(this, [msg]);
    this.name = err.name = 'Error504';
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
  Error501: function (msg) {
    //expired token
    let err = Error.apply(this, [msg]);
    this.name = err.name = 'Error501';
    this.message = err.message;
    this.stack = err.stack;
    return this;
  },
};

export default error_types;
