import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import JobsView from '../Job/JobsView';
import JobEditView from'../Job/JobEditView';
import MyDetail from '../User/MyDetail';
import SigninView from'../User/SigninView';
import Register from '../User/Register';
import {fakeAuth} from '../User/SigninView';
import { Layout } from 'antd';
import Profile from '../User/Profile';
const { Content } = Layout;

export default () =>(

    <Content>
        <ProtectedRoute exact path="/" component={JobsView}/>
        <ProtectedRoute exact path="/jobs" component={JobsView}/>
        <ProtectedRoute exact path="/jobs/edit/:Id" component={JobEditView}/>
        <ProtectedRoute exact path="/mydetail/:Id" component={MyDetail}/>
        <Route exact path="/signin" component={SigninView}/>
        <Route exact path="/register" component={Register}/>
        <ProtectedRoute exact path="/profile" component={Profile}/>
    </Content>
);
const ProtectedRoute = ({component:ProtectedComponent, ...rest})=>(
    <Route 
        {...rest} 
        render={props =>
         fakeAuth.isAuthenticated ? (
            <ProtectedComponent {...props} />
         ):(
            <Redirect to = {{
                pathname:'/signin', 
                state:{from: props.location}
            }}/>
            )
        }
    />
);
