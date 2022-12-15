import { Router } from 'express';
import { AbstractController } from '../abstract-controller';
import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';

@singleton()
export class DefaultController extends AbstractController {
    constructor() {
        super('/');
    }

    protected configureRouter(router: Router): void {
        router.get('/', (req, res) => {
            res.status(StatusCodes.OK).json({ hello: 'world!' });
        });
    }
}
