Feature: Login

  Background:
    Given user open the system url

  @smoke1
  Scenario: demo
    When user login with "username" and "password"
    Then user should be logged in successfully
    Then user tap on "Home" menu bar
    Then user should be navigated to "home" page
    Then user tap on "Practice" menu bar
    Then user should be navigated to "Practice" page
    Then user tap on "Courses" menu bar
    Then user should be navigated to "Courses" page
    Then user tap on "Contact" menu bar
    Then user should be navigated to "Contact" page
    Then user tap on "Practice" menu bar
    Then user should be navigated to "Practice" page
    Then user tap on "Courses" menu bar
    Then user should be navigated to "Courses" page
    Then user tap on "Contact" menu bar
    Then user should be navigated to "Contact" page

   