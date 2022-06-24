import React from 'react';
import { Tab } from 'semantic-ui-react';
import CodeMirrorEditorPane from '../panes/CodeMirrorEditorPane/CodeMirrorEditorPane';
import KeyValuePane from '../panes/KeyValuePane/KeyValuePane';

import { useContext } from "react";
import { RequestContext } from '../context/stateHolder';
const RequestTabGroup = () => {
  const states=useContext(RequestContext)
  // configuration for panes
  const panes = [
    {
      //https://react.semantic-ui.com/modules/tab/#types-basic
      menuItem: 'Query Params',
      pane: <Tab.Pane key="query-params">
              <KeyValuePane
                keyPairs={states.queryParams}
                setKeyPairs={states.setQueryParams}
                />
            </Tab.Pane>  
    },
    {
      menuItem: 'Headers',
      pane: <Tab.Pane key="headers">
              <KeyValuePane
                keyPairs={states.headers}
                setKeyPairs={states.setHeaders}/>
            </Tab.Pane>  
    },
    //https://codemirror.net/examples/panel/
    { 
      menuItem: 'Body', 
      pane: <Tab.Pane key="json-editor">
              <CodeMirrorEditorPane 
                doc={'{\n\t\n}'}
                setDoc={states.setDoc}/>
            </Tab.Pane> 
    }
  ]

  return (
    <div className="request-tabs">
      <Tab 
        renderActiveOnly={false}
        panes={panes}
      />
    </div>
  );

};

export default RequestTabGroup;
