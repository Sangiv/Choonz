package StepDefs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class playlistpageTest {
	
	private static WebDriver driver;
	
	@Before
	public void init() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/selenium/driver/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().setSize(new Dimension(1366, 768));
	}
	
	@Given("I am on the Playlist page")
	public void i_am_on_the_Playlist_page() {
		driver.get("http://localhost:8082/playlist.html");
		assertEquals("Playlists", driver.getTitle());
	}

	@When("I select a Playlist")
	public void i_select_a_Playlist() {
		driver.get("http://localhost:8082/playlist.html");
		
		assertTrue(driver.findElement(By.xpath("//*[@id=\"showcards\"]")).isDisplayed());
	}

	@Then("I will see the tracks in that Playlist")
	public void i_will_see_the_tracks_in_that_Playlist() {
		driver.get("http://localhost:8082/playlist.html");
		
        List<WebElement> results;
        results = driver.findElements(By.xpath("//*[@id=\"showcards\"]"));
        
        results.get(0).findElement(By.id("button")).click();
		
		assertEquals("Playlists", driver.getTitle());
	}
	
	@Given("I am Logged in")
	public void i_am_Logged_in() {
		driver.get("http://localhost:8082/index.html");
		
		driver.findElement(By.xpath("//*[@id=\"guestLoggedInBtn\"]/li/div/button")).click();
		
		driver.findElement(By.xpath("//*[@id=\"guestLoggedInBtn\"]/li/div/div/button[1]")).click();
		
		WebElement username = driver.findElement(By.xpath("//*[@id=\"userLoginModal\"]/div/div/div[2]/form/div[1]/input"));
		username.sendKeys("1");
		WebElement password = driver.findElement(By.xpath("//*[@id=\"userLoginModal\"]/div/div/div[2]/form/div[2]/input"));
		password.sendKeys("123456");
		
		driver.findElement(By.xpath("//*[@id=\"userLoginModal\"]/div/div/div[2]/form/div[3]/button[2]")).click();
		
		assertTrue(driver.findElement(By.xpath("//*[@id=\"myProfile\"]")).isDisplayed());
	}

	@When("I click to add a Track to the Playlist")
	public void i_click_to_add_a_Track_to_the_Playlist() {
		driver.get("http://localhost:8082/playlists.html");
;
		driver.findElement(By.xpath("//*[@id=\"viewMyPlayBtn\"]")).click();
		
		assertEquals("Playlists", driver.getTitle());
	}

	@Then("I will add that track to my Playlist")
	public void i_will_add_that_track_to_my_Playlist() {
		driver.get("http://localhost:8082/playlists.html");

		driver.findElement(By.xpath("//*[@id=\"viewMyPlayBtn\"]")).click();
		
		driver.findElement(By.xpath("//*[@id=\"addToMyPlayBtn\"]")).click();
		driver.findElement(By.xpath("//*[@id=\"1\"]")).click();
		driver.findElement(By.xpath("//*[@id=\"myTable\"]/thead/tr[2]/td[2]/a")).click();
		driver.findElement(By.xpath("//*[@id=\"navbar\"]/ul[2]/class/li[2]/a")).click();
		driver.findElement(By.xpath("//*[@id=\"viewMyPlayBtn\"]")).click();
		
		assertTrue(driver.findElement(By.xpath("//*[@id=\"track_table\"]/thead/tr[2]/td[1]")).isDisplayed());
	}

	@When("I click to remove a Track from the Playlist")
	public void i_click_to_remove_a_Track_from_the_Playlist() {
		driver.get("http://localhost:8082/playlists.html");

		driver.findElement(By.xpath("//*[@id=\"viewMyPlayBtn\"]")).click();
		
		assertEquals("Playlists", driver.getTitle());
	}

	@Then("I will remove that track from my Playlist")
	public void i_will_remove_that_track_from_my_Playlist() {
		driver.get("http://localhost:8082/playlists.html");

		driver.findElement(By.xpath("//*[@id=\"viewMyPlayBtn\"]")).click();
		
		driver.findElement(By.xpath("//*[@id=\"deletePlay\"]")).click();
		driver.findElement(By.xpath("//*[@id=\"confirmedDeleteBtn\"]")).click();
		
		assertEquals("Playlists", driver.getTitle());
	}
	
	@After
	public void fin() {
		driver.close();
	}
	
}
