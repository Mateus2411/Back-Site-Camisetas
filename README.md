# Back-Site-Camisetas

API REST para gerenciamento de camisetas personalizadas.

## Tecnologias

Node.js · Express · SQLite3

## Como Rodar

```bash
npm install
npm start
```

Servidor roda em `http://localhost:3000`

---

## Endpoints

### `POST /camisetas/create` — Criar camiseta

**Request:**

```json
{
  "namePerson": "João Silva",
  "nunShirt": 10
}
```

**Response 201:**

```json
{
  "shirt": {
    "id": 1,
    "nunshirt": 10,
    "nameperson": "João Silva",
    "key": "uuid-v4"
  },
  "key": "uuid-v4"
}
```

> A `key` é um UUID v4 gerado automaticamente com `crypto.randomUUID()`. Ela é enviada tanto dentro do objeto `shirt` quanto no campo `key` na raiz da resposta.

---

### `GET /camisetas/getall` — Listar todas as camisetas

**Response 200:**

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

### `POST /camisetas/get` — Buscar camiseta por key

**Request:**

```json
{
  "key": "uuid-v4"
}
```

**Response 200:**

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

**Response 404:**

```json
{
  "msg": "Camisa não encontrada"
}
```

---

### `PUT /camisetas/update` — Atualizar camiseta

**Request:**

```json
{
  "key": "uuid-v4",
  "namePerson": "Maria Santos",
  "nunShirt": 7
}
```

**Response 200:**

```json
{
  "msg": "Camisa atualizada com sucesso"
}
```

**Response 404:**

```json
{
  "msg": "Camisa não encontrada"
}
```

**Response 400:**

```json
{
  "msg": "Numero de camisa ja em utilização"
}
```

---

### `DELETE /camisetas/delete` — Deletar camiseta

**Request:**

```json
{
  "key": "uuid-v4"
}
```

**Response 200:**

```json
{
  "msg": "Camisa deletada com sucesso"
}
```

**Response 404:**

```json
{
  "msg": "Camisa não encontrada"
}
```

---

## Resumo

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/camisetas/create` | Cria camiseta e retorna a `key` gerada |
| `GET` | `/camisetas/getall` | Lista todas as camisetas |
| `POST` | `/camisetas/get` | Busca uma camiseta pela `key` |
| `PUT` | `/camisetas/update` | Atualiza dados da camiseta |
| `DELETE` | `/camisetas/delete` | Remove uma camiseta |
