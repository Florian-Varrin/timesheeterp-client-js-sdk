import AbstractResourceService from '../../abstract/abstract.resource.service';
import { TimeEntity } from './entities/time.entity';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

class TimeService extends AbstractResourceService {
  protected resourceUrl: string;

  constructor(
    protected apiUrl: string,
    protected accessToken: string | undefined,
  ) {
    super(apiUrl, accessToken);

    this.resourceUrl = `${apiUrl}/projects`;
  }

  async findOneById(projectId: number, timeId: number, parameters = {}): Promise<TimeEntity> {
    try {
      const { data: time } = await this.makeRequest('GET', `${this.resourceUrl}/${projectId}/times/${timeId}`, null, parameters);

      return time;
    } catch (error) {
      throw error;
    }
  }

  async findAll(projectId: number, parameters = {}): Promise<TimeEntity[]> {
    try {
      const { data: times } = await this.makeRequest('GET', `${this.resourceUrl}/${projectId}/times`, null, parameters);

      return times;
    } catch (error) {
      throw error;
    }
  }

  async create(projectId: number, createTimeDto: CreateTimeDto): Promise<TimeEntity> {
    try {
      const { data: time } = await this.makeRequest('POST', `${this.resourceUrl}/${projectId}/times`, createTimeDto);

      return time;
    } catch (error) {
      throw error;
    }
  }

  async update(projectId: number, timeId: number, updateTimeDto: UpdateTimeDto): Promise<TimeEntity> {
    try {
      const { data: time } = await this.makeRequest('PATCH', `${this.resourceUrl}/${projectId}/times/${timeId}`, updateTimeDto);

      return time;
    } catch (error) {
      throw error;
    }
  }

  async remove(projectId: number, timeId: number): Promise<void> {
    try {
      await this.makeRequest('DELETE', `${this.resourceUrl}/${projectId}/times/${timeId}`);
    } catch (error) {
      throw error;
    }
  }
}

export default TimeService;
