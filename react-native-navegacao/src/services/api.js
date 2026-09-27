import { create, isAxiosError } from "axios";

export const api = create({ baseURL: "https://fakestoreapi.com", timeout: 15000 });

export async function authenticate(username, password, signal) {
  const name = username.trim();
  if (!name || !password.trim()) throw new Error("Informe usuário e senha.");
  const { data: users } = await api.get("/users", { signal });
  if (!Array.isArray(users)) throw new Error("A lista de usuários está indisponível. Tente novamente.");
  const user = users.find((item) => item.username === name && item.password === password);
  if (!user) throw new Error("Usuário ou senha inválidos.");
  const { data } = await api.post("/auth/login", { username: name, password }, { signal });
  if (typeof data?.token !== "string" || !data.token.trim()) throw new Error("Não foi possível confirmar o login.");
  return { token: data.token, username: user.username };
}

export async function getProducts(category = "", signal) {
  const path = category ? `/products/category/${encodeURIComponent(category)}` : "/products";
  const { data } = await api.get(path, { signal });
  if (!Array.isArray(data) || !data.every(validProduct)) throw new Error("A API retornou uma lista inválida.");
  return data;
}

export async function getProduct(id, signal) {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) throw new Error("Produto não encontrado.");
  const { data } = await api.get(`/products/${id}`, { signal });
  if (!validProduct(data)) throw new Error("Produto não encontrado.");
  return data;
}

function validProduct(value) {
  return value && Number.isInteger(value.id) && typeof value.title === "string" && typeof value.image === "string" && typeof value.category === "string" && typeof value.description === "string" && typeof value.price === "number" && Number.isFinite(value.price);
}

export function errorMessage(error) {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) return "Usuário ou senha inválidos.";
    if (error.code === "ECONNABORTED") return "A conexão demorou demais. Tente novamente.";
    if (!error.response) return "Não foi possível conectar. Verifique sua internet e tente novamente.";
    return "O serviço está indisponível no momento. Tente novamente.";
  }
  return error instanceof Error ? error.message : "Não foi possível carregar os dados.";
}
