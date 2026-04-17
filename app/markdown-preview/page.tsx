"use client"

import { useState, useEffect, useRef } from "react"
import { FileText, Copy, Check } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { AffiliateCard } from "@/components/affiliate-card"
import { ShareButtons } from "@/components/share-buttons"
import { marked } from "marked"

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

This is a **live preview** tool. Start typing markdown on the left and see the rendered output instantly.

## Features

- **Bold** and *italic* text
- Lists (ordered and unordered)
- [Links](https://tonle.app)
- Code blocks with syntax highlighting
- Tables, blockquotes, and more

### Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet("World");
\`\`\`

### Table Example

| Feature | Status |
|---------|--------|
| Bold | ✅ |
| Italic | ✅ |
| Links | ✅ |
| Code | ✅ |

> This is a blockquote. Perfect for highlighting important information.

---

Try editing this text!
`)

  const [html, setHtml] = useState("")
  const [copied, setCopied] = useState(false)
  const [syncScroll, setSyncScroll] = useState(true)

  useEffect(() => {
    const parse = async () => {
      const result = await marked(markdown)
      setHtml(result)
    }
    parse()
  }, [markdown])

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement | HTMLDivElement>) => {
    if (!syncScroll) return

    const target = e.currentTarget
    const source = target === editorRef.current ? previewRef.current : editorRef.current
    if (source) {
      const scrollRatio = target.scrollTop / (target.scrollHeight - target.clientHeight)
      source.scrollTop = scrollRatio * (source.scrollHeight - source.clientHeight)
    }
  }

  const editorRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const copyHtml = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const charCount = markdown.length
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0
  const lineCount = markdown.split("\n").length

  return (
    <ToolPageLayout
      title="Markdown Preview"
      description="Live markdown editor with instant preview. Write markdown and see rendered HTML in real-time."
      category="Developer"
      relatedTools={[
        {
          title: "JSON Formatter",
          description: "Format, validate, and beautify JSON with syntax highlighting.",
          href: "/json-formatter",
          icon: FileText,
          category: "Developer",
        },
        {
          title: "Text to Binary",
          description: "Convert text to binary and vice versa. Includes ASCII reference table for common characters.",
          href: "/text-to-binary",
          icon: FileText,
          category: "Developer",
        },
      ]}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={syncScroll}
              onChange={(e) => setSyncScroll(e.target.checked)}
              className="rounded border-zinc-300 text-sky-500 focus:ring-sky-500"
            />
            Sync scroll
          </label>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {charCount} chars · {wordCount} words · {lineCount} lines
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Markdown
              </label>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              onScroll={handleScroll}
              ref={editorRef}
              className="w-full h-[600px] px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="Write your markdown here..."
              spellCheck={false}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Preview
              </label>
              <button
                onClick={copyHtml}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy HTML"}
              </button>
            </div>
            <div
              ref={previewRef}
              onScroll={handleScroll}
              className="w-full h-[600px] px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 overflow-y-auto prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>

      {markdown && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
          <ShareButtons toolName="Markdown Preview" result={`${wordCount} words rendered`} />
        </div>
      )}

      <AffiliateCard
        description="Need more developer tools?"
        linkText="Explore all developer tools"
        href="/#tools"
      />
    </ToolPageLayout>
  )
}
