import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'AR Marketing Bot';

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. Ask me anything about our products, events, or AR marketing!`)
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;