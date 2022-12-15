import { EnvironmentConfig, DEFAULT_ENV } from '../configs/environment';
import { HttpException } from '../models/http-exception';

function tryEnv<K extends keyof EnvironmentConfig>(
    name: K,
): string | undefined {
    return (
        (process.env[name] as string | undefined) ??
        (DEFAULT_ENV[name] as string | undefined) ??
        undefined
    );
}

function tryEnvNumber<K extends keyof EnvironmentConfig>(
    name: K,
): number | undefined {
    const val = process.env[name] ?? DEFAULT_ENV[name];

    if (typeof val === 'number') return val;
    if (!val) return undefined;

    const n = Number(val);

    if (isNaN(n)) return undefined;
    return n;
}

function env<K extends keyof EnvironmentConfig>(name: K): string {
    const val = tryEnv(name);

    if (!val)
        throw new HttpException(`No environement variable set for "${name}"`);

    return val;
}

function envNumber<K extends keyof EnvironmentConfig>(name: K): number {
    const val = tryEnvNumber(name);

    if (!val)
        throw new HttpException(`No environement variable set for "${name}"`);

    return val;
}

export { tryEnv, tryEnvNumber, env, envNumber };
