"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Circle, Pencil, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Badge } from "@/components/ui/badge";
import { cn, wordCount } from "@/lib/utils";
import {
  aiToolOptions,
  buildPrompt,
  toneOptions,
  type GeneratorInput,
} from "@/lib/prompt-generator";

const inputClass =
  "w-full rounded-[var(--radius-md)] border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const initialInput: GeneratorInput = {
  goal: "",
  context: "",
  outputFormat: "",
  tone: toneOptions[0],
  aiTool: aiToolOptions[0].value,
};

export function PromptGenerator() {
  const [input, setInput] = useState<GeneratorInput>(initialInput);
  const [generated, setGenerated] = useState<string | null>(null);
  const [variant, setVariant] = useState(0);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const goalId = useId();

  function updateField<K extends keyof GeneratorInput>(key: K, value: GeneratorInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function handleGenerate(e: FormEvent) {
    e.preventDefault();
    if (!input.goal.trim()) {
      setError("Tell us what you want the AI to do first — this field can't be empty.");
      return;
    }
    setError(null);
    setVariant(0);
    setEditing(false);
    setGenerated(buildPrompt(input, 0));
  }

  function handleRegenerate() {
    if (!input.goal.trim()) return;
    const next = variant + 1;
    setVariant(next);
    setEditing(false);
    setGenerated(buildPrompt(input, next));
  }

  function handleStartOver() {
    setInput(initialInput);
    setGenerated(null);
    setEditing(false);
    setError(null);
  }

  const selectedTool = aiToolOptions.find((t) => t.value === input.aiTool);

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleGenerate}
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-8"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">Step 1</p>
            <h2 className="mt-2 font-display text-xl font-medium text-text-primary">Describe your need</h2>
          </div>

          <div>
            <label htmlFor={goalId} className="mb-2 block text-sm font-medium text-text-primary">
              What do you want the AI to do? <span className="text-accent">*</span>
            </label>
            <textarea
              id={goalId}
              required
              rows={3}
              value={input.goal}
              onChange={(e) => updateField("goal", e.target.value)}
              placeholder="e.g. Write a follow-up email after a sales call that didn't close"
              className={cn(inputClass, "resize-none")}
            />
          </div>

          <div>
            <label htmlFor="context-field" className="mb-2 block text-sm font-medium text-text-primary">
              Context &amp; details <span className="font-normal text-text-tertiary">(optional)</span>
            </label>
            <textarea
              id="context-field"
              rows={3}
              value={input.context}
              onChange={(e) => updateField("context", e.target.value)}
              placeholder="Anything the AI should know — audience, background, constraints, examples…"
              className={cn(inputClass, "resize-none")}
            />
          </div>

          <div>
            <label htmlFor="output-field" className="mb-2 block text-sm font-medium text-text-primary">
              Desired output <span className="font-normal text-text-tertiary">(optional)</span>
            </label>
            <input
              id="output-field"
              type="text"
              value={input.outputFormat}
              onChange={(e) => updateField("outputFormat", e.target.value)}
              placeholder="e.g. a 150-word email, a bulleted list, a landing page headline"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="tone-field" className="mb-2 block text-sm font-medium text-text-primary">
                Tone &amp; style
              </label>
              <div className="relative">
                <select
                  id="tone-field"
                  value={input.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className={cn(inputClass, "appearance-none pr-9")}
                >
                  {toneOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
              </div>
            </div>
            <div>
              <label htmlFor="tool-field" className="mb-2 block text-sm font-medium text-text-primary">
                AI tool <span className="font-normal text-text-tertiary">(optional)</span>
              </label>
              <div className="relative">
                <select
                  id="tool-field"
                  value={input.aiTool}
                  onChange={(e) => updateField("aiTool", e.target.value)}
                  className={cn(inputClass, "appearance-none pr-9")}
                >
                  {aiToolOptions.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
              </div>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-[#e0605a]">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <Button type="submit" size="lg" icon={<Wand2 className="h-4 w-4" />} iconPosition="left" magnetic>
              Generate Prompt
            </Button>
            {generated && (
              <button
                type="button"
                onClick={handleStartOver}
                className="text-sm font-medium text-text-tertiary transition-colors hover:text-text-primary"
              >
                Start over
              </button>
            )}
          </div>
        </div>
      </form>

      <AnimatePresence>
        {generated !== null && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">Step 2 · Your generated prompt</p>
            </div>

            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-bg-elevated">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <div className="flex items-center gap-2">
                  {["#e0605a", "#e0b95a", "#5ac97a"].map((c) => (
                    <Circle key={c} className="h-2.5 w-2.5" fill={c} stroke="none" />
                  ))}
                  <span className="ml-2 text-xs font-medium text-text-tertiary">your-prompt.txt</span>
                  {selectedTool && selectedTool.value !== "any" && (
                    <Badge variant="outline" className="ml-2">
                      {selectedTool.label}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing((v) => !v)}
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                      editing
                        ? "border-accent/50 bg-accent-soft text-accent"
                        : "border-border-strong text-text-secondary hover:border-accent/50 hover:text-accent"
                    )}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    {editing ? "Done editing" : "Edit"}
                  </button>
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-strong px-3.5 text-[13px] font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Regenerate
                  </button>
                  <CopyButton text={generated} size="sm" label="Copy" />
                </div>
              </div>

              {editing ? (
                <textarea
                  value={generated}
                  onChange={(e) => setGenerated(e.target.value)}
                  rows={12}
                  className="w-full resize-none bg-transparent p-6 font-mono text-[13.5px] leading-[1.8] text-text-primary focus:outline-none sm:p-8"
                />
              ) : (
                <pre className="max-h-[480px] overflow-auto whitespace-pre-wrap break-words p-6 font-mono text-[13.5px] leading-[1.8] text-text-primary sm:p-8">
                  {generated}
                </pre>
              )}

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-5 py-3 text-xs text-text-tertiary">
                <span>{wordCount(generated)} words</span>
                <span>{generated.length} characters</span>
                <span>Editable — tweak it, then copy when it&apos;s ready</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
