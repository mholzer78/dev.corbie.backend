import { Given, When, Then } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';
import type { APIRequestContext, APIResponse } from '@playwright/test';

let apiContext: APIRequestContext;
let response: APIResponse;
let baseUrl: string;

Given('the API base URL is {string}', async function (url: string) {
    baseUrl = url;
    apiContext = await request.newContext({ baseURL: baseUrl });
});

When(
    'I send a {string} request to {string} with the payload:',
    async function (method: string, endpoint: string, docString: string) {
        response = await apiContext.fetch(endpoint, {
            method,
            data: JSON.parse(docString),
            headers: { 'Content-Type': 'application/json' },
        });
    },
);

Then(
    'the response status code should be {int}',
    async function (statusCode: number) {
        expect(response.status()).toBe(statusCode);
    },
);

Then(
    'the response body should contain an {string}',
    async function (key: string) {
        const body = await response.json();
        expect(body).toHaveProperty(key);
    },
);

Then(
    'the response user role should be {string}',
    async function (expectedRole: string) {
        const body = await response.json();
        expect(body.user?.role).toBe(expectedRole);
    },
);
