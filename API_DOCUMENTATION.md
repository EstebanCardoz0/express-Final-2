# API – Liga de Autómatas Estratégicos

## Introducción
Esta API permite administrar una liga de autómatas que participan en entrenamientos, pruebas lógicas y duelos. Toda la información se almacena en un archivo JSON. No se utiliza base de datos real.

## Endpoints
[//]
### Ejemplos de uso con curl y Postman

**Crear un bot:**
```bash
curl -X POST http://localhost:3000/bots \
  -H "Content-Type: application/json" \
  -d '{
    "name": "BotX",
    "generation": 1,
    "processing": 120,
    "memory": 80,
    "modules": [
      { "name": "Laser", "weight": 30, "bonusType": "attack" },
      { "name": "AI", "weight": 20, "bonusType": "logic" }
    ]
  }'
```

**Listar bots:**
```bash
curl http://localhost:3000/bots
```

**Actualizar módulos de un bot:**
```bash
curl -X PATCH http://localhost:3000/bots/1/modules \
  -H "Content-Type: application/json" \
  -d '[ { "name": "Shield", "weight": 40, "bonusType": "attack" } ]'
```

**Crear circuito:**
```bash
curl -X POST http://localhost:3000/tracks \
  -H "Content-Type: application/json" \
  -d '{ "name": "Circuito Alfa", "complexity": 5, "length": 200, "energyCostBase": 10, "processingDemand": 100 }'
```

**Ejecutar entrenamiento:**
```bash
curl -X POST http://localhost:3000/tracks/1/train/1
```

**Crear prueba lógica:**
```bash
curl -X POST http://localhost:3000/logic-tests \
  -H "Content-Type: application/json" \
  -d '{ "title": "Sudoku", "difficulty": 3, "timeLimit": 60, "baseRewardFormula": "difficulty*10", "penaltyFormula": "difficulty*2" }'
```

**Intentar prueba lógica:**
```bash
curl -X POST http://localhost:3000/logic-tests/1/attempt \
  -H "Content-Type: application/json" \
  -d '{ "botId": 1, "timeUsed": 40 }'
```

**Crear duelo:**
```bash
curl -X POST http://localhost:3000/duels \
  -H "Content-Type: application/json" \
  -d '{ "bot1Id": 1, "bot2Id": 2 }'
```

**Listar duelos:**
```bash
curl http://localhost:3000/duels
```

**Obtener duelo por id:**
```bash
curl http://localhost:3000/duels/1
```

**Uso en Postman:**
- Selecciona el método (POST, GET, PATCH).
- Ingresa la URL (por ejemplo, `http://localhost:3000/bots`).
- En la pestaña Body, selecciona "raw" y "JSON", y pega el contenido del ejemplo.
- Haz clic en "Send" para enviar la request y ver la respuesta.

### Bots
- `POST /bots` – Crear un bot
  - **Body:**
    ```json
    {
      "name": "BotX",
      "generation": 1,
      "processing": 120,
      "memory": 80,
      "modules": [
        { "name": "Laser", "weight": 30, "bonusType": "attack" },
        { "name": "AI", "weight": 20, "bonusType": "logic" }
      ]
    }
    ```
  - **Response:** 201 Created
    ```json
    {
      "id": 1,
      "name": "BotX",
      "generation": 1,
      "processing": 120,
      "memory": 80,
      "battery": 100,
      "load": 0,
      "xp": 0,
      "rank": 1,
      "modules": [ ... ]
    }
    ```

- `GET /bots` – Listar todos los bots
  - **Response:** 200 OK
    ```json
    [ { ... }, { ... } ]
    ```

- `GET /bots/:id` – Obtener un bot por id
  - **Response:** 200 OK
    ```json
    { ...bot... }
    ```

- `PATCH /bots/:id/modules` – Actualizar módulos de un bot
  - **Body:**
    ```json
    [ { "name": "Shield", "weight": 40, "bonusType": "attack" } ]
    ```
  - **Response:** 200 OK
    ```json
    { ...bot actualizado... }
    ```

- `DELETE /bots/:id` – Eliminar un bot
  - **Response:** 200 OK
    ```json
    { "message": "Bot eliminado correctamente" }
    ```

### Tracks
- `POST /tracks` – Crear circuito
  - **Body:**
    ```json
    { "name": "Circuito Alfa", "complexity": 5, "length": 200, "energyCostBase": 10, "processingDemand": 100 }
    ```
  - **Response:** 201 Created
    ```json
    { ...circuito... }
    ```

- `GET /tracks` – Listar todos los circuitos
  - **Response:** 200 OK
    ```json
    [ { ... }, { ... } ]
    ```

- `GET /tracks/:id` – Obtener circuito por id
  - **Response:** 200 OK
    ```json
    { ...circuito... }
    ```

- `POST /tracks/:trackId/train/:botId` – Ejecutar entrenamiento
  - **Response:** 200 OK
    ```json
    { "result": "success", "xp": 60, "battery": 80 }
    ```

- `DELETE /tracks/:id` – Eliminar un circuito
  - **Response:** 200 OK
    ```json
    { "message": "Circuito eliminado correctamente" }
    ```

### Logic Tests
- `POST /logic-tests` – Crear prueba lógica
  - **Body:**
    ```json
    { "title": "Sudoku", "difficulty": 3, "timeLimit": 60, "baseRewardFormula": "difficulty*10", "penaltyFormula": "difficulty*2" }
    ```
  - **Response:** 201 Created
    ```json
    { ...prueba lógica... }
    ```

- `GET /logic-tests` – Listar todas las pruebas lógicas
  - **Response:** 200 OK
    ```json
    [ { ... }, { ... } ]
    ```

- `GET /logic-tests/:id` – Obtener prueba lógica por id
  - **Response:** 200 OK
    ```json
    { ...prueba lógica... }
    ```

- `POST /logic-tests/:logicTestId/attempt` – Intentar prueba lógica
  - **Body:**
    ```json
    { "botId": 1, "timeUsed": 40 }
    ```
  - **Response:** 200 OK
    ```json
    { "result": "success", "xp": 36, "battery": 94 }
    ```

- `DELETE /logic-tests/:id` – Eliminar una prueba lógica
  - **Response:** 200 OK
    ```json
    { "message": "Prueba lógica eliminada correctamente" }
    ```

### Duels
- `POST /duels` – Ejecutar duelo
  - **Body:**
    ```json
    { "bot1Id": 1, "bot2Id": 2 }
    ```
  - **Response:** 201 Created
    ```json
    {
      "id": 1,
      "bot1Id": 1,
      "bot2Id": 2,
      "result": "bot1",
      "xpBot1": 60,
      "xpBot2": 10,
      "batteryBot1": 85,
      "batteryBot2": 90,
      "performanceBot1": 150.5,
      "performanceBot2": 140.2,
      "date": "2026-02-21T12:00:00.000Z"
    }
    ```

- `GET /duels` – Listar duelos
  - **Response:** 200 OK
    ```json
    [ { ... }, { ... } ]
    ```

- `GET /duels/:id` – Obtener duelo por id
  - **Response:** 200 OK
    ```json
    { ...duelo... }
    ```

- `DELETE /duels/:id` – Eliminar un duelo
  - **Response:** 200 OK
    ```json
    { "message": "Duelo eliminado correctamente" }
    ```

### Endpoints adicionales

#### Obtener bot por id
```bash
curl http://localhost:3000/bots/1
```
- `GET /bots/:id` – Obtener un bot por id
  - **Response:** 200 OK
    ```json
    { ...bot... }
    ```

#### Listar y obtener circuitos
```bash
curl http://localhost:3000/tracks
curl http://localhost:3000/tracks/1
```
- `GET /tracks` – Listar todos los circuitos
  - **Response:** 200 OK
    ```json
    [ { ... }, { ... } ]
    ```
- `GET /tracks/:id` – Obtener circuito por id
  - **Response:** 200 OK
    ```json
    { ...circuito... }
    ```

#### Listar y obtener pruebas lógicas
```bash
curl http://localhost:3000/logic-tests
curl http://localhost:3000/logic-tests/1
```
- `GET /logic-tests` – Listar todas las pruebas lógicas
  - **Response:** 200 OK
    ```json
    [ { ... }, { ... } ]
    ```
- `GET /logic-tests/:id` – Obtener prueba lógica por id
  - **Response:** 200 OK
    ```json
    { ...prueba lógica... }
    ```

#### Actualizar un bot (PUT)
```bash
curl -X PUT http://localhost:3000/bots/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "BotActualizado",
    "generation": 2,
    "processing": 150,
    "memory": 120,
    "modules": [
      { "name": "Laser", "weight": 30, "bonusType": "attack" }
    ]
  }'
```
- `PUT /bots/:id` – Reemplazar completamente un bot
  - **Body:**
    ```json
    {
      "name": "BotActualizado",
      "generation": 2,
      "processing": 150,
      "memory": 120,
      "modules": [
        { "name": "Laser", "weight": 30, "bonusType": "attack" }
      ]
    }
    ```
  - **Response:** 200 OK
    ```json
    { ...bot actualizado... }
    ```

#### Actualizar un track (PUT)
```bash
curl -X PUT http://localhost:3000/tracks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Circuito Beta",
    "complexity": 7,
    "length": 150,
    "energyCostBase": 12,
    "processingDemand": 110
  }'
```
- `PUT /tracks/:id` – Reemplazar completamente un circuito
  - **Body:**
    ```json
    {
      "name": "Circuito Beta",
      "complexity": 7,
      "length": 150,
      "energyCostBase": 12,
      "processingDemand": 110
    }
    ```
  - **Response:** 200 OK
    ```json
    { ...circuito actualizado... }
    ```

#### Actualizar una prueba lógica (PUT)
```bash
curl -X PUT http://localhost:3000/logic-tests/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sudoku Avanzado",
    "difficulty": 5,
    "timeLimit": 90,
    "baseRewardFormula": "difficulty*12",
    "penaltyFormula": "difficulty*3"
  }'
```
- `PUT /logic-tests/:id` – Reemplazar completamente una prueba lógica
  - **Body:**
    ```json
    {
      "title": "Sudoku Avanzado",
      "difficulty": 5,
      "timeLimit": 90,
      "baseRewardFormula": "difficulty*12",
      "penaltyFormula": "difficulty*3"
    }
    ```
  - **Response:** 200 OK
    ```json
    { ...prueba lógica actualizada... }
    ```

#### Actualizar un duelo (PUT)
```bash
curl -X PUT http://localhost:3000/duels/1 \
  -H "Content-Type: application/json" \
  -d '{
    "bot1Id": 1,
    "bot2Id": 2,
    "result": "draw",
    "xpBot1": 30,
    "xpBot2": 30,
    "batteryBot1": 80,
    "batteryBot2": 80,
    "performanceBot1": 150.5,
    "performanceBot2": 150.5
  }'
```
- `PUT /duels/:id` – Reemplazar completamente un duelo
  - **Body:**
    ```json
    {
      "bot1Id": 1,
      "bot2Id": 2,
      "result": "draw",
      "xpBot1": 30,
      "xpBot2": 30,
      "batteryBot1": 80,
      "batteryBot2": 80,
      "performanceBot1": 150.5,
      "performanceBot2": 150.5
    }
    ```
  - **Response:** 200 OK
    ```json
    { ...duelo actualizado... }
    ```

### Ejemplo de error
```json
{
  "error": "EntityNotFound: Robot no encontrado"
}
```

### Notas adicionales
- Todos los endpoints pueden devolver errores 400, 404 o 500 según el caso.
- Para actualizar o eliminar entidades, usar PATCH o DELETE según corresponda (si están implementados).

## Reglas y Validaciones
- Los valores de los atributos y las fórmulas siguen las consignas del parcial.
- El sistema valida rangos, penalizaciones, XP, batería y reglas de duelos.

## Manejo de Errores
- 404: Recurso no encontrado
- 400: Error de validación o datos fuera de rango
- 500: Error interno del servidor

## Notas
- Todos los cambios se reflejan en el archivo JSON.
- Los eventos relevantes (entrenamientos, intentos, duelos) quedan registrados para auditoría.
