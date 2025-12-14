interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "python" }: CodeBlockProps) => {
  // Simple syntax highlighting for Python
  const highlightCode = (code: string) => {
    const keywords = ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'print', 'input', 'float', 'int', 'str', 'list', 'dict', 'set', 'from', 'import', 'append', 'pop', 'deque'];
    
    return code.split('\n').map((line, lineIndex) => {
      // Handle comments
      const commentIndex = line.indexOf('#');
      let codePart = line;
      let commentPart = '';
      
      if (commentIndex !== -1) {
        codePart = line.substring(0, commentIndex);
        commentPart = line.substring(commentIndex);
      }

      // Tokenize the code part
      const tokens = codePart.split(/(\s+|[(),:=\[\]{}]|"[^"]*"|'[^']*')/g);
      
      const highlightedTokens = tokens.map((token, i) => {
        if (keywords.includes(token)) {
          return <span key={i} className="code-keyword">{token}</span>;
        }
        if (/^["'].*["']$/.test(token)) {
          return <span key={i} className="code-string">{token}</span>;
        }
        if (/^\d+(\.\d+)?$/.test(token)) {
          return <span key={i} className="text-[hsl(340,80%,65%)]">{token}</span>;
        }
        return <span key={i}>{token}</span>;
      });

      return (
        <div key={lineIndex} className="leading-6">
          {highlightedTokens}
          {commentPart && <span className="text-[hsl(200,15%,50%)] italic">{commentPart}</span>}
        </div>
      );
    });
  };

  return (
    <pre className="code-block overflow-x-auto whitespace-pre">
      <code className="font-roboto-mono">{highlightCode(code)}</code>
    </pre>
  );
};

export default CodeBlock;
