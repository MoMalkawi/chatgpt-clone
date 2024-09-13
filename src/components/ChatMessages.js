import { useEffect } from 'react';
import useChatSessionStore from "../logic/stores/sessions"

export default function ChatMessages() {
    const { setOrDefaultCurrentSession, sessions, currentSessionId, currentSessionInitialized } = useChatSessionStore();

    useEffect(() => {
        setOrDefaultCurrentSession();
    }, [setOrDefaultCurrentSession]);

    if (!currentSessionInitialized) {
        return <p>Loading...</p>;
    }

    const session = sessions[currentSessionId];

    return (
        <div id="chat-messages">            
            
            {Object.entries(session.messageExchanges).map(([_, message]) => (
                <div className="message-exchange">
                    <div className="message user-message">
                        <p className="message-text">{message.userMessage}</p>
                    </div>

                    <div className="message ai-message">
                        <p className="message-text">{message.aiMessage}</p>
                    </div>
                </div>
            ))}


            {session.activeExchange && (
                <div className="message-exchange">
                    <div className="message user-message">
                        <p className="message-text">{session.activeExchange.userMessage}</p>
                    </div>
                    <div className="message ai-message">
                        <p className="message-text">{session.activeExchange.aiMessage}</p>
                    </div>
                </div>
            )}

        </div>
    )
}