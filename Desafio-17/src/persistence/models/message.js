export default class Mensaje {
    #mail;
    #nombre;
    #apellido;
    #edad;
    #texto;
    #fecha;

    constructor({ mail, nombre, apellido, edad, texto, fecha }) {
        this.mail = mail
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.texto = texto
        this.fecha = fecha
    }

    get mail() { return this.#mail }

    set mail(mail) {
        if (!mail) throw new Error('"mail" es un campo requerido')
        this.#mail = mail
    }

    get nombre() { return this.#nombre }

    set nombre(nombre) {
        if (!nombre) throw new Error('"Nombre" es un campo requerido')
        this.#nombre = nombre
    }

    get apellido() { return this.#apellido }

    set apellido(apellido) {
        if (!apellido) throw new Error('"Apellido" es un campo requerido')
        this.#apellido = apellido
    }

    get edad() { return this.#edad }

    set edad(edad) {
        if (!edad) throw new Error('"edad" es un campo requerido')
        if (isNaN(edad)) throw new Error('"edad" es un campo de caracteres exclusivamente numéricos')
        this.#edad = edad
    }

    get texto() { return this.#texto }

    set texto(texto) {
        if (!texto) throw new Error('"Texto" es un campo requerido')
        this.#texto = texto
    }

    get fecha() { return this.#fecha }

    set fecha(fecha) {
        if (!fecha) throw new Error('"fecha" es un campo requerido')
        this.#fecha = fecha
    }

    datos() {
        return JSON.parse(JSON.stringify({
            mail: this.#mail,
            nombre: this.#nombre,
            apellido: this.#apellido,
            edad: this.#edad,
            texto: this.#texto,
            fecha: this.#fecha
        }))
    }
}


let messagesDTO = {
    mail: 'assas@asas',
    mail: 'axel@asas',
    nombre: 'axelken',
    apellido: 'balbi',
    edad: 22,
    texto: 'asdasdsadasdsad',
    fecha: '16/3/2023, 20:27:07'
  }
