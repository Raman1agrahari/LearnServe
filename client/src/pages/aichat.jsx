import React, { useState } from 'react';

export const AIChatbot = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState({});  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const renderFormattedText = (text) => {
    if (!text) return null;

    const parsedData = [];
    const lines = text.split('\n');
    let currentList = null;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
            if (currentList) {
                parsedData.push({ type: 'list', content: currentList });
                currentList = null;
            }
            return;
        }

        // Heading (1. Exercise)
        if (trimmedLine.match(/^\d+\.\s/)) {
            if (currentList) {
                parsedData.push({ type: 'list', content: currentList });
                currentList = null;
            }
            const headingText = trimmedLine.replace(/^\d+\.\s*/, '');
            parsedData.push({ type: 'heading', content: headingText });
        }
        
        else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            if (currentList) {
                parsedData.push({ type: 'list', content: currentList });
                currentList = null;
            }
            const headingText = trimmedLine.slice(2, -2);
            parsedData.push({ type: 'subheading', content: headingText });
        }
        
        else if (trimmedLine.startsWith('>')) {
            const listItemText = trimmedLine.substring(1).trim();
            if (!currentList) {
                currentList = [];
            }
            currentList.push(listItemText);
        }
       
        else {
            if (currentList) {
                parsedData.push({ type: 'list', content: currentList });
                currentList = null;
            }
            parsedData.push({ type: 'paragraph', content: trimmedLine });
        }
    });

    if (currentList) {
        parsedData.push({ type: 'list', content: currentList });
    }

    return parsedData.map((item, index) => {
        if (item.type === 'heading') return <h1 key={index}>{item.content}</h1>;
        if (item.type === 'subheading') return <h2 key={index}>{item.content}</h2>;
        if (item.type === 'paragraph') return <p key={index}>{item.content}</p>;
        if (item.type === 'list') {
            return (
                <ul key={index}>
                    {item.content.map((liItem, liIndex) => (
                        <li key={liIndex}>{liItem}</li>
                    ))}
                </ul>
            );
        }
        return null;
    });
};
  

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer({});
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/chat/ask-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setAnswer(data); 
      
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setError('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="chatbot-container">
      <h1>AI Assistant</h1>
      <p>Ask me anything about your course material!</p>
      
      <form onSubmit={handleSubmit} className="chatbot-form">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="chatbot-input"
          disabled={loading}
        />
        <button type="submit" disabled={loading} className="chatbot-button">
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      
      {answer.answer && (  
        <div className="chatbot-answer-box">
          <h3>AI's Answer:</h3>
          {renderFormattedText(answer.answer)}
        </div>
      )}
    </div>
  );
};