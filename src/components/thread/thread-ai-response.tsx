import type { AiResponse } from "@/lib/type";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface ThreadAiResponseProps {
  AiResponse: AiResponse;
}

const ThreadAiResponse = ({ AiResponse }: ThreadAiResponseProps) => {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <Markdown
        components={{
          h1: ({ ...props }) => (
            <h1
              className="text-foreground mb-4 text-4xl leading-snug font-bold"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="text-foreground mb-3 text-3xl leading-snug font-semibold"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="text-foreground mt-4 mb-2 text-2xl leading-tight font-semibold"
              {...props}
            />
          ),
          p: ({ ...props }) => (
            <p className="text-foreground mb-4 leading-relaxed" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-primary hover:text-primary/80 underline transition-colors"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul
              className="text-foreground list-inside list-disc space-y-2 leading-relaxed"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="text-foreground list-inside list-decimal space-y-2 leading-relaxed"
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <li className="text-foreground mb-1" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="bg-muted border-primary text-muted-foreground mb-6 rounded-lg border-l-4 p-4 leading-relaxed"
              {...props}
            />
          ),
          // Table Styling
          table: ({ ...props }) => (
            <div className="overflow-x-auto">
              <table
                className="border-border text-foreground w-full table-auto border-collapse border text-sm"
                {...props}
              />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              className="border-border bg-muted text-foreground border px-4 py-2 text-left font-semibold"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="border-border text-foreground border px-4 py-2"
              {...props}
            />
          ),
          // Code Block Styling with Syntax Highlighter
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            const codeContent =
              Array.isArray(children) && children.length > 0
                ? children.join("")
                : typeof children === "string"
                  ? children
                  : "";

            return match ? (
              <div className="my-4">
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  className="!bg-muted overflow-auto rounded-md"
                  customStyle={{
                    background: "var(--color-muted)",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                  }}
                >
                  {codeContent.replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-muted text-foreground rounded-md px-1.5 py-0.5 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          strong: ({ ...props }) => (
            <strong className="text-foreground font-semibold" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="text-foreground italic" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="border-border my-6" {...props} />
          ),
        }}
      >
        {AiResponse?.candidates[0]?.content.parts[0]?.text}
      </Markdown>
    </div>
  );
};

export default ThreadAiResponse;
