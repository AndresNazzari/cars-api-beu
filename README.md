# Prueba técnica Backend Beu.app realizada por Andrés Javier Nazzari

Para iniciar el proyecto, se debe ejecutar el siguiente comando:

`docker-compose up`

La documentacion se puede ver a travez de swagger en la ruta http://localhost:3000/api/docs

# Requerimientos

## 1. Crear un CRUD donde administremos el registro de vehículos con sus características básicas, marcas y posibles colores.

Los path deben ser:

### Vehicles

- api/vehicle (POST)
- api/vehicle/{id} (PUT)
- api/vehicle (Get)
- api/vehicle/{id} (Get)
- api/vehicle/{id} (Delete)

Nota: Para los GET debemos traer adicionalmente la información de la marca y colores correspondientes al vehículo.

### Brands

- api/brand (POST)
- api/brand/{id} (PUT)
- api/brand(Get)
- api/brand/{id} (Delete)

### Colors

- api/color(POST)
- api/color/{id} (PUT)
- api/color (Get)
- api/color/{id} (Delete)

## 3. Usar NestJs Preferiblemente. (Es válido si solo usan NodeJs u otro Framework)

## 4. Adjuntar la Colección de (Postman o el Curl)

## 5. Entregar el Dockerfile (Opcional)

## 6. Como plus, puedes agregar las validaciones que creas pertinentes y buenas prácticas.

NOTA: El repositorio debe estar alojado en Github y debe ser un repositorio privado invitando a los usuarios “ingcrengifo” y “djteniente”.
