import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { setCapabilities, getCapabilities } from "@mariozechner/pi-tui";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", async () => {
    const termProgram = process.env.TERM_PROGRAM?.toLowerCase() || "";

    if (termProgram === "warpterminal") {
      const caps = getCapabilities();

      if (!caps.images) {
        // Warp supports the Kitty graphics protocol.
        // pi-tui doesn't detect it, so we force-enable it here.
        setCapabilities({
          ...caps,
          images: "kitty",
          trueColor: true,
          hyperlinks: true,
        });
      }
    }
  });
}
