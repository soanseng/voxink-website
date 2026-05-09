---
title: "VoxPen Desktop 0.9.6: Listen to My Command, Retry, and Better Linux Reliability"
date: "2026-05-09"
description: "From 0.9.5 to 0.9.6, VoxPen Desktop adds Listen to My Command, retryable failed transcriptions, long-recording fixes, and Wayland / PipeWire reliability improvements."
---

VoxPen Desktop 0.9.6 is a workflow-focused update. 0.9.5 fixed false output from silent recordings. 0.9.6 goes further: failed recordings are easier to recover, long dictations are more reliable, and you can now use voice to ask AI to generate pasteable text.

Here is what changed and how to use it.

## 1. Listen to My Command

Listen to My Command is not normal dictation, and it is not punctuation replacement. It is a separate mode:

1. Hold the command shortcut.
2. Speak what you want AI to do.
3. VoxPen transcribes your spoken instruction.
4. VoxPen sends it to your configured command model.
5. The generated result is pasted at your cursor.

Good use cases:

- "Write a polite but short reply."
- "Turn this into three action items."
- "Write a JavaScript debounce function."
- "Draft a PR summary."

The default shortcut is `Ctrl+Alt+Space`. You can also toggle the mode from the system tray.

The safety boundary is explicit: this mode only generates pasteable text. It does not execute shell commands, edit files, send messages, or control other apps.

Full walkthrough: [Listen to My Command guide](/en/blog/listen-command-guide).

## 2. Failed Transcriptions Can Be Retried

Previously, a temporary provider error, long recording timeout, or brief network issue could feel like a silent no-op. 0.9.6 makes this more visible and recoverable.

Failed live recordings are now saved locally in history with readable provider errors. Open History, find the failed item, and retry it.

This matters most for longer recordings. If the audio was saved, you do not need to speak it again.

## 3. Long Recordings Are More Reliable

0.9.6 includes several fixes for longer dictation sessions:

- Long live recordings are split before STT to reduce provider timeout risk.
- STT timeout is longer, so moderately long recordings do not fail too early.
- AI refinement output size scales with input length, reducing truncation on long dictations.
- Provider errors stay readable in the overlay and history.

If you use VoxPen for long emails, clinical notes, meeting notes, or article drafts, this release should feel more dependable.

## 4. Linux Wayland / PipeWire Fixes

0.9.6 also fixes several Linux desktop issues, especially around KDE Wayland and newer PipeWire setups.

This release improves:

- Recording when PipeWire exposes an F32 audio format.
- Hotkey fallback when XWayland key grabs fail.
- Terminal paste behavior on KDE Wayland, where terminals need `Ctrl+Shift+V`.
- Keyboard focus restoration after global shortcuts on Wayland.
- Silence detection for low-gain laptop microphones.

If you use Arch, KDE, Fedora Rawhide, or another rolling-release distro and have seen AppImage or paste issues, update to this version.

## How to Update

Go to the [download page](/en/download) and get the latest build:

- Windows: download the `.exe` installer.
- Linux: download the `.AppImage`. On rolling-release distros, use the native binary from the release if you hit WebKit ABI issues.

The Windows installer and Linux AppImage currently use GitHub Releases latest download links.

## Next

For a practical walkthrough of selecting text and editing it by voice, read the [Voice Edit guide](/en/blog/voice-edit-guide).
