# FracApp

Para correr la aplicacion es necesario desde la terminal en la carpeta de la api correr el comando `npm install` para instalar los modulos necesarios para que funcione. Posteriormente asegurese de MongoDb este corriendo de manera local en su computadora y use el comando `node seeder.js -i` este importa a la base de datos la información necesaria para correr las pruebas.

Despues de correr el seeder para hacer las pruebas se utiliza el comando `npm test`

Si se desea correr una segunda vez las pruebas es necesario eliminar la base de datos con el comando `node seeder.js -d` y volverla a cargar con `node seeder.js -i` para que no haya conflicto con los campos que son de tipo único.

Para correr la api y conectarla con el cliente hay dos formas de hacerlo correrlo en modo development o production, funciona perfevctamente de ambas y se utilizan los comandos `npm run dev` y `npm start`.
