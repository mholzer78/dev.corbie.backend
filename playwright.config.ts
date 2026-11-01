import { defineConfig } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'node dist/app.js', // The command to start your Angular/React/Next frontend
        url: 'http://localhost:4200', // The URL your server uses
        reuseExistingServer: true, // CRITICAL: Won't restart if already running
        timeout: 120 * 1000, // 2 minutes max to wait for the server to spin up
    },
});
