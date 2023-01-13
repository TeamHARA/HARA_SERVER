import { NextFunction, Request, Response } from "express";
import statusCode from "../constants/statusCode";
import slackAlarm, { SlackMessageFormat } from "./slackAlarm";

const sendErrorStackToSlack = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err?.statusCode == statusCode.INTERNAL_SERVER_ERROR) {
    const message: SlackMessageFormat = {
      color: slackAlarm.colors.danger,
      title: "해라 서버 에러",
      text: "실패",
      fields: [
        {
          title: "Error Stack:",
          value: `\`\`\`${err.stack}\`\`\``,
        },
      ],
    };
    slackAlarm.sendMessage(message);
  }
  
};

export default { sendErrorStackToSlack };