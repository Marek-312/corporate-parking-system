-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'COMPANY_ADMIN', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "SpotStatus" AS ENUM ('FREE', 'RESERVED', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "taxNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingZone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "gridWidth" INTEGER NOT NULL,
    "gridHeight" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "ParkingZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSpot" (
    "id" SERIAL NOT NULL,
    "spotNumber" TEXT NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "blockedStatus" "SpotStatus" NOT NULL DEFAULT 'FREE',
    "zoneId" INTEGER NOT NULL,

    CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "driverId" INTEGER,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSession" (
    "id" SERIAL NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitTime" TIMESTAMP(3),
    "spotId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "ParkingSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_taxNumber_key" ON "Company"("taxNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpot_zoneId_spotNumber_key" ON "ParkingSpot"("zoneId", "spotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_companyId_licensePlate_key" ON "Vehicle"("companyId", "licensePlate");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingZone" ADD CONSTRAINT "ParkingZone_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "ParkingZone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSession" ADD CONSTRAINT "ParkingSession_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "ParkingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSession" ADD CONSTRAINT "ParkingSession_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
