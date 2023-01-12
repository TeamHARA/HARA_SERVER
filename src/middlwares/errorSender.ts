import { NextFunction, Request, Response } from "express";
import slackAlarm, { SlackMessageFormat } from "./slackAlarm";

const sendErrorStackToSlack = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const error = err as Error;
  const message: SlackMessageFormat = {
    color: slackAlarm.colors.danger,
    title: "해라 서버 에러",
    text: "실패",
    fields: [
      {
        title: "Error Stack:",
        value: `\`\`\`${error.stack}\`\`\``, //여기서 ```를 추가해서 마크다운 형태로 보내줍니다.
      },
    ],
  };
  slackAlarm.sendMessage(message);
  next(err);
};

export default { sendErrorStackToSlack };