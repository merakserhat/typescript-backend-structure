import { Expose } from "class-transformer";
import { Request, Response } from "express";
import { Mapper } from "../../utils/mapper";
import { ApiHelper } from "../../utils/api-helper";
import * as _ from "lodash";
import Logging from "../../utils/logging";
import { ApiErrorCode } from "../../utils/error-codes";

class GetTestRequest {
  @Expose()
  errorRequest: boolean;
}

// base endpoint structure
module.exports.getTest = (req: Request, res: Response) => {
  console.log(JSON.stringify(req));

  try {
    const getTestRequest: GetTestRequest = Mapper.map(GetTestRequest, JSON.parse(req.body));

    if (getTestRequest.errorRequest) {
      return ApiHelper.getErrorResponse(res, 400, [
        {
          errorCode: ApiErrorCode.WRONG_PASSWORD,
          message: "Password is not correct",
        },
      ]);
    }

    ApiHelper.getSuccessfulResponse(res, { message: "successfully passed the test!" });
  } catch (error) {
    Logging.error(error);

    if (ApiHelper.isInvalidRequestBodyError(error)) {
      return ApiHelper.getErrorResponseForInvalidRequestBody(res);
    }
    ApiHelper.getErrorResponseForCrash(res, JSON.stringify(error));
  }
};
