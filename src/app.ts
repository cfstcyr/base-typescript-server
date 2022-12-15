import './configs/registry';
import { injectAll, singleton } from 'tsyringe';
import express from 'express';
import { AbstractController } from './controllers';
import { SYMBOLS } from './constants/symbols';
import { errorHandler } from './middlewares/error-handler';
import { HttpException } from './models/http-exception';
import { StatusCodes } from 'http-status-codes';

@singleton()
export class Application {
    private app: express.Application;

    constructor(
        @injectAll(SYMBOLS.controller)
        private readonly controllers: AbstractController[],
    ) {
        this.app = express();

        this.configure();
    }

    listen(port: number | string) {
        this.app.listen(port, () =>
            console.log(
                `Application up on port ${port}.\n\tVisit http://localhost:${port}.`,
            ),
        );
    }

    private configure() {
        for (const controller of this.controllers) {
            controller.use(this.app);
        }

        this.app.get('**', (req, res, next) =>
            next(
                new HttpException(
                    `Cannot ${req.method} for ${req.path}`,
                    StatusCodes.NOT_FOUND,
                ),
            ),
        );

        this.app.use(errorHandler);
    }
}