import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProject1700333930060 implements MigrationInterface {
  name = 'CreateProject1700333930060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "topicId" integer NOT NULL, "summary" text[] NULL, "duration" character varying NOT NULL, "ageMinimum" integer NOT NULL, "ageMaximum" integer NULL, "season" character varying NULL, "videoId" uuid, "sections" text[] NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_816bcfe02fc8de3c57a8b2391c4" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_81e2be4ce11d447ef43be0e374f" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_81e2be4ce11d447ef43be0e374a" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

  }

  public async down(): Promise<void> {
  }
}
