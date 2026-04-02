# Back-Site-Camisetas

API REST para gerenciamento de camisetas personalizadas.

## Tecnologias

- Node.js
- Express
- SQLite3

## Endpoints

### Criar Camiseta

```http
POST /camisetas/create
Content-Type: application/json

{
  "namePerson": "João Silva",
  "nunShirt": 10
}
```

**Resposta (201):**

```json
{
  "shirt": {
    "id": 1,
    "nunshirt": 10,
    "nameperson": "João Silva",
    "key": "uuid-v4"
  }
}
```

---

### Listar Todas as Camisetas

```http
GET /camisetas/getall
```

**Resposta (200):**

```json
{
  "shirts": [
    {
      "id": 1,
      "nun_shirt": 10,
      "name_person": "João Silva",
      "key": "uuid-v4"
    }
  ]
}
```

---

### Buscar Camiseta por Key

```http
POST /camisetas/get
Content-Type: application/json

{
  "key": "uuid-v4"
}
```

**Resposta (200):**

```json
{
  "shirt": {
    "id": 1,
    "nun_shirt": 10,
    "name_person": "João Silva",
    "key": "uuid-v4"
  }
}
```

**Resposta (404):**

```json
{
  "msg": "Camisa não encontrada"
}
```

---

### Atualizar Camiseta

```http
PUT /camisetas/update
Content-Type: application/json

{
  "key": "uuid-v4",
  "namePerson": "Maria Santos",
  "nunShirt": 7
}
```

**Resposta (200):**

```json
{
  "msg": "Camisa atualizada com sucesso"
}
```

---

### Deletar Camiseta

```http
DELETE /camisetas/delete
Content-Type: application/json

{
  "key": "uuid-v4"
}
```

**Resposta (200):**

```json
{
  "msg": "Camisa deletada com sucesso"
}
```

---

## Como Rodar

```bash
npm install
npm start
```

O servidor rodará em `http://localhost:3000`
