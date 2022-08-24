import APIAuth from './auth';

class APIWrapper {
  
  public constructor(baseUrl: string) {
    this.auth = new APIAuth(baseUrl);
  }

  public auth: APIAuth;
};

export default new APIWrapper('http://localhost:3333');