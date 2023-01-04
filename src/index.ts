import { NextFunction, Request, Response } from "express";
import * as dotenv from 'dotenv';
import App from './app';

dotenv.config();

const app = new App().setup();

// dev
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
})

const port = process.env.PORT
app.listen(port || 3000, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${port} 🛡️
        #############################################
    `);
});
