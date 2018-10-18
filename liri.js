 require("dotenv").config();
 const request = require("request");
 const moment = require("moment");

 const Spotify = require('node-spotify-api');
 const keys = require("./keys.js");

 const inputList = process.argv;
 const command = process.argv[2];
 //  let input = process.argv.slice(2);

 let input = "";
 for (let i = 3; i < process.argv.length; i++) {
     input += process.argv[i];
 }
 //  console.log(process.argv);

 let movieName;
 let artist;
 let song;

 //***************************************************** */
 //MOVIES
 //***************************************************** */

 if (command === "movie-this") {
     input == movieName;
     request(`http://www.omdbapi.com/?apikey=af764c29&t=${movieName}&plot=short`, { json: true }, (err, res, body) => {
         if (err) { return console.log(err); }
         console.log("The movie title is: " + body.Title);
         console.log("The year the movie was made: " + body.Year);
         console.log("The IMDB rating of the movie: " + body.imdbRating);
         console.log("The rotten tomatoes rating: " + body.Ratings[1].Value);
         console.log("The Country of the movie: " + body.Country);
         console.log("The language of the movie: " + body.Language);
         console.log("The movie plot: " + body.Plot);
         console.log("The actors in the movie: " + body.Actors);
     });
 }

 //************************************************************ */
 //BANDS IN TOWN
 //************************************************************ */
 else if (command === "concert-this") {
     input == artist;
     request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, { json: true }, (err, res, body) => {
         if (err) { return console.log(err); }
         //  if (body.length === 0) {
         //      console.log("No information at this time!");
         //  }
         for (let i = 0; i < body.length; i++) {
             console.log("The name of the venue is: " + body[i].venue.name);
             console.log("The venue location is: " + body[i].venue.city + ", " + body[i].venue.region + " " + body[i].venue.country);
             console.log("The date of the event is: " + moment(body[i].datetime).format('MM/DD/YYYY'));
             console.log("---------------------------------------------------");
         }
     });
 }

 //************************************************************ */
 //SPOTIFY
 //************************************************************ */
 else if (command === "spotify-this-song") {
     input == song;

     const spotify = new Spotify(keys.spotify);
     spotify
         .request(`https://api.spotify.com/v1/search?q=${song}&type=track`)

     .then(function(data) {
             console.log(data); //artists
             //  console.log(data); //song's name
             //  console.log(data); //preview link of song from spotify
             //  console.log(data); //the album that the song is from
         })
         .catch(function(err) {
             console.error('Error occurred: ' + err);
         });
 }