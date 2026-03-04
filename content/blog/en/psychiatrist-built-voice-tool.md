---
title: "A Psychiatrist Who Built a Voice Input Tool — By Talking"
date: "2026-03-04"
description: "Typing was always my bottleneck — brain faster than fingers, ideas gone before I could type them. I tried every voice tool out there, then built my own with Claude Code."
---

Besides seeing patients, I write articles, record a podcast, and I'm planning to write a book. Typing has always been my bottleneck — my brain moves faster than my fingers, and ideas slip away before I can finish typing them out.

So I started looking for voice input tools early on.

## Everything I tried fell short

I started with Typeless. Good experience overall. Then I switched to Wisprflow over privacy concerns, but ran into some uncomfortable issues during setup, and it runs persistently in the background on Android — which always gave me a "my phone is being listened to" feeling.

I looked at many open-source alternatives too. None hit the mark — either Mac-only, or Python-packaged with heavy resource usage on desktop.

As someone who also likes to code, I decided: I'll build my own.

## Never built an app, but I knew what I wanted

Some background. I'm comfortable with web development — Python, JavaScript (React), basic SQL — and I use Git and GitHub regularly. But I had never built an Android app, and never built a Windows desktop application.

Before, building a website, Android app, Windows app, and testing them from scratch would have taken months.

This time I used [Claude Code](https://claude.ai/claude-code).

Its capabilities exceeded my expectations. I didn't know Android or desktop development, but I knew exactly what I wanted and which direction to go. Claude Code handled the execution. From concept to first working version: a few hours. After that, I kept testing and iterating — adding voice editing, translation, tone switching (casual vs. formal), seamless app switching, and more. After days of daily use and repeated testing, it felt genuinely useful. So I decided to open-source it.

## Tech choices: why Tauri and Groq

For the desktop app, I chose [Tauri](https://tauri.app/) (built on Rust) over Electron or Python-based alternatives. The reasons are straightforward: tiny installer size, minimal resource usage, and native support for Windows, Mac, and Linux. I primarily use it on Windows. A friend tested the Mac version (unsuccessfully so far...), and the Linux build honestly hasn't been thoroughly tested yet — Linux users, your feedback is welcome!

The Android version is designed as an input method: switch to it with one tap when needed, switch back when done. It never runs in the background. Mixed Chinese-English dictation works fine — the app automatically organizes your speech into complete sentences.

For speech recognition, I originally wanted to use a local Whisper model, but whisper-rs had compatibility issues on Windows. Then I found [Groq](https://groq.com/)'s free API — nearly real-time speed, with open-source voice models and LLMs behind it. I don't think post-recognition semantic correction needs a massive model. What matters is speed — keeping the flow of "say whatever comes to mind" unbroken.

## The voice-coding loop

This entire article was dictated using VoxPen.

Here's a fun one: when I use Claude Code to write software now, I can just talk. No typing needed. A psychiatrist who built a voice input tool by talking, then uses that tool to write code by talking.

Doesn't sound like much, but that's what development feels like in 2026.

## Privacy first, open source

VoxPen uses a BYOK (Bring Your Own Key) architecture — your voice data goes directly to your own API, never through my server. The free tier has a daily usage limit; bring your own API key for unlimited use.

The source code is on [GitHub](https://github.com/soanseng/voxpen-desktop).

If you're tired of typing being the bottleneck, or you're a developer who wants to contribute, [give it a try](/en/download).
