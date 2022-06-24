import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
export const RequestContext = React.createContext();
const keyPairInitState = [
  {
    id: uuidv4(),
    keyItem: "",
    valueItem: "",
  },
];
export default function RequestProvider(props) {
  const [httpMethod, setHttpMethod] = useState("GET");
  const [url, setUrl] = useState("");

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState("{\n\t\n}");

  const [queryParams, setQueryParams] = useState(keyPairInitState);
  const [headers, setHeaders] = useState(keyPairInitState);

  const convertKeyValueToObject = (keyPairs) => {
    return [...keyPairs].reduce((data, pair) => {
      const key = pair.keyItem;
      const value = pair.valueItem;

      if (key === "") return data;
      return {
        ...data,
        [key]: value,
      };
    }, {});
  };

  const state = {
    httpMethod: httpMethod,
    setHttpMethod: setHttpMethod,
    url: url,
    setUrl: setUrl,
    // onInputSend:handleOnInputSend,
    response: response,
    setResponse: setResponse,
    loading: loading,
    setLoading: setLoading,
    doc: doc,
    setDoc: setDoc,
    headers: headers,
    setHeaders: setHeaders,
    queryParams: queryParams,
    setQueryParams: setQueryParams,
    convertKeyValueToObject: convertKeyValueToObject,
  };

  return (
    <RequestContext.Provider value={state}>
      {props.children}
    </RequestContext.Provider>
  );
}
