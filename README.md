# pi-warp-kitty-images

Enable the Kitty image protocol for the [Warp terminal](https://warp.dev) inside [pi](https://github.com/pi-engineering/pi)'s TUI.

## What it does

Warp supports the [Kitty graphics protocol](https://sw.kovidgoyal.net/kitty/graphics-protocol/), but `pi-tui`'s capability detection doesn't recognize it. This extension force-enables image rendering, true color, and hyperlinks when `TERM_PROGRAM=warpterminal`.

## Installation

```bash
pi install pi-warp-kitty-images
```

Or manually clone into your pi extensions directory.

## How it works

On every `session_start`, the extension checks `TERM_PROGRAM`. If it equals `WarpTerminal`, it patches TUI capabilities via `pi-tui`'s `setCapabilities()` API:

- `images: "kitty"`
- `trueColor: true`
- `hyperlinks: true`

## Requirements

- [pi](https://github.com/pi-engineering/pi) ≥ 1.x
- [Warp](https://warp.dev) terminal

## License

MIT
