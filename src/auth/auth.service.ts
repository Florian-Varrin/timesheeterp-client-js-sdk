import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import axios from 'axios';
import Client from '../index';

class AuthService {
  protected clientObject: Client;
  protected resourceUrl: string;

  constructor(protected apiUrl: string, clientObject: Client) {
    this.resourceUrl = `${apiUrl}/login`;
    this.clientObject = clientObject;
  }

  public async login(authCredentials: AuthCredentialsDto): Promise<string> {

    try {
      const { data } = await axios.post(this.resourceUrl, authCredentials);
      const { accessToken } = data;

      this.clientObject.setAccessToken(accessToken);

      return accessToken;
    } catch (error) {

      throw error;
    }
  }
}

export default AuthService;
