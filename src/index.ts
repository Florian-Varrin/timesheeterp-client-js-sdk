import AuthService from './auth/auth.service';
import UserService from './auth/users/user.service';

class Client {
  private accessToken: string | undefined;
  private readonly apiUrl: string;

  public authService: AuthService;
  // Services are initialized by initializeResourceServices function in constructor
  // @ts-ignore
  public userService: UserService;

  constructor(
    private backendUrl: string,
    private apiVersion: number,
    accessToken?: string | undefined
  ) {
    this.apiUrl = `${backendUrl}${backendUrl.endsWith('/') ? '' : '/'}api/v${apiVersion}`;
    this.accessToken = accessToken ? accessToken : undefined;

    this.authService = new AuthService(this.apiUrl, this);

    this.initializeResourceServices();
  }

  private initializeResourceServices() {
    this.userService = new UserService(this.apiUrl, this.accessToken)
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;

    this.initializeResourceServices();
  }

  public getAccessToken(): string | undefined {
    return this.accessToken;
  }
}

export default Client;
