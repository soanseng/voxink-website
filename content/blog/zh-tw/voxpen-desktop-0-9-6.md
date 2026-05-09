---
title: "VoxPen Desktop 0.9.6：聽我指令、失敗重送與更穩的 Linux"
date: "2026-05-09"
description: "從 0.9.5 到 0.9.6，VoxPen Desktop 加入聽我指令、失敗轉錄重送、長錄音修正，以及 Wayland / PipeWire 穩定性改善。"
---

VoxPen Desktop 0.9.6 是一次偏「日常工作流」的更新。0.9.5 解決了靜音誤輸出的問題，0.9.6 則往前補上三件事：聽寫失敗後可以救回來、長錄音比較可靠，以及除了聽寫之外，也能直接用語音請 AI 產生一段可貼上的內容。

這篇整理 0.9.6 的主要變化，也附上設定方式。

## 1. 聽我指令：用語音請 AI 產生可貼上的內容

「聽我指令」不是一般聽寫，也不是標點符號替換。它是一個獨立模式：

1. 按住獨立快捷鍵。
2. 說出你要 AI 做的事。
3. VoxPen 先把你的語音轉成指令。
4. 再交給你設定的指令模型。
5. 最後把生成結果貼到目前游標位置。

適合的情境：

- 「幫我寫一段禮貌但簡短的回覆」
- 「把這件事整理成三點待辦」
- 「寫一個 JavaScript debounce function」
- 「幫我產生 PR summary」

預設快捷鍵是 `Ctrl+Alt+Space`。你也可以在系統匣快速開關這個模式。

安全邊界也很明確：它只會產生可貼上的文字，不會執行 shell、不會修改檔案、不會幫你送出訊息，也不會控制其他 app。

完整教學看這篇：[聽我指令教學](/zh-tw/blog/listen-command-guide)。

## 2. 失敗轉錄可以從歷史紀錄重送

以前如果 API 供應商暫時錯誤、長錄音超時，或網路瞬間不穩，使用者看到的可能只是「沒有輸出」。0.9.6 把這件事改得更清楚。

現在失敗的 live recording 會保留在本機歷史紀錄，並帶著可讀的供應商錯誤訊息。你可以打開歷史紀錄，找到失敗項目，再按「重送」。

這對長錄音特別重要。只要錄音本身有保留下來，就不需要重講一次。

## 3. 長錄音比較不容易壞掉

0.9.6 補了幾個長錄音相關問題：

- 長錄音會分段送去 STT，降低供應商 timeout 機率。
- STT timeout 拉長，避免稍長一點的錄音直接失敗。
- AI 潤飾的輸出 token 會依照內容長度調整，減少長篇 dictation 被截斷。
- 如果供應商回錯誤，overlay 和 history 會顯示比較完整的錯誤內容。

如果你常用 VoxPen 寫長 email、看診紀錄、會議筆記或文章草稿，這版會比較安心。

## 4. Linux Wayland / PipeWire 修正

0.9.6 也處理了幾個 Linux 桌面環境問題，尤其是 KDE Wayland 和較新的 PipeWire。

這版改善：

- PipeWire 使用 F32 audio format 時，錄音 callback 不再失效。
- XWayland 快捷鍵 grab 失敗時，不會讓所有快捷鍵一起壞掉。
- KDE Wayland 下貼到 terminal 會正確使用 `Ctrl+Shift+V`。
- Wayland 視窗焦點恢復更可靠。
- 靜音判斷對低增益筆電麥克風更友善。

如果你在 Arch、KDE、Fedora Rawhide 或 rolling-release distro 上遇過 AppImage 或貼上問題，建議更新。

## 如何更新

前往[下載頁](/zh-tw/download)，下載最新版：

- Windows：下載 `.exe` 安裝檔。
- Linux：下載 `.AppImage`。Rolling-release distro 若遇到 WebKit ABI 問題，可改用 release 裡的原生 binary。

Windows 安裝檔和 Linux AppImage 目前仍使用 GitHub Releases 的 latest download 連結。

## 推薦讀下一篇

如果你想知道「選一段文字，用說的請 AI 幫你改」怎麼用，請看：[語音編輯教學](/zh-tw/blog/voice-edit-guide)。
