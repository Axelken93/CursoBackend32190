import productos from '../../src/persistence/products.js'
import message from '../../src/persistence/message.js'
//import sessions from '../../src/persistence/login.js'
import fs from 'fs'

async function haySession(){
    let usuario = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', 'utf8');
    if (usuario.length === 0) {
        return false
    } else {
        return true
    }
}
async function cacheSession(){
    let usuario = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', 'utf8');
    return usuario
}



export default async function socketEvent(io) {
    io.on('connection', (socket) => {
        console.log("un cliente se ha conectado")
    
        socket.emit('event_name', {data: 'Hello, World!'});
    
        productos.listarTodas()
            .then( (pproducto) => {
                socket.emit('prueba', pproducto)
            })
        socket.on('new-product', data => {
            console.log("")
        })
        productos.listarTodas()
            .then( (pproducto) => {
                io.sockets.emit('prueba', pproducto)
            })
    

        message.listarTodas()
            .then((m) => {
                socket.emit('message', m)
            })


    
        socket.on('new-message', async data => {
            await message.guardar(data)
            let newMsj = await message.listarTodas()
            io.sockets.emit('message', newMsj)
        });

        // message.listarTodas()
        //     .then((m) => {
        //         socket.emit('message', m)
        //     })

    
        // socket.on('new-message', async data => {
        //     await message.guardar(data)
        //     let newMsj = await message.listarTodas()
        //     io.sockets.emit('message', newMsj)
        // });


        socket.on('new-user', userName => {
            console.log("")
        })


    
        haySession().then((x) => {
            if (x){
                cacheSession().then((data) => {
                    socket.emit('login', data)
                })
                cacheSession().then((data) => {
                    socket.emit('logout', data)
                })
            } else {
                let data = `<h2 style="color:white;" class="m-3 p-3 text-capitalize fw-bold">INICIE SESION</h2>
                <button onclick="location.href= '/login'" class="btn btn-warning m-2 text-light">SignIn</button>`
                socket.emit('signin', data)
            }
        })
    
    })
}