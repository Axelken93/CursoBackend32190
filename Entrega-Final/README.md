
# Documentación de la API

## Descripción general

Esta API REST está diseñada para manejar la lógica de un ecommerce, permitiendo la gestión de productos, carritos de compras, órdenes y un sistema de chat integrado.

- [Configuración y uso](#configuración-y-uso)
- [Autenticación y autorización](#autenticación-y-autorización)
- [Endpoints](#endpoints)

## Configuración y uso

### Introducción

Para poder utilizar nuestra aplicación se debe primero realizar las instalaciones de las dependencias utilizadas y configurar las variables de entorno que generan los inputs necesarios para que funcione. 

1. *Instalación de dependencias:* 

Se deben incluir en nuestro archivo de `package.json` las siguientes dependencias e instalarlas con el comando `npm i`:

```console
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


## Autenticación y autorización

[Por agregar]

## Endpoint

[Por agregar]
