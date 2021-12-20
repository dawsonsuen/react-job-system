import React from "react";
import { Layout } from "antd";
import { Route, Redirect } from "react-router-dom";
import JobsView from "../Views/Job/JobsView";
// import {JobDetailView} from './Views/Job/JobDetailView';
// import {JobEditView} from './Views/Job/JobEditView';

const { Content } = Layout;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Content>
    <Route exact path="/" component={JobsView} />
    <Route exact path="/jobs" component={JobsView} />
    {/* <Route exact path="/jobs/:JobNumber" component={JobDetailView}/>
        <Route exact path="/jobs/:JobNumber/edit" component={JobEditView}/> */}
  </Content>
);
