Feature: Can I access the feature within the Playlist page?
	
  Scenario: View a Playlist
    Given I am on the Playlist page
    When I select a Playlist
    Then I will see the tracks in that Playlist
	
  Scenario: Add a track to a Playlist 
    Given I am Logged in
    When I click to add a Track to the Playlist
    Then I will add that track to my Playlist
    
  Scenario: Remove a track from a Playlist
    Given I am Logged in
    When I click to remove a Track from the Playlist
    Then I will remove that track from my Playlist
    
    
    
    