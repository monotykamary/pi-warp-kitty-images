import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getCapabilities, resetCapabilitiesCache, setCapabilities, setCapabilityOverrides } from "@earendil-works/pi-tui";
import extension from "../extensions/index.js";
const local = false;
const root = resolve(".tmp/pi99-image-test");
const handlers = new Map<string, any>();
const ctx = { mode: "tui", cwd: root };
beforeEach(() => {
  mkdirSync(root, { recursive: true });
  vi.stubEnv("PI_CODING_AGENT_DIR", root);
  for (const name of ["TMUX", "KITTY_WINDOW_ID", "GHOSTTY_RESOURCES_DIR", "WEZTERM_PANE", "ITERM_SESSION_ID", "WT_SESSION", "WARP_SESSION_ID", "WARP_TERMINAL_SESSION_UUID", "PI_IMAGE_PROTOCOL", "PI_HYPERLINKS", "PI_TRUE_COLOR"]) vi.stubEnv(name, "");
  vi.stubEnv("TERM", "xterm-256color"); vi.stubEnv("TERM_PROGRAM", local ? "localterm" : "WarpTerminal"); vi.stubEnv("falseTERM", "1");
  setCapabilityOverrides({}); resetCapabilitiesCache();
  extension({ on: (n: string, f: any) => handlers.set(n, f) } as any);
});
afterEach(() => { handlers.get("session_shutdown")?.({}, ctx); handlers.clear(); setCapabilityOverrides({}); resetCapabilitiesCache(); vi.unstubAllEnvs(); rmSync(root, { recursive: true, force: true }); });
it("loads using actual host capabilities and preserves shutdown/restart", () => {
  const before = getCapabilities();
  handlers.get("session_start")({}, ctx);
  expect(getCapabilities().images).toBe("kitty");
  handlers.get("session_shutdown")?.({}, ctx);
  expect(getCapabilities()).toBe(before);
  handlers.get("session_start")({}, ctx);
  expect(getCapabilities().images).toBe("kitty");
});
it.each(["none", "iterm2"])("honors the %s image protocol override", protocol => {
  vi.stubEnv("PI_IMAGE_PROTOCOL", protocol); resetCapabilitiesCache();
  handlers.get("session_start")({}, ctx);
  expect(getCapabilities().images).toBe(protocol === "none" ? null : "iterm2");
});
it("honors disabled images in host settings", () => {
  writeFileSync(root + "/settings.json", JSON.stringify({ terminal: { images: false } }));
  setCapabilityOverrides({ images: null });
  handlers.get("session_start")({}, ctx);
  expect(getCapabilities().images).toBeNull();
});
it("does not enable images through a multiplexer", () => {
  vi.stubEnv("TERM", "screen-256color"); resetCapabilitiesCache();
  handlers.get("session_start")({}, ctx);
  expect(getCapabilities().images).toBeNull();
});
it("does not mutate capabilities in RPC", () => {
  const before = getCapabilities(); handlers.get("session_start")({}, { ...ctx, mode: "rpc" }); expect(getCapabilities()).toBe(before);
});
it("does not overwrite another capability owner during cleanup", () => {
  handlers.get("session_start")({}, ctx);
  const other = { images: "iterm2" as const, trueColor: false, hyperlinks: false };
  setCapabilities(other); handlers.get("session_shutdown")?.({}, ctx); expect(getCapabilities()).toBe(other);
});
