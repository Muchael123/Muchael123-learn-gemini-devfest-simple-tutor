import ChatSection from "./components/ChatSection";


function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 p-20 text-white">
      <h1 className="text-4xl text-green-500 backdrop-blur-md sticky top-0 my-4 tracking-wide font-semibold">Simple Maths tutor</h1>
      <ChatSection />
    </div>
  );
}

export default App;
