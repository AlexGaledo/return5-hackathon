import BASE_URL from '../api/axios'
import { useEffect, useMemo, useState, useRef } from "react";
import ReactMarkdown from 'react-markdown';


export const ChatBot  = () =>{
    const [open, setOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [lastChat, setLastChat] = useState('');
    const [input, setInput] = useState('');
    const initialized = useRef(false);
  



    
    const initialResponse = async () => {
        if (!initialized.current) {
        try {
            const response = await BASE_URL.post('/tobi/', {
            user_prompt: 'this is an initialization message, go ahead introduce yourself and follow your system instructions.'
            });

            setChatHistory(prev => [...prev, { role: 'tobi', text: response.data.response }]);
            initialized.current = true; // Mark as initialized synchronously
        } catch (e) {
            alert("error:" + e);
        }
        }
    };

    const getChatbotResponse = async () =>{
        try{

        const formattedHistory = chatHistory.map(msg => ({
            role: msg.role === 'tobi' ? 'tobi' : 'user',
            content: msg.text
        }));

        const response = await BASE_URL.post('/tobi/',{
            'history': formattedHistory,
            'user_prompt':input
        });
            //ensures user has inputted anything
            if (input){
                setChatHistory(prev => [...prev,
                    { role: 'user', text: input },
                    { role: 'tobi', text: response.data.response }
                ]);
            }

            setLastChat({role:'user', text:input});
        }
        catch(e){
            alert("error:" + e);
        }
        setInput('');
    }
    
    

    // useEffect(()=>{
    //     sessionStorage.setItem('chatbot_history', chatHistory);
    //     setChatHistory(sessionStorage.getItem('chatbot_history'));
    // },[])

    return (
        <>
        <button
                className="chatbot-toggle-button"
                onClick={() => {setOpen(prev => !prev), initialResponse()}}
                hidden={open}
        >💬</button>

        <div className={`chatbot-container ${open ? '' : 'hidden'}`}>
        <div className="chatbot-header">
          <strong>Tobi🤖🤖🤖</strong>
          <button
            onClick={() => setOpen(prev => !prev)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >×</button>
        </div>

        <div className="chatbot-chatspace">
            {chatHistory.map((msg, i) => (
            <div key={i} style={msg.role==='tobi'?{color:'white', alignItems:'left'}:{color:'blue',alignItems:'right'}}>
              <strong>{msg.role === 'tobi'?'tobi🤖' : 'user😎'}:</strong> 
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={getChatbotResponse}>Send</button>
        </div>
      </div>
    </>
    );
}

export default ChatBot;

