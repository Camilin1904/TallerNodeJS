# Taller NodeJS

Este proyecto forma parte del curso de "Computación en Internet 3" del pregrado de Ingeniería de Sistemas en la Universidad Icesi, Cali, Colombia.

## Descripción del Proyecto
API GraphQL desarrollada con Node.js, TypeScript y MongoDB que permite la gestión de usuarios, comentarios y reacciones. El sistema incluye autenticación JWT, roles de usuario y manejo de hilos de discusión.

## Contribuyentes
|Nombre | Código | 
|---------|-----------------|
|Andrés Camilo Romero Ruiz|  andrescamiloromero22@gmail.com|
|Camilo Carmona Valencia|cami.car.val@outlook.com|
|Kevin Vincent Loachamin Almeida|kevinvincentvl016@gmail.com|

## Objetivos del Proyecto
El objetivo principal de este taller es la migración de una aplicación existente que se basa en una API REST a una que implemente GraphQL, con el fin de aprovechar las ventajas inherentes a esta tecnología para optimizar la eficiencia y flexibilidad en la gestión de datos. Esta transformación busca preservar todas las funcionalidades clave de la aplicación original, mientras se mejoran los procesos de consulta y manipulación de datos, permitiendo una mayor personalización y eficacia en las solicitudes, así como una mejor gestión de la complejidad y escalabilidad.

## Despliegue
El proyecto se encuentra desplegado en la siguiente url: https://tallernodejs-xgiw.onrender.com

> [!WARNING]
> Dado que el despliegue se realizó de forma gratuita, despues de un periodo de inactividad es posible que se demore 1 minuto en volver a levantarse.
>
> Como el proyecto esta siendo hosteado en un servicio externo, no tenemos control sobre la estabilidad de la conección con el servidor.


## Tecnologías Utilizadas
- Node.js
- TypeScript
- MongoDB
- Apollo Server (GraphQL)
- JWT para autenticación
- Express
- Mongoose

## Requisitos Previos
- Node.js (v14 o superior)
- MongoDB instalado y corriendo localmente
- npm o yarn

## Ejecución
1. Clonar el repositorio
2. Tener instalado de forma global npm y yarn
3. Instalar las dependencias a través del comando 
```console
   npm install
```
4. Crear el archivo .env el cual deberá tener las siguientes variables (Estos valores son privados):
	* PORT = el puerto a usar
	* MONGO_URL = el string de conexión a tu db de mongo
	* JWT_SECRET = la llave privada
5. Ejecutar el proyecto
```console
   npm run build
   npx node dist/src/index.js
```

## Postman
1. Abrir postman
2. Dirigirse arriba a la izquierda en las tres líneas
3. File >> Import >> Elegir el Json que se encuentra en el repo
4. Leer la overview de cada carpeta, en ellas se encuentran los métodos de cada endpoint, sus rutas, los documentos que reciben y la gestión del JWT
5. Ejecutar las requests


## Estructura del Proyecto

```markdown
src/
├── controllers/ # Controladores de la aplicación
├── models/ # Modelos de MongoDB
├── services/ # Lógica de negocio
├── middlewares/ # Middlewares de autenticación y validación
├── graphql/ # Definiciones GraphQL (schema y resolvers)
├── exceptions/ # Manejo de errores personalizados
└── routes/ # Rutas de la API (legacy REST)
```

## Documentación de la API GraphQL

### Tipos Principales

#### User

```graphql
type User {
   id: ID!
   name: String!
   email: String!
   password: String!
   role: String!
   comments: [Comment]!
   createdAt: String!
   updatedAt: String!
   deletedAt: String
}
```

#### Comment

```graphql
type Comment {
   id: ID!
   text: String!
   parent: ID
}
```

#### Reaction

```graphql
type Reaction {
   id: ID!
   reaction: Int!
   commentId: ID!
}
```

### Queries Principales

#### Autenticación

```graphql
query Login {
   login(email: String!, password: String!): Login!
}
```

#### Usuarios

```graphql
query GetUsers {
   users: [User]!
}
query GetUser {
   user(id: ID!): User
}
```

#### Comentarios

```graphql
query GetComments {
   comments: [Comment]!
}
query GetComment {
   comment(id: ID!): Comment
}
```

### Mutations Principales

#### Usuarios

```graphql
mutation CreateUser {
   createUser(
      name: String!
      email: String!
      password: String!
   ): User!
}
mutation UpdateUser {
   updateUser(
      id: ID!
      name: String
      email: String
      password: String
   ): User!
}
```

#### Comentarios

```graphql
mutation CreateComment {
   createComment(
      text: String!
      parent: ID
   ): Comment!
}
mutation UpdateComment {
   updateComment(
      id: ID!
      text: String
   ): Comment!
}
```

#### Reacciones

```graphql
mutation CreateReaction {
   createReaction(
   reaction: Int
   commentId: ID!
   ): Reaction!
}
```

## Dificultades Encontradas

Durante el desarrollo del proyecto, nos enfrentamos a varios desafíos técnicos significativos:

1. Comprensión inicial de GraphQL:
   - La curva de aprendizaje de GraphQL fue pronunciada al principio, especialmente en entender conceptos como schemas, resolvers y el sistema de tipos.
   - La transición desde REST API tradicional a GraphQL requirió un cambio en la mentalidad de diseño de APIs.

2. Integración de JWT y Zod con GraphQL:
   - La implementación de autenticación con JWT en el contexto de GraphQL requirió investigación adicional para entender cómo manejar tokens en las mutations y queries.
   - La validación de datos con Zod necesitó adaptación para trabajar efectivamente con los tipos de GraphQL, lo que implicó un esfuerzo adicional en la integración de ambas tecnologías.

3. Problemas de Despliegue:
   - Inicialmente, enfrentamos errores en el despliegue relacionados con la configuración del servidor GraphQL y las variables de entorno.
   - Se presentaron problemas de CORS y configuración de endpoints que fueron resueltos mediante ajustes en la configuración del servidor.

