-- CreateTable
CREATE TABLE "Setor" (
    "idSetor" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("idSetor")
);

-- CreateTable
CREATE TABLE "Loja" (
    "idLoja" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("idLoja")
);

-- CreateTable
CREATE TABLE "Token" (
    "idToken" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("idToken")
);

-- CreateTable
CREATE TABLE "Chamado" (
    "idChamado" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataConclusao" TIMESTAMP(3) NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "Chamado_pkey" PRIMARY KEY ("idChamado")
);

-- CreateTable
CREATE TABLE "Anexo" (
    "idAnexo" SERIAL NOT NULL,
    "arquivo" TEXT NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "Anexo_pkey" PRIMARY KEY ("idAnexo")
);

-- CreateTable
CREATE TABLE "RespostaChamado" (
    "idRespostaChamado" SERIAL NOT NULL,
    "mensagem" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "dataResposta" TIMESTAMP(3) NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "RespostaChamado_pkey" PRIMARY KEY ("idRespostaChamado")
);

-- CreateTable
CREATE TABLE "HistoricoChamado" (
    "idHistoricoChamado" SERIAL NOT NULL,
    "respostaChamadoId" INTEGER NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "HistoricoChamado_pkey" PRIMARY KEY ("idHistoricoChamado")
);

-- AddForeignKey
ALTER TABLE "Setor" ADD CONSTRAINT "Setor_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("idToken") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loja" ADD CONSTRAINT "Loja_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("idToken") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("idLoja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("idSetor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("idToken") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("idChamado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaChamado" ADD CONSTRAINT "RespostaChamado_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("idChamado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaChamado" ADD CONSTRAINT "RespostaChamado_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("idLoja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaChamado" ADD CONSTRAINT "RespostaChamado_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("idSetor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RespostaChamado" ADD CONSTRAINT "RespostaChamado_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("idToken") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoChamado" ADD CONSTRAINT "HistoricoChamado_respostaChamadoId_fkey" FOREIGN KEY ("respostaChamadoId") REFERENCES "RespostaChamado"("idRespostaChamado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoChamado" ADD CONSTRAINT "HistoricoChamado_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado"("idChamado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoChamado" ADD CONSTRAINT "HistoricoChamado_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("idLoja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoChamado" ADD CONSTRAINT "HistoricoChamado_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("idSetor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoChamado" ADD CONSTRAINT "HistoricoChamado_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("idToken") ON DELETE RESTRICT ON UPDATE CASCADE;
