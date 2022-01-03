import React from "react";

function useHttp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const sendRequest = React.useCallback(
    async (requestConfig, applyJsonData) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });
        if (!response.ok) {
          throw new Error("Request Failed");
        }

        const data = await response.json();
        applyJsonData(data);
      } catch (err) {
        setError(err.message || "Something went Wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
}

export default useHttp;
