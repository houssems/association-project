import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { TopicSeedService } from './topic/topic-seed.service';
import { ProjectSeedService } from './project/project-seed.service';
import { BeneficiarySeedService } from './beneficiairy/beneficiary-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(TopicSeedService).run();
  await app.get(ProjectSeedService).run();
  await app.get(BeneficiarySeedService).run();
  await app.close();
};

void runSeed();
