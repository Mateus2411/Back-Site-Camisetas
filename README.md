# Back-Site-Camisetas

API REST para gerenciamento de camisetas personalizadas.

## Tecnologias

Node.js · Express · SQLite3

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/camisetas/create` | Criar camiseta |
| `GET` | `/camisetas/getall` | Listar todas |
| `POST` | `/camisetas/get` | Buscar por key |
| `PUT` | `/camisetas/update` | Atualizar camiseta |
| `DELETE` | `/camisetas/delete` | Deletar camiseta |

### Criar Camiseta

`POST /camisetas/create`

```json
{
  "namePerson": "João Silva",
  "nunShirt": 10
}
```

<details>
<summary>Resposta 201</summary>

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

</details>

### Listar Todas

`GET /camisetas/getall`

<details>
<summary>Resposta 200</summary>

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

</details>

### Buscar por Key

`POST /camisetas/get`

```json
{ "key": "uuid-v4" }
```

<details>
<summary>Resposta 200 / 404</summary>

```json
{ "shirt": { "id": 1, "nun_shirt": 10, "name_person": "João Silva", "key": "uuid-v4" } }
```

```json
{ "msg": "Camisa não encontrada" }
```

</details>

### Atualizar Camiseta

`PUT /camisetas/update`

```json
{
  "key": "uuid-v4",
  "namePerson": "Maria Santos",
  "nunShirt": 7
}
```

<details>
<summary>Resposta 200</summary>

```json
{ "msg": "Camisa atualizada com sucesso" }
```

</details>

### Deletar Camiseta

`DELETE /camisetas/delete`

```json
{ "key": "uuid-v4" }
```

<details>
<summary>Resposta 200</summary>

```json
{ "msg": "Camisa deletada com sucesso" }
```

</details>

## Como Rodar

```bash
npm install
npm start
```

Servidor roda em `http://localhost:3000`
