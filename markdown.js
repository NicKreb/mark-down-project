import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

let defaultContent = `
![GitHub](https://avatars.githubusercontent.com/u/113550184?v=4) 
Hello! my name is Nick!

And this is my Markdown Project entry for [FCC](https://freeCodeCamp.com)

# Header 1 looks good!
## Header 2 looks fine as hell!
### Header 3 double cheeked up on a sunday afternoon!

* we got lists!
1. of varying styles!
a. like so!

task lists:
- [x] html code
- [x] css code
- [x] js code
- [ ] pass test!

There's even font styles down here!
_Italics!_
**Bold!**
~~Strikethrough~~

Quotes!
>We Out Here! - Mike W.

codeblocks!
\`\`\`
const multipleLineCode = (param) => {
    if(param) {
        return param
    }
}
\`\`\`

\`<div>Inline code</div>\`

and a link to [My GitHub](https://github.com/NicKreb)!
`;

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const Editor = ({ content, handleTextareaChange } ) => 
<div class="editor-wrapper">
  <div class="title-bar editor"> <i class="fa fa-duotone fa-dumpster-fire"></i> Editor Window <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </div>
  <textarea id="editor" value={content} onChange={handleTextareaChange} />
  </div>

const Previewer = ({ content }) => ( 
  <div class="preview-wrapper">
    <div class="title-bar preview"><i class="fa fa-duotone fa-dumpster-fire"></i> Preview Window <i class="fa-solid fa-arrow-up-right-from-square"></i></div>
  <div id="preview" 
    dangerouslySetInnerHTML={{
    __html: marked.parse(content, { renderer: renderer })
  }} 
 ></div>
  </div>
);

const App = () => {
  const [content, setContent] = React.useState(defaultContent)

  const handleTextareaChange = (event) => {
    setContent(event.target.value)
  }
  
  return (
  <div class="main">
    <Editor content={content} handleTextareaChange={handleTextareaChange} />
    <Previewer content={content} />
  </div>
    )
}

ReactDOM.render(<App />, document.querySelector("#app"));
