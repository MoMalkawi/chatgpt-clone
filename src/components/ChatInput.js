import { useState } from 'react';
import getAnswer from "../logic/llm/response";
import useChatSessionStore from "../logic/stores/sessions";

export default function ChatInput() {
    const [query, setQuery] = useState("");
    const { sessions, appendAnswerToActiveMessage, createActiveMessageExchange, finalizeActivateMessageExchange, currentSessionId } = useChatSessionStore();

    function submitAndSetAnswer() {
        if (query.trim() === "") return;
        
        const answer = getAnswer(query);
        let activeExchange = sessions[currentSessionId].activeExchange;
        if (!activeExchange)
            createActiveMessageExchange(currentSessionId, query);
        
        appendAnswerToActiveMessage(currentSessionId, answer);

        finalizeActivateMessageExchange(currentSessionId, false);
        
        console.log(sessions[currentSessionId].activeExchange.userMessage);
        
        setQuery("");
    }

    return (
        <div className="chat-input-container">
            <textarea 
                id="chat-input" 
                rows="3" 
                placeholder="Message ChatGPT" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={submitAndSetAnswer}>Send</button>
        </div>
    );
}
