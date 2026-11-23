import fs from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const envFile = path.resolve(__dirname, ".env");

if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) continue;

    const separator = trimmedLine.indexOf("=");
    if (separator === -1) continue;

    const key = trimmedLine.slice(0, separator).trim();
    const value = trimmedLine
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) process.env[key] = value;
  }
}

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["junit", { outputFile: "playwright-report/results.xml" }],
  ],
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    video: "on",
    screenshot: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    ...(process.env.CI
      ? [
          {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
          },
        ]
      : []),
  ],
  webServer: {
    command: process.env.CI
      ? "npm run build && npm run start -- --port 3001"
      : "npm run dev -- --port 3001",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
