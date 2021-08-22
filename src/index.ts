import AuthService from './auth/auth.service';
import UserService from './auth/users/user.service';
import ProjectService from './timesheet/projects/project.service';
import TimeService from './timesheet/times/time.service';
import ClockService from './clock/clock.service';
import { AxiosError } from 'axios';

class Timesheeterp {
  private accessToken: string | undefined;
  private readonly apiUrl: string;

  public authService: AuthService;
  // Services are initialized by initializeResourceServices function in constructor
  public userService!: UserService;
  public projectService!: ProjectService;
  public timeService!: TimeService;
  public clockService!: ClockService;

  constructor(
    private backendUrl: string,
    private apiVersion: number,
    accessToken?: string | undefined | null
  ) {
    this.apiUrl = `${backendUrl}${backendUrl.endsWith('/') ? '' : '/'}api/v${apiVersion}`;
    this.accessToken = accessToken ? accessToken : undefined;

    this.authService = new AuthService(this.apiUrl, this);

    this.initializeResourceServices();
  }

  private initializeResourceServices() {
    this.userService = new UserService(this.apiUrl, this.accessToken)
    this.projectService = new ProjectService(this.apiUrl, this.accessToken)
    this.timeService = new TimeService(this.apiUrl, this.accessToken)
    this.clockService = new ClockService(this.apiUrl, this.accessToken)
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;

    this.initializeResourceServices();
  }
}

export default Timesheeterp;
export { AxiosError }
