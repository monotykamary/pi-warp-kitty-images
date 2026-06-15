<div align="center">

# 🖼️ pi-warp-kitty-images

**Kitty graphics protocol for [Warp terminal](https://warp.dev) in [pi](https://github.com/earendil-works/pi-coding-agent)**

_Enable images, true color, and hyperlinks in Warp's TUI._

[![pi extension](https://img.shields.io/badge/pi-extension-blueviolet)](https://github.com/earendil-works/pi-coding-agent)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

</div>

---

---

## The Problem

Warp supports the [Kitty graphics protocol](https://sw.kovidgoyal.net/kitty/graphics-protocol/), but `pi-tui`'s capability detection doesn't recognize it. Images, true color, and hyperlinks are silently disabled — even though Warp handles them perfectly.

## The Solution

`pi-warp-kitty-images` force-enables image rendering, true color, and hyperlinks when `TERM_PROGRAM=warpterminal`:

| Capability | Before | After |
|-----------|--------|-------|
| Images | ❌ Disabled | ✅ Kitty protocol |
| True Color | ❌ Disabled | ✅ 24-bit color |
| Hyperlinks | ❌ Disabled | ✅ OSC 8 links |

## Installation

```bash
pi install npm:pi-warp-kitty-images
```

Or install from GitHub:

```bash
pi install git:github.com/monotykamary/pi-warp-kitty-images
```

Or manually clone into your pi extensions directory.

## How It Works

On every `session_start`, the extension checks `TERM_PROGRAM`. If it equals `WarpTerminal`, it patches TUI capabilities via `pi-tui`'s `setCapabilities()` API:

```typescript
pi.tui.setCapabilities({
  images: "kitty",
  trueColor: true,
  hyperlinks: true,
});
```

No configuration needed — it just works.

## Requirements

- [pi](https://github.com/pi-engineering/pi) ≥ 1.x
- [Warp](https://warp.dev) terminal

## License

MIT
