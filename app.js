import { ETAPAS, mover, previsao } from "./funil.js";

const CHAVE = "mini-crm";
const $ = (id) => document.getElementById(id);
let negocios = [];
try { negocios = JSON.parse(localStorage.getItem(CHAVE)) ?? []; } catch { negocios = []; }
const moeda = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(negocios)); } catch { /* segue só em memória */ }
  desenhar();
}

function desenhar() {
  $("previsao").textContent = moeda(previsao(negocios));
  $("quadro").replaceChildren(...ETAPAS.map((etapa, i) => {
    const col = document.createElement("section");
    col.className = "coluna";
    col.ondragover = (e) => e.preventDefault();
    col.ondrop = (e) => { negocios = mover(negocios, Number(e.dataTransfer.getData("id")), i); salvar(); };
    const h = document.createElement("h2");
    h.textContent = `${etapa.nome} (${Math.round(etapa.chance * 100)}%)`;
    col.append(h, ...negocios.filter((n) => n.etapa === i).map((n) => {
      const c = document.createElement("article");
      c.className = "cartao";
      c.draggable = true;
      c.ondragstart = (e) => e.dataTransfer.setData("id", n.id);
      const nome = document.createElement("strong");
      nome.textContent = n.nome;
      const valor = document.createElement("small");
      valor.textContent = moeda(n.valor);
      const avancar = document.createElement("button");
      avancar.textContent = "Avançar";
      avancar.onclick = () => { negocios = mover(negocios, n.id, i + 1); salvar(); };
      c.append(nome, valor, avancar);
      return c;
    }));
    return col;
  }));
}

$("novo").onsubmit = (e) => {
  e.preventDefault();
  negocios.push({ id: Date.now(), nome: $("nome").value.trim(), valor: Number($("valor").value), etapa: 0 });
  e.target.reset();
  salvar();
};
desenhar();
