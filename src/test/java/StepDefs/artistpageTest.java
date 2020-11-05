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

public class artistpageTest {
	
	private static WebDriver driver;
	
	@Before
	public void init() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/selenium/driver/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().setSize(new Dimension(1366, 768));
	}
	
	@Given("I am on the Artist page")
	public void i_am_on_the_Artist_page() {
		driver.get("http://localhost:8082/artist.html");
		assertEquals("Artists", driver.getTitle());
	}

	@When("I click to view an Artist")
	public void i_click_to_view_an_Artist() {
		driver.get("http://localhost:8082/artist.html");
		assertTrue(driver.findElement(By.xpath("//*[@id=\"showcards\"]")).isDisplayed());
	}

	@Then("It will take to the Artist view page")
	public void it_will_take_to_the_Artist_view_page() {
		driver.get("http://localhost:8082/album.html");
		
        List<WebElement> results;
        results = driver.findElements(By.xpath("//*[@id=\"showcards\"]"));
        
        results.get(0).findElement(By.xpath("//*[@id=\"card1\"]")).click();
        assertEquals("Albums", driver.getTitle());
	}

	@Given("I am on the Artist view page")
	public void i_am_on_the_Artist_view_page() {
		driver.get("http://localhost:8082/artistalbums.html?id=1");
		assertEquals("Artists", driver.getTitle());
	}

	@Then("I will be on the Album page of that Artist")
	public void i_will_be_on_the_Album_page_of_that_Artist() {
		driver.get("http://localhost:8082/artistalbums.html?id=1");
		
		driver.findElement(By.xpath("/html/body/div[2]/table/thead/tr[2]/td[3]/a")).click();
		
		assertEquals("Albums", driver.getTitle());
	}

	@Then("I will be back at the Artist page")
	public void i_will_be_back_at_the_Artist_page() {
		driver.get("http://localhost:8082/artistalbums.html?id=1");
		
        List<WebElement> results;
        results = driver.findElements(By.xpath("//*[@id=\"body\"]"));
        
        results.get(0).findElement(By.xpath("//*[@id=\"button\"]")).click();
		
		assertEquals("Albums", driver.getTitle());
	}
	
	@After
	public void fin() {
		driver.close();
	}

}
