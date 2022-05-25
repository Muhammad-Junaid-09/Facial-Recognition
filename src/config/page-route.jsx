import React from 'react';
import { Redirect } from 'react-router';
import All from '../pages/all/all.js';
import Analytics from '../pages/analytics/analytics.js';
import Upload from '../pages/upload/upload.js';
import Login from '../pages/login/login.js';
import Messages from '../pages/messages/messages.js';
import Verification from '../pages/verification/verification.js';
import Detail from '../pages/detail/detail.js';
import Home from '../pages/home/home.js';
import DeviceStatus from '../pages/devicestatus/devicestatus.js';
import LiveConversation from '../pages/liveconversation/liveconversation.js';
import ContactList from '../pages/contactlist/contactlist.js';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/login'/>
  },
  {
    path: '/login',
    title: 'Login',
    component: () => <Login />,
  },
  {
    path: '/all',
    exact: true,
    title: 'All',
    component: () => <All />
  },
  {
    path: '/detail',
    exact: true,
    title: 'Detail',
    component: () => <Detail />
  },
  {
    path: '/verification',
    exact: true,
    title: 'Verification',
    component: () => <Verification />
  },
  {
    path: '/messages',
    exact: true,
    title: 'Messages',
    component: () => <Messages />
  },
  {
    path: '/analytics',
    exact: true,
    title: 'Analytics',
    component: () => <Analytics />
  },
  {
    path: '/upload',
    exact: true,
    title: 'Upload',
    component: () => <Upload />
  },
  {
    path: '/home',
    exact: true,
    title: 'Home',
    component: () => <Home />
  },
  {
    path: '/device-status',
    exact: true,
    title: 'DeviceStatus',
    component: () => <DeviceStatus />
  },
  {
    path: '/live-conversation',
    exact: true,
    title: 'LiveConversation',
    component: () => <LiveConversation />
  },
  {
    path: '/contact-list',
    exact: true,
    title: 'ContactList',
    component: () => <ContactList />
  },
 
  
];


export default routes;