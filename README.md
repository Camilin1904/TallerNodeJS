# Taller NodeJS

Este proyecto forma parte del curso de "Computación en Internet 3" del pregrado de Ingeniería de Sistemas en la Universidad Icesi, Cali, Colombia.

## Contribuyentes
|Nombre | Código | 
|---------|-----------------|
|Andrés Camilo Romero Ruiz|  andrescamiloromero22@gmail.com|
|Camilo Carmona Valencia|cami.car.val@outlook.com|

## Objetivos del Proyecto
Desarrollar una aplicación backend robusta con Node.js que utilice TypeScript para un tipado fuerte y MongoDB para la persistencia de datos. La aplicación permitirá realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en usuarios y comentarios, manejar la autenticación de usuarios, gestionar la creación y respuestas a comentarios (incluyendo creación y eliminación de reacciones).

## Despliegue
El proyecto se encuentra desplegado en la siguiente url: https://tallernodejs.onrender.com

Nota: Dado que el despliegue se realizó de forma gratuita, despues de un periodo de inactividad es posible que se demore 1 minuto en volver a levantarse.

Como el proyecto esta siendo hosteado en un servicio externo, no tenemos control sobre la estabilidad de la conección con el servidor.
## Ejecución
1. Clonar el repositorio
2. Tener instalado de forma global npm y yarn
3. Instalar las dependencias a través del comando 
```console
   yarn install
```
o
```console
   npm install
```
4. Crear el archivo .env el cual deberá tener las siguientes variables (Estos valores son privados):
	* PORT = el puerto a usar
	* MONGO_URL = el string de conexión a tu db de mongo
	* JWT_SECRET = la llave privada
5. Ejecutar el proyecto
```console
   yarn build
```

## Postman
1. Abrir postman
2. Dirigirse arriba a la izquierda en las tres líneas
3. File >> Import >> Elegir el Json que se encuentra en el repo
4. Leer la overview de cada carpeta, en ellas se encuentran los métodos de cada endpoint, sus rutas, los documentos que reciben y la gestión del JWT
5. Ejecutar las requests

## Dificultades Encontradas

La gestión de comentarios fue la principal dificultad y la que más perduró a lo largo del desarrollo, comenzamos con la idea de guardarlos de forma embebida en los usuarios de tal forma que cada usuario conociese de forma directa sus comentarios, pero al momento de pensar en los hilos esta idea tuvo que ser descartada, pues cada comentario que ya existía dentro de un usuario debería de alguna forma guardar referencia a los comentarios padres o hijos. Decidimos entonces guardar los comentarios en una colección aparte. Y, dentro del usuario un arreglo que almacene los ObjectId de sus comentarios, mientras que cada comentario guarda el ObjectId de su padre e hijos conservando las referencias, ya que al intentar guardar una copia de estos, se encontraban dificultades al momento de borrarlos y actualizarlos.

La segunda dificultad se presentó al momento de querer desplegar, ya que inicialmente se trató de desplegar en vercel pero el despliegue siempre arrojaba un 404, se estuvo un tiempo trabajando para descifrar la razón y aparentemente se relacionaba con el build. Sin embargo al no lograr más avances se decidió cambiar a la plataforma de render, donde el proceso fue igual de simple, con la diferencia de que no se presentaron inconvenientes y el despliegue fue exitoso
