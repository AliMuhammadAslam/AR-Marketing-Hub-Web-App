import React from 'react';
import NavBar from './NavigationBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import MinimizableWebChat from '../min-web-chat/MinimizableWebChat';
import '../min-web-chat/MinimizableWebChat.css'

export default function WithNav() {
  return (
    <>
      <NavBar />
      <MinimizableWebChat />
      <Outlet />
      
      {/* <ChatBotApp /> */}
      <Footer />
    </>
  );
};
