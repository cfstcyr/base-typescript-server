import { container } from 'tsyringe';
import { TestService } from './test-service';

describe('TestService', () => {
    let service: TestService;

    beforeEach(() => {
        service = container.resolve(TestService);
    });

    describe('getHello', () => {
        it('should return world', () => {
            expect(service.getHello()).toEqual('world!');
        });
    });
});
