import { FastifyRequest } from 'fastify';

export interface AuthenticatedRequest extends FastifyRequest {
    user: any;
    body: {
        movieId: number;
    };
}

export interface UserCredentialsRequest extends FastifyRequest {
    email: string;
    password: string;
}

export interface UpdatePasswordData extends FastifyRequest {
    token: string;
    newPassword: string;
}

export interface PackageRequest extends FastifyRequest {
    params: {
        id: number;
    };
    name: string;
    themes: string[];
    version: string;
}

export interface ThemeRequest extends FastifyRequest {
    params: {
        id: number;
    };
    name: string;
    description: string;
    color: string;
}

export interface MovieRequest {
    user: any;
    query: {
        page?: number;
        limit?: number;
        genre?: number;
    };
}

export interface GenreRequest {
    query: {
        page?: number;
        limit?: number;
    };
}
