import { SERVICE_HOSTNAME } from "./CONFIG";

function WrapPromise(promise: Promise<any>) {
  let status = "pending";
  let response: any;

  const suspender = promise.then(
    (resolve) => {
      setTimeout(() => {
        status = "success";
      }, 3000);
      response = resolve;
    },
    (reject) => {
      status = "fail";
      response = reject;
    }
  );

  const execute = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "fail":
        throw response;
      default:
        return response;
    }
  };

  return { execute };
}

function FetcherWraped<ResponseType>(endpoint: string, init?: RequestInit) {
  const promise = fetch(endpoint, init)
    .then((response) => {
      console.info("still awaiting response \t:", response);
      return response.json();
    })
    .then((res) => {
      console.info("final result data \t:", res);
      return res.data as ResponseType;
    });
  return WrapPromise(promise);
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function Fetcher(endpoint: string, init?: RequestInit) {
  let request: any = await fetch(endpoint, init);
  request = await request.json();
  await delay(500);
  return request;
}

async function FetcherV2(endpoint: string, init?: RequestInit): Promise<any> {
  try {
    let request: any = await fetch(endpoint, init);
    request = await request.json();
    await delay(1000);
    return request;
  } catch (err) {
    return err;
  }
}
type FailRequestType = {
  error: string,
  message: string
}
async function API<ResponseType>(
  body: "json" | "form-data" | "no-body",
  path: string,
  init: RequestInit,
  data?: any,
): Promise<[ResponseType?, FailRequestType?]> {
  /* simulate loading */
  await delay(1500)
  let RequestBody: string | FormData | undefined;
  switch (body) {
    case "json":
      RequestBody = JSON.stringify(data)
      break;

    case "form-data":
      RequestBody = new FormData()
      for (let prop in data) {
        RequestBody.append(prop, data[prop])
      }
      break;
    case "no-body":
      RequestBody = undefined
      break;
    default:
      let invalidRequest: FailRequestType = {
        error: "argument \"body\" unknown",
        message: "body of request must be specified \"json\" or \"form-data\""
      }
      return [undefined, invalidRequest];
  }
  const request = new Request(`${SERVICE_HOSTNAME}${path}`, {
    ...init,
    body: RequestBody
  })
  try {
    let response = await fetch(request)
    const resData = await response.json()
    if (!resData.success) {
      let failResponse: FailRequestType = {
        error: String(resData.statusCode),
        message: resData.message
      }
      return [undefined, failResponse];
    }
    return [resData.data as ResponseType, undefined]
  } catch (err) {
    if (err instanceof Error) {
      let errResponse: FailRequestType = {
        error: err.name,
        message: err.message
      }

      return [undefined, errResponse]
    }

    let errResponse: FailRequestType = {
      error: "unknown error",
      message: "an unknown error occured"
    }

    return [undefined, errResponse]
  }
}

export { FetcherWraped, Fetcher, FetcherV2, API };
