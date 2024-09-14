function WrapPromise(promise: Promise<any>) {
  let status = "pending";
  let response: any;

  const suspender = promise.then(
    (resolve) => {
      status = "success";
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

function Fetcher<ResponseType>(endpoint: string, init?: RequestInit) {
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

export { Fetcher };
