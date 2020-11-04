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
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class albumpageTest {
	
	private static WebDriver driver;
	
	@Before
	public void init() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/selenium/driver/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().setSize(new Dimension(1366, 768));
	}
	
	@Given("I am on the Album page")
	public void i_am_on_the_Album_page() {
		driver.get("http://localhost:8082/album.html");
		assertEquals("Albums", driver.getTitle());
	}

	@When("I click to view an Album")
	public void i_click_to_view_an_Album() {
		driver.get("http://localhost:8082/album.html");
		assertTrue(driver.findElement(By.xpath("/html/body/div/div[2]")).isDisplayed());
	}

	@Then("It will take to the Album view page")
	public void it_will_take_to_the_Album_view_page() {
		driver.get("http://localhost:8082/album.html");
		
        List<WebElement> results;
        results = driver.findElements(By.xpath("/html/body/div/div[2]"));
        
        results.get(0).findElement(By.id("button")).click();
        assertEquals("View tracks", driver.getTitle());
	}

	@Then("I will be able to view the tracks in the Album")
	public void i_will_be_able_o_view_the_tracks_in_the_Album() {
		driver.get("http://localhost:8082/albumview.html");
		assertTrue(driver.findElement(By.xpath("/html/body/div[2]")).isDisplayed());
	}

	@Given("I am on the Album view page")
	public void i_am_on_the_Album_view_page() {
		driver.get("http://localhost:8082/albumview.html");
		assertEquals("View tracks", driver.getTitle());
	}

	@When("I click to view the Artist")
	public void i_click_to_view_the_Artist() {
		driver.get("http://localhost:8082/albumview.html");
		assertTrue(driver.findElement(By.xpath("//*[@id=\"button\"]")).isDisplayed());
	}

	@Then("I will be able on the Artist page of that Album")
	public void i_will_be_able_on_the_Artist_page_of_that_Album() {
		driver.get("http://localhost:8082/albumview.html");
		driver.findElement(By.xpath("//*[@id=\"button\"]")).click();
		assertEquals("Artist's Albums", driver.getTitle());
	}

	@When("I click to go back")
	public void i_click_to_go_back() {
		driver.get("http://localhost:8082/albumview.html");
		assertTrue(driver.findElement(By.xpath("//*[@id=\"button2\"]")).isDisplayed());
	}

	@Then("I will be back at the Album page")
	public void i_will_be_back_at_the_Album_page() {
		driver.get("http://localhost:8082/albumview.html");
		driver.findElement(By.xpath("//*[@id=\"button2\"]")).click();
		assertEquals("Albums", driver.getTitle());
	}
	
	@After
	public void fin() {
		driver.close();
	}
}
