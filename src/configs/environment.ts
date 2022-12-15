export interface EnvironmentConfig {
    PORT: number;
    NODE_ENV: string;

    CORS: string;
}

export const DEFAULT_ENV: {
    [K in keyof EnvironmentConfig]?: EnvironmentConfig[K];
} = {
    PORT: 3000,
    CORS: '*',
};
