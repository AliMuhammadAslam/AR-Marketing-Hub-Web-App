import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { MdClose } from 'react-icons/md';

//import WebChat from './WebChat';
import ChatBotApp from '../components/Chatbot';

import './fabric-icons-inline.css';
import './MinimizableWebChat.css';

const MinimizableWebChat = () => {
  const [loaded, setLoaded] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [newMessage, setNewMessage] = useState(false);

  const handleMaximizeButtonClick = useCallback(() => {
    setLoaded(true);
    setMinimized(false);
    setNewMessage(false);
  }, []);

  const handleMinimizeButtonClick = useCallback(() => {
    setMinimized(true);
    setNewMessage(false);
  }, []);

  return (
    <div className="minimizable-web-chat">
      {minimized && (
        <button className="maximize" onClick={handleMaximizeButtonClick}>
          <span className="ms-Icon ms-Icon--Message" />
          {newMessage && <span className="ms-Icon ms-Icon--CircleShapeSolid red-dot" />}
        </button>
      )}
      {loaded && (
        <div className={classNames('chat-box right', minimized ? 'hide' : '')}>
          <header>
            <div className="filler" />
            <button className="minimize" onClick={handleMinimizeButtonClick} title="Close">
              <MdClose style={{ fontSize: '18px' }} />
            </button>
          </header>
          <ChatBotApp className="react-web-chat" />
        </div>
      )}
    </div>
  );
};

export default MinimizableWebChat;
