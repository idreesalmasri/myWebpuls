import "./App.css";
import { Container, Segment } from "semantic-ui-react";
import InputBar from "./Components/InputBar/InputBar";
import RequestProvider from "./Components/context/stateHolder";
import RequestTabs from "./Components/RequestTabs/RequestTabs";
import ResponseTabes from "./Components/ResponseTabes/ResponseTabes";

function App() {
  return (
    <>
      <RequestProvider>
        <div className="req">
          <Segment color="black">
            <Container fluid>
              <InputBar />
              <br />
              <RequestTabs />
            </Container>
            <ResponseTabes />
          </Segment>
        </div>
      </RequestProvider>
    </>
  );
}

export default App;
