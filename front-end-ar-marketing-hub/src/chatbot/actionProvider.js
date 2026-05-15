import React, { useRef } from 'react';
import axios from '../api/axios';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const historyRef = useRef([]);

  const handleAIMessage = async (message) => {
    const history = historyRef.current;

    try {
      const { data } = await axios.post('/auth/chat', { message, history });
      const botMessage = createChatBotMessage(data.reply);

      historyRef.current = [
        ...history,
        { role: 'user', content: message },
        { role: 'assistant', content: data.reply }
      ].slice(-10);

      setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    } catch {
      const botMessage = createChatBotMessage("Sorry, I'm having trouble connecting right now. Please try again.");
      setState(prev => ({ ...prev, messages: [...prev.messages, botMessage] }));
    }
  };

  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { actions: { handleAIMessage } })
      )}
    </div>
  );
};

export default ActionProvider;
