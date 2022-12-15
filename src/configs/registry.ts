import { registry } from 'tsyringe';
import { SYMBOLS } from '../constants/symbols';
import { DefaultController } from '../controllers';

@registry([{ token: SYMBOLS.controller, useClass: DefaultController }])
export class Registry {}
