Feature: Can I get to the HomePage?

  Scenario: Access the HomePage
    Given I have my Chrome open
    When I enter the "<webAddress>"
    Then I will land on the HomePage
