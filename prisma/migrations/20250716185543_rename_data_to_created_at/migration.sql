/*
  Warnings:

  - You are about to drop the column `data` on the `Token` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "data",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
