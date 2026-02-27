# Download Page macOS + Direct Downloads Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add macOS to the download page and switch all desktop platforms to direct `/releases/latest/download/FILENAME` links pointing at `voxpen-releases`.

**Architecture:** Three-part change — (1) update i18n JSON files with macOS strings, (2) update `Download.tsx` to add macOS as a real platform and fix all download URLs, (3) add fixed-name asset upload step to the GitHub Actions release workflow in `voxpen-desktop`.

**Tech Stack:** React 19, react-i18next, TypeScript, Tauri v2 GitHub Actions

---

### Task 1: Add macOS i18n strings (zh-tw.json)

**Files:**
- Modify: `src/i18n/zh-tw.json`

**Step 1: Open the file and locate the `download.macos` key**

It currently contains only `comingSoon`. Replace the entire `macos` block:

```json
"macos": {
  "dmg": "下載 DMG（Apple Silicon）",
  "requirement": "macOS 10.15 以上，Apple Silicon（M1 / M2 / M3+）",
  "steps": "開啟 DMG，將 VoxPen 拖入 Applications 資料夾。首次執行請右鍵選「開啟」。"
}
```

**Step 2: Verify JSON is valid**

```bash
cd /home/scipio/projects/voxpen-website
python3 -c "import json; json.load(open('src/i18n/zh-tw.json')); print('OK')"
```

Expected: `OK`

**Step 3: Commit**

```bash
git add src/i18n/zh-tw.json
git commit -m "feat(i18n): add macOS zh-tw download strings"
```

---

### Task 2: Add macOS i18n strings (en.json)

**Files:**
- Modify: `src/i18n/en.json`

**Step 1: Locate the `download.macos` key and replace the entire block:**

```json
"macos": {
  "dmg": "Download DMG (Apple Silicon)",
  "requirement": "macOS 10.15+, Apple Silicon (M1 / M2 / M3+)",
  "steps": "Open the DMG, drag VoxPen to Applications. On first launch, right-click and choose Open."
}
```

**Step 2: Verify JSON is valid**

```bash
python3 -c "import json; json.load(open('src/i18n/en.json')); print('OK')"
```

Expected: `OK`

**Step 3: Commit**

```bash
git add src/i18n/en.json
git commit -m "feat(i18n): add macOS en download strings"
```

---

### Task 3: Update Download.tsx

**Files:**
- Modify: `src/pages/Download.tsx`

**Step 1: Update the `platforms` array — add `macos`**

Current (lines 5–9):
```tsx
const platforms = [
  { key: "android", icon: "📱" },
  { key: "windows", icon: "🖥️" },
  { key: "linux", icon: "🐧" },
] as const;
```

Replace with:
```tsx
const platforms = [
  { key: "android", icon: "📱" },
  { key: "macos", icon: "🍎" },
  { key: "windows", icon: "🖥️" },
  { key: "linux", icon: "🐧" },
] as const;
```

**Step 2: Update the download href logic**

Current (lines 62–66):
```tsx
href={
  key === "android"
    ? "https://github.com/soanseng/voxink-android/releases/latest"
    : "https://github.com/soanseng/voxink-desktop/releases/latest"
}
```

Replace with:
```tsx
href={
  key === "android"
    ? "https://github.com/soanseng/voxink-android/releases/latest"
    : key === "macos"
    ? "https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_aarch64.dmg"
    : key === "windows"
    ? "https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_x64-setup.exe"
    : "https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_amd64.AppImage"
}
```

**Step 3: Update the button label logic**

Current (lines 71–75):
```tsx
{key === "android"
  ? t("download.android.apk")
  : key === "windows"
  ? t("download.windows.installer")
  : t("download.linux.appimage")}
```

Replace with:
```tsx
{key === "android"
  ? t("download.android.apk")
  : key === "macos"
  ? t("download.macos.dmg")
  : key === "windows"
  ? t("download.windows.installer")
  : t("download.linux.appimage")}
```

**Step 4: Remove the macOS "coming soon" placeholder**

Delete the entire block (lines 91–95):
```tsx
{/* macOS */}
<div className="p-8 rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
  <span className="text-3xl">{"\uD83C\uDF4E"}</span>
  <p className="text-gray-400 mt-2">{t("download.macos.comingSoon")}</p>
</div>
```

**Step 5: Update the changelog link**

Current (line 101):
```tsx
href="https://github.com/soanseng/voxink-desktop/releases"
```

Replace with:
```tsx
href="https://github.com/soanseng/voxpen-releases/releases"
```

**Step 6: Build check**

```bash
pnpm build 2>&1 | tail -20
```

Expected: build completes with no TypeScript errors.

**Step 7: Commit**

```bash
git add src/pages/Download.tsx
git commit -m "feat(download): add macOS, fix desktop download links to voxpen-releases"
```

---

### Task 4: Update GitHub Actions release workflow (voxpen-desktop)

**Files:**
- Modify: `/home/scipio/projects/voxpen-desktop/.github/workflows/release.yml` (or equivalent)

**Step 1: Find the release workflow file**

```bash
ls /home/scipio/projects/voxpen-desktop/.github/workflows/
```

**Step 2: Locate the step that uploads release assets**

Look for a step using `tauri-apps/tauri-action` or `gh release upload`.

**Step 3: Add a step after the build to upload fixed-name copies**

Add after the main upload step:

```yaml
- name: Upload fixed-name assets for website
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    TAG="${{ github.ref_name }}"
    # macOS
    if ls src-tauri/target/release/bundle/dmg/*.dmg 2>/dev/null; then
      cp src-tauri/target/release/bundle/dmg/*.dmg VoxPen.Desktop_aarch64.dmg
      gh release upload "$TAG" VoxPen.Desktop_aarch64.dmg --clobber
    fi
    # Windows
    if ls src-tauri/target/release/bundle/nsis/*.exe 2>/dev/null; then
      cp src-tauri/target/release/bundle/nsis/*.exe VoxPen.Desktop_x64-setup.exe
      gh release upload "$TAG" VoxPen.Desktop_x64-setup.exe --clobber
    fi
    # Linux AppImage
    if ls src-tauri/target/release/bundle/appimage/*.AppImage 2>/dev/null; then
      cp src-tauri/target/release/bundle/appimage/*.AppImage VoxPen.Desktop_amd64.AppImage
      gh release upload "$TAG" VoxPen.Desktop_amd64.AppImage --clobber
    fi
```

Note: If the release is uploaded to `voxpen-releases` (separate repo), adjust the `gh release upload` target with `--repo soanseng/voxpen-releases`.

**Step 4: Commit**

```bash
cd /home/scipio/projects/voxpen-desktop
git add .github/workflows/
git commit -m "ci: upload fixed-name assets for website direct downloads"
```

---

### Task 5: Smoke test in dev

**Step 1: Start dev server**

```bash
cd /home/scipio/projects/voxpen-website
pnpm dev
```

**Step 2: Manually verify in browser**

Open `http://localhost:5173/zh-tw/download` and check:
- [ ] macOS card appears with 🍎 icon and "下載 DMG（Apple Silicon）" button
- [ ] macOS card is highlighted if visiting from a Mac
- [ ] Windows card shows correct button text
- [ ] Linux card shows AppImage button
- [ ] All three desktop buttons link to `voxpen-releases`
- [ ] Changelog link goes to `voxpen-releases/releases`

Open `http://localhost:5173/en/download` and check same in English.

**Step 3: Final commit if any fixes needed, then push**

```bash
git push origin main
```
