declare module 'next/headers' {
  interface Cookie {
    name: string;
    value: string;
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    path?: string;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
    secure?: boolean;
    domain?: string;
  }

  interface RequestCookies {
    get(name: string): Cookie | undefined;
    getAll(): Cookie[];
    has(name: string): boolean;
    delete(name: string): void;
    set(name: string, value: string, options?: Omit<Cookie, 'name' | 'value'>): void;
  }

  export const cookies: () => RequestCookies;
}

