export interface EnvironmentConfig {
    PORT: number;
    NODE_ENV: string;
}

export const DEFAULT_ENV: {
    [K in keyof EnvironmentConfig]?: EnvironmentConfig[K];
} = {
    PORT: 3000,
};
