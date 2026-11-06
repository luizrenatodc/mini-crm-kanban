// Regras do funil: sem DOM, para testar sem navegador.
export const ETAPAS = [
  { nome: "Prospecção", chance: 0.1 },
  { nome: "Proposta", chance: 0.4 },
  { nome: "Negociação", chance: 0.7 },
  { nome: "Ganho", chance: 1 },
];

export const previsao = (negocios) =>
  negocios.reduce((soma, n) => soma + n.valor * ETAPAS[n.etapa].chance, 0);

export function mover(negocios, id, etapa) {
  if (etapa < 0 || etapa >= ETAPAS.length) return negocios;
  return negocios.map((n) => (n.id === id ? { ...n, etapa } : n));
}
