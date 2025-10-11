// Shared helpers for populate scripts
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const firstNames = [
  "Ana",
  "Bruno",
  "Carlos",
  "Daniela",
  "Eduardo",
  "Felipe",
  "Gabriela",
  "Helena",
  "Igor",
  "Julia",
  "Karla",
  "Lucas",
  "Mariana",
  "Nicolas",
  "Olivia",
  "Paulo",
  "Quenia",
  "Rafael",
  "Sofia",
  "Thiago",
];
const lastNames = [
  "Alves",
  "Barbosa",
  "Cardoso",
  "Dias",
  "Esteves",
  "Fernandes",
  "Gomes",
  "Henrique",
  "Ibrahim",
  "Jardim",
  "Klein",
  "Lima",
  "Melo",
  "Nascimento",
  "Oliveira",
  "Pereira",
  "Queiroz",
  "Ribeiro",
  "Silva",
  "Teixeira",
];

function randomFullName() {
  const fn = firstNames[randInt(0, firstNames.length - 1)];
  const ln = lastNames[randInt(0, lastNames.length - 1)];
  if (Math.random() < 0.4) {
    const mn = lastNames[randInt(0, lastNames.length - 1)];
    return `${fn} ${mn} ${ln}`;
  }
  return `${fn} ${ln}`;
}

function randomEmail(name) {
  const clean = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".");
  const domain = ["example.com", "mail.com", "test.com", "demo.org"][
    randInt(0, 3)
  ];
  return `${clean}${randInt(1, 99)}@${domain}`;
}

function randomBirth() {
  const year = randInt(1950, 2005);
  const month = String(randInt(1, 12)).padStart(2, "0");
  const day = String(randInt(1, 28)).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function generateCpf() {
  const n = [];
  for (let i = 0; i < 9; i++) n.push(randInt(0, 9));
  const calc = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i] * (arr.length + 1 - i);
    let r = 11 - (sum % 11);
    if (r === 10 || r === 11) r = 0;
    return r;
  };
  n.push(calc(n));
  n.push(calc(n));
  return n.join("");
}

function generateRg() {
  // simple RG generator: 9 digits, optionally formatted as XX.XXX.XXX-X
  const n = [];
  for (let i = 0; i < 9; i++) n.push(randInt(0, 9));
  return n.join("");
}

function randomRG(formatted = false) {
  const raw = generateRg();
  if (!formatted) return raw;
  return `${raw.substring(0, 2)}.${raw.substring(2, 5)}.${raw.substring(
    5,
    8
  )}-${raw.substring(8, 9)}`;
}

function generatePhoneNumber() {
  // DDD: two digits (11-99), phone: 9 + 8 digits => total 11 digits including DDD
  const ddd = String(randInt(11, 99)).padStart(2, "0");
  let rest = "";
  for (let i = 0; i < 8; i++) rest += String(randInt(0, 9));
  return `${ddd}9${rest}`;
}

function randomCellPhone(formatted = false) {
  const raw = generatePhoneNumber();
  if (!formatted) return raw;
  // format as (DD) 9XXXX-XXXX
  return `(${raw.substring(0, 2)}) ${raw.substring(2, 3)}${raw.substring(
    3,
    7
  )}-${raw.substring(7)}`;
}

function randomCPF(formatted = false) {
  const raw = generateCpf();
  if (!formatted) return raw;
  return `${raw.substring(0, 3)}.${raw.substring(3, 6)}.${raw.substring(
    6,
    9
  )}-${raw.substring(9, 11)}`;
}

function makeClientSample(avatarMode = "random") {
  const name = randomFullName();
  const email = randomEmail(name);
  const cpf = generateCpf();
  const cliente = {
    cpf_cnpj: cpf,
    rg: randomRG(),
    telefone: randomCellPhone(),
    renda: randInt(1000, 200000),
    profissao: ["Engenheiro", "Analista", "Gerente", "Médico", "Professor"][
      randInt(0, 4)
    ],
    birth: randomBirth(),
    name,
    avatar:
      avatarMode === "empty"
        ? ""
        : "https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png",
    email,
  };
  const investment = {
    classification: [
      "Ações",
      "Renda Fixa",
      "Fundos Imobiliários",
      "Criptomoedas",
    ][randInt(0, 3)],
    saldo: parseFloat((Math.random() * 500000).toFixed(2)),
    assessor: null,
    data_dividendo: randomBirth(),
    valor_dividendo: parseFloat((Math.random() * 1000).toFixed(2)),
  };
  return {
    id: null,
    newWeLend: {},
    level: ["A", "B", "C"][randInt(0, 2)],
    weLend: [],
    investment,
    bank: {},
    residential: {},
    bankRegister: [],
    cliente,
    assessor: null,
    saldo: parseFloat((Math.random() * 500000).toFixed(2)),
    contrato: {
      total: parseFloat((Math.random() * 50000).toFixed(2)),
      quantity: `${randInt(0, 5)} contratos`,
    },
    dividendo: {
      total: parseFloat((Math.random() * 1000).toFixed(2)),
      data: randomBirth(),
    },
    emprestimo: "Status",
  };
}

module.exports = {
  makeClientSample,
  randomFullName,
  randomEmail,
  randomCPF,
  randomRG,
};
