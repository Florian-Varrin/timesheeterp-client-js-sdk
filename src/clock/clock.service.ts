import AbstractResourceService from '../abstract/abstract.resource.service';
import { ClockEntity } from './entities/clock.entity';
import { CreateClockDto } from './dto/create-clock.dto';
import { UpdateClockDto } from './dto/update-clock.dto';
import {CreateActionDto} from './dto/create-action.dto';

class ClockService extends AbstractResourceService {
  protected resourceUrl: string;

  constructor(
    protected apiUrl: string,
    protected accessToken: string | undefined
  ) {
    super(apiUrl, accessToken);

    this.resourceUrl = `${apiUrl}/clocks`;
  }

  async findOneById(clockId: number, parameters = {}): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('GET', `${this.resourceUrl}/${clockId}`, null, parameters);

      return clock;
    } catch (error) {
      throw error;
    }
  }

  async findAll(parameters = {}): Promise<ClockEntity[]> {
    try {
      const { data: clocks } = await this.makeRequest('GET', `${this.resourceUrl}`, null, parameters);

      return clocks;
    } catch (error) {
      throw error;
    }
  }

  async create(createClockDto: CreateClockDto): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('POST', this.resourceUrl, createClockDto);

      return clock;
    } catch (error) {
      throw error;
    }
  }

  async update(clockId: number, updateClockDto: UpdateClockDto): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('PATCH', `${this.resourceUrl}/${clockId}`, updateClockDto);

      return clock;
    } catch (error) {
      throw error;
    }
  }

  async remove(clockId: number): Promise<void> {
    try {
      await this.makeRequest('DELETE', `${this.resourceUrl}/${clockId}`);
    } catch (error) {
      throw error;
    }
  }

  async start(clockId: number): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('PUT', `${this.resourceUrl}/${clockId}/start`);

      return clock;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async stop(clockId: number): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('PUT', `${this.resourceUrl}/${clockId}/stop`);

      return clock;
    } catch (error) {
      throw error;
    }
  }

  async stopAll(): Promise<ClockEntity[]> {
    try {
      const runningClocks = await this.findAll({ status: 'running' });
      const promises = runningClocks.map((clock) => this.makeRequest('PUT', `${this.resourceUrl}/${clock.id}/stop`))
      const clocks = await Promise.all(promises);

      return clocks.map((response) => response.data);
    } catch (error) {
      throw error;
    }
  }

  async reset(clockId: number): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('POST', `${this.resourceUrl}/${clockId}/reset`);

      return clock;
    } catch (error) {
      throw error;
    }
  }

  async addTime(clockId: number, createActionDto: CreateActionDto): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('POST', `${this.resourceUrl}/${clockId}/add`, createActionDto);

      return clock;
    } catch (error) {
      throw error;
    }
  }

  async removeTime(clockId: number, createActionDto: CreateActionDto): Promise<ClockEntity> {
    try {
      const { data: clock } = await this.makeRequest('POST', `${this.resourceUrl}/${clockId}/remove`, createActionDto);

      return clock;
    } catch (error) {
      throw error;
    }
  }
}

export default ClockService;
