import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from 'src/topics/entities/topic.entity';
import { User } from '../../../users/entities/user.entity';
import { FileEntity } from '../../../files/entities/file.entity';

@Injectable()
export class TopicSeedService {
  constructor(
    @InjectRepository(Topic)
    private repository: Repository<Topic>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>
  ) {
  }

  async run() {

    const countTopic = await this.repository.count({
      where: {
        title: 'Chantiers Jeunes pour sauver les animaux'
      }
    });


    if (!countTopic) {
      const photo = await this.saveFile('/api/v1/files/assets/jeunes.webp');

      const user = await this.userRepository.findOneBy({
        id: 1
      });

      await this.repository.save(
        this.repository.create({
          title: 'Chantiers Jeunes pour sauver les animaux',
          subtitle: 'Des projets humanitaires structurés pour permettre aux 15-18 ans de sortir de leur zone de confort en toute sécurité',
          content: 'En tant que jeune volontaire, vous pouvez faire une véritable différence dans les communautés et rencontrer des personnes du monde entier! Nos programmes de volontariat à l\'étranger pour adolescents sont conçus sur mesure pour les 15 à 18 ans.',
          sections: [
            'Nos Chantiers Jeunes sont des projets structurés spécialement conçus pour les 15-18 ans. ',
            'Chacun de nos chantiers de jeunes bénévoles dédiés aux lycéens est conçu pour vous donner une expérience sûre et parfaitement encadrée.'
          ],
          photo: {
            id: photo.id
          },
          contact: {
            id: (user as User).id
          }
        })
      );
    }
  }

  async saveFile(filePath): Promise<FileEntity> {
    const path = {
      local: filePath
    };

    return this.fileRepository.save(
      this.fileRepository.create({
        path: path['local']
      })
    );
  }
}
