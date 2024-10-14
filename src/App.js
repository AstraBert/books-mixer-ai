import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
import { generatePlotImage } from './fullStuff';  // Import the main function

function App() {
  const [messages, setMessages] = useState([]);
  const [openaiKey, setOpenaiKey] = useState('');
  const [imageKey, setImageKey] = useState('');
  const [book1, setBook1] = useState('');
  const [book2, setBook2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (messageText) => {
    if (!openaiKey || !imageKey || !book1 || !book2) {
      alert('Please provide both API keys and book titles.');
      return;
    }

    setIsLoading(true);

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: messageText }
    ]);

    try {
      // Generate the mixed plot and image URL
      const { bookmix, imageUrl } = await generatePlotImage(book1, book2, messageText, openaiKey, imageKey);
      console.log("Image URL: ", imageUrl);

      // Add mixed plot and image URL from Zoe to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Zoe', text: `Here is the mixed plot:\n${bookmix}` },
        { sender: 'Zoe', text: `Here is the generated thumbnail for the new story:` },
        { sender: 'Zoe', text: `<img src='${imageUrl}' alt='Mixed story plot thumbnail'>` }
      ]);

    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Zoe', text: `An error occurred: ${error.message}` }
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Books-Mixer AI</h1>
      <img 
        src="books_mixer_ai.png" 
        alt="Books-Mixer AI Logo" 
        style={{ width: '200px', marginBottom: '20px' }} 
      />
      <div style={{ width: '100%', maxWidth: '800px', height: '500px', marginBottom: '20px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((msg, i) => (
                <Message
                  key={i}
                  model={{
                    message: msg.text,
                    sentTime: 'just now',
                    sender: msg.sender,
                    direction: msg.sender === 'user' ? 'outgoing' : 'incoming',
                    position: 'single'
                  }}
                >
                  {msg.sender !== 'user' && (
                    <Avatar
                      src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                      name="Zoe"
                    />
                  )}
                </Message>
              ))}
            </MessageList>
            <MessageInput 
              placeholder="Type your message here" 
              attachButton={false}
              sendButton={true}
              onSend={handleSend} 
              disabled={isLoading} 
            />
          </ChatContainer>
        </MainContainer>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
      <div style={{ marginTop: 'auto', display: 'flex', gap: '20px' }}>
        <a 
          href="https://astrabert.github.io/books-mixer-ai" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2596be',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Docs
        </a>
        <a 
          href="https://github.com/sponsors/AstraBert" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2596be',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Donate
        </a>
      </div>
        <input 
          type="text" 
          placeholder="OpenAI API Key" 
          value={openaiKey} 
          onChange={(e) => setOpenaiKey(e.target.value)} 
          style={{ margin: '10px', width: '100%', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="ModelsLab API Key" 
          value={imageKey} 
          onChange={(e) => setImageKey(e.target.value)} 
          style={{ margin: '10px', width: '100%', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="First Book Title" 
          value={book1} 
          onChange={(e) => setBook1(e.target.value)} 
          style={{ margin: '10px', width: '100%', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="Second Book Title" 
          value={book2} 
          onChange={(e) => setBook2(e.target.value)} 
          style={{ margin: '10px', width: '100%', padding: '5px' }}
        />
      </div>

      
    </div>
  );
}

export default App;