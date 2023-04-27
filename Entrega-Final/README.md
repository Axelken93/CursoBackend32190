
# Documentación de la API

## Descripción general

Esta API REST está diseñada para manejar la lógica de un ecommerce, permitiendo la gestión de productos, carritos de compras, órdenes y un sistema de chat integrado.

- [Configuración y uso](#configuración-y-uso)
- [Autenticación y autorización](#autenticación-y-autorización)
- [Endpoints](#endpoint)

## Configuración y uso

### Introducción

Para poder utilizar nuestra aplicación se debe primero realizar las instalaciones de las dependencias utilizadas y configurar las variables de entorno que generan los inputs necesarios para que funcione. 

1. *Instalación de dependencias:* 

Se deben incluir en nuestro archivo de `package.json` las siguientes dependencias e instalarlas con el comando `npm i`:

```json
"bcryptjs": "^2.4.3",
"compression": "^1.7.4",
"connect-mongo": "^5.0.0",
"cookie-parser": "^1.4.6",
"dotenv": "^16.0.3",
"express": "^4.18.2",
"express-session": "^1.17.3",
"minimist": "^1.2.8",
"mongoose": "^7.0.4",
"nodemailer": "^6.9.1",
"passport": "^0.6.0",
"passport-local": "^1.0.0",
"socket.io": "^4.6.1"
```

2. *Creación de archivo de variables de entorno:*

Debemos personalizar la configuración de la API mediante variables de entorno. En nuestra aplicación utilizamos la biblioteca `dotenv` para acceder a estas variables y crearemos de ambientes de trabajo: de desarrollo y en producción. 

#### Recursos a configurar: 

Se deberá configurar y personalizar cada ambiente de trabajo creando los archivos correspondiente a `.env.production` o `.env.development` según corresponda. Dentro de estos archivos debemos asegurarnos una correcta conexión de los siguientes recursos:

Recurso | Ejemplo | Descripción
------------ | ------------- | -------------
Persistencia | `PersistenceMode="Mem"` | Definición de la persistencia a utilizar. Puede ser `Mem` o `Mongo`.
Puerto | `PORT=8080` | Puerto en el cual se ejecutará la aplicación.
URL Mongo | `MAURLMONGO="mongodb+srv://_ _ _ _ _"` | URL de DB Mongo a utilizar.
Password Mongo | `MAKEY="myKey"` | Password generado en la base de datos.
Mail de admin. | `MAILNODEMAILER='xxxxxx@gmail.com'` | Mail del Administrador para recibir las notificaciones
Password Mail Admin. | `PASSNODEMAILER='xxxxxxxxxxxxxxx'` | Password generado desde Seguridad de Gmail. 

3. *Ejecución:*

Al ejecutar nuestra aplicación debemos elegir en qué ambiente queremos levantarla por medio de la variable de environment `NODE_ENV` al desplegar la aplicación o bien por medio de la consola al levantar nuestro API. Ejemplo:

```console
node server.js –m production
node server.js –m development
```

## Autenticación y autorización

### Introducción
La autenticación y autorización son procesos importantes en una aplicación web para proteger los recursos y datos del usuario. En esta API, se utiliza Passport, una biblioteca de autenticación para Node.js que proporciona una forma fácil de implementar diferentes estrategias de autenticación. Puedes consultar la [documentación de Passport](https://www.passportjs.org/docs/) para más información sobre cómo utilizarlo.

### Autenticación
Para la autenticación, se verifica el nombre de usuario y la contraseña ingresados por el usuario con los datos almacenados en la base de datos. En caso de que los datos sean correctos, se genera un token de sesión que se almacena en la cookie del navegador del usuario. El token de sesión se utiliza para identificar al usuario en las solicitudes posteriores.

#### Recursos disponibles
| Método HTTP | Ruta | Descripción |
| --- | --- | --- |
| GET | /login | Muestra el mensaje para realizar el inicio de sesión. |
| POST | /login | Verifica las credenciales del usuario y lo autentica en el sistema. |
| GET | /faillogin | Muestra un mensaje de error si el inicio de sesión falla. |
| GET | /logout | Cierra la sesión actual del usuario. |
| GET | /register | Muestra el mensaje de registro de usuario. |
| POST | /register | Registra a un nuevo usuario en el sistema. |
| GET | /failregister | Muestra un mensaje de error si el registro de usuario falla. |

### Registro de usuario
Para registrarse en la aplicación, el usuario debe enviar una solicitud POST a la ruta /register con su nombre, correo electrónico, contraseña, dirección y teléfono. Esta información será almacenada de forma segura en la base de datos. Ejemplo:

```json
{
"nombre": "Axel",
"username": "axelken93@hotmail.com",
"password": "axelken",
"direccion": "Las Flores, Argentina",
"telefono": 123456789
}
```

Si el registro es exitoso, el usuario será redirigido a la página de inicio de sesión. En caso contrario, se mostrará un mensaje de error en la ruta /failregister. Ejemplo:

```json
{
"Error": "Usted ha ingresado mal algun dato. Asegurese de ingresar Nombre, Mail, Password, Direccion y telefono"
}
```


*Notificación:* Al registrarse un nuevo usuario se enviará automáticamente un correo electrónico al mail del administrador del api.

### Inicio de sesión
Para iniciar sesión, el usuario debe enviar una solicitud POST a la ruta /login con su nombre de usuario y contraseña. Ejemplo:

```json
{
"username": "axelken93@hotmail.com",
"password": "axelken"
}
```

Si las credenciales son correctas, la sesión se inicia y se redirige al usuario a la página principal. En caso contrario, se muestra un mensaje de error en la ruta /faillogin.

### Cierre de sesión
Para cerrar la sesión, el usuario debe enviar una solicitud GET a la ruta /logout. La sesión actual se cerrará y el usuario recibirá un mensaje informando el cierre de sesion. Ejemplo:

```json
{
"Status": "Usted ha cerrado sesion"
}
```

### Autenticación
La autorización en esta API se realiza a través de middleware que se encarga de verificar si el usuario tiene los permisos necesarios para acceder a ciertas rutas y verifica si tiene el token de sesión activo, si el usuario inicia sesión de forma correcta puede acceder a las rutas protegidas de la API, como la ruta `/productos`. Si el usuario intenta acceder a una ruta protegida sin un token de sesión válido, se le redirigirá automáticamente a la página de inicio de sesión. Lo mismo sucede si el usuario no genera ninguna petición la sesión expira a los 10 minutos. 

### Seguridad:
La seguridad es un aspecto crítico en cualquier aplicación web. En esta API, se utilizan prácticas de seguridad recomendadas, como la verificación de contraseñas utilizando la función bcrypt () de Node.js, que almacena contraseñas con una función hash y sal de manera segura. Además, se utilizan tokens de sesión que se almacenan en cookies seguras con HttpOnly y Secure para evitar ataques CSRF y XSS. Puede consultar la [documentación de Bcrypt](https://github.com/kelektiv/node.bcrypt.js) para mas información sobre como utilizarlo.


## Endpoint

### Introducción

Nuestra API está desarrollada para manejar la lógica de un Ecommerce basados en cuatro ejes de trabajo: Productos, Carritos, Ordenes y un Sistema de Chat.

### Productos

Sobre este endpoint podemos obtener productos, agregar nuevos, modificar o eliminar productos. A continuación, detallamos una lista de los métodos HTTP disponibles para este endpoint:

1. #### GET /productos/:categoría?

Obtiene una lista de productos según la categoría especificada. Si no se especifica ninguna categoría, se devuelven todos los productos.

##### *- Parámetros*

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| categoría | string | (Opcional) La categoría de los productos a consultar. |

##### *- Respuesta*

Obtenemos un array con todos los productos almacenados en la base de datos. Cada uno de estos productos debe contener obligatoriamente un id, nombre, categoría y precio. Ejemplo:

```json
[
    {
        "id": 1,
        "nombre": "Cuadrado",
        "categoria": "Geometria",
        "precio": 444
    },
    {
        "id": 2,
        "nombre": "Circulo",
        "categoria": "Geometria",
        "precio": 800
    }
]
```

2. #### GET /productos/:num

Obtiene un producto según el ID especificado. Si no se especifica ninguna ID, se devuelven todos los productos.

##### *- Parámetros*

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| num | int | (Opcional) El ID del producto a consultar. |

##### *- Respuesta*

Obtenemos un objeto del producto con ID indicado almacenado en la base de datos. Ejemplo:

```json
{
    "id": 1,
    "nombre": "Cuadrado",
    "categoria": "Geometria",
    "precio": 444
}
```

##### *- Error:*
En caso de indicar un ID no numerico nos dará una respuesta de Error con el mensaje que el ID debe ser de tipo numerico. Si se indica por parámetro un ID numerico pero que no coincide con ningún ID almacenado nos dará un Error con el mensaje que el producto con el ID indicado no ha sido encontrado. Ejemplo:

```json
{
	"Error": "Producto con ID 4 no encontrado"
}
```

3. #### POST /productos

Crea y almacena un nuevo producto. 

##### *- Body*

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| nombre | string | (Obligatorio) Nombre del producto |
| precio | number | (Obligatorio) Precio del producto |
| categoria |string | (Obligatorio) Categoría del producto |


##### *- Respuesta*

Obtenemos un objeto del producto con la información enviada en el body y la incorporación del numero de ID que le corresponde que ha sido generado de forma incremental y automáticamente. Ejemplo:

```json
{
	"id": 3,
	"nombre": "Triangulo",
	"categoria": "Geometria",
	"precio": 333
}
```

##### *- Error:*
En caso de enviar un objeto por body que no incluya algun campo obligatorio (nombre, categoría o precio) nos devuelve un error con el mensaje que dicho campo es requerido:

```json
{
	"Error": "Campo 'Precio' es requerido"
}
```

4. #### DELETE /productos/:num?

Elimina el producto con el número de ID especificado por parámetro. Si no se especifica ningún numero de ID, se eliminan todos los productos. 

##### *- Parámetros*

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| num | Int | (opcional)Número de ID del producto. |

##### *- Respuesta*
Obtenemos un objeto del producto con la información del producto eliminado, en caso de eliminar todos nos devuelve un objeto con el mensaje que se ha eliminado de forma correcta.

##### *- Error:*
En caso de indicar por parámetro un ID no coincide con ningún ID de producto almacenado nos dará un Error con el mensaje que el producto con el ID indicado no ha sido encontrado.

```json
{
	"Error": "Producto con ID 30 no encontrado"
}
```

5. #### PUT /productos/:num

Modifica el producto con el número de ID especificado por parámetro:

##### *- Parámetros*

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| num | Int | (Obligatorio) Número de ID del producto. |

##### *- Body*
Se debe enviar un nuevo objeto con el/los conceptos a modificar.

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| nombre | string | (Obligatorio) Nombre del producto |
| precio | number | (Obligatorio) Precio del producto |
| categoria |string | (Obligatorio) Categoría del producto |

Ejemplo ruta PUT `/productos`
```json
{
	"nombre": "Nombre Modificado",
	"categoria": "Geometria",
	"precio": 111
}
```

##### *- Respuesta*
Obtenemos un objeto del producto con la nueva información modificada. Ejemplo:

```json
{
	"id": 2,
	"nombre": "Circulo",
	"categoria": "Geometria",
	"precio": 800
}
```

##### *- Error:*
En caso de indicar por parámetro un ID no coincide con ningún ID de producto almacenado nos dará un Error con el mensaje que el producto con el ID indicado no ha sido encontrado.

```json
{
	"Error": "Producto con ID 20 no encontrado"
}
```

### Carrito

Sobre este endpoint podemos obtener, modificar o eliminar nuestro carrito de compras. A continuación, detallamos una lista de los métodos HTTP disponibles para este endpoint:

1. #### GET /carrito

Obtiene un detalle del carrito. 

##### *- Respuesta*

En el caso que el usuario si tenga un carrito previamente almacenado en la base de datos obtenemos un objeto con la siguiente información:
- ID: número único identificatorio en nuestra base de datos del carrito
- Mail: Correo electrónico del usuario autentificado en la sesión.
- Fecha: En la cual se posteo el carrito
- Productos: Detalle de los productos que contiene dicho carrito.
- Dirección: De entrega de los productos. 

Ejemplo:

```json
[
	{
		"id": 3,
		"mail": "axelken93@hotmail.com",
		"fecha": "23/4/2023, 18:53:49",
		"productos": [
			{
				"nombre": "Mexico",
				"precio": 4,
				"cantidad": 1
			},
			{
				"nombre": "Senegal",
				"precio": 6,
				"cantidad": 2
			}
		],
		"direccion": "Montevideo, Uruguay"
	}
]
```
##### *- Error:*
En el caso que el usuario autentificado no tenga un carrito previamente almacenado en la base de datos obtendremos un error con el mensaje que no posee un carrito. Ejemplo:

```json
{
	"Error": "No se encontro ningun carrito para el usuario: \"axelken93@hotmail.com\""
}
```

3. #### POST /carrito

Crea y almacena un nuevo carrito. 

##### *- Body*

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| productos | array | (Obligatorio) Listado de productos |
| direccion | string | (Obligatorio) Dirección de entrega |


##### *- Respuesta*

Obtenemos un objeto del carrito con la información enviada en el body y además se incorpora el número de ID que le corresponde que ha sido generado de forma incremental y automáticamente, el mail del usuario con la sesión activa y la fecha y hora que se postea el nuevo carrito. Ejemplo: 

```json
{
    "id": 3,
    "mail": "axelken93@hotmail.com",
    "fecha": "23/4/2023, 18:53:49",
    "productos": [
        {
            "nombre": "Mexico",
            "precio": 4,
            "cantidad": 1
        },
        {
            "nombre": "Senegal",
            "precio": 6,
            "cantidad": 2
        }
    ],
    "direccion": "Montevideo, Uruguay"
}
```

##### *- Error:*
En el caso de tener un carrito ya almacenado en la base de datos para el usuario con la sesion activa nos devolverá un error con el mensaje de que ya se posee un carrito. En caso de enviar un objeto por body que no incluya algun campo obligatorio (producto o direccion) nos devuelve un error con el mensaje que dicho campo es requerido. Ejemplo:

```json
{
	"Error": "Usted ya posee un carrito, favor de modificar el carrito actual"
}
```

4. #### DELETE /carrito/:num?

Elimina el carrito con el número de ID especificado por parámetro. Si no se especifica ningún número de ID, se eliminan todos los carritos del usuario. 

##### *- Parámetros*

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| num | Int | (opcional)Número de ID del carrito. |

##### *- Respuesta*
Obtenemos un objeto del carrito con la información del producto eliminado, en caso de eliminar todos nos devuelve un objeto con el mensaje que se ha eliminado de forma correcta.

```json
{
	"Estatus": "Objeto eliminado correctamente"
}
```

##### *- Error:*
En caso de indicar por parámetro un ID no coincide con ningún ID de carrito almacenado nos dará un Error con el mensaje que el carrito con el ID indicado no ha sido encontrado.

```json
{
	"Error": "Carrito con ID 1 no encontrado"
}
```

5. #### PUT /carrito/:num

Modifica el carrito con el número de ID especificado por parámetro:

##### *- Parámetros*

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| num | Int | (Obligatorio) Número de ID del carrito. |

##### *- Body*
Se debe enviar un nuevo objeto con el/los conceptos a modificar.

| Concepto | Tipo | Descripción |
|----------|------|-------------|
| productos | array | (Obligatorio) Listado de productos |
| direccion | string | (Obligatorio) Dirección de entrega |


Ejemplo ruta PUT `/carrito/1`
```json
{
	"productos": [{
		"nombre": "MODIFICADO",
		"precio": 40,
		"cantidad": 10}],
	"direccion": "Montevideo, Uruguay"
}
```

##### *- Respuesta*
Obtenemos un objeto del producto con la nueva información modificada. Ejemplo:

```json
{
	"id": 1,
	"productos": [
		{
			"nombre": "MODIFICADO",
			"precio": 40,
			"cantidad": 10
		}
	],
	"direccion": "Montevideo, Uruguay"
}
```

##### *- Error:*
En caso de indicar por parámetro un ID no coincide con ningún ID de carrito almacenado nos dará un Error con el mensaje que el carrito con el ID indicado no ha sido encontrado.

```json
{
	"Error": "Carrito con ID 20 no encontrado"
}
```

### Ordenes

Utilizamos este endpoint para poder concretar la compra de los productos seleccionados en el carrito. A continuación, detallamos el método HTTP disponible:

1. #### GET /finalizar_orden

Finaliza la orden de compra con la información que brinda el carrito del usuario con sesión activa y además activa la funcionalidad de enviar un mail al usuario y administrador con la orden concretada. 

##### *- Respuesta*

En el caso que el usuario tenga un carrito previamente almacenado en la base de datos obtenemos un objeto el mensaje que la orden se proceso correctamente y el numero de referencia. Ejemplo:

```json
{
	"Estatus": "Orden procesada correctamente",
	"Nro_Orden": 3
}
```

##### *- Error:*
En el caso que el usuario no tenga un carrito previamente almacenado en la base de datos obtenemos un error con el mensaje que no se puede finalizar la compra porque no posee carrito.

```json
{
	"Error": "No se puede finalizar la compra dado que no tiene un carrito."
}
```

##### *- Notificación*

Al finalizar una orden, se enviará automáticamente un correo electrónico al mail del administrador del api y al correo electrónico del cliente. 

### Sistema de Chat

Se cuenta con un canal de chat general que se apalanca en el uso de Socket.IO en el cual los usuarios van a poder enviar mensajes y contactarse con el administrador en un chat general. Puede consultar la
[documentación de Socket.IO](https://socket.io/docs/v4/) para mas información como utilizarla.

#### Recursos disponibles:

| Método HTTP | Ruta | Descripción |
|----------|------|-------------|
| GET | /chat | Muestra el front de Central de Mensajes e historial. |
| GET | /chat:mail | Muestra el listado de mensajes filtrados por el mail indicado |
| POST | /chat | Envía un nuevo mensaje. |

1. #### GET /chat

Se obtiene el front del chat general de mensajes para interactuar con otros usuarios y el administrador.  Ejemplo:

![Imagen del front de `/chat`](/Entrega-Final/public/FrontExample.png)

En el caso que otros clientes posteen nuevos mensajes nos aparecerán automáticamente en el cuerpo de historial de mensajes. 

##### *- Manejo de Errores*

Esta ruta esta protegida por un middleware el cual impide acceder al historial de mensajes y postear nuevos mensajes si el usuario no inicio sesión correctamente.

2. #### GET /chat/:mail

Se obtienen los mensajes que han sido enviados por un usuario identificado por su mail. Ejemplo:

```json
[
    {
        "mail":"abalbibieco@gmail.com",
        "nombre":"Florencia",
        "apellido":"Rubalcaba",
        "edad":22,
        "texto":"Hola a todos",
        "fecha":"23/4/2023, 16:26:35"
    },
    {
        "mail":"abalbibieco@gmail.com",
        "nombre":"Florencia",
        "apellido":"Balbi Bieco",
        "edad":1,
        "texto":"Probando mensajes en Mongo atlas",
        "fecha":"25/4/2023, 23:23:03"
    }
]
```

##### *- Manejo de Errores*

En el caso que el mail ingresado no haya posteado ningún mensaje veremos un array vacio. 


3. #### POST /chat

Se guarda un nuevo mensaje y se visualiza automáticamente en el centro de mensajes.

##### *- Body*
Se debe completar el formulario con los siguientes conceptos:

| Concepto | Tipo | Requisito |
|----------|------|-------------|
| Mail | string | Obligatorio |
| Nombre | string | Obligatorio |
| Apellido | string | Obligatorio |
| Edad | number | Obligatorio |
| texto | string | Obligatorio |

##### *- Manejo de Errores*

En el caso que no se complete algún campo nos devolverá un error con el mensaje de que el campo es de carácter obligatorio. Ejemplo:

```json
{
    "Error": "Campo 'apellido' es requerido"
}
```