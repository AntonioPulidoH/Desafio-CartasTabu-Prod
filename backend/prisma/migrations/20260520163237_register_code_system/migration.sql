/*
  Warnings:

  - You are about to drop the column `registerCode` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_registerCode_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "registerCode",
ADD COLUMN     "registerCodeId" INTEGER;

-- CreateTable
CREATE TABLE "register_codes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "register_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "register_codes_code_key" ON "register_codes"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_registerCodeId_fkey" FOREIGN KEY ("registerCodeId") REFERENCES "register_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "register_codes" ADD CONSTRAINT "register_codes_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
