-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'LOJA', 'SETOR');

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "lojaId" INTEGER,
    "setorId" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("idLoja") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("idSetor") ON DELETE SET NULL ON UPDATE CASCADE;
