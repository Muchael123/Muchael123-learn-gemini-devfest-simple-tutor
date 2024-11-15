import React, { useState } from 'react'
import Loader from './Loader';
import { runGemini } from '../gemini/tutor';
import Markdown from "react-markdown";

function ChatSection() {
    const [history, setHistory] = useState([
      {
        role: "user",
        parts: [{ text: "What is 20/20\n" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "20/20 means 20 divided by 20. \n\nHere's how to solve it:\n\n* **Think of it as:** How many times does 20 go into 20?\n* **The answer is:** 1 \n\nSo, 20/20 = 1 \n",
          },
        ],
      },
    ]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
   const sendMessage = async () => {
     if (message.trim() === "") return;

     setLoading(true);

     const newHistory = [
       ...history,
       { role: "user", parts: [{ text: message }] }, // Add user message
     ];

     try {
       const response = await runGemini(message, history);
       // Append AI response
       setHistory([
         ...newHistory,
         { role: "model", parts: [{ text: response }] },
       ]);
       setMessage("");
     } catch (error) {
       console.log(error);
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="w-full bg-blue-900 p-12 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {history.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col w-full ${
                item.role === "user"
                  ? "justify-end items-end"
                  : "justify-start items-start"
              } mb-4`}
            >
              <div
                className={` max-w-[60%] p-2 rounded-lg ${
                  item.role === "user"
                    ? "bg-[#2E86C1] text-[#ffffff]"
                    : "bg-[#212F3D] text-[#f2f3f5]"
                } `}
              >
                {item.parts.map((part, index) => {
                  return (
                    <Markdown key={index} className="text-sm">
                      {part.text}
                    </Markdown>
                  );
                })}
              </div>
              <p className="text-sm italic">{item.role}</p>
            </div>
          );
        })}
      </div>
      <div className="flex p-2 mt-20">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg outline-none max-w-[400px] bg-transparent border border-[#00fe00]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={`bg-blue-500 text-white py-2 px-6 flex flex-row justify-center rounded-lg ml-2 ${
            message.trim() === "" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={sendMessage}
        >
          {loading ? (
            <span className='gap-2'>
              <Loader /> Loading...
            </span>
          ) : (
            <span>Send</span>
          )}{" "}
        </button>
      </div>
    </div>
  );
}

export default ChatSection