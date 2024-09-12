

export default function Navbar() {
    return (
        <nav id="nav-header">

            <div className="header-left">
            <button>Open Sidebar</button>
            <button>New Chat</button>
            <select>
                <option>GPT 3.5</option>
                <option>GPT 4o Mini</option>
            </select>
            </div>

            <div className="header-right">
            <button>Profile</button>
            </div>

      </nav>
    )
}