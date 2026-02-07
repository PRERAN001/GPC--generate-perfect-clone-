

// import "./App.css";
// import { loginwithGoogle } from "./auth";
// import { useContext, useEffect, useState } from "react";
// import { Rabbitzcontext } from "./context/Rabbitzcontext";
// import { io } from "socket.io-client";

// function App() {
//   const { user, setuser } = useContext(Rabbitzcontext);
//   const userName = user && user.name;
//   const [prompt, setprompt] = useState("");
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasInitialized, setHasInitialized] = useState(false);

//   function showPreview(html) {
//     const iframe = document.getElementById("preview");
//     console.log("preview eeeeeeeeeeee", html);
//     if (iframe) iframe.srcdoc = html;
//   }
//  const sebdd = async () => {
//     if (!user || !user.name) {
//       alert("Please login first");
//       return;
//     }

//     console.log("yesssssssssssssssss");
//     const response = await fetch(
//       `${import.meta.env.VITE_backendurl}/rabbitz/login`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: user.name,
//           prompt: prompt,
//           result: "",
//         }),
//       },
//     );
//     console.log("hahxkchkjah");
//     console.log("response:", response);
//   };

//   const build = async () => {
//     await sebdd()
//     if (!user || !user.name) {
//       alert("Please login first");
//       return;
//     }

//     setIsExpanded(true);
//     setIsLoading(true);
//     setHasInitialized(true);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_backendurl}/build`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: user.name,
//           prompt: prompt,
//         }),
//       });
//       const buildResult = await response.text();
//       console.log("Build event sent:", buildResult);
//     } catch (err) {
//       console.error("Build error:", err);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const socket = io(import.meta.env.VITE_backendurl);
//     socket.on("connect", () => console.log("socket connected", socket.id));

//     if (userName) {
//       socket.emit("join", userName);
//     }

//     socket.on("build_done", (data) => {
//       if (userName && data.name === userName) {
//         console.log("htmlllllllllllllllllllll from socket", data.html);
//         showPreview(data.html);

//         setIsLoading(false);
//         console.log("Received build via socket");
//       }
//     });

//     return () => socket.disconnect();
//   }, [userName]);

//   const handlelogin = async () => {
//     let name = await loginwithGoogle();

//     console.log("login done", name);

//     setuser({
//       name: name,
//       prompt: prompt,
//       result: "",
//     });

//     console.log("name:", user.name);
//   };
 
//   return (
//     <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 flex flex-col">
//       <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950 relative z-50">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 bg-white rounded-full"></div>
//           <span className="font-bold text-lg tracking-tight">Rabbitz</span>
//         </div>
//         <button
//           onClick={handlelogin}
//           className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
//         >
//           {user && user.name ? `Connected: ${user.name}` : "Login"}
//         </button>
//       </header>

//       {/* Main Layout Area */}
//       <main
//         className={`flex-1 flex transition-all duration-500 ease-in-out ${isExpanded ? "flex-row" : "flex-col items-center justify-center -mt-20"}`}
//       >
//         {/* Left Section (Input) */}
//         <div
//           className={`
//             flex flex-col gap-4 transition-all duration-500
//             ${
//               isExpanded
//                 ? "w-[400px] border-r border-zinc-900 p-4 bg-zinc-950"
//                 : "w-full max-w-2xl px-4"
//             }
//         `}
//         >
//           {!isExpanded && (
//             <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent pb-2">
//               What will you ship today?
//             </h1>
//           )}

//           <div className="relative">
//             <textarea
//               value={prompt}
//               onChange={(e) => setprompt(e.target.value)}
//               placeholder="Describe your app..."
//               className={`
//                 w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-100 
//                 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-zinc-700
//                 resize-none transition-all
//                 ${isExpanded ? "h-[calc(100vh-140px)] text-sm" : "h-32 text-lg shadow-2xl"}
//               `}
//             />

//             <div
//               className={`flex gap-3 mt-4 ${isExpanded ? "absolute bottom-4 right-4 mt-0" : "justify-center"}`}
//             >
              
//               <button
//                 onClick={build}
//                 disabled={!user || !user.name || isLoading}
//                 className={`px-6 py-2 text-sm font-medium rounded-lg transition-all shadow-[0_0_10px_rgba(255,255,255,0.1)] ${isLoading ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" : !user || !user.name ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" : "bg-white text-black hover:bg-zinc-200"}`}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center gap-2">
//                     <span className="inline-block w-3 h-3 border-2 border-zinc-400 border-t-white rounded-full animate-spin"></span>
//                     Generating...
//                   </span>
//                 ) : (
//                   "Generate"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Section (Preview) */}
//         <div
//           className={`
//           flex-1 bg-zinc-900 relative transition-opacity duration-700
//           ${isExpanded ? "opacity-100" : "opacity-0 hidden"}
//         `}
//         >
//           {/* Browser Mockup Header */}
//           <div className="h-10 bg-zinc-950 border-b border-zinc-800 flex items-center px-4 gap-2">
//             <div className="flex gap-1.5">
//               <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
//               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
//               <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
//             </div>
//             <div className="mx-auto px-3 py-1 bg-zinc-900 rounded text-xs text-zinc-500 font-mono w-64 text-center">
//               preview:3000
//             </div>
//           </div>

//           <div className="w-full h-[calc(100%-40px)] relative">
//             {isLoading && (
//               <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
//                 Loading...
//               </div>
//             )}

//             <iframe
//               id="preview"
//               title="preview"
//               className="w-full h-full bg-white border-none"
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;



import "./App.css";
import { loginwithGoogle } from "./auth";
import { useContext, useEffect, useState } from "react";
import { Rabbitzcontext } from "./context/Rabbitzcontext";
import { io } from "socket.io-client";

