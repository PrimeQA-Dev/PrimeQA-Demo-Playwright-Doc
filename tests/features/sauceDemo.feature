Feature: Sauce Demo

  Background:
    Given user open the source demo url

  @saucedemo
  Scenario: Sauce Demo 
    When user tap on login button
    When user login with the "username1" and "password1" for souce demo
    Then user tap on "About Us" side menu bar
    Then user is on "About Us" page
    Then user tap on "Home" side menu bar
    Then user tap on first product on home page
    Then user tap add to cart
    Then user tap on checkout
    Then user is on my cart page
    Then user tap on checkout button on my cart page
    Then user add delivery address
    


    