
**Project description**
In this project, you will create a web-based Rick and Morty character encyclopedia by fetching data from the Rick and Morty API. Your application will display character information in a user-friendly format with pagination and detailed character views.

**Setup instructions**
Requirements
Main Page (Character Gallery)
Create a responsive webpage that displays Rick and Morty characters in a 3×2 grid (6 characters per page).
Fetch character data from the Rick and Morty API endpoint: https://rickandmortyapi.com/api/character
Each character card should display, at minimum:
Character image
Character name
Species
Status (Alive, Dead, Unknown)
Implement "Next" and "Previous" buttons for pagination to navigate through all available characters.
Add a clickable link on each character card that opens a detailed view in a new tab.
Add a live-updating footer clock that displays time in the format: HH:MM:SS Day Date (e.g., "14:30:45 Friday March 17, 2025")
Character Detail Page
Create a separate page template for displaying detailed character information.
When a user clicks on a character card, open this page in a new browser tab.
Fetch the specific character's data using their ID from the API.
Display comprehensive character information including:
Full-size character image
Name
Status
Species
Type (if available)
Gender
Origin location
Current location
Episode appearances (names or count)
Include the same live-updating footer clock as on the main page.
API Information
Base URL: https://rickandmortyapi.com/api
Character endpoint: https://rickandmortyapi.com/api/character
Individual character endpoint: https://rickandmortyapi.com/api/character/{id}
The API returns information in JSON format. Each character object contains various properties including:

id: The character's unique identifier
name: The character's name
status: The character's status (Alive, Dead, Unknown)
species: The character's species
type: The character's type or subspecies
gender: The character's gender
origin: Object containing name and URL of the character's origin location
location: Object containing name and URL of the character's current location
image: URL to the character's image
episode: Array of URLs to episodes where this character appears
url: URL to the character's own endpoint
created: Time at which the character was created in the database
Additional Challenges (Optional)
Add a dark/light theme toggle.
Create a "Random Character" button that loads a random character's detail page.


**Screenshots of your application**
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" align="center" alt="html5">
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" align="center" alt="html5">
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" align="center" alt="html5">
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" align="center" alt="html5">


<a href="https://amazing-sunburst-1799d7.netlify.app/">Live Link</a>