package com.qa.choonz.cuke.stepdefs;

import static org.junit.Assert.assertEquals;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class homepageTest {
	
	private static WebDriver driver;
	
	@Before
	public void init() {
        System.setProperty("webdriver.chrome.driver", "src/test/resources/selenium/driver/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().setSize(new Dimension(1366, 768));
	}
	
	@Given("I have my Chrome open")
	public void i_have_my_Chrome_open() {
		driver.get("https://google.com");		
        assertEquals("Google", driver.getTitle());
	}

	@When("I enter the {string}")
	public void i_enter_the(String webAddress) {
		driver.get("http://localhost:8082/index.html");
	}

	@Then("I will land on the HomePage")
	public void i_will_land_on_the_HomePage() {
		driver.get("http://localhost:8082/index.html");
		assertEquals("Music Library", driver.getTitle());
	}
}
