import { NextFunction, Request, Response } from "express";
import statusCode from "../../constants/statusCode";
import responseMessage from "../../constants/responseMessage";
import { fail } from "../../constants/response";
import slackAlarm, { SlackMessageFormat } from "../../middlwares/slackAlarm";
const globalExceptionHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err?.statusCode || statusCode.INTERNAL_SERVER_ERROR;
  res
    .status(status)
    .send(fail(status, err?.message || responseMessage.INTERNAL_SERVER_ERROR));
  const message: SlackMessageFormat = {
    color: slackAlarm.colors.danger,
    title: "해라 서버 에러",
    text: "실패",
    fields: [
      {
        title: "Error Stack:",
        value: `\`\`\`${err}\`\`\``, //여기서 ```를 추가해서 마크다운 형태로 보내줍니다.
      },
    ],
  };
  slackAlarm.sendMessage(message);
  next(err);
};

export default globalExceptionHandler;
