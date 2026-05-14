<div align="center">

# 🖼️ pi-warp-kitty-images

Enable the **Kitty graphics protocol** for the [Warp terminal](https://warp.dev) inside [pi](https://github.com/pi-engineering/pi)'s TUI.

</div>

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
pi install pi-warp-kitty-images
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
