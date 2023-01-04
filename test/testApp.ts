
import App from '../src/app';
import * as dotenv from 'dotenv';

const app = new App().setup();
dotenv.config();

export default app;