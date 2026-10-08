<div align="center">

# 🖼️ pi-warp-kitty-images

**Kitty graphics protocol for [Warp](https://warp.dev) in [Pi](https://github.com/earendil-works/pi)**

</div>

## Pi now detects Warp natively

Pi 1.0 recognizes `TERM_PROGRAM=WarpTerminal`, `WARP_SESSION_ID`, and `WARP_TERMINAL_SESSION_UUID`, enabling Kitty images, true color, and OSC 8 hyperlinks. This extension is now a compatibility package: it uses the native capability contract rather than force-enabling features.

Existing installs can remain installed or be removed without losing native Warp support:

```bash
pi remove npm:pi-warp-kitty-images
```

## Installation

```bash
pi install npm:pi-warp-kitty-images
```

## Configuration

Pi's `terminal.images`, `terminal.trueColor`, and `terminal.hyperlinks` settings take precedence over environment overrides. `PI_IMAGE_PROTOCOL=none` disables images. Automatic detection remains conservative inside tmux/screen; this package does not bypass that safety check.

## Development

```bash
bun install
bun run test
bun run typecheck
```

## Requirements

- Pi 1.1.0
- Warp terminal for native image support

## License

MIT

## Pi 1.0 compatibility (1.0.5)

Uses Pi 1.0's native Warp detection instead of overwriting global capabilities. Settings and environment overrides, multiplexer safety, headless operation and repeated lifecycle events are covered by actual-host tests.

Tested with Pi 1.1.0. Host-provided Pi packages are wildcard peers, not bundled dependencies; development uses exact 1.1.0 versions. `bun run test:pi` checks actual modular and bundled CLI host detection and lifecycle behavior, without opening a TUI.
