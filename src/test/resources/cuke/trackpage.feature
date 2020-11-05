Feature: Can I access the feature within the Track page?
	
  Scenario: View a Track
    Given I am on the Track page
    When I search for a Track
    Then I will get the Track I am looking for
	
  Scenario: Go to Artist Page
    Given I am on the Track page
    When I click to view the Track Artist
    Then I will be on the Artist page of that Track
    
  Scenario: Go back to Albums
    Given I am on the Track page
    When I click to view the Track Album
    Then I will be on the Album page of that Track
    
    
    
    