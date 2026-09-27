import assert from "node:assert/strict";
import { test } from "node:test";
import { api, authenticate, getProduct, getProducts, errorMessage } from "../src/services/api.js";
import { formatPrice } from "../src/utils/products.js";

const product = { id: 1, title: "Mochila", price: 109.95, image: "https://example.com/bag.png", category: "men's clothing", description: "Descrição original" };

function mock(handler) {
  api.defaults.adapter = async (config) => ({ data: handler(config), status: 200, statusText: "OK", headers: {}, config });
}

test("login consulta usuários antes de solicitar um token", async () => {
  const calls = [];
  mock((config) => {
    calls.push(config.url);
    if (config.url === "/users") return [{ username: "user", password: "secret" }];
    assert.deepEqual(JSON.parse(config.data), { username: "user", password: "secret" });
    return { token: "valid-token" };
  });
  assert.deepEqual(await authenticate(" user ", "secret"), { token: "valid-token", username: "user" });
  assert.deepEqual(calls, ["/users", "/auth/login"]);
});

test("credenciais inválidas não enviam pedido de autenticação", async () => {
  const calls = [];
  mock((config) => { calls.push(config.url); return [{ username: "user", password: "secret" }]; });
  await assert.rejects(authenticate("user", "wrong"), /inválidos/);
  assert.deepEqual(calls, ["/users"]);
  await assert.rejects(authenticate("", "secret"), /Informe/);
});

test("login não aceita resposta sem token", async () => {
  mock((config) => config.url === "/users" ? [{ username: "user", password: "secret" }] : {});
  await assert.rejects(authenticate("user", "secret"), /confirmar/);
});

test("filtro consulta categoria e limpar retorna ao catálogo completo", async () => {
  const calls = [];
  mock((config) => { calls.push(config.url); return [product]; });
  assert.deepEqual(await getProducts(), [product]);
  await getProducts("men's clothing");
  await getProducts("");
  assert.deepEqual(calls, ["/products", "/products/category/men's%20clothing", "/products"]);
});

test("detalhes preservam imagem, descrição e preço reais", async () => {
  mock((config) => { assert.equal(config.url, "/products/1"); return product; });
  assert.deepEqual(await getProduct(1), product);
  assert.equal(formatPrice(product.price).replace(/\s/g, " "), "R$ 109,95");
});

test("respostas inválidas e produto ausente geram erros tratáveis", async () => {
  mock(() => null);
  await assert.rejects(getProducts(), /lista inválida/);
  await assert.rejects(getProduct(1), /não encontrado/);
  await assert.rejects(getProduct("invalid"), /não encontrado/);
});

test("rede indisponível e timeout têm mensagens úteis", () => {
  assert.match(errorMessage({ isAxiosError: true, code: "ERR_NETWORK" }), /internet/);
  assert.match(errorMessage({ isAxiosError: true, code: "ECONNABORTED" }), /demorou/);
});

test("requisições canceladas não retornam dados", async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(getProducts("", controller.signal), (error) => error.code === "ERR_CANCELED");
});
