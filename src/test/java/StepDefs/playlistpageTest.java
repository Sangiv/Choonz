package StepDefs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
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
	
	@Given("I am on the HomePage")
	public void i_am_on_the_HomePage() {
		driver.get("http://localhost:8082/index.html");
		assertEquals("Music Library", driver.getTitle());
	}

	@When("I click the playlist tab")
	public void i_click_the_playlist_tab() {
		driver.get("http://localhost:8082/index.html");
		assertTrue(driver.findElement(By.xpath("//*[@id=\"navbarNav\"]/class/li[2]/a")).isDisplayed());
	}

	@Then("I will land on the Playlist Page")
	public void i_will_land_on_the_Playlist_Page() {
		driver.get("http://localhost:8082/index.html");
		driver.findElement(By.xpath("//*[@id=\"navbarNav\"]/class/li[2]/a")).click();
		assertEquals("Playlist", driver.getTitle());
	}
	
	@After
	public void fin() {
		driver.close();
	}
}
