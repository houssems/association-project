import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from 'src/topics/entities/topic.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectsSeasonEnum } from 'src/projects/projects-season.enum';

@Injectable()
export class ProjectSeedService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
  ) {
  }

  async run() {

    const topic = await this.topicRepository.findOneBy({
      title: 'Chantiers Jeunes pour sauver les animaux'
    });

    await this.projectRepository.save(
      this.projectRepository.create({
        title: 'Sauver les animaux rares',
        topic: {
          id: (topic as Topic).id
        },
        summary: [
          'Duis vel efficitur urna. Integer hendrerit venenatis sem a euismod. Maecenas dolor orci, consequat at ipsum et, volutpat sodales mi. Suspendisse fringilla tortor nec lorem rhoncus, a gravida massa malesuada. Suspendisse dictum facilisis convallis. Phasellus cursus justo a ante pharetra vestibulum. Phasellus dignissim maximus quam, in dapibus orci lacinia ac. Mauris pellentesque lacus et odio porta elementum.',
          'Nullam ac orci vitae odio scelerisque semper. In sollicitudin augue erat, non pretium nulla elementum sed. Nullam vitae nunc ligula. Sed vitae fermentum odio, et tempor nulla. Vivamus non lorem eget mi dignissim pharetra quis in urna. Donec laoreet, mauris eget sollicitudin auctor, orci sapien pretium eros, sed venenatis dui elit quis leo. Phasellus viverra mauris non lorem scelerisque fermentum. Mauris suscipit malesuada mi.'
        ],
        sections: [
          'Nullam orci mauris, aliquet non ornare ac, pharetra id massa. Morbi ultrices elit ante, sed porta massa blandit non. Nam sed dictum ante. Quisque et lacinia odio. Donec id rutrum sapien, nec egestas dolor. Quisque faucibus convallis felis, vitae volutpat nisi scelerisque vitae. Integer convallis gravida mattis. Vivamus pharetra aliquam tellus quis ultricies. Nulla vitae tellus vitae lectus hendrerit dignissim.',
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec eget rutrum erat. Pellentesque sit amet quam odio. Cras eget dui nisi. Ut nec pellentesque magna, commodo pellentesque elit. Mauris molestie tincidunt dui, eu bibendum dolor ultrices vel. Praesent fermentum sem a nisl porta vestibulum nec ut quam. Curabitur mattis nec risus sit amet ultrices.'
        ],
        ageMinimum: 16,
        ageMaximum: 18,
        duration: 'P15D',
        season: ProjectsSeasonEnum.STUDY_VACATION,
        video: null
      })
    );

  }
}
