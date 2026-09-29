import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { getCapabilities } from "@earendil-works/pi-tui";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", (_event, ctx) => {
    if (ctx.mode !== "tui") return;
    // Pi 0.99 natively detects Warp (including WARP_SESSION_ID). Let the
    // host honor terminal settings, environment overrides and tmux safety.
    // No global override means reload/shutdown cannot leak capabilities.
    getCapabilities();
  });
}
