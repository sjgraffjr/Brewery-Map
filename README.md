# Brewery Map

An app for finding breweries!

## features
### Front End 

 * Markers-all the breweries have markers on the map
 * The user can click on the marker and an infobox pops up with the name of the brewery, logo, directions, website, address, and phone number.
 * Directions-the user doesn't have to have to plug in their directions 
 * Users can scroll the map for breweries
 * Users can search the map for breweries 
 * Each marker on the map is a brewery.
 * The file contains spatial search 
### Back End 
* Getting all the brewery data from Brewerydb.com- I ran 2 rake tasks get the info
  *   a rake task for locations - to get all the breweries and locations 
  *   a rake taks for images - to get each breweries logo
* I included pagination to keep the database more organize
* I added basic ruby authenication to limit not admin from deleting or editing records



### Stuff used to make this:

 * Front-end React.js and Google Maps
 * Back-end Ruby on Rails and Postgresql Database
 * 
