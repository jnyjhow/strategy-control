#!/usr/bin/env node
/*
  scripts/populate_clients.js
  Uso: node scripts/populate_clients.js --count 50
  Pode usar BASE_URL=http://localhost:3333 para apontar outro backend
  Opcional: --clear ou -x para remover clientes existentes via API (GET /api/clients + DELETE /api/clients/:id)
*/
const http = require("http");
const https = require("https");
const { fork } = require("child_process");
const { URL } = require("url");

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { count: 10, baseUrl: null, concurrency: 1 };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--count" || a === "-c") {
      out.count = Number(args[i + 1]) || out.count;
      i++;
      continue;
    }
    if (a.startsWith("--count=")) {
      out.count = Number(a.split("=")[1]) || out.count;
      continue;
    }
    if (a === "--base-url" || a === "-b") {
      out.baseUrl = args[i + 1];
      i++;
      continue;
    }
    if (a.startsWith("--base-url=")) {
      out.baseUrl = a.split("=")[1];
      continue;
    }
    if (a === "--concurrency" || a === "-p") {
      out.concurrency = Number(args[i + 1]) || out.concurrency;
      i++;
      continue;
    }
    if (a.startsWith("--concurrency=")) {
      out.concurrency = Number(a.split("=")[1]) || out.concurrency;
      continue;
    }
    if (a === "--processes" || a === "-m") {
      out.processes = Number(args[i + 1]) || 1;
      i++;
      continue;
    }
    if (a.startsWith("--processes=")) {
      out.processes = Number(a.split("=")[1]) || 1;
      continue;
    }
    if (a === "--clear" || a === "-x") {
      out.clear = true;
      continue;
    }
  }
  return out;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  // maybe add middle name
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

const states = [
  "SP",
  "RJ",
  "MG",
  "BA",
  "RS",
  "PR",
  "SC",
  "CE",
  "PE",
  "GO",
  "ES",
  "MA",
  "PB",
  "PI",
  "RN",
  "AM",
  "PA",
  "AP",
  "AC",
  "RO",
  "RR",
  "TO",
];
const cities = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Salvador",
  "Porto Alegre",
  "Curitiba",
  "Florianópolis",
  "Fortaleza",
  "Recife",
  "Goiânia",
  "Vitória",
  "São Luís",
  "João Pessoa",
  "Teresina",
  "Natal",
  "Manaus",
  "Belém",
];

function randomZip() {
  return String(randInt(10000000, 99999999));
}

function randomStreet() {
  const streets = [
    "Rua das Flores",
    "Avenida Brasil",
    "Rua Principal",
    "Travessa do Sol",
    "Alameda Santos",
    "Praça da Sé",
    "Rua das Acácias",
    "Avenida Central",
  ];
  return streets[randInt(0, streets.length - 1)];
}

const companyNames = [
  "Tech Solutions Ltda",
  "Comercial Alfa S/A",
  "Distribuidora Beta Ltda",
  "Inova Serviços e Comércio",
  "Mercado Central SA",
];

// CNPJ generator (creates 14 digits with proper checksum-like digits)
function generateCnpj() {
  const n = [];
  for (let i = 0; i < 12; i++) n.push(randInt(0, 9));
  const calc = (slice) => {
    let pos = slice.length - 7;
    let sum = 0;
    for (let i = slice.length; i >= 1; i--) {
      sum += slice[slice.length - i] * pos--;
      if (pos < 2) pos = 9;
    }
    const res = sum % 11;
    return res < 2 ? 0 : 11 - res;
  };
  n.push(calc(n));
  n.push(calc(n));
  return n.join("");
}

// simple CPF generator (not guaranteed valid but has 11 digits). We'll also generate valid-like CPF using checksum
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

