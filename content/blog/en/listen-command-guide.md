---
title: "Listen to My Command Guide: Generate Pasteable Text by Voice"
date: "2026-05-09"
description: "VoxPen Desktop 0.9.6 lets you hold a separate shortcut, speak a task, and ask your chosen LLM to generate replies, summaries, code, or lists."
---

Listen to My Command is a new VoxPen Desktop 0.9.6 mode. It lets you speak a task instead of typing a prompt, then pastes the generated result at your cursor.

This is not normal dictation, and it is not the inline punctuation feature where you say "comma" or "new line". It has its own shortcut, its own LLM settings, and its own workflow.

## What It Is Good For

Think of it as a voice prompt box whose output is pasted directly into the app you are using.

Use it to:

- Draft an email reply.
- Turn thoughts into a bullet list.
- Generate a code snippet.
- Write a PR summary or commit message.
- Turn spoken notes into a Notion entry.
- Create meeting follow-up action items.

## Safety Boundary

Listen to My Command only generates pasteable text.

It will not:

- Execute shell commands.
- Edit files directly.
- Send messages for you.
- Click or control other apps.
- Claim it has changed system state.

If you say "delete this folder", it should produce reviewable steps or a command snippet, not execute anything.

## Setup

### 1. Enable Listen to My Command

Go to `Settings -> General` and enable Listen to My Command.

The default shortcut is:

```text
Ctrl+Alt+Space
```

You can change it to another shortcut combination. Listen to My Command requires a combo shortcut to reduce accidental triggers.

### 2. Configure the Command Model

Go to `Settings -> Command`.

This section controls the LLM used only for Listen to My Command:

- Provider: OpenAI, Groq, OpenRouter, or a custom OpenAI-compatible endpoint.
- Model: choose a preset or type a custom model ID.
- API key: use your own key.
- Custom Base URL: if using a custom provider, VoxPen calls `/v1/chat/completions`.

These settings are independent from normal dictation and refinement. For example, you can use Groq Whisper for speech recognition and OpenAI or OpenRouter for command generation.

### 3. Toggle from the System Tray

0.9.6 also adds Listen to My Command to the tray menu, so you can enable or disable it without opening Settings.

## How to Use It

1. Put your cursor where the output should be pasted.
2. Hold `Ctrl+Alt+Space`.
3. Speak the task.
4. Release the shortcut.
5. VoxPen generates the result and pastes it.

## Example 1: Draft a Reply

Say:

```text
Write a short polite reply saying I can join the meeting tomorrow afternoon.
```

Possible output:

```text
Sure, I can join the meeting tomorrow afternoon. Please let me know what time works best for you.
```

## Example 2: Create Action Items

Say:

```text
Turn this into three action items: check the Windows installer, test the Linux AppImage, and update the download page.
```

Possible output:

```text
1. Check that the Windows installer downloads and installs correctly.
2. Test the Linux AppImage launch and basic dictation flow.
3. Update the website download page with the latest version and links.
```

## Example 3: Generate Code

Say:

```text
Write a short TypeScript debounce function.
```

Possible output:

```ts
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

## How It Differs from Voice Edit

Voice Edit changes selected text.

Listen to My Command generates new text without requiring a selection.

If you want to select existing text and tell VoxPen how to change it, read the [Voice Edit guide](/en/blog/voice-edit-guide).

## Tips

- Be specific about the output format.
- For email or chat, say the tone: "polite and brief".
- For code, name the language, function, and constraints.
- For lists, say how many items you want.

Listen to My Command is best for turning intent into a pasteable draft. You still decide whether to send, run, or keep the result.
