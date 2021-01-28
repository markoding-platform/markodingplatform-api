declare module 'schemas' {
  interface CommonParams {
    id: string;
  }

  interface CommonQueryString {
    skip: number;
    limit: number;
    keyword: string;
  }

  interface AuthQuerystring {
    debug: boolean;
    id: number;
    email: string;
    isEmailVerified: boolean;
    name: string;
  }
}
