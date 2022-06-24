import React from "react";
import { Input, Segment, Select, Button } from "semantic-ui-react";
import { useContext } from "react";
import { RequestContext } from "../context/stateHolder";
import axios from "axios";
import "./InputBar.css";

const inputConfig = [
  {
    key: "get",
    text: "GET",
    value: "GET",
  },
  {
    key: "post",
    text: "POST",
    value: "POST",
  },
  {
    key: "put",
    text: "PUT",
    value: "PUT",
  },
  {
    key: "patch",
    text: "PATCH",
    value: "PATCH",
  },
  {
    key: "delete",
    text: "DELETE",
    value: "DELETE",
  },
];

const size = "large";
const color = "black";

const InputBar = () => {
  const states = useContext(RequestContext);
  const handleOnInputSend = async (e) => {
    states.setLoading(true);

    e.preventDefault();
    const requestBody = states.doc.toString();

    let data;
    try {
      data = JSON.parse(requestBody);
    } catch (e) {
      alert("Something is wrong with the JSON data.");
    }

    try {
      const response = await axios({
        url: states.url,
        method: states.httpMethod,
        params: states.convertKeyValueToObject(states.queryParams),
        headers: states.convertKeyValueToObject(states.headers),
        data,
      });

      states.setResponse(response);
    } catch (e) {
      console.log(e);
      states.setResponse(e);
    }

    states.setLoading(false);
  };
  // }
  return (
    <div className="input-bar">
      <Segment color="black">
        <form>
          <Input fluid size={size} placeholder="https://example.com">
            <div className="selection">
              <Select
                compact
                defaultValue={states.httpMethod}
                options={inputConfig}
                onChange={(_e, data) => states.setHttpMethod(data.value)}
              />
            </div>
            <input
              value={states.url}
              onChange={(e) => states.setUrl(e.target.value)}
            />
            <div className="button">
              <Button
                basic
                color={color}
                size={size}
                onClick={(e) => handleOnInputSend(e)}
              >
                Send
              </Button>
            </div>
          </Input>
        </form>
      </Segment>
    </div>
  );
};

export default InputBar;
