import express, { Express, Response, Request, NextFunction } from 'express';
import globalExceptionHandler from "./common/error/handler";
import router from './router';

class App {
  public setup(): Express {
    let app = express();
    app.use(express.json());

    app.use("/api", router);
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        status: 200,  
        message: "Healthy."
      });
    });

    app.use(globalExceptionHandler);
    return app;
  }
}

export default App;