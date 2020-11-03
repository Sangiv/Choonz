Feature: Can I access the feature within the Album page?

  Scenario: View an Album
    Given I am on the Album page
    When I click to view an Album
    Then It will take to the Album view page
    And I will be able to view the tracks in the Album
	
  Scenario: View Tracks in an Album
    Given I am on the Album page
    When I click to view an Album
    And I click to view the lyrics of a track in the Album
    Then I will be able to view the lyrics of that track

  Scenario: Go to Artist Page
    Given I am on the Album view page
    When I click to view the Artist
    Then I will be able on the Artist page of that Album
    
  Scenario: Go back to Albums
    Given I am on the Album view page
    When I click to go back
    Then I will be back at the Album page
    
    
    
    