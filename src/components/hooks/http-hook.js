import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //array of active requests when trying to requests data from server
  // this data will not be reinitialized again when the function runs again
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      //build in constructor that suports modern browsers
      //links the abort controller to the request sent
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        //keeps all controllers except the controller that used in the reqest
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        // if the status code is not ok, will throw error message
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        console.log(responseData);

        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // make sure that we wont continue with the request when its aborted. when requested a different page
    // clean up function for all active requests
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
