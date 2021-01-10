declare module 'schemas' {
  interface CommonParams {
    id: string;
  }

  interface CommonQueryString {
    skip: number;
    limit: number;
    search: string;
  }

  interface AuthQuerystring {
    debug: boolean;
    id: number;
    email: string;
    isEmailVerified: boolean;
    name: string;
  }
}
