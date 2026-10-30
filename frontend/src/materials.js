export const initialMaterials = [
  {
    id: "1",
    name: "Travertino",
    type: "Mármore",
    cost: 170,
    price: 550,
    description: "Tons naturais e textura atemporal.",
    color: "travertino",
  },
  {
    id: "2",
    name: "Branco Rajado",
    type: "Mármore",
    cost: 170,
    price: 525,
    description: "Base branca com veios delicados.",
    color: "branco",
  },
  {
    id: "3",
    name: "Ocre",
    type: "Granito",
    cost: 90,
    price: 260,
    description: "",
    color: "ocre",
  },
  {
    id: "4",
    name: "Verde pérola",
    type: "Granito",
    cost: 120,
    price: 350,
    description: "",
    color: "verde",
  },
  {
    id: "5",
    name: "Sky White",
    type: "Quartzo",
    cost: 500,
    price: 1000,
    description: "",
    color: "sky",
  },
  {
    id: "6",
    name: "Calacata Golden",
    type: "Lâmina",
    cost: 800,
    price: 1600,
    description: "",
    color: "golden",
  },
];
export const storageKey = "marmo-facil:materials:v1";
export const currency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export const types = ["Mármore", "Granito", "Quartzo", "Lâmina"];
export function readMaterials() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(data) &&
      data.every(
        (m) =>
          m &&
          typeof m.id === "string" &&
          typeof m.name === "string" &&
          types.includes(m.type) &&
          Number.isFinite(m.cost) &&
          Number.isFinite(m.price),
      )
      ? data
      : initialMaterials;
  } catch {
    return initialMaterials;
  }
}
