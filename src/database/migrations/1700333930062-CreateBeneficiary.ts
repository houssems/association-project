import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBeneficiary1700333930061 implements MigrationInterface {
  name = 'CreateBeneficiary1700333930061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "beneficiary" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "address" character varying NOT NULL, 
                "country" character varying NOT NULL, 
                "telephone" character varying NOT NULL, 
                "email" character varying NOT NULL, 
                "status" character varying NOT NULL, 
                "photoId" uuid, 
                "summary" text[] NULL,  
                "sections" text[] NULL, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "deletedAt" TIMESTAMP, 
                CONSTRAINT "PK_826bcfe02fc8de3c57a8b2391c4" PRIMARY KEY ("id")
                )`
    );

    await queryRunner.query(
      `ALTER TABLE "beneficiary" ADD CONSTRAINT "FK_82e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

  }

  public async down(): Promise<void> {
  }
}
