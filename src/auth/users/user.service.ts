import AbstractResourceService from '../../abstract/abstract.resource.service';
import { CreateUserDto } from './dto/create-user.dto';
import {UserEntity} from './entity/user.entity';
import {UpdateUserDto} from './dto/update-user.dto';

class UserService extends AbstractResourceService {
  protected resourceUrl: string;

  constructor(
    protected apiUrl: string,
    protected accessToken: string | undefined
  ) {
    super(apiUrl, accessToken);

    this.resourceUrl = `${apiUrl}/users`;
  }

  async findOneById(userId: number): Promise<UserEntity> {
    try {
      const { data: user } = await this.makeRequest('GET', `${this.resourceUrl}/${userId}`);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const { data: user } = await this.makeRequest('GET', this.resourceUrl);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { data: user } = await this.makeRequest('POST', this.resourceUrl, createUserDto);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const { data: user } = await this.makeRequest('PATCH', `${this.resourceUrl}/${userId}`, updateUserDto);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: number): Promise<void> {
    try {
      await this.makeRequest('DELETE', `${this.resourceUrl}/${userId}`);
    } catch (error) {
      throw error;
    }
  }

  async addRole(userId: number, roles: string[]): Promise<UserEntity> {
    try {
      const { data: user } = await this.makeRequest('POST', `${this.resourceUrl}/${userId}/roles`, { roles })

      return user;
    } catch (error) {
      throw error;
    }
  }

  async removeRole(userId: number, roleId: number): Promise<UserEntity> {
    try {
      const { data: user } = await this.makeRequest('DELETE', `${this.resourceUrl}/${userId}/roles/${roleId}`)

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
