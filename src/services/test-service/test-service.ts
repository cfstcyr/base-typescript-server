import { singleton } from 'tsyringe';

@singleton()
export class TestService {
    getHello(): string {
        return 'world!';
    }
}
