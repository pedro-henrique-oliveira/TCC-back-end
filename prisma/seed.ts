import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";

async function main() {
  const employee = await prisma.funcionarios.create({
    data: {
      nome: "Funcionário",
      email: "funcionario@email.com",
      senha: bcrypt.hashSync("123456", +process.env.BCRYPT_ROUNDS!),
      clt: "1234",
      cpf: "12345678910",
      turno: "manha",
      cargo: "professor",
      adm: true,
    },
  });

  console.log("Funcionário criado:", employee);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });