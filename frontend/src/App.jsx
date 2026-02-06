// import './App.css'
// import { loginwithGoogle } from "./auth"
// import { useContext, useEffect, useState } from 'react'
// import { Rabbitzcontext } from './context/Rabbitzcontext'
// import { io } from 'socket.io-client'

// function App() {
//   const { user, setuser } = useContext(Rabbitzcontext)
//   const userName = user && user.name
//   const [prompt, setprompt] = useState("")
//   function showPreview(html) {
//     const iframe = document.getElementById("preview");
//     if (iframe) iframe.srcdoc = html;
//   }

//   const build = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_backendurl}/build`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: user.name,
//           prompt: prompt,
//         })
//       })
//       const buildResult = await response.text()
//       console.log("Build event sent:", buildResult)

      
//       const response2 = await fetch(`${import.meta.env.VITE_backendurl}/rabbitz/current`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: user.name,
//         })
//       })
      
//       if (response2.ok) {
//         const htmlContent = await response2.json()
//         showPreview(htmlContent)
//         console.log("HTML preview:", htmlContent)
//       } else {
//         console.error("Failed to fetch current result:", await response2.text())
//       }
//     } catch (err) {
//       console.error("Build error:", err)
//     }
//   }

  
//   useEffect(() => {
//     const socket = io(import.meta.env.VITE_backendurl)
//     socket.on('connect', () => console.log('socket connected', socket.id))

   
//     if (userName) {
//       socket.emit('join', userName)
//     }

//     socket.on('build_done', (data) => {
      
//       if (userName && data.name === userName) {
//         showPreview(data.html)
//         console.log('Received build via socket')
//       }
//     })

//     return () => socket.disconnect()
//   }, [userName])

//   const handlelogin = async () => {
    
//       let name = await loginwithGoogle()
      
//       console.log("login done", name)

//       setuser({
//         name: name,
//         prompt: prompt,
//         result: "",
//       })

//       console.log("name:", user.name)

      
//   }
//   const sebdd=async()=>{
//     console.log("yesssssssssssssssss")
//     const response = await fetch(`${import.meta.env.VITE_backendurl}/rabbitz/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: user.name,
//           prompt: prompt,
//           result: "",
//         })
//       })
//       console.log("hahxkchkjah")

//       console.log("response:", response)
    
//   }



//   return (
//     <>
//       <input
//         type="text"
//         value={prompt}
//         onChange={(e) => setprompt(e.target.value)}
//         placeholder="Enter prompt..."
//       />
//       <button onClick={sebdd}>sendd</button>
//       <br />
//       <button onClick={build}>builddddddddddddddd</button>
//       <iframe
//   id="preview"
//   title="preview"
//   style={{ width: "100%", height: "1000px", border: "1px solid #ccc" }}
// ></iframe>


//       <button onClick={handlelogin}>
//         Login
//       </button>

//     </>
//   )
// }

// export default App



import './App.css'
import { loginwithGoogle } from "./auth"
import { useContext, useEffect, useState } from 'react'
import { Rabbitzcontext } from './context/Rabbitzcontext'
import { io } from 'socket.io-client'

function App() {
  const { user, setuser } = useContext(Rabbitzcontext)
  const userName = user && user.name
  const [prompt, setprompt] = useState("")
  
  // New state to handle layout transition without breaking logic
  const [isExpanded, setIsExpanded] = useState(false)

  function showPreview(html) {
    const iframe = document.getElementById("preview");
    if (iframe) iframe.srcdoc = html;
  }

  const build = async () => {
    // Trigger layout change
    setIsExpanded(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_backendurl}/build`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
          prompt: prompt,
        })
      })
      const buildResult = await response.text()
      console.log("Build event sent:", buildResult)

      
      const response2 = await fetch(`${import.meta.env.VITE_backendurl}/rabbitz/current`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
        })
      })
      
      if (response2.ok) {
        const htmlContent = await response2.json()
        showPreview(htmlContent)
        console.log("HTML preview:", htmlContent)
      } else {
        console.error("Failed to fetch current result:", await response2.text())
      }
    } catch (err) {
      console.error("Build error:", err)
    }
  }

  
  useEffect(() => {
    const socket = io(import.meta.env.VITE_backendurl)
    socket.on('connect', () => console.log('socket connected', socket.id))

   
    if (userName) {
      socket.emit('join', userName)
    }

    socket.on('build_done', (data) => {
      
      if (userName && data.name === userName) {
        showPreview(data.html)
        // Ensure preview is visible if build comes in
        setIsExpanded(true) 
        console.log('Received build via socket')
      }
    })

    return () => socket.disconnect()
  }, [userName])

  const handlelogin = async () => {
    
      let name = await loginwithGoogle()
      
      console.log("login done", name)

      setuser({
        name: name,
        prompt: prompt,
        result: "",
      })

      console.log("name:", user.name)

      
  }
  const sebdd=async()=>{
    // Trigger layout change
    setIsExpanded(true)

    console.log("yesssssssssssssssss")
    const response = await fetch(`${import.meta.env.VITE_backendurl}/rabbitz/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.name,
          prompt: prompt,
          result: "",
        })
      })
      console.log("hahxkchkjah")

      console.log("response:", response)
    
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 flex flex-col">
      
      {/* Header / Navbar - Added relative and z-50 to ensure it stays on top */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950 relative z-50">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 bg-white rounded-full"></div>
           <span className="font-bold text-lg tracking-tight">Rabbitz</span>
        </div>
        <button 
          onClick={handlelogin} 
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          {user && user.name ? `Connected: ${user.name}` : "Login"}
        </button>
      </header>

      {/* Main Layout Area */}
      <main className={`flex-1 flex transition-all duration-500 ease-in-out ${isExpanded ? 'flex-row' : 'flex-col items-center justify-center -mt-20'}`}>
        
        {/* Left Section (Input) */}
        <div className={`
            flex flex-col gap-4 transition-all duration-500
            ${isExpanded 
              ? 'w-[400px] border-r border-zinc-900 p-4 bg-zinc-950' 
              : 'w-full max-w-2xl px-4'
            }
        `}>
          {!isExpanded && (
             <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent pb-2">
               What will you ship today?
             </h1>
          )}

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setprompt(e.target.value)}
              placeholder="Describe your app..."
              className={`
                w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-100 
                placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-zinc-700
                resize-none transition-all
                ${isExpanded ? 'h-[calc(100vh-140px)] text-sm' : 'h-32 text-lg shadow-2xl'}
              `}
            />
            
            <div className={`flex gap-3 mt-4 ${isExpanded ? 'absolute bottom-4 right-4 mt-0' : 'justify-center'}`}>
               <button 
                onClick={sebdd}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Send
              </button>
              <button 
                onClick={build}
                className="px-6 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-all shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              >
                {isExpanded ? 'Update' : 'Generate'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section (Preview) */}
        <div className={`
          flex-1 bg-zinc-900 relative transition-opacity duration-700
          ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}
        `}>
          {/* Browser Mockup Header */}
          <div className="h-10 bg-zinc-950 border-b border-zinc-800 flex items-center px-4 gap-2">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
             </div>
             <div className="mx-auto px-3 py-1 bg-zinc-900 rounded text-xs text-zinc-500 font-mono w-64 text-center">
                preview:3000
             </div>
          </div>

          <iframe
            id="preview"
            title="preview"
            className="w-full h-[calc(100%-40px)] bg-white border-none"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>

      </main>
    </div>
  )
}

export default App