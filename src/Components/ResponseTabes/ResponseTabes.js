// import React from 'react';
// import { Tab } from 'semantic-ui-react';
// import CodeMirrorEditorPane from '../../panes/CodeMirrorEditorPane/CodeMirrorEditorPane';
// import ResponseHeaders from '../../panes/ResponseHeadersPane/ResponseHeadersPane';
// import { useContext } from "react";
// import { RequestContext } from '../context/stateHolder';
// // const states=useContext(RequestContext)
// const ResponseTabGroup = ({ doc, setDoc, response, loading }) => {

//   // configuration for panes
//   const panes = [
//     {
//       menuItem: 'Response Body',
//       pane: <Tab.Pane 
//               key="response-body"
//               loading={loading}>
//               <CodeMirrorEditorPane
//                 doc={doc}
//                 setDoc={setDoc}
//                 isEditable={false}/>
//             </Tab.Pane>  
//     },
//     {
//       menuItem: 'Response Headers',
//       pane: <Tab.Pane key="response-headers">
//               <ResponseHeaders
//                 response={response}/>
//             </Tab.Pane>  
//     }
//   ]

//   return (
//     <div className="response-tabs">
//       <Tab 
//         renderActiveOnly={false}
//         panes={panes}
//       />
//     </div>
//   );
// }

// export default ResponseTabGroup;///////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
// import ResponseTabGroup from '../../tab-groups/ResponseTabGroup/ResponseTabGroup';
import prettyBytes from 'pretty-bytes';
// import ResponseMeta from './ResponseMeta/ResponseMeta';
import { Tab } from 'semantic-ui-react';
import CodeMirrorEditorPane from '../panes/CodeMirrorEditorPane/CodeMirrorEditorPane';
import ResponseHeaders from '../panes/ResponseHeadersPane/ResponseHeadersPane';
import { useContext } from "react";
import { RequestContext } from '../context/stateHolder';
// const states=useContext(RequestContext)
// const states =useContext()

const ResponseTabes = () => {
    const states=useContext(RequestContext)
  const [ doc, setDoc ] = useState('{}');

  useEffect(() => {
    
    if(states.response === null) return;
    const jsonResponse = JSON.stringify(states.response.data, null, 2);
    setDoc(jsonResponse);

  }, [states.response, states.loading])

  const hasResponse = !(states.response == null);
  
  let time = '';
  let status = '';
  let size = '';

  if(hasResponse){
    const hasCustomData = 'customData' in states.response; ///response.customData
    const hasData = 'data' in states.response; ///response.data
    const hasHeaders = 'headers' in states.response; ///response.headers

    status = hasResponse ? states.response.status : 0;

    if(hasData && hasHeaders){
      size = prettyBytes(
        (hasResponse ? JSON.stringify(states.response.data).length : 0) + 
        (hasResponse ? JSON.stringify(states.response.headers).length : 0)
      );
    }

    if(hasCustomData){
      time = states.response.customData.time
    }
  }
  const panes = [
    {
      menuItem: 'Response Body',
      pane: <Tab.Pane 
              key="response-body"
              loading={states.loading}>
              <CodeMirrorEditorPane
                doc={doc}
                setDoc={setDoc}
                isEditable={false}/>
            </Tab.Pane>  
    },
    {
      menuItem: 'Response Headers',
      pane: <Tab.Pane key="response-headers">
              <ResponseHeaders
                response={states.response}/>
            </Tab.Pane>  
    }
  ]

  return (
    <div>
      <Container fluid>
        <h1>Response</h1>
        <Grid>

          {/* <ResponseMeta
            status={status}
            time={time}
            size={size}
          /> */}
          <Grid.Row
           columns={3}>
           <Grid.Column
            computer={2}
            tablet={4}
            mobile={4}>
          <div><b>Status:</b> {status}</div>
          </Grid.Column>
          <Grid.Column
           computer={2}
           tablet={4}
           mobile={4}>
          <div><b>Time:</b> {time}</div>
          </Grid.Column>
          <Grid.Column
           computer={2}
           tablet={4}
           mobile={4}>
          <div><b>Size:</b> {size}</div>
          </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column width={16}>
            <div className="response-tabs">
              <Tab 
                renderActiveOnly={false}
                panes={panes}
             />
             </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>

  );
}

export default ResponseTabes;