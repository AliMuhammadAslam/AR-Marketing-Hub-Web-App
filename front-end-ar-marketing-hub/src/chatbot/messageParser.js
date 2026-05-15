import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    actions.handleAIMessage(message);
  };

  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { parse, actions })
      )}
    </div>
  );
};

export default MessageParser;
