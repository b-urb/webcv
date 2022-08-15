import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula, duotoneLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import {useEffect, useState} from "react";


export const BlogpostMarkdown = (props: { markdown: string }) => {
  const [theme, setTheme] = useState(null)
  useEffect(() =>
      setTheme(localStorage.getItem("theme"))
  );

  //TODO: Swithc to global state
  return <ReactMarkdown children={props.markdown} components={{
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
          <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              // @ts-ignore
              //TODO: Github issue
              style={theme === "light" ? duotoneLight : dracula}
              showLineNumbers={true}
              language={match[1]}
              PreTag="div"
              {...props}
          />
      ) : (
          <code className={className} {...props}>
            {children}
          </code>
      )
    }
  }}/>
}