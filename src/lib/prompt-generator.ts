/**
 * Pure, deterministic prompt-generation logic for the "Create Your Own
 * Prompt" tool. No network calls — it assembles a well-structured prompt
 * from the user's own answers using a small set of proven prompt-engineering
 * templates, so it works fully client-side and instantly.
 */

export interface GeneratorInput {
  goal: string;
  context: string;
  outputFormat: string;
  tone: string;
  aiTool: string;
}

export const toneOptions = [
  "No strong preference",
  "Professional",
  "Casual & friendly",
  "Persuasive",
  "Witty & playful",
  "Formal",
  "Empathetic",
  "Confident & bold",
  "Technical & precise",
];

export const aiToolOptions: { value: string; label: string; isImageTool?: boolean }[] = [
  { value: "any", label: "No preference — any AI tool" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "gemini", label: "Gemini" },
  { value: "midjourney", label: "Midjourney", isImageTool: true },
];

function toneClause(tone: string): string {
  if (!tone || tone === "No strong preference") {
    return "Use your best judgment on tone — clear and natural is more important than any particular style.";
  }
  return `Keep the tone ${tone.toLowerCase()} throughout.`;
}

function outputClause(outputFormat: string): string {
  const trimmed = outputFormat.trim();
  if (!trimmed) {
    return "Use your best judgment on format, but keep it well-structured and easy to scan.";
  }
  return `${trimmed}.`;
}

function contextClause(context: string): string {
  const trimmed = context.trim();
  return trimmed || "No additional context was provided — ask one clarifying question if something important is missing before proceeding.";
}

function toolIntro(aiTool: string): string {
  const tool = aiToolOptions.find((t) => t.value === aiTool);
  if (!tool || tool.value === "any") return "";
  return ` for ${tool.label}`;
}

/**
 * Three distinct templates ("voices") the generator cycles through on
 * Regenerate, so re-rolling actually changes the structure and phrasing
 * rather than just reshuffling the same sentence.
 */
const templateCount = 3;

export function buildPrompt(input: GeneratorInput, variant: number): string {
  const goal = input.goal.trim();
  const tool = aiToolOptions.find((t) => t.value === input.aiTool);
  const isImageTool = !!tool?.isImageTool;
  const v = ((variant % templateCount) + templateCount) % templateCount;

  if (isImageTool) {
    // Image-generation tools read better as a dense, comma-separated
    // descriptor list rather than full conversational sentences.
    const descriptors = [goal, input.context.trim(), input.outputFormat.trim()].filter(Boolean).join(", ");
    const toneLine = input.tone && input.tone !== "No strong preference" ? `, ${input.tone.toLowerCase()} mood` : "";
    return [
      `${descriptors}${toneLine}`,
      "",
      "Style notes: highly detailed, professional composition, balanced lighting.",
      "Consider adding an aspect ratio and version flag suited to your Midjourney setup (e.g. --ar 16:9 --v 6).",
    ].join("\n");
  }

  if (v === 0) {
    return [
      `Act as an expert assistant${toolIntro(input.aiTool)}.`,
      "",
      `Task: ${goal}`,
      "",
      `Context: ${contextClause(input.context)}`,
      "",
      `Output format: ${outputClause(input.outputFormat)}`,
      "",
      `Tone & style: ${toneClause(input.tone)}`,
      "",
      "Before answering, make sure the response fully satisfies the task above — if anything here is ambiguous, state your assumption explicitly rather than guessing silently.",
    ].join("\n");
  }

  if (v === 1) {
    return [
      `I need your help${toolIntro(input.aiTool)} with the following:`,
      "",
      `1. Goal — ${goal}`,
      `2. Context — ${contextClause(input.context)}`,
      `3. Output — ${outputClause(input.outputFormat)}`,
      `4. Tone — ${input.tone && input.tone !== "No strong preference" ? input.tone : "your best judgment"}`,
      "",
      "Work through this carefully: first restate the task in one sentence to confirm you understood it, then produce the output. Avoid generic filler phrases and don't pad the response with unnecessary caveats.",
    ].join("\n");
  }

  return [
    `You're acting as a skilled specialist${toolIntro(input.aiTool)} helping me with: ${goal}.`,
    "",
    `Here's what you should know: ${contextClause(input.context)}`,
    "",
    `Deliver this as: ${input.outputFormat.trim() || "your best judgment on format, kept well-structured and easy to scan"}.`,
    `Voice: ${input.tone && input.tone !== "No strong preference" ? input.tone : "natural, matched to the task"}.`,
    "",
    "Constraints: don't restate this brief back to me, don't over-hedge, and if something important is missing above, ask one clarifying question before proceeding instead of guessing.",
  ].join("\n");
}
