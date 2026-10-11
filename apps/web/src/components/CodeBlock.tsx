import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  explanation?: string;
}

// Lightweight syntax highlighter helper with high-contrast accessible tokens
function highlightSyntax(line: string): React.ReactNode {
  // If line is a comment
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('#')) {
    return <span className="text-[#768A7E] italic">{line}</span>;
  }

  // Tokenize line with regex capturing strings, comments, and words
  const parts: React.ReactNode[] = [];
  const regex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\/.*$|\b(?:const|let|var|function|return|import|export|from|default|class|if|else|switch|case|break|for|while|try|catch|finally|async|await|new|typeof|interface|type|extends|implements)\b|\b(?:true|false|null|undefined|\d+)\b|[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()|[{}()[\].,;:])/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('//')) {
      parts.push(<span key={match.index} className="text-[#768A7E] italic">{token}</span>);
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      parts.push(<span key={match.index} className="text-[#A8E0BE] font-medium">{token}</span>);
    } else if (/^(?:const|let|var|function|return|import|export|from|default|class|if|else|switch|case|break|for|while|try|catch|finally|async|await|new|typeof|interface|type|extends|implements)$/.test(token)) {
      parts.push(<span key={match.index} className="text-[#78D4C7] font-semibold">{token}</span>);
    } else if (/^(?:true|false|null|undefined|\d+)$/.test(token)) {
      parts.push(<span key={match.index} className="text-[#F3C969]">{token}</span>);
    } else if (/^[a-zA-Z_$]/.test(token)) {
      // Function call
      parts.push(<span key={match.index} className="text-[#8BC9A5]">{token}</span>);
    } else {
      parts.push(<span key={match.index} className="text-[#E3EDE6]">{token}</span>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts.length > 0 ? parts : line;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  filename,
  explanation
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-6 rounded-xl border border-[#28362E] bg-[#141B17] overflow-hidden shadow-xs">
      {/* File header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#28362E] bg-[#1B2620] text-xs">
        <span className="font-mono text-[#C1CDC4] font-medium">
          {filename || `${language} example`}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E9F94]">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded text-[#C1CDC4] hover:text-[#FFFFFF] hover:bg-[#25312B] transition-colors"
            title="Copy code to clipboard"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#8BC9A5]" />
                <span className="text-[11px] text-[#8BC9A5] font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code contents with comfortable font size and line numbers */}
      <div className="overflow-x-auto p-4 text-[13.5px] sm:text-[14.5px] font-mono leading-relaxed text-[#E3EDE6]">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-[#1E2822] transition-colors">
                <td className="pr-4 text-right text-[#62756A] select-none text-xs w-8">
                  {idx + 1}
                </td>
                <td className="whitespace-pre">
                  <code>{highlightSyntax(line)}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Explanation if provided */}
      {explanation && (
        <div className="px-4 py-2.5 border-t border-[#D9DED6] dark:border-[#28362E] bg-[#F0F1EA] dark:bg-[#1B2620] text-xs text-[#525E56] dark:text-[#C1CDC4] leading-relaxed">
          <span className="font-bold text-[#174D3A] dark:text-[#8BC9A5]">Breakdown: </span>
          {explanation}
        </div>
      )}
    </div>
  );
};