function App() {
  const { user, setuser } = useContext(Rabbitzcontext);
  const userName = user && user.name;
  const [prompt, setprompt] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  function showPreview(html) {
    const iframe = document.getElementById("preview");
    console.log("preview eeeeeeeeeeee", html);
    if (iframe) iframe.srcdoc = html;
  }

  const sebdd = async () => {
    if (!user || !user.name) {
      alert("Please login first");
      return;
    }

    console.log("yesssssssssssssssss");
    const response = await fetch(
      `${import.meta.env.VITE_backendurl}/rabbitz/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          prompt: prompt,
          result: "",
        }),
      }
    );
    console.log("hahxkchkjah");
    console.log("response:", response);
  };

  const build = async () => {
    await sebdd();
    if (!user || !user.name) {
      alert("Please login first");
      return;
    }

    setIsExpanded(true);
    setIsLoading(true);
    setHasInitialized(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_backendurl}/build`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          prompt: prompt,
        }),
      });
      const buildResult = await response.text();
      console.log("Build event sent:", buildResult);
    } catch (err) {
      console.error("Build error:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_backendurl);
    socket.on("connect", () => console.log("socket connected", socket.id));

    if (userName) {
      socket.emit("join", userName);
    }

    socket.on("build_done", (data) => {
      if (userName && data.name === userName) {
        console.log("htmlllllllllllllllllllll from socket", data.html);
        showPreview(data.html);

        setIsLoading(false);
        console.log("Received build via socket");
      }
    });

    return () => socket.disconnect();
  }, [userName]);

  const handlelogin = async () => {
    let name = await loginwithGoogle();

    console.log("login done", name);

    setuser({
      name: name,
      prompt: prompt,
      result: "",
    });

    console.log("name:", user.name);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-orange-500 selection:text-black flex flex-col overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-400 z-50"></div>
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-zinc-900 bg-black/90 backdrop-blur-sm relative z-40">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center group-hover:border-orange-500 transition-colors">
            <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Rabbitz<span className="text-orange-500">.</span>io
          </span>
        </div>
        <button
          onClick={handlelogin}
          className={`
            px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all border
            ${
              user && user.name
                ? "bg-zinc-900 border-zinc-800 text-blue-400"
                : "bg-blue-600 border-blue-600 text-white hover:bg-blue-500 hover:border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            }
          `}
        >
          {user && user.name ? `[ ${user.name} ]` : "Initialize Session"}
        </button>
      </header>

      {/* Main Layout Area */}
      <main className="relative z-10 flex-1 flex flex-col h-[calc(100vh-73px)]">
        <div
          className={`
            flex-1 flex transition-all duration-500 ease-in-out
            ${isExpanded ? "flex-row" : "flex-col items-center justify-center p-6"}
        `}
        >
          {/* Left Section (Input / Chat) */}
          <div
            className={`
              flex flex-col relative transition-all duration-500 ease-in-out
              ${
                isExpanded
                  ? "w-[450px] border-r border-zinc-900 bg-black"
                  : "w-full max-w-4xl"
              }
            `}
          >
            {/* Hero Text */}
            <div
              className={`
                mb-8 transition-all duration-500
                ${isExpanded ? "hidden" : "block text-center"}
            `}
            >
              <div className="inline-block px-3 py-1 mb-4 border border-zinc-800 rounded-full bg-zinc-900/50">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">v2.0 System Ready</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                Build it <span className="text-blue-500">Fast.</span>
                <br />
                Make it <span className="text-orange-500">Real.</span>
              </h1>
              <p className="text-zinc-500 text-lg max-w-lg mx-auto">
                Enter your requirements below. The system will generate the UI structure and logic instantly.
              </p>
            </div>

            {/* Input Container */}
            <div
              className={`
                flex flex-col h-full
                ${isExpanded ? "p-0" : ""}
            `}
            >
              <div
                className={`
                  relative flex flex-col bg-zinc-950/50 border transition-all duration-300
                  ${
                    isExpanded
                      ? "h-full border-0"
                      : "rounded-xl border-zinc-800 hover:border-blue-500/50 focus-within:border-orange-500 shadow-2xl"
                  }
              `}
              >
                {/* Editor Header (Visible when expanded) */}
                {isExpanded && (
                  <div className="px-4 py-3 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Prompt Console</span>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                       <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                    </div>
                  </div>
                )}

                <textarea
                  value={prompt}
                  onChange={(e) => setprompt(e.target.value)}
                  placeholder="// Describe your application logic here..."
                  className={`
                    w-full bg-transparent text-zinc-100 placeholder-zinc-600 resize-none focus:outline-none font-mono leading-relaxed
                    ${
                      isExpanded
                        ? "flex-1 text-sm p-4"
                        : "h-40 p-6 text-lg"
                    }
                  `}
                  spellCheck="false"
                />

                {/* Toolbar / Actions */}
                <div
                  className={`
                    flex items-center justify-between
                    ${isExpanded ? "p-4 border-t border-zinc-900 bg-zinc-950" : "p-4 border-t border-zinc-900/50"}
                  `}
                >
                  <div className="flex gap-4">
                     {!isExpanded && (
                       <div className="flex items-center gap-2 text-zinc-600 text-xs">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                          <span>AI Agent Standby</span>
                       </div>
                     )}
                  </div>
                  
                  <button
                    onClick={build}
                    disabled={!user || !user.name || isLoading}
                    className={`
                      flex items-center justify-center gap-2 transition-all duration-200 uppercase tracking-wider font-bold text-xs
                      ${isExpanded ? "w-full py-3" : "px-8 py-3"}
                      ${
                        isLoading
                          ? "bg-zinc-800 text-zinc-500 border border-zinc-800 cursor-not-allowed"
                          : !user || !user.name
                          ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                          : "bg-orange-600 text-white hover:bg-orange-500 border border-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                      }
                    `}
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        {isExpanded ? "Execute Update" : "Generate Build"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Preview) */}
          <div
            className={`
              flex-1 bg-zinc-950 relative flex flex-col transition-all duration-700 ease-in-out
              ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 absolute right-0 w-1/2 h-full"}
            `}
          >
            {/* Mockup Browser Bar */}
            <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-4">
              {/* Traffic Lights - Themed */}
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
              </div>
              
              {/* Address Bar */}
              <div className="flex-1">
                 <div className="w-full max-w-md mx-auto bg-black border border-zinc-800 h-6 flex items-center px-3 gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-[10px] text-zinc-500 font-mono">localhost:3000/preview</span>
                 </div>
              </div>

              <div className="flex gap-3 text-zinc-600">
                <div className="w-4 h-4 border border-current rounded-sm"></div>
                <div className="w-4 h-4 border border-current rounded-sm"></div>
              </div>
            </div>

            <div className="flex-1 relative bg-black overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 gap-4">
                  <div className="w-16 h-16 border-4 border-blue-900 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="flex gap-2 text-xs font-mono text-blue-500 uppercase tracking-widest">
                    <span>Compiling</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </div>
                </div>
              )}

              <iframe
                id="preview"
                title="preview"
                className="w-full h-full bg-white border-none"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
