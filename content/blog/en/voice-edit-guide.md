---
title: "Voice Edit Guide: Select Text, Then Tell VoxPen How to Change It"
date: "2026-05-09"
description: "VoxPen Desktop Voice Edit lets you select text in any app, speak an edit request, and replace the selection with the AI-edited version."
---

Voice Edit is for the moment when text is already on screen, but you want to change it.

Normal dictation creates new text from a blank cursor. Voice Edit starts with selected text. You select a passage, speak an edit request, and VoxPen sends both the selection and your instruction to the LLM. The selected text is then replaced with the edited version.

## Good Uses

- Make a sentence more formal.
- Translate English into Traditional Chinese.
- Shorten a long paragraph.
- Fix grammar and punctuation.
- Turn bullets into an email.
- Clean up clinical, technical, or work notes.

## Setup

Voice Edit uses both speech-to-text and an LLM edit step.

Before using it, check:

1. `Settings -> Speech` has an STT provider configured, such as Groq Whisper or OpenAI Audio API.
2. `Settings -> Refinement` has an LLM provider, model, and API key configured.
3. `Settings -> General` has a Voice Edit shortcut. The default is `Ctrl+Shift+E`.

Voice Edit uses a shortcut combination so it is harder to trigger by accident while typing.

## Basic Flow

1. Select text in any app.
2. Hold `Ctrl+Shift+E`.
3. Speak what you want changed.
4. Release the shortcut.
5. VoxPen replaces the selected text with the edited version.

For example, select:

```text
This version should have fixed some issues. Try it again.
```

Hold `Ctrl+Shift+E` and say:

```text
Make this more polished and suitable for a customer email.
```

You might get:

```text
This version includes fixes for several issues. Please try it again when you have a chance.
```

## Example 1: Make It More Formal

Select:

```text
I'll check it later and let you know if anything is wrong.
```

Say:

```text
Make this sound more professional.
```

Possible output:

```text
I will review it later and let you know if I find any issues.
```

## Example 2: Translate Selected Text

Select:

```text
Please summarize the discussion and list the next steps.
```

Say:

```text
Translate this into natural Traditional Chinese.
```

Possible output:

```text
請摘要這次討論，並列出下一步行動。
```

## Example 3: Shorten a Paragraph

Select:

```text
This feature is mostly working now, but we still need to test edge cases, especially long recordings, unstable networks, and provider error responses.
```

Say:

```text
Shorten this into one product update sentence.
```

Possible output:

```text
This release improves reliability for long recordings, unstable networks, and provider errors.
```

## Troubleshooting

### Nothing happened?

Make sure you selected text first. Voice Edit starts by copying the current selection. If nothing is selected, VoxPen has nothing to edit.

### Does it work in browsers, Slack, VS Code, and Notion?

Yes, as long as the app supports text selection, copy, and paste.

### How is this different from Listen to My Command?

Voice Edit changes selected text. Listen to My Command generates new pasteable text from a spoken instruction.

If you want to generate a reply, summary, code snippet, or list from scratch, read the [Listen to My Command guide](/en/blog/listen-command-guide).
