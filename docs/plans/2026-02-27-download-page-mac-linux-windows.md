# Download Page: Add macOS + Direct Download Links

Date: 2026-02-27

## Goal

Update the download page to:
1. Add macOS (Apple Silicon) as a real download platform (currently "coming soon")
2. Fix all desktop download links to point to `voxpen-releases` repo (currently wrong repo)
3. Use direct `/releases/latest/download/FILENAME` links so non-developers get a one-click download

## Context

- Release repo: `github.com/soanseng/voxpen-releases`
- v0.9.0 assets: Windows `.exe`, macOS arm64 `.dmg`, Linux `.AppImage` + `.deb`
- Tauri v2 outputs versioned filenames (e.g. `VoxPen.Desktop_0.9.0_aarch64.dmg`)
- `latest.json` is for Tauri auto-updater, not for direct download links
- GitHub's `/releases/latest/download/FILENAME` requires stable filenames across releases

## Fixed Filenames (no version number)

The GitHub Actions release workflow must upload version-free copies:

| Platform | Fixed filename |
|----------|---------------|
| macOS arm64 | `VoxPen.Desktop_aarch64.dmg` |
| Windows x64 | `VoxPen.Desktop_x64-setup.exe` |
| Linux x64 | `VoxPen.Desktop_amd64.AppImage` |

## Changes

### Part 1 — GitHub Actions (voxpen-desktop or voxpen-releases)

Add a step after build to upload fixed-name copies to the GitHub release:
```yaml
- name: Upload fixed-name assets
  run: |
    gh release upload $TAG VoxPen.Desktop_aarch64.dmg
    gh release upload $TAG VoxPen.Desktop_x64-setup.exe
    gh release upload $TAG VoxPen.Desktop_amd64.AppImage
```

### Part 2 — src/pages/Download.tsx

- Add `macos` to the `platforms` array
- Remove the macOS "coming soon" `<div>` placeholder
- Update href logic:
  - Android: unchanged (`voxink-android/releases/latest` or fix if needed)
  - macOS: `https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_aarch64.dmg`
  - Windows: `https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_x64-setup.exe`
  - Linux: `https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_amd64.AppImage`
- Update changelog href to `voxpen-releases/releases`

### Part 3 — src/i18n/zh-tw.json + en.json

Add macOS entries under `download.macos`:
```json
"macos": {
  "dmg": "下載 DMG（Apple Silicon）",
  "requirement": "macOS 10.15 以上，Apple Silicon（M1/M2/M3+）",
  "steps": "開啟 DMG，將 VoxPen 拖入 Applications 資料夾。首次執行請右鍵選「開啟」。"
}
```

## Out of Scope

- Linux `.deb` button (keep AppImage only for simplicity)
- Intel (x86_64) macOS build
- Android repo URL fix (not requested)
