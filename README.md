# api-blog

API rest creada con NODE js + Express + MongoDB.

Arquitectura MVC

Consultas a base datos realizadas a traves de Mongoose.js 

Endpoints:

//Todos los artículos
http://localhost:3010/api/article/all/:ultimos?

//Articulo por Id
http://localhost:3010/api/article/:id

//Imagen por nombre
http://localhost:3010/api/article/file/:imgName

//Buscador
http://localhost:3010/api/article/search/:search

--> CRUD <--

//Crear artículos
http://localhost:3010/api/article/create

//Editar artículo
http://localhost:3010/api/article/edit/:id

//Eliminar artículo
http://localhost:3010/api/article/:id

//Subida de archivos
http://localhost:3010/api/article/file/:id
