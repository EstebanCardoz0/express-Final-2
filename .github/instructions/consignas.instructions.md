---
applyTo: '**'
---

Parcial – Liga de Autómatas Estratégicos
Parcial – API en Node.js con Express y JSON
Problema: “La Liga de Autómatas Estratégicos”
Tu tarea es desarrollar una API para administrar una liga de autómatas que participan en entrenamientos, pruebas lógicas y duelos.
Toda la información se almacena en un archivo JSON. No se permite usar bases de datos reales.
1. Contexto General
La API debe permitir:
1. Administrar autómatas (bots).
2. Administrar circuitos de entrenamiento.
3. Administrar pruebas lógicas.
4. Ejecutar entrenamientos y actualizar estadísticas según reglas matemáticas.
5. Ejecutar duelos entre autómatas.
6. Registrar todos los eventos relevantes.
Archivo inicial league.json:
{
"bots": [],
"tracks": [],
"logicTests": [],
"trainings": [],
"duels": []
}
2. Reglas del Sistema
2.1 Autómatas (bots)
Cada bot posee:
• id
• name
• generation
• processing (10 a 200)
• memory (10 a 200)
• battery (0–100, inicia en 100)
• load (inicia en 0)
• xp (inicia en 0)
• rank (inicia en 1)
• modules (array de objetos { name, weight, bonusType })
Restricción: La suma de los weight no puede superar 100.
Índice de capacidad básica:
baseCapacity = processing * 0.6 + memory * 0.4
2.2 Fórmula de rango (rank)
xpNecesaria = 50 + (rank^2 * 10)
Mientras xp >= xpNecesaria:
• rank++
• xp = xp - xpNecesaria
• recalcular xpNecesaria
2.3 Circuitos de entrenamiento (tracks)
Cada circuito posee: id, name, complexity (1–10), length, energyCostBase, processingDemand.
Fórmula de entrenamiento

1) Costo de energía:
energyCost = energyCostBase + (complexity * 2) + floor(length / 50)
Si el processing es insuficiente:
extraPenalty = (processingDemand - processing) / 5
energyCost += extraPenalty
2) XP base:
xpBase = complexity * 10 + floor(length / 20)
Si processing y memory >= processingDemand:
xpFinal = floor(xpBase * 1.2)
Si no, xpFinal = xpBase.
Si el bot no tiene energía suficiente, no puede entrenar.
2.4 Pruebas lógicas (logicTests)
Cada prueba tiene: id, title, difficulty, timeLimit, baseRewardFormula, penaltyFormula. Las fórmulas deben evaluarse sin usar eval.
3. Intento de prueba lógica
Request:
{
"botId": 1,
"logicTestId": 3,
"timeUsed": 40
}
Reglas
1. Validar timeUsed <= timeLimit.
2. xpBase = evaluar baseRewardFormula.
Multiplicador según ratio
ratio = timeUsed / timeLimit
ratio <= 0.5 → 1.5
0.5 < ratio <= 0.8 → 1.2
0.8 < ratio <= 1 → 1.0
xpFinal = floor(xpBase * multiplicador)
Penalización
penaltyBase = evaluar penaltyFormula
Si ratio > 0.8:
extraPenalty = difficulty * 2
penaltyTotal = penaltyBase + extraPenalty
Sino:
penaltyTotal = penaltyBase
Fallo si:
• battery < penaltyTotal
• memory < difficulty * 10
En fallo: batería baja, no XP, registrar "failed". En éxito: aplicar penalización, sumar XP, evaluar rank, registrar "success".
4. Sistema de Duelos
4.1 Índice de rendimiento
1. Módulos:
modulesPower = sum(weight bonusType="attack")
+ 2 * sum(weight bonusType="logic")
2. Estabilidad:


stability = 100 - abs(processing - memory) / 2
3. Rendimiento total:
performance = baseCapacity
+ (rank * 10)
+ (battery * 0.5)
+ (xp / 10)
+ modulesPower
+ (stability / 5)
4.2 Resultado del duelo
• Ambos bots pierden 5 batería antes del duelo.
• Si alguno queda con batería < 10: duelo no permitido.
• Comparar performance.
Reglas de XP
Empate (|diff| < 5):
• Ambos ganan 10 XP.
Si hay ganador:
diff < 15 → 30 XP
15 <= diff < 40 → 60 XP
40 <= diff < 80 → 90 XP
diff >= 80 → 130 XP
El perdedor gana 10 XP. Registrar el duelo.
5. Consignas de Implementación
Requisitos
• Express
• fs.promises
• Middleware de logging
• Manejo global de errores
• Arquitectura por capas: routes, services, repositories, utils
Prohibido: eval, duplicar lógica, console.log.
6. Endpoints obligatorios
Bots
• POST /bots
• GET /bots
• PATCH /bots/:id/modules
Tracks
• POST /tracks
• POST /tracks/:trackId/train/:botId
Logic Tests
• POST /logic-tests
• POST /logic-tests/:logicTestId/attempt
Duels
• POST /duels
• GET /duels
1. GET — Obtener datos
No requiere body, pero sí headers opcionales.
Ejemplo básico

curl -X GET "https://api.ejemplo.com/usuarios"
Con headers (Authorization + JSON)
curl -X GET "https://api.ejemplo.com/usuarios" \ -H "Accept: application/json" \ -H "Authorization: Bearer
TU_TOKEN"
GET con query params
curl -G "https://api.ejemplo.com/usuarios" \ -d "page=1" \ -d "limit=20"
2. POST — Enviar datos JSON
POST con JSON
curl -X POST "https://api.ejemplo.com/usuarios" \ -H "Content-Type: application/json" \ -d '{"nombre":
"Emilio", "email": "emilio@example.com"}'
POST con token
curl -X POST "https://api.ejemplo.com/usuarios" \ -H "Authorization: Bearer TU_TOKEN" \ -H "Content-Type:
application/json" \ -d '{"nombre": "Juan", "rol": "admin"}'
3. PUT — Reemplaza un recurso entero
curl -X PUT "https://api.ejemplo.com/usuarios/123" \ -H "Content-Type: application/json" \ -d '{"nombre":
"Juan actualizado", "email": "nuevo@example.com"}'
4. PATCH — Actualización parcial
curl -X PATCH "https://api.ejemplo.com/usuarios/123" \ -H "Content-Type: application/json" \ -d '{"email":
"update@example.com"}'
5. DELETE — Borrar un recurso
curl -X DELETE "https://api.ejemplo.com/usuarios/123"
DELETE con Authorization
curl -X DELETE "https://api.ejemplo.com/usuarios/123" \ -H "Authorization: Bearer TU_TOKEN"
6. Enviar JSON desde archivo

EN todo momento, no dar soluciones por adelantado. este es un proyecto educativo, por lo que es mas fructifero invitar a razonar al usuario que pregunta en lugar de darle todo masticado. explicando los por qué y utilidades

cuando se hagan preguntas de razonamiento, que se hagan de a una a la vez. no es posible centrarse en un solo problema si tienes 3 en la gatera.