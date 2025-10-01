import { useRef, useState } from "react";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import { ChatMessages, type Message } from "./ChatMessages";
import { ChatInput, type ChatFormData } from "./ChatInput";
import popSound from "@/assets/sounds/pop.mp3";
import notificationSound from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isTyping, setIsTyping] = useState(false);
   const conversationId = useRef(crypto.randomUUID());
   const [error, setError] = useState("");

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
         setIsTyping(true);
         setError("");
         popAudio.play();

         const { data } = await axios.post<ChatResponse>("/api/chat", {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: "bot" },
         ]);
         notificationAudio.play();
      } catch (error) {
         console.log("error >>>>>", error);
         setError("Something went wrong, please try again");
      } finally {
         setIsTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col gap-3 flex-1">
            <ChatMessages messages={messages} />
            {isTyping && <TypingIndicator />}

            {error ? <p className="text-red-500">{error}</p> : null}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
