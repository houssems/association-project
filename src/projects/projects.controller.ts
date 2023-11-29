import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';


@ApiBearerAuth()
@Roles(RoleEnum.admin)
@ApiTags('Sponsors')
@Controller({
  path: 'training',
  version: '1'
})
export class ProjectsController {
  constructor() {
  }

}
