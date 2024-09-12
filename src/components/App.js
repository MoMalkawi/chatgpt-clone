import './App.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ChatWelcome from './ChatWelcome';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

function App() {
  return (
    <div id="chatbot">
      <Sidebar />

      <main>
        <header>
          <Navbar />
        </header>

        <section id="chat-content">
          <ChatWelcome />
          <ChatMessages />
          <ChatInput />
        </section>

        <footer>
          <p>ChatGPT can make mistakes. Check important info.</p>
        </footer>

      </main>

    </div>
  );
}

export default App;
