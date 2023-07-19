# Movies World
## A platform that lets  you search theaters book and modify your bookings
### Business Requirements  and Scope of the System

In this digital era more and more people are looking forward to completing their daily tasks online and reserving tickets for their favourite shows is no different. It's understandable why more and more individuals are choosing to purchase their movie tickets online given the comfort and ease that online ticket purchasing provides.
The time when purchasing tickets required standing in line outside the theatre is left behind. Now people just have to go through the website and press a few buttons and voila movie tickets are booked. It’s quick, simple, and saves you a ton of time and work.

1)	Area Selection: It allows users to select their preferred area. This feature will provide users with more options and flexibility in choosing a theatre that meets their requirements.

2)	Theater Selection: This requirement involves users selecting their preferred theatre based on the area location. The list of theatres will be displayed in sorted order based on the location they have selected. This feature will provide users with more options and flexibility in choosing a theatre that meets their requirements.

3)	Movie Search: This requirement involves allowing users to view the movies that are currently playing in theatres. 

4)	Seat Availability: This requirement involves displaying the availability of seats for the selected showtime in the selected theatre. Users should be able to view the seating chart and select their preferred seats based on availability. This feature will allow users to choose their preferred seats in advance and avoid any last-minute hassle.

5)	Seat Selection: This requirement allows users to select their preferred theatre seats. The app should display a seating chart, and users should be able to select seats based on their preferences.
6)	Booking Confirmation: Once the booking is complete, the app should display the booking confirmation details, including movie details, seat numbers, and show timings. This feature will provide users with confirmation of their booking and all the necessary details related to their booking.
7)	Ticket Cancellation: The app should allow users to cancel their tickets if they are unable to attend the movie. 

8)	Modify Ticket: The app should allow users to modify their ticket details and can update their names.


**NOTE:** We have added testing test.py file for all the core business logic.

[![Github Link](https://github.com/AnanyaSahu/Movies-world)](https://github.com/AnanyaSahu/Movies-world)


## Tech

- [Javascript] - HTML enhanced for web apps!
- [Python] - Backend system is devloped in python
- [HTMl / CSS / Bootstrap/ Font Awesome/ Jquery] - Frontend devlopment
- [SQL] - Database  

## License
**Free Software, Hell Yeah!**

## Contributiors
**Ananya Sahu (10627321)**
Our business concept was to develop an app that allows users to search theatres and book movie tickets. I began by creating the original repository base on GitHub and the database so that the group could begin working on the business that we created. Our project includes four parts, and we separated the jobs such that everyone is working on a different section of the program. 
My contribution was to create a book tickets module, where the user could choose their preferred seat and purchase the ticket. Any movie ticket purchasing has a criterion where if the customer's age is less than the age restriction for the movie, he will not be able to book the tickets. This module also contains a booking modification capability, allowing users to cancel their reservations or edit the customer's name.
I was also in charge of developing the Frontend framework (HTML + JavaScript) and creating APIs to interact between the Frontend framework and the backend (Python). I was responsible for creating most of the test cases for testing the business logic. I've also built up VMs on Azure for our application and a cloud database. My work also included combining the team's efforts in terms of module integration.

**Baran Azak (10636432)**
My task in our project was to create a get-ticket page and fetch the movie booking for a particular booking ID from Movie Database, I set the important details for the ticket such as theater name, theater area, customer name, etc. By using particular “booking_id”, I gathered all the details about ticket and created a file that will contain all details about ticket and saved this file as “bookingdetails.txt”. Also created a method for the user to download this txt file by using URL. Finally, we have fixed the parts of the project that are not working properly and added things that need to be added.

**Divya (10634832)**
Contribution to the project: In the CA (two) assessment. I have contributed the section to show the user a list of nearby theatres based on location in sorted order. In this, I have created a function “get_theaters” which retrieves data from a database table named “Area”. It first establishes a database connection using the ‘openDbconnection()’ and assigns the resulting connection to a variable named cursor.
The function then creates an SQL query that selects all the records from the "Area" table and assigns it to a variable called getAreaQuery. The query is executed using the execute() method of the cursor object and the results are fetched using the fetchall() method and assigned to a variable called record.
The function converts the results into a list of tuples using a list comprehension and assigns the resulting list to a variable called r. Finally, the function returns a dictionary object with a single key-value pair where the key is "rows" and the value is the list of tuples r.

**Sneha (10631640)**
In our project, I have contributed to the part of retrieving a list of movies that are currently playing at a given theatre. For this, I have defined a function “get_movies_by_theatre”. It takes a ‘theatreId’ parameter as input and returns a dictionary object containing the query results. This function uses an SQL query to retrieve the list of movies from a database. It first opens a database connection using the openDbConnection function and then executes a SQL query that joins the TheaterMovie and Movie tables to obtain the movie information for the given theatre. The function then formats the query results into a dictionary object and returns it. I have tested the get_movies_by_theatre function by using the unittest class ‘TestGetMoviesByTheatre’. It defines two test methods: The test_get_movies_for_valid_theatre_id method tests the function's behaviour when a valid theatreId is provided as input. The test verifies that the function returns the expected dictionary object and that the SQL query executed by the function matches the expected query. The test_get_movies_for_invalid_theatre_id method tests the function's behaviour when an invalid theatreId is provided as input. The test verifies that the function returns an empty dictionary object and that the SQL query executed by the function matches the expected query for the invalid theatreId.


## Attributions 

- Movie.js (lines 9-21)-> https://www.w3schools.com/howto/howto_js_tabs.asp 
- index.html (lines 26-33) –>  https://www.w3schools.com/howto/howto_js_tabs.asp 
- global.css (lines 47-83) -> https://www.w3schools.com/css/css_dropdowns.asp
- global.css (lines 169 -202) -> https://www.w3schools.com/howto/howto_js_tabs.asp


