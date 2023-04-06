import fs from 'fs'
import db from '../persistence/login.js'
import bcrypt from 'bcryptjs'

async function goToHome (ctx) {
    await ctx.redirect('/productos')
}

async function goToLogin(ctx) {
    fs.promises.writeFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', "")
    ctx.type = 'html';
    ctx.body = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/login.html', 'utf8');
};

async function failLogin(ctx) {
    ctx.type = 'html';
    ctx.body = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/faillogin.html', 'utf8');
};

async function goToRegister(ctx) {
    ctx.type = 'html';
    ctx.body = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/register.html', 'utf8');
};

async function failRegister(ctx) {
    ctx.type = 'html';
    ctx.body = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/failregister.html', 'utf8');
};

async function goToLogout(ctx) {
    ctx.type = 'html';
    ctx.body = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/logout.html', 'utf8');
};

async function postRegister (ctx) {
    const username = await ctx.request.body.username;
    const password = await ctx.request.body.password;
    
    try {
      let usuarios = await db.obtenerTodosUsuarios();
      let usuario = await usuarios.find(usuario => usuario.username == username);
  
      if (usuario) {
        console.log('ERROR: el nombre de usuario ya está registrado');
        ctx.redirect('/failregister');
        return;
      }
  
      const hashPassword = await bcrypt.hash(password, 8);
      const newUser = { username: username, password: hashPassword };
      await db.sumarUsuario(newUser);
  
      ctx.redirect('/login');
  
    } catch (error) {
      console.log(error);
      ctx.redirect('/failregister');
    }
  }


async function postLogin (ctx) {
    const username = await ctx.request.body.username;
    const password = await ctx.request.body.password;
    
    try {
      let usuarios = await db.obtenerTodosUsuarios();
      let usuario = await usuarios.find(usuario => usuario.username == username);
  
      if (!usuario) {
        console.log("ERROR: Usuario Inexistente")
        await ctx.redirect('/faillogin');
        return;
      }

      let compare = await bcrypt.compare(password, usuario.password)
      if(!compare) {
        console.log("ERROR: Clave Erronea")
        await ctx.redirect('/faillogin');
        return;
      }
  
      await fs.promises.writeFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', username)
      await ctx.redirect('/productos');
  
    } catch (error) {
      console.log(error);
      await ctx.redirect('/faillogin');
    }
}


export default {
    goToLogin,
    goToHome,
    postLogin,
    failLogin,
    goToRegister,
    failRegister,
    goToLogout,
    postRegister
}