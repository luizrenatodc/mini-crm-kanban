import test from "node:test";
import assert from "node:assert/strict";
import { mover, previsao } from "./funil.js";

const n = [{ id: 1, valor: 1000, etapa: 1 }, { id: 2, valor: 500, etapa: 3 }];

test("previsão pondera pela chance da etapa", () => assert.equal(previsao(n), 900));
test("mover não altera o original", () => {
  assert.equal(mover(n, 1, 2)[0].etapa, 2);
  assert.equal(n[0].etapa, 1);
});
test("ignora etapa fora do funil", () => assert.equal(mover(n, 1, 9), n));
