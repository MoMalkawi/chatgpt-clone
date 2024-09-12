

export default function ChatMessages() {
    return (
        <div id="chat-messages">
            
            <div className="message-exchange">
                <div className="message user-message">
                    <p className="message-text">Hello!</p>
                </div>

                <div className="message ai-message">
                    <p className="message-text">Hi! How can I assist you today?</p>
                </div>
            </div>

            <div className="message-exchange">
                <div className="message user-message">
                    <p className="message-text">I'm good</p>
                </div>

                <div className="message ai-message">
                    <p className="message-text">That's splendid, let me know how I can help you?</p>
                </div>
            </div>

        </div>
    )
}