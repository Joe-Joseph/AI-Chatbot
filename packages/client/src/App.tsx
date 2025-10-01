import ChatBot from "./components/chat/ChatBot";

function App() {
   // useEffect(() => {
   //    fetch("/api/hello")
   //       .then((res) => res.json())
   //       .then((data) => setMessage(data.message));
   // }, []);

   return (
      <div className="p-4 h-screen w-full">
         <ChatBot />
      </div>
   );
}

export default App;
