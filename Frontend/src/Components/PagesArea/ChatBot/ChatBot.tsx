import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const Chatbot = () => {
  React.useEffect(() => {
    addResponseMessage('Hello! How can I assist you today?');
  }, []);

  const handleNewUserMessage = (message: string) => {
    // Handle user input (connect with backend API or service)
    if (message.toLowerCase().includes('book')) {
      addResponseMessage('I can help you book a session. What would you like to book?');
    } else {
      addResponseMessage('Sorry, I did not understand that. Can you rephrase?');
    }
  };

  return (
    <div className="App">
      <Widget 
        handleNewUserMessage={handleNewUserMessage}
        title="Yoga & Reflexology Assistant"
        subtitle="Ask me anything!"
      />
    </div>
  );
};

export default Chatbot;
