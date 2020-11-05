package StepDefs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

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

public class trackpageTest {
	
	private static WebDriver driver;
	
	@Before
	public void init() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/selenium/driver/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().setSize(new Dimension(1366, 768));
	}
	
	@Given("I am on the Track page")
	public void i_am_on_the_Track_page() {
		driver.get("http://localhost:8082/track.html");
		assertEquals("Tracks", driver.getTitle());
	}

	@When("I search for a Track")
	public void i_search_for_a_Track() {
		driver.get("http://localhost:8082/track.html");
		
		WebElement searchBar = driver.findElement(By.xpath("//*[@id=\"searchField\"]"));
        String searchTerm = "I feel";
        searchBar.sendKeys(searchTerm);
        
        assertEquals(searchTerm, searchBar.getAttribute("value"));
	}

	@Then("I will get the Track I am looking for")
	public void i_will_get_the_Track_I_am_looking_for() {
		driver.get("http://localhost:8082/track.html");
		
		WebElement searchBar = driver.findElement(By.xpath("//*[@id=\"searchField\"]"));
        String searchTerm = "I feel";
        searchBar.sendKeys(searchTerm);
        
        assertTrue(driver.findElement(By.xpath("//*[@id=\"myTable\"]/thead/tr[2]/td[1]")).isDisplayed());
	}

	@When("I click to view the Track Artist")
	public void i_click_to_view_the_Track_Artist() {
		driver.get("http://localhost:8082/track.html");
		
		assertTrue(driver.findElement(By.xpath("//*[@id=\"myTable\"]/thead/tr[2]/td[7]/a")).isDisplayed());
	}

	@Then("I will be on the Artist page of that Track")
	public void i_will_be_on_the_Artist_page_of_that_Track() {
		driver.get("http://localhost:8082/track.html");
		
		driver.findElement(By.xpath("//*[@id=\"myTable\"]/thead/tr[2]/td[7]/a")).click();
		
		assertEquals("Artists", driver.getTitle());
	}

	@When("I click to view the Track Album")
	public void i_click_to_view_the_Track_Album() {
		driver.get("http://localhost:8082/track.html");
		
		assertTrue(driver.findElement(By.xpath("//*[@id=\"myTable\"]/thead/tr[2]/td[6]/a")).isDisplayed());
	}

	@Then("I will be on the Album page of that Track")
	public void i_will_be_on_the_Album_page_of_that_Track() {
		driver.get("http://localhost:8082/track.html");
		
		driver.findElement(By.xpath("//*[@id=\"myTable\"]/thead/tr[2]/td[6]/a")).click();
		
		assertEquals("Albums", driver.getTitle());
	}
	
	@After
	public void fin() {
		driver.close();
	}
}
