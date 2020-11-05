Feature: Can I access the feature within the Artist page?

  Scenario: View an Artist
    Given I am on the Artist page
    When I click to view an Artist
    Then It will take to the Artist view page
	
  Scenario: Go to Album Page
    Given I am on the Artist view page
    When I click to view an Album
    Then I will be on the Album page of that Artist

  Scenario: Go back to Artists page
    Given I am on the Artist view page
    When I click to go back
    Then I will be back at the Artist page
    
    
    
    