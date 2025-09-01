-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('OWNER', 'ADMIN', 'MANAGER', 'SALES', 'VIEWER');

-- CreateEnum
CREATE TYPE "public"."FuelType" AS ENUM ('GASOLINE', 'ETHANOL', 'FLEX', 'DIESEL', 'HYBRID', 'ELECTRIC', 'LPG', 'CNG', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Transmission" AS ENUM ('MANUAL', 'AUTOMATIC', 'CVT', 'DUAL_CLUTCH', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."BodyType" AS ENUM ('SEDAN', 'HATCH', 'SUV', 'PICKUP', 'COUPE', 'CONVERTIBLE', 'WAGON', 'VAN', 'MINIVAN', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Drivetrain" AS ENUM ('FWD', 'RWD', 'AWD', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Condition" AS ENUM ('NEW', 'USED', 'CERTIFIED');

-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('BRL', 'USD');

-- CreateEnum
CREATE TYPE "public"."LeadSource" AS ENUM ('WEBSITE', 'WHATSAPP', 'FACEBOOK', 'INSTAGRAM', 'MARKETPLACE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."LeadStatus" AS ENUM ('NEW', 'QUALIFIED', 'NEGOTIATION', 'WON', 'LOST', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."VehicleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'RESERVED', 'SOLD', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."Dealership" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "documentId" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "currency" "public"."Currency" NOT NULL DEFAULT 'BRL',
    "logoUrl" TEXT,
    "website" TEXT,
    "timeZone" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Dealership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserOnDealership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dealershipId" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOnDealership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" TEXT NOT NULL,
    "dealershipId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "public"."VehicleStatus" NOT NULL DEFAULT 'DRAFT',
    "brand" TEXT,
    "model" TEXT,
    "trim" TEXT,
    "year" INTEGER,
    "modelYear" INTEGER,
    "vin" TEXT,
    "plate" TEXT,
    "bodyType" "public"."BodyType",
    "condition" "public"."Condition" DEFAULT 'USED',
    "fuelType" "public"."FuelType",
    "transmission" "public"."Transmission",
    "drivetrain" "public"."Drivetrain",
    "doors" INTEGER,
    "seats" INTEGER,
    "colorExt" TEXT,
    "colorInt" TEXT,
    "mileage" INTEGER,
    "priceCents" INTEGER,
    "currency" "public"."Currency" NOT NULL DEFAULT 'BRL',
    "priceOriginalCents" INTEGER,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "reservedAt" TIMESTAMP(3),
    "soldAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VehicleFeature" (
    "vehicleId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "VehicleFeature_pkey" PRIMARY KEY ("vehicleId","featureId")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" TEXT NOT NULL,
    "dealershipId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "alt" TEXT,
    "sortOrder" INTEGER,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lead" (
    "id" TEXT NOT NULL,
    "dealershipId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "source" "public"."LeadSource" NOT NULL DEFAULT 'WEBSITE',
    "status" "public"."LeadStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "vehicleId" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Proposal" (
    "id" TEXT NOT NULL,
    "dealershipId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "currency" "public"."Currency" NOT NULL DEFAULT 'BRL',
    "downPaymentCents" INTEGER,
    "termMonths" INTEGER,
    "interestAPR" DOUBLE PRECISION,
    "approved" BOOLEAN,
    "externalRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Appointment" (
    "id" TEXT NOT NULL,
    "dealershipId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "userId" TEXT,
    "vehicleId" TEXT,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "dealershipId" TEXT,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dealership_name_idx" ON "public"."Dealership"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dealership_slug_key" ON "public"."Dealership"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "UserOnDealership_dealershipId_role_idx" ON "public"."UserOnDealership"("dealershipId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnDealership_userId_dealershipId_key" ON "public"."UserOnDealership"("userId", "dealershipId");

-- CreateIndex
CREATE INDEX "Vehicle_dealershipId_status_createdAt_idx" ON "public"."Vehicle"("dealershipId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Vehicle_dealershipId_priceCents_idx" ON "public"."Vehicle"("dealershipId", "priceCents");

-- CreateIndex
CREATE INDEX "Vehicle_dealershipId_year_mileage_idx" ON "public"."Vehicle"("dealershipId", "year", "mileage");

-- CreateIndex
CREATE INDEX "Vehicle_brand_model_year_idx" ON "public"."Vehicle"("brand", "model", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_dealershipId_slug_key" ON "public"."Vehicle"("dealershipId", "slug");

-- CreateIndex
CREATE INDEX "Feature_name_idx" ON "public"."Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_slug_key" ON "public"."Feature"("slug");

-- CreateIndex
CREATE INDEX "Media_dealershipId_vehicleId_idx" ON "public"."Media"("dealershipId", "vehicleId");

-- CreateIndex
CREATE INDEX "Media_vehicleId_isCover_idx" ON "public"."Media"("vehicleId", "isCover");

-- CreateIndex
CREATE INDEX "Lead_dealershipId_status_createdAt_idx" ON "public"."Lead"("dealershipId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_dealershipId_ownerId_idx" ON "public"."Lead"("dealershipId", "ownerId");

-- CreateIndex
CREATE INDEX "Lead_vehicleId_idx" ON "public"."Lead"("vehicleId");

-- CreateIndex
CREATE INDEX "Proposal_dealershipId_createdAt_idx" ON "public"."Proposal"("dealershipId", "createdAt");

-- CreateIndex
CREATE INDEX "Proposal_leadId_idx" ON "public"."Proposal"("leadId");

-- CreateIndex
CREATE INDEX "Proposal_vehicleId_idx" ON "public"."Proposal"("vehicleId");

-- CreateIndex
CREATE INDEX "Appointment_dealershipId_startsAt_idx" ON "public"."Appointment"("dealershipId", "startsAt");

-- CreateIndex
CREATE INDEX "ActivityLog_dealershipId_entity_entityId_idx" ON "public"."ActivityLog"("dealershipId", "entity", "entityId");

-- CreateIndex
CREATE INDEX "ActivityLog_userId_idx" ON "public"."ActivityLog"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserOnDealership" ADD CONSTRAINT "UserOnDealership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserOnDealership" ADD CONSTRAINT "UserOnDealership_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "public"."Dealership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "public"."Dealership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VehicleFeature" ADD CONSTRAINT "VehicleFeature_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VehicleFeature" ADD CONSTRAINT "VehicleFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "public"."Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "public"."Dealership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lead" ADD CONSTRAINT "Lead_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lead" ADD CONSTRAINT "Lead_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lead" ADD CONSTRAINT "Lead_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "public"."Dealership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "public"."Dealership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposal" ADD CONSTRAINT "Proposal_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "public"."Dealership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityLog" ADD CONSTRAINT "ActivityLog_dealershipId_fkey" FOREIGN KEY ("dealershipId") REFERENCES "public"."Dealership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
