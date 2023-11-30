import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTopic1700333930060 implements MigrationInterface {
  name = 'CreateTopic1700333930060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "topic" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NULL, "photoId" uuid, "content" text NULL, "sections" text[] NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_806bcfe02fc8de3c57a8b2391c4" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_80e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_80e2be4ce11d447ef43be0e374a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

  }

  public async down(): Promise<void> {
  }
}
