---
title: "聽我指令教學：用語音請 AI 產生可貼上的文字"
date: "2026-05-09"
description: "VoxPen Desktop 0.9.6 的聽我指令可以用獨立快捷鍵錄下任務指令，交給指定 LLM 產生回覆、摘要、程式碼或清單。"
---

「聽我指令」是 VoxPen Desktop 0.9.6 新增的模式。它讓你不用打 prompt，直接用說的請 AI 產生一段可貼上的文字。

請注意：這裡說的「聽我指令」不是一般聽寫，也不是「逗號」「新行」那種語音標點指令。它是獨立快捷鍵、獨立 LLM 設定、獨立使用情境。

## 它適合做什麼

你可以把它想成「語音版 prompt box」，只是輸出會直接貼到目前游標位置。

適合用來：

- 寫一段 email 回覆。
- 把想法整理成條列清單。
- 產生一段程式碼。
- 寫 PR summary 或 commit message。
- 把口頭想法整理成 Notion 筆記。
- 產生會議後續行動項目。

## 安全邊界

聽我指令只會產生可貼上的文字。

它不會：

- 執行 shell command。
- 直接修改檔案。
- 幫你送出訊息。
- 點擊或控制其他 app。
- 聲稱自己已經完成系統動作。

如果你說「幫我刪掉這個資料夾」，它應該產生可供你檢查的步驟或命令片段，而不是真的執行。

## 設定方式

### 1. 開啟聽我指令

到 `設定 -> 一般`，打開「聽我指令」。

預設快捷鍵是：

```text
Ctrl+Alt+Space
```

你也可以在這裡改成其他組合鍵。聽我指令只支援組合快捷鍵，避免誤觸。

### 2. 設定指令模型

到 `設定 -> 指令`。

這裡可以設定聽我指令專用的 LLM：

- 供應商：OpenAI、Groq、OpenRouter，或自訂 OpenAI-compatible endpoint。
- 模型：可選內建模型，也可輸入自訂 model ID。
- API Key：使用你自己的 key。
- Custom Base URL：如果你選自訂供應商，VoxPen 會呼叫 `/v1/chat/completions`。

這組設定可以和一般聽寫的 STT 供應商、潤飾模型不同。比如你可以用 Groq Whisper 做語音辨識，但用 OpenAI 或 OpenRouter 做指令生成。

### 3. 從系統匣快速開關

0.9.6 也把聽我指令放進系統匣選單。你可以不用打開設定，就快速開關這個模式。

## 使用方式

1. 把游標放在你想貼上結果的地方。
2. 按住 `Ctrl+Alt+Space`。
3. 說出你的任務。
4. 放開快捷鍵。
5. VoxPen 會產生結果並貼上。

## 例子 1：寫回覆

你可以說：

```text
幫我寫一段簡短、禮貌的回覆，說我明天下午可以開會
```

可能輸出：

```text
可以，明天下午我方便開會。請再告訴我您方便的時間，謝謝。
```

## 例子 2：整理待辦

你可以說：

```text
把這件事整理成三個待辦：確認 Windows 安裝檔、測 Linux AppImage、更新下載頁
```

可能輸出：

```text
1. 確認 Windows 安裝檔可正常下載與安裝
2. 測試 Linux AppImage 啟動與基本聽寫流程
3. 更新網站下載頁的版本資訊與連結
```

## 例子 3：寫程式片段

你可以說：

```text
寫一個 TypeScript debounce function，簡短一點
```

可能輸出：

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

## 跟語音編輯差在哪？

語音編輯是「先選取一段文字，再用語音要求 AI 修改那段文字」。

聽我指令是「不用選取文字，直接用語音要求 AI 產生新內容」。

如果你要修改既有文字，請用語音編輯：[語音編輯教學](/zh-tw/blog/voice-edit-guide)。

## 使用建議

- 指令說清楚一點，結果會更穩。
- 如果要貼到 email 或訊息，可以直接說「語氣禮貌、簡短」。
- 如果要產生程式碼，說出語言、函式名稱和限制。
- 如果結果要條列，直接說「整理成三點」。

聽我指令最適合把腦中的意圖快速變成可貼上的草稿。最後要不要送出、執行或採用，仍然由你決定。
