"use client";

import { Fragment } from "react";
import { Circle } from "lucide-react";
import type { Prompt } from "@/data/types";
import { CopyButton } from "@/components/ui/copy-button";
import { wordCount } from "@/lib/utils";

const VARIABLE_RE = /\{\{([a-zA-Z0-9_]+)\}\}/g;

function renderHighlighted(content: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  VARIABLE_RE.lastIndex = 0;
  while ((match = VARIABLE_RE.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{content.slice(lastIndex, match.index)}</Fragment>);
    }
    parts.push(
      <span
        key={key++}
        className="rounded-[4px] border border-border-accent bg-accent-soft px-1 py-0.5 text-accent"
      >
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  parts.push(<Fragment key={key++}>{content.slice(lastIndex)}</Fragment>);
  return parts;
}

export function PromptViewer({ prompt }: { prompt: Prompt }) {
  const words = wordCount(prompt.content);
  const chars = prompt.content.length;

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2">
          {["#e0605a", "#e0b95a", "#5ac97a"].map((c) => (
            <Circle key={c} className="h-2.5 w-2.5" fill={c} stroke="none" />
          ))}
          <span className="ml-2 text-xs font-medium text-text-tertiary">prompt.txt</span>
        </div>
        <CopyButton text={prompt.content} size="sm" />
      </div>

      <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words p-6 font-mono text-[13.5px] leading-[1.8] text-text-primary sm:p-8">
        {renderHighlighted(prompt.content)}
      </pre>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-5 py-3 text-xs text-text-tertiary">
        <span>{words} words</span>
        <span>{chars} characters</span>
        {prompt.variables && prompt.variables.length > 0 && (
          <span>{prompt.variables.length} variables</span>
        )}
      </div>
    </div>
  );
}
