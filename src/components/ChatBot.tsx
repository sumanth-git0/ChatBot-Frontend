import React, { useEffect, useRef, useState } from "react";
import api from "../api.js";
import keycloak from "../keycloak.js";
import fetchuser from "../utils/user.js";

interface ChatMessage {
  id: number;
  query: string;
  response: string;
  user_id: any;
}

interface QueryInput {
  query: string;
  user_id: any;
}

const ChatBot: React.FC = () => {
  const [user, setUser] = useState<any>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const fetchChats = async (user_id: any) => {
    const resp = await api.get<ChatMessage[]>("/chats/user/" + user_id);
    setChat(resp.data);
  };

  useEffect(() => {
    const init = async () => {
      const current_user = await fetchuser();
      setUser(current_user);

      await fetchChats(current_user.id);
    };

    init();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const queryInput: QueryInput = { user_id: user.id, query: query };
    setQuery("");

    const newMessage: ChatMessage = {
      id: Date.now(),
      user_id: user.id,
      query: query,
      response: "",
    };
    setChat((prev) => [...prev, newMessage]);

    await api.post("/chats/invoke", queryInput);

    setLoading(false);
    fetchChats(user.id);
  };
  return (
    <>
      <div className="container mt-4 d-flex justify-content-center">
        <div
          className="card shadow-lg border-0"
          style={{ width: "100%", maxWidth: "800px" }}
        >
          {/* Header */}
          <div className="card-header bg-primary text-white text-center fw-bold">
            🤖 AI Chatbot
          </div>

          {/* Chat Body */}
          <div
            className="card-body overflow-auto"
            style={{
              height: "420px",
              backgroundColor: "#f5f7fb",
            }}
          >
            {chat.map((msg, index) => (
              <div key={index} className="mb-3">
                {/* User Message */}
                <div className="d-flex justify-content-end align-items-end mb-1">
                  <div
                    className="px-3 py-2 text-white"
                    style={{
                      backgroundColor: "#0d6efd",
                      borderRadius: "18px 18px 4px 18px",
                      maxWidth: "70%",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.query}
                  </div>
                </div>

                {/* Bot Message */}
                {msg.response && (
                  <div className="d-flex justify-content-start align-items-end">
                    <div
                      className="px-3 py-2"
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "18px 18px 18px 4px",
                        maxWidth: "70%",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      {msg.response}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="d-flex justify-content-start mt-2">
                <div className="px-3 py-2 bg-white rounded-pill shadow-sm">
                  <span className="spinner-border spinner-border-sm me-2" />
                  Thinking...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="card-footer bg-white border-top">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Type your message..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  boxShadow: "none",
                }}
              />
              <button
                className="btn btn-primary px-4"
                onClick={handleSubmit}
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
