import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;
    const res = await axios.post("http://127.0.0.1:8000/chat", { message: input });
    setMessages([
      ...messages,
      { from: "user", text: input },
      { from: "bot", text: res.data.reply, sources: res.data.sources }
    ]);
    setInput("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>🗺️ Jharkhand Tourism Chatbot</h2>
      <div style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: 10,
        height: 400,
        overflowY: "auto",
        marginBottom: 10
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.from === "user" ? "right" : "left" }}>
            <p><b>{m.from}:</b> {m.text}</p>
            {m.sources && (
              <ul>
                {m.sources.map((s, j) => (
                  <li key={j}>
                    <a href={s.url} target="_blank" rel="noreferrer">{s.title || "Source"}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <input
        style={{ width: "70%", padding: "8px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage} style={{ padding: "8px 12px", marginLeft: "10px" }}>Send</button>
    </div>
  );
}

export default App;
