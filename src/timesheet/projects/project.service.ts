import AbstractResourceService from '../../abstract/abstract.resource.service';
import { ProjectEntity } from './entities/project.entity';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';

class ProjectService extends AbstractResourceService {
  protected resourceUrl: string;

  constructor(
    protected apiUrl: string,
    protected accessToken: string | undefined
  ) {
    super(apiUrl, accessToken);

    this.resourceUrl = `${apiUrl}/projects`;
  }

  async findOneById(projectId: number): Promise<ProjectEntity> {
    try {
      const { data: project } = await this.makeRequest('GET', `${this.resourceUrl}/${projectId}`);

      return project;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ProjectEntity[]> {
    try {
      const { data: projects } = await this.makeRequest('GET', this.resourceUrl);

      return projects;
    } catch (error) {
      throw error;
    }
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    try {
      const { data: project } = await this.makeRequest('POST', this.resourceUrl, createProjectDto);

      return project;
    } catch (error) {
      throw error;
    }
  }

  async update(projectId: number, updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    try {
      const { data: project } = await this.makeRequest('PATCH', `${this.resourceUrl}/${projectId}`, updateProjectDto);

      return project;
    } catch (error) {
      throw error;
    }
  }

  async remove(projectId: number): Promise<void> {
    try {
      await this.makeRequest('DELETE', `${this.resourceUrl}/${projectId}`);
    } catch (error) {
      throw error;
    }
  }
}

export default ProjectService;
