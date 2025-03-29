/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Posts_id_key` ON `Posts`(`id`);
