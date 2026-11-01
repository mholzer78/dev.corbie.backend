Feature: Users and Authentication API
  As a frontend developer using the corbie.dev API
  I want to fetch user data and authenticate via HTTP endpoints
  So that I can build and test client applications with realistic mock data

  Background:
    Given the API base URL is "http://localhost:3000/api/v1"

  @api @auth
  Scenario: Successful user login with valid credentials
    When I send a "POST" request to "/auth/login" with the payload:
      """
      {
        "email": "michael.hofer@example.at",
        "password": "secretpassword123"
      }
      """
    Then the response status code should be 200
    And the response body should contain an "accessToken"
    And the response user role should be "DEVELOPER"
