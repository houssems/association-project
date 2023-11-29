import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1700333930059 implements MigrationInterface {
  name = 'CreateUser1700333930059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "training" ("id" SERIAL NOT NULL, "eventName" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP NOT NULL DEFAULT now(), "guestSpeakers" text[] NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "attendee" ("user_id" integer NOT NULL, "training_id" integer NOT NULL, CONSTRAINT "PK_f12743a7086ec826733f54e1d95" PRIMARY KEY ("user_id", "training_id"))`
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_e12743a7086ec826733f54e1d96" ON "attendee" ("user_id")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12743a7086ec826733f54e1d97" ON "attendee" ("training_id")`
    );

    await queryRunner.query(
      `ALTER TABLE "attendee" ADD CONSTRAINT "FK_e12743a7086ec826733f54e1d98" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" ADD CONSTRAINT "FK_e12743a7086ec826733f54e1d99" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendee" DROP FOREIGN KEY "FK_e12743a7086ec826733f54e1d98"`
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" DROP FOREIGN KEY "FK_e12743a7086ec826733f54e1d99"`
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e12743a7086ec826733f54e1d96" ON "attendee"`
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e12743a7086ec826733f54e1d96" ON "attendee"`
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" CHANGE "user_id" "user_id" int NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "attendee" CHANGE "training_id" "training_id" int NOT NULL`
    );
    await queryRunner.query(`DROP TABLE "attendee"`);
  }
}
