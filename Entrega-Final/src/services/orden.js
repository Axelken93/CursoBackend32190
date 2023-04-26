import dbOrden from '../persistence/orden.js'
import dbCarrito from '../persistence/carrito.js'
import {sendMailPurchase} from '../../utils/config/nodemailer.js'

async function finishOrder() {
    // Obtengo info del usuario que esta manipulando la session.
    let mail = await dbCarrito.obtenerMailSession()

    // Obtengo info del carrito del usuario con session activa.
    let carritos = await dbCarrito.listarPorMail(mail)
    let errorMsj = `No se encontro ningun carrito para el usuario: "${mail}"`

    if (carritos.Error === errorMsj) {
        return {Error: `No se puede finalizar la compra dado que no tiene un carrito.`}
    } else {
        let carrito = carritos[0]
        let orden = {
            mail: mail, 
            fecha: new Date().toLocaleString(), 
            items: carrito.productos, 
            direccion: carrito.direccion}
    
        // Almaceno en la DB la orden generada
        let nroOrden = await dbOrden.guardar(orden)
    
        // Envío correo electronico al usuario
        orden.nroOrden = nroOrden
        sendMailPurchase('Orden de compra Concretada', orden)
    
        return {Estatus: `Orden procesada correctamente`, Nro_Orden: nroOrden}
    }
}

export default {
    finishOrder
}