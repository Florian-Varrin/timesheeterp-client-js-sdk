import axios from 'axios';

type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

abstract class AbstractResourceService {
  protected constructor(
    protected apiUrl: string,
    protected accessToken: string | undefined,
  ) {}

  protected getHeaders(): {
    Authorization: string,
    'Content-Type': string,
  } {
    if (!this.accessToken) throw new Error('No access token available');

    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    }
  }

  protected async makeRequest(
    method: HttpMethods,
    url: string,
    data: object | null = null,
    parameters = {},
  ) {
    try {
      const queryString = new URLSearchParams(parameters).toString();
      return await axios({
        url: `${url}?${queryString}`,
        method,
        data,
        headers: this.getHeaders(),
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message[0];
      throw new Error(errorMessage || error);
    }
  }
}

export default AbstractResourceService;
