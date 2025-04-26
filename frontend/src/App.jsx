import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import gsap from "gsap";

function App(){
  const [showLanding, setShowLanding] = useState(true);
  const [code, setCode] = useState("const hello = 'Hello World';\nconsole.log(hello);");
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode(){
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/ai/get-review`, {code: code})
    console.log(response.data)
    setReview(response.data)
  }

  // GSAP transition handler
  const handleContinue = () => {
    gsap.to("#landing-page", { opacity: 0, duration: 0.8, onComplete: () => setShowLanding(false) });
  };

  if (showLanding) {
    return (
      <div id="landing-page" style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 50%, #444851 0%, #a3a5ab 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <iframe src="https://my.spline.design/nexbotrobotcharacterconcept-ymAIWBRK9oEx0Z3jh27eOIQ1/" title="Landing" style={{border: 'none', width: '100vw', height: '100vh'}} allowFullScreen></iframe>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(110,110,120,0.32)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
        <h1
          style={{
            position: 'absolute',
            top: '15%',
            left: '7%',
            zIndex: 3,
            fontSize: '2.8rem',
            fontWeight: 900,
            letterSpacing: '2px',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            margin: 0,
            color: '#f3f4f6',
            textShadow: '0 2px 8px #2228',
            opacity: 0.98
          }}
        >
          Code Reviewer
        </h1>
        <div
          style={{
            position: 'absolute',
            top: '21%',
            left: '7.2%',
            zIndex: 3,
            fontSize: '1.22rem',
            fontWeight: 500,
            color: '#fff',
            letterSpacing: '0.3px',
            textShadow: '0 2px 12px #222b, 0 1px 0 #fff4',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            opacity: 1
          }}
        >
          AI-powered code reviews, instantly and interactively.
        </div>
        <button
          onClick={handleContinue}
          style={{
            position: 'absolute',
            top: '7%',
            right: '7%',
            zIndex: 3,
            padding: '0.6rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '1.5rem',
            border: 'none',
            background: 'rgba(40,40,48,0.92)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            letterSpacing: '1px',
            transition: 'background 0.2s',
            backdropFilter: 'blur(2px)'
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  // Navbar for main page
  const Navbar = () => (
    <nav style={{
      width: '100vw',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 5vw',
      background: 'rgba(44,46,55,0.85)',
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      zIndex: 4,
      backdropFilter: 'blur(6px)',
      position: 'sticky',
      top: 0
    }}>
      <span style={{
        fontSize: '2rem', fontWeight: 800, letterSpacing: '1.5px', color: '#e0e0e0', textShadow: '0 1px 4px #222a', fontFamily: 'Segoe UI, Arial, sans-serif'}}>
        <span style={{color: '#e0e0e0'}}>Code Reviewer</span>
      </span>
    </nav>
  );

  return(
    <>
      <Navbar />
      <main style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 70px)',
        background: 'none',
        gap: '2.5vw',
      }}>
        <div className="left" style={{
          flex: '0 1 48vw',
          minWidth: 420,
          maxWidth: 720,
          minHeight: '60vh',
          maxHeight: '80vh',
          height: '70vh',
          background: 'rgba(46,49,56,0.98)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px 0 #2224, 0 1.5px 0 #fff1',
          padding: '1.5rem 1.3rem 1.1rem 1.3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          border: '1.5px solid #2b2e34',
          backdropFilter: 'blur(2.5px)'
        }}>
          <div className="code" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            marginBottom: '1.1rem',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #23262e 60%, #363a43 100%)',
            boxShadow: '0 2px 12px #0002',
            overflow: 'hidden',
          }}>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "none",
                outline: "none",
                borderRadius: 10,
                width: "100%",
                height: '100%',
                background: 'transparent',
                color: '#e0e0e0',
                resize: 'none',
                overflowY: 'auto',
                boxSizing: 'border-box',
                boxShadow: 'none',
                minHeight: 0,
                maxHeight: 'none',
              }}
              textareaProps={{
                style: {
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  background: 'transparent',
                  color: '#e0e0e0',
                  resize: 'none',
                  height: '100%',
                  minHeight: 0,
                  maxHeight: 'none',
                }
              }}
            />
          </div>
          <button className="review" onClick={reviewCode} style={{
            marginTop: '0.2rem',
            padding: '0.55rem 1.25rem',
            fontSize: '1rem',
            borderRadius: '1.2rem',
            border: 'none',
            background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7ff 100%)',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0002',
            letterSpacing: '1px',
            transition: 'background 0.18s, box-shadow 0.18s',
            outline: 'none'
          }}>
            Review
          </button>
        </div>
        <div className="right" style={{
          flex: '0 1 48vw',
          minWidth: 420,
          maxWidth: 720,
          minHeight: '60vh',
          maxHeight: '80vh',
          height: '70vh',
          background: 'rgba(46,49,56,0.98)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px 0 #2224, 0 1.5px 0 #fff1',
          padding: '1.5rem 1.3rem 1.1rem 1.3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          border: '1.5px solid #2b2e34',
          backdropFilter: 'blur(2.5px)',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App;