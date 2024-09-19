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
  await delay(1000);
  return request;
}

export { FetcherWraped, Fetcher };
