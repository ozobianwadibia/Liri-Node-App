 require("dotenv").config(); //for the env file
 const request = require("request"); //the request module
 const moment = require("moment"); //moment module for time
 const fs = require("fs"); //file system module
 const Spotify = require('node-spotify-api'); //for the spotify api
 const keys = require("./keys.js"); //import from keys.js


 const inputList = process.argv;
 //The command that runs a program
 let command = process.argv[2];
 //The user input
 let input = process.argv.slice(3);

 //Name of the movie
 let movieName = "";
 //Name of the artist
 let artist = "";
 //Name of the song
 let song = "";

 //***************************************************** */
 //MOVIES
 //***************************************************** */
 const movie = function() {
     movieName += input;
     let regex = /,/gi;
     movieName = movieName.replace(regex, " ");
     //  console.log(movieName);
     if (movieName === "") {
         movieName = "Mr.Nobody";
     }
     request(`http://www.omdbapi.com/?apikey=af764c29&t=${movieName}&plot=short`, { json: true }, (err, res, body) => {
         if (err) { return console.log(err); }
         console.log();
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
 const band = function() {
     artist += input;
     let regex = /,/gi;
     artist = artist.replace(regex, " ");
     //  console.log(artist);
     request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, { json: true }, (err, res, body) => {
         if (err) { return console.log(err); } else {
             for (let i = 0; i < body.length; i++) {
                 console.log();
                 console.log("The name of the venue is: " + body[i].venue.name);
                 console.log("The venue location is: " + body[i].venue.city + ", " + body[i].venue.region + " " + body[i].venue.country);
                 console.log("The date of the event is: " + moment(body[i].datetime).format('MM/DD/YYYY'));
                 console.log("---------------------------------------------------");
             }
         }
     });
 }

 //************************************************************ */
 //SPOTIFY
 //************************************************************ */
 const music = function() {
         song += input;
         let regex = /,/gi;
         song = song.replace(regex, " ");
         //  console.log(song);
         if (song === "") {
             song = "what's my age again";
         }
         const spotify = new Spotify(keys.spotify);
         spotify.search({ type: "track", query: song }, function(err, data) {
             if (err) {
                 console.log('Error occurred: ' + err);
                 return;
             } else {
                 console.log();
                 console.log("Artist name: " + data.tracks.items[0].artists[0].name) //artist name
                 console.log("Song name: " + data.tracks.items[0].name) //song name
                 console.log("Album of song: " + data.tracks.items[0].album.name) //album name
                 console.log("Preview URL: " + data.tracks.items[0].preview_url) //url
             };
         });
     }
     //************************************************************ */
     //FILE READ
     //************************************************************ */
 const read = function() {
     fs.readFile("random.txt", "utf8", function(err, content) {
         if (err) {
             return console.log(err);
         }
         //  console.log(content);
         const contentList = content.split(',');
         //  console.log(contentList);
         contentList[0] = command;
         contentList[1] += input;
         let regex = /,/gi;
         contentList[1] = contentList[1].replace(regex, " ");
         //  console.log(contentList[1]);
         const spotify = new Spotify(keys.spotify);
         spotify.search({ type: "track", query: contentList[1] }, function(err, data) {
             if (err) {
                 console.log('Error occurred: ' + err);
                 return;
             } else {
                 console.log();
                 console.log("Artist name: " + data.tracks.items[0].artists[0].name) //artist name
                 console.log("Song name: " + data.tracks.items[0].name) //song name
                 console.log("Album of song: " + data.tracks.items[0].album.name) //album name
                 console.log("Preview URL: " + data.tracks.items[0].preview_url) //url
             };
         });
     });
 }

 //switch statements to test and call functions
 switch (command) {
     case "movie-this":
         movie();
         break;
     case "concert-this":
         band();
         break;
     case "spotify-this-song":
         music();
         break;
     case "do-what-it-says":
         read();
         break;
     default:
         console.log("Sorry, that is not a valid command!");
 }