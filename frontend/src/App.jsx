import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import{ useState, useEffect } from "react";
import Editor from "react-simple-code-editor"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";

function App(){

  useEffect(() => {
    prism.highlightAll();
  }
  , []);

  const [code, setCode] = useState("const hello = 'Hello World';\nconsole.log(hello);");

  const [review, setReview] = useState("");

  async function reviewCode(){
    const response = await axios.post("http://localhost:3000/ai/get-review", {code: code})
    console.log(response.data)
    setReview(response.data)
  }

  return(
  <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: 5,
              width: "100%",
              height: "100%"
            }}
          />
        </div>
        <button className="review" onClick={reviewCode}>Review</button>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
        
      </div>
    </main>
  </>
  )
}

export default App;