function makeClient() {
  const name = randomFullName();
  const email = randomEmail(name);
  // Alternate CPF or CNPJ
  const useCnpj = Math.random() < 0.2; // 20% empresas
  const cpf = useCnpj ? generateCnpj() : generateCpf();
  // build richer payload compatible with frontend `cliente` shape
  const cliente = {
    cpf_cnpj: cpf,
    renda: randInt(1000, 200000),
    profissao: ["Engenheiro", "Analista", "Gerente", "Médico", "Professor"][
      randInt(0, 4)
    ],
    birth: randomBirth(),
    name,
    avatar:
      "https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png",
    email,
  };

  const weLendItem = {
    status: "Ativo",
    valor: parseFloat((Math.random() * 20000).toFixed(2)),
    data_loan: randomBirth(),
    value_dividendo: parseFloat((Math.random() * 500).toFixed(2)),
    value_now_dividendo: parseFloat((Math.random() * 500).toFixed(2)),
    value_finish: parseFloat((Math.random() * 30000).toFixed(2)),
    value_before: parseFloat((Math.random() * 30000).toFixed(2)),
    number_parcelas: randInt(1, 48),
    date_payment: randomBirth(),
    contrato: `Contrato ${randInt(1, 10)}`,
    vigencia: randomBirth(),
    saldo: parseFloat((Math.random() * 20000).toFixed(2)),
  };

  const investment = {
    classification: ["A", "B", "C"][randInt(0, 2)],
    saldo: parseFloat((Math.random() * 500000).toFixed(2)),
    assessor: randInt(1, 10),
    data_dividendo: randomBirth(),
    valor_dividendo: parseFloat((Math.random() * 1000).toFixed(2)),
  };

  const bankRegister = [
    {
      chave_pix: String(randInt(100000000, 999999999)),
      cpf_cnpj: cpf,
      name: "Banco Exemplo",
      agency: String(randInt(100, 9999)),
      account: String(randInt(10000, 99999)),
      type: "Conta Corrente",
      status: "Ativo",
    },
  ];

  const bank = {
    institution: ["Banco do Brasil", "Caixa", "Bradesco", "Itaú", "Santander"][
      randInt(0, 4)
    ],
    agência: String(randInt(1000, 9999)),
    conta: String(randInt(100000, 999999)),
    tipo: "Conta Corrente",
    status: "Ativa",
  };

  const residential = {
    street: randomStreet(),
    number: String(randInt(1, 2000)),
    complement: Math.random() < 0.3 ? `Apto ${randInt(1, 300)}` : "",
    neighborhood: ["Centro", "Jardim América", "Boa Vista", "Nossa Senhora"][
      randInt(0, 3)
    ],
    city: cities[randInt(0, cities.length - 1)],
    state: states[randInt(0, states.length - 1)],
    zip: randomZip(),
  };

  const payload = {
    id: null,
    newWeLend: {},
    level: ["A", "B", "C"][randInt(0, 2)],
    weLend: [weLendItem],
    investment,
    bank,
    residential,
    bankRegister,
    cliente,
    assessor: ["Joe Doe", "Maria Silva", "Assessor X"][randInt(0, 2)],
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

  return payload;
}

function requestJson(url, method, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const isHttps = u.protocol === "https:";
    const lib = isHttps ? https : http;
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: u.hostname,
      port: u.port || (isHttps ? 443 : 80),
      path: u.pathname + (u.search || ""),
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data ? Buffer.byteLength(data) : 0,
      },
    };
    const req = lib.request(opts, (res) => {
      let raw = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        try {
          const parsed = raw ? JSON.parse(raw) : null;
          if (res.statusCode >= 200 && res.statusCode < 300)
            return resolve(parsed);
          const e = new Error("Request failed");
          e.status = res.statusCode;
          e.body = parsed;
          return reject(e);
        } catch (err) {
          return reject(err);
        }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function clearViaApi(base) {
  const apiBase = base.replace(/\/$/, "") + "/api/clients";
  // fetch list
  const list = await requestJson(apiBase, "GET");
  if (!Array.isArray(list) || list.length === 0) return { deleted: 0 };
  let deleted = 0;
  for (const item of list) {
    const id = item && (item.id || (item.cliente && item.cliente.id));
    if (!id) continue;
    try {
      await requestJson(apiBase + "/" + id, "DELETE");
      deleted++;
    } catch (err) {
      // Log and continue
      console.warn(
        "Failed to delete id",
        id,
        err && err.message ? err.message : err
      );
    }
  }
  return { deleted };
}

async function main() {
  const args = parseArgs();
  const count = args.count;
  const concurrency =
    args.concurrency || args.concurrency === 0 ? args.concurrency : 1;
  const base = process.env.BASE_URL || "http://localhost:3333";
  const url = `${base.replace(/\/$/, "")}/api/clients`;
  const shouldClear = !!args.clear;

  // multiprocess support: if processes > 1 and this is not a child, spawn children
  const processes = args.processes || 1;
  const isChild = process.env.CHILD_POPULATE === "1";
  if (shouldClear && !isChild) {
    try {
      const res = await clearViaApi(base);
      console.log(`Cleared ${res.deleted || 0} clients via API`);
    } catch (err) {
      console.warn(
        "Warning: failed to clear via API:",
        err && err.message ? err.message : err
      );
    }
  }
  if (processes > 1 && !isChild) {
    console.log(
      `Spawning ${processes} worker processes to insert ${count} clients`
    );
    const per = Math.floor(count / processes);
    const extras = count % processes;
    const forks = [];
    for (let i = 0; i < processes; i++) {
      const myCount = per + (i < extras ? 1 : 0);
      const childArgs = [];
      childArgs.push("--count", String(myCount));
      childArgs.push("--concurrency", String(concurrency));
      if (args.baseUrl) childArgs.push("--base-url", args.baseUrl);
      const env = Object.assign({}, process.env, {
        CHILD_POPULATE: "1",
        CHILD_INDEX: String(i),
      });
      const child = fork(__filename, childArgs, { env, stdio: "inherit" });
      forks.push(child);
    }
    // wait for all children
    await Promise.all(
      forks.map((ch) => new Promise((resolve) => ch.on("exit", resolve)))
    );
    console.log("All worker processes finished");
    return;
  }

  console.log(`Populating ${count} clients to ${url}`);
  // support concurrency (parallel requests)
  const q = [];
  let created = 0;
  const limit = Math.max(1, Number(concurrency));

  async function worker(taskIndex) {
    const client = makeClient();
    try {
      await requestJson(url, "POST", client);
      created++;
      process.stdout.write(`. (${created}/${count})`);
    } catch (err) {
      console.error(
        "\nError creating client",
        err && err.status,
        err && err.body ? err.body : err.message
      );
      if (err && err.status === 400) {
        console.error("Payload that failed:", client);
        throw err;
      }
    }
  }

  // dispatch tasks with concurrency limit
  let idx = 0;
  const runners = [];
  for (let i = 0; i < limit && i < count; i++) {
    runners.push(
      (async function run() {
        while (idx < count) {
          const my = idx++;
          await worker(my);
        }
      })()
    );
  }
  await Promise.all(runners);
  console.log(`\nDone. Created ${created} clients.`);
}

if (require.main === module)
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
