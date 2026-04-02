const http = require("http");

const BASE = "http://localhost:3000";

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "localhost",
      port: 3000,
      path,
      method,
      headers: { "Content-Type": "application/json" },
    };

    const req = http.request(options, (res) => {
      let chunks = "";
      res.on("data", (c) => (chunks += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(chunks) });
        } catch {
          resolve({ status: res.statusCode, body: chunks });
        }
      });
    });

    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  let key = "";
  let createdId = "";

  console.log("=== 1. POST - Criar camisa ===");
  const res1 = await request("POST", "/camisetas", { namePerson: "Mateus", nunShirt: 10 });
  console.log("Status:", res1.status, "| Body:", JSON.stringify(res1.body));
  key = res1.body.shirt?.key;
  createdId = res1.body.shirt?.id;

  console.log("\n=== 2. POST - Duplicata (deve falhar 400) ===");
  const res2 = await request("POST", "/camisetas", { namePerson: "Joao", nunShirt: 10 });
  console.log("Status:", res2.status, "| Body:", JSON.stringify(res2.body));

  console.log("\n=== 3. POST - Criar segunda camisa ===");
  const res3 = await request("POST", "/camisetas", { namePerson: "Carlos", nunShirt: 7 });
  console.log("Status:", res3.status, "| Body:", JSON.stringify(res3.body));

  console.log("\n=== 4. GET - Todas camisas ===");
  const res4 = await request("GET", "/camisetas");
  console.log("Status:", res4.status, "| Body:", JSON.stringify(res4.body));

  console.log("\n=== 5. GET - Camisa por key ===");
  const res5 = await request("GET", `/camisetas/${key}`);
  console.log("Status:", res5.status, "| Body:", JSON.stringify(res5.body));

  console.log("\n=== 6. GET - Key inexistente (deve falhar 404) ===");
  const res6 = await request("GET", "/camisetas/key-inexistente");
  console.log("Status:", res6.status, "| Body:", JSON.stringify(res6.body));

  console.log("\n=== 7. PUT - Atualizar camisa ===");
  const res7 = await request("PUT", `/camisetas/${key}`, { namePerson: "Mateus Silva", nunShirt: 11 });
  console.log("Status:", res7.status, "| Body:", JSON.stringify(res7.body));

  console.log("\n=== 8. GET - Verificar atualizacao ===");
  const res8 = await request("GET", `/camisetas/${key}`);
  console.log("Status:", res8.status, "| Body:", JSON.stringify(res8.body));

  console.log("\n=== 9. PUT - Numero duplicado (deve falhar 400) ===");
  const res9 = await request("PUT", `/camisetas/${key}`, { nunShirt: 7 });
  console.log("Status:", res9.status, "| Body:", JSON.stringify(res9.body));

  console.log("\n=== 10. DELETE - Deletar camisa ===");
  const res10 = await request("DELETE", `/camisetas/${createdId}`);
  console.log("Status:", res10.status, "| Body:", JSON.stringify(res10.body));

  console.log("\n=== 11. DELETE - ID inexistente (deve falhar 404) ===");
  const res11 = await request("DELETE", "/camisetas/9999");
  console.log("Status:", res11.status, "| Body:", JSON.stringify(res11.body));

  console.log("\n=== 12. GET - Confirmar delecao ===");
  const res12 = await request("GET", "/camisetas");
  console.log("Status:", res12.status, "| Body:", JSON.stringify(res12.body));

  console.log("\n=== TODOS TESTES FINALIZADOS ===");
}

runTests().catch(console.error);
