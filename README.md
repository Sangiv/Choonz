Coverage: 85%

# Choonz

Music library web application capable of allowing users to search and view tracks, albums, artists and genres. Users are also able to create an account and log in so that they can create, read, update and delete their playlists containing tracks. Front end suite: HTML, CSS and JavaScript. Back end suite: Java, SpringBoot and Maven. Testing suite: JUnit, Mockito, Selenium, Cucmuber/Gherkin and JMeter. 

### Training Team

- **Client** - [**Angelica Charry**](https://github.com/acharry) - **Software Delivery Manager**
- **Product Owner** - [**Nick Johnson**](https://github.com/nickrstewarttds) - **Initial work (backend & frontend development, specification)**
- **Product Owner** - [**Edward Reynolds**](https://github.com/Edrz-96) - **Initial work (testing, specification)**
- [**Jordan Harrison**](https://github.com/JHarry444) - **General Java wizardry**
- [**Alan Davies**](https://github.com/MorickClive)
- [**Savannah Vaithilingham**](https://github.com/savannahvaith)
- [**Vinesh Ghela**](https://github.com/vineshghela)
- [**Piers Barber**](https://github.com/PCMBarber)

### Development Team

- Sangiv - Back End, Testing (https://github.com/Sangiv)
- Adam - Front End (https://github.com/Adam-QA)
- Joni - Back End, Font End (https://github.com/MJoni)
- Simon - Front End (https://github.com/SimonQAC)

## Getting Started

To run project from your IDE:
1) Fork the repo
2) Open as a maven project in your IDE
3) Run as SpringBoot app
4) Go to localhost:8082/index.html on your web browser (chrome prefered)
5) Enjoy the site!

Alternatively you can run from command line (see deployment).

### Prerequisites

To make changes, run or develope over this project you will need Eclispe IDE, Visual Studio Code, Jmeter, Postman, Selenium and MYSQL.
Eclipse: https://www.eclipse.org/downloads/packages/installer#:~:text=5%20Steps%20to%20Install%20Eclipse%201%20Download%20the,available%20to%20Eclipse%20users.%20...%20More%20items...%20

Visual Studio Code:
https://code.visualstudio.com/

JMeter:
https://jmeter.apache.org/

Postman:
https://www.postman.com/

Selenium:
https://www.selenium.dev/downloads/

MYSQL:
https://www.mysql.com/downloads/
Once installed and set up, you will need initialise the database using the data.sql file provided in this project.

## Running the tests

To run the functional tests:

1) Open project using eclipse IDE (see Getting started section)
2) Right click on the project in the working tree and select run-> as Junit test.
3) You can select coverage -> as Junit test to get coverage of entire project also.

To run the non-functional tests:

1) Open command prompt and navigate to Choonz\target\reports\JMeter\JMX Files
2) Run command: jmeter -n -t yourtests.jmx -l "Output for csv/xml" -e -o "Output for HTML Report"
3) Navigate to location where you chose to save the html report and open file in browser to view the report.

### Functional Testing 

Unit and Integration testing of the rest and service layers were performed using JUnit and Mockito and can be viewed in src\test\java\com\qa\choonz.
UI-testing was also conducted for this project using Selenium and Cucumber, feature files can be viewed in src\test\resources\cuke and step definitions are located in src\test\java. 

### Non-Functional Testing 

Non-functional testing was carried out using JMeter. Load, Soak, Spike and Stress testing were conducted on the web application. JMX files, html reports and csv results generated can be found in thier respective folders.

Test Plans written to test CRUD functionality of the web app for all entities, seperated by logic controllers for each entity to make the test cases more
readable between them.

Average thread count was taken to be 500 and peak thread count was 1000. Testing timescale was 90 seconds for each test.

Majority of errors were caused by the duration assertion, especially for the Spike test were the load was so great over a small period of time requiring the web api to need more
time to retrieve the request. Throuput was aslo negativly affected for the same reasons and showed itself most clearly in the spike and soak tests. 

## Deployment

Fork repo, from the command line change directory to ->IMS-Starter\target and run the .jar file using: java -jar ims-0.0.1-jar-with-dependencies.jar
Use mvn clean package in IMS-Starter to build out application again.

## Built With

* [Maven](https://maven.apache.org/) - Dependency Management

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the MIT license - see the [LICENSE.md](LICENSE.md) file for details 

*For help in [Choosing a license](https://choosealicense.com/)*
