/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Practice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Practice_email_key" ON "Practice"("email");


