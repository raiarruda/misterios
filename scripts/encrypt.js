import CryptoJS from "crypto-js";

const segredo = "amor2026";

const dados = {
  RIO07: {
    codigo: "RIO07",
    titulo: "Fim de Semana em Rio de Contas",
    frase: "Malas prontas para o frio e o charme das montanhas ⛰️🚙",
    descricao:
      "Viajar para Rio de Contas, caminhar pelas ruas históricas e aproveitar o clima frio da montanha.",
  },
};

const resultado = {};

for (const [codigo, valor] of Object.entries(dados)) {
  resultado[codigo] = CryptoJS.AES.encrypt(
    JSON.stringify(valor),
    segredo,
  ).toString();
}

console.log(JSON.stringify(resultado, null, 2));
