import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beneficiary } from 'src/beneficiaries/entities/beneficiary.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { BeneficiaryStatusEnum } from '../../../beneficiaries/beneficiary-status.enum';

@Injectable()
export class BeneficiarySeedService {
  constructor(
    @InjectRepository(Beneficiary)
    private beneficiariesRepository: Repository<Beneficiary>,
    @InjectRepository(FileEntity)
    private filesRepository: Repository<FileEntity>
  ) {
  }

  async run() {


    const beneficiary = await this.beneficiariesRepository.countBy({
      name: 'Hdadra Zoo'
    });

    if (!beneficiary) {
      const photo = await this.saveFile('/api/v1/files/assets/zoo.jpg');


      await this.beneficiariesRepository.save(
        this.beneficiariesRepository.create({
          name: 'Hdadra Zoo',
          address: 'Hdadra 5017, Monastir',
          country: 'Tunisia',
          email: 'hdadra.zoo@gmail.com',
          telephone: '+21697111111',
          summary: [
            'Duis vel efficitur urna. Integer hendrerit venenatis sem a euismod. Maecenas dolor orci, consequat at ipsum et, volutpat sodales mi. Suspendisse fringilla tortor nec lorem rhoncus, a gravida massa malesuada. Suspendisse dictum facilisis convallis. Phasellus cursus justo a ante pharetra vestibulum. Phasellus dignissim maximus quam, in dapibus orci lacinia ac. Mauris pellentesque lacus et odio porta elementum.',
            'Nullam ac orci vitae odio scelerisque semper. In sollicitudin augue erat, non pretium nulla elementum sed. Nullam vitae nunc ligula. Sed vitae fermentum odio, et tempor nulla. Vivamus non lorem eget mi dignissim pharetra quis in urna. Donec laoreet, mauris eget sollicitudin auctor, orci sapien pretium eros, sed venenatis dui elit quis leo. Phasellus viverra mauris non lorem scelerisque fermentum. Mauris suscipit malesuada mi.'
          ],
          sections: [
            'Nullam orci mauris, aliquet non ornare ac, pharetra id massa. Morbi ultrices elit ante, sed porta massa blandit non. Nam sed dictum ante. Quisque et lacinia odio. Donec id rutrum sapien, nec egestas dolor. Quisque faucibus convallis felis, vitae volutpat nisi scelerisque vitae. Integer convallis gravida mattis. Vivamus pharetra aliquam tellus quis ultricies. Nulla vitae tellus vitae lectus hendrerit dignissim.',
            'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec eget rutrum erat. Pellentesque sit amet quam odio. Cras eget dui nisi. Ut nec pellentesque magna, commodo pellentesque elit. Mauris molestie tincidunt dui, eu bibendum dolor ultrices vel. Praesent fermentum sem a nisl porta vestibulum nec ut quam. Curabitur mattis nec risus sit amet ultrices.'
          ],
          photo: {
            id: photo.id
          },
          status: BeneficiaryStatusEnum.ACTIVE
        })
      );
    }
  }

  async saveFile(path): Promise<FileEntity> {
    return this.filesRepository.save(
      this.filesRepository.create({
        path
      })
    );
  }
}
