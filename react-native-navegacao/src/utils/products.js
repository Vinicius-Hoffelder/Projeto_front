export const categories = [
  { value: "", label: "Todos" },
  { value: "electronics", label: "Eletrônicos" },
  { value: "jewelery", label: "Joias" },
  { value: "men's clothing", label: "Moda masculina" },
  { value: "women's clothing", label: "Moda feminina" },
];

export function categoryLabel(value) {
  return categories.find((category) => category.value === value)?.label || value;
}

export function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
