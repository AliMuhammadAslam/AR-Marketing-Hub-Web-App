
import React from "react";
import Chatbot from "react-chatbot-kit";

import config from "../chatbot/chatbotConfig";
import MessageParser from "../chatbot/messageParser";
import ActionProvider from "../chatbot/actionProvider";
import "./chatbot.css"
import { useNavigate } from "react-router";

function ChatBotApp() {
  let navigate = useNavigate(); 

  return (
    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default ChatBotApp;