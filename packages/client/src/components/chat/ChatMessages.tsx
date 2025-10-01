import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export type Message = {
   content: string;
   role: "user" | "bot";
};

type Props = {
   messages: Message[];
};

export const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const onCopyMessage = (e: React.ClipboardEvent<HTMLDivElement>): void => {
      const selection = window.getSelection()?.toString()?.trim();

      if (selection) {
         e.preventDefault();
         e.clipboardData.setData("text/plain", selection);
      }
   };

   return (
      <div className="flex flex-col gap-3">
         {messages.map((message, index) => (
            <div
               className={`px-3 py-1 max-w-md rounded-lg mb-10 ${message.role === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-100 text-black self-start"}`}
               key={index}
               onCopy={onCopyMessage}
               ref={index === messages.length - 1 ? lastMessageRef : null}
            >
               <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};
