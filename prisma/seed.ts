import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";

async function main() {
  console.log("Iniciando seed do banco de dados GymFlow...");

  const senhaPadrao = await bcrypt.hash("123456", 10);

  // 1. Criar Administrador
  const admin = await prisma.funcionarios.upsert({
    where: { id: 1 },
    update: {
      email: "admin@gymflow.com",
      senha: senhaPadrao,
      adm: true,
    },
    create: {
      nome: "Pedro Henrique (Admin)",
      email: "admin@gymflow.com",
      senha: senhaPadrao,
      adm: true,
      cpf: "000.111.222-33",
      clt: "99887766",
      turno: "INTEGRAL",
      cargo: "Administrador Geral",
    },
  });

  // 2. Criar Funcionário / Personal Trainer
  const personal = await prisma.funcionarios.upsert({
    where: { id: 2 },
    update: {
      email: "carlos@gymflow.com",
      senha: senhaPadrao,
      adm: false,
    },
    create: {
      nome: "Carlos Eduardo (Instrutor)",
      email: "carlos@gymflow.com",
      senha: senhaPadrao,
      adm: false,
      cpf: "111.222.333-44",
      clt: "11223344",
      turno: "TARDE",
      cargo: "Personal Trainer",
    },
  });

  // 3. Criar Alunos
  const aluno1 = await prisma.alunos.upsert({
    where: { id: 1 },
    update: {
      email: "joao@email.com",
      senha: senhaPadrao,
    },
    create: {
      nome: "João Silva",
      email: "joao@email.com",
      cpf: "222.333.444-55",
      senha: senhaPadrao,
      plano: "Plano Anual VIP",
      funcionarioId: personal.id,
    },
  });

  const aluno2 = await prisma.alunos.upsert({
    where: { id: 2 },
    update: {
      email: "maria@email.com",
      senha: senhaPadrao,
    },
    create: {
      nome: "Maria Oliveira",
      email: "maria@email.com",
      cpf: "333.444.555-66",
      senha: senhaPadrao,
      plano: "Plano Mensal",
      funcionarioId: personal.id,
    },
  });

  // 4. Criar Treinos
  await prisma.treino.createMany({
    data: [
      {
        nome: "Treino A - Peito e Tríceps",
        descricao:
          "Supino reto 4x10, Supino inclinado 3x12, Tríceps corda 4x12",
        dificuldade: "INTERMEDIARIO",
        duracao: 50,
        tipoTreino: "HIPERTROFIA",
        alunoId: aluno1.id,
      },
      {
        nome: "Treino B - Costas e Bíceps",
        descricao: "Puxada alta 4x10, Remada curvada 3x12, Rosca direta 4x10",
        dificuldade: "AVANCADO",
        duracao: 60,
        tipoTreino: "HIPERTROFIA",
        alunoId: aluno2.id,
      },
    ],
  });

  // 5. Criar Despesas (Contas da Academia)
  await prisma.despesa.createMany({
    data: [
      {
        descricao: "Conta de Energia Elétrica (Luz)",
        valor: 850.0,
        categoria: "LUZ",
        dataVencimento: new Date("2026-08-15"),
        dataPagamento: new Date("2026-08-10"),
        status: "PAGO",
      },
      {
        descricao: "Conta de Água e Esgoto",
        valor: 320.0,
        categoria: "AGUA",
        dataVencimento: new Date("2026-08-20"),
        dataPagamento: new Date("2026-08-10"),
        status: "PAGO",
      },
      {
        descricao: "Internet Fibra Dedicada 500MB",
        valor: 199.9,
        categoria: "INTERNET",
        dataVencimento: new Date("2026-08-05"),
        dataPagamento: new Date("2026-08-05"),
        status: "PAGO",
      },
      {
        descricao: "Manutenção Preventiva de Esteiras",
        valor: 450.0,
        categoria: "MANUTENCAO",
        dataVencimento: new Date("2026-08-28"),
        dataPagamento: null,
        status: "PENDENTE",
      },
    ],
  });

  // 6. Criar Receitas
  await prisma.receita.createMany({
    data: [
      {
        pagamento: "Mensalidades dos Alunos",
        dataPagamento: new Date("2026-08-01"),
        valorPagamento: "3500.00",
        status: "PAGO",
        formaPagamento: "PIX / CARTAO",
      },
      {
        pagamento: "Venda de Suplementos e Água",
        dataPagamento: new Date("2026-08-08"),
        valorPagamento: "750.00",
        status: "PAGO",
        formaPagamento: "DINHEIRO",
      },
    ],
  });

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
