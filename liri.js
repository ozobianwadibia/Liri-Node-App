 require("dotenv").config();
 const request = require("request");
 const moment = require("moment");
 const fs = require("fs");

 const Spotify = require('node-spotify-api');
 const keys = require("./keys.js");

 const inputList = process.argv;
 let command = process.argv[2];
 let input = process.argv.slice(3);
 //  let input = "";
 //  for (let i = 3; i < process.argv.length; i++) {
 //      input += process.argv[i];
 //  }
 //  console.log(input);


 let movieName = "";
 let artist = "";
 let song = "";

 //***************************************************** */
 //MOVIES
 //***************************************************** */
 if (command === "movie-this") {
     if (input === 0) {
         movieName = "Mr. Nobody";
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
     if (input !== 0) {
         movieName += input;
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
 }



 //************************************************************ */
 //BANDS IN TOWN
 //************************************************************ */
 if (command === "concert-this") {
     artist += input;
     request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, { json: true }, (err, res, body) => {
         if (body.length === 0) {
             console.log("No information to display");
         }
         if (err) { return console.log(err); } else {
             for (let i = 0; i < body.length; i++) {
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
 if (command === "spotify-this-song") {
     //  song += input;
     const spotify = new Spotify(keys.spotify);
     //   spotify.request(`https://api.spotify.com/v1/search?q=${song}&type=track`)
     //      .then(function(data) {
     //          console.log(data); //artists
     //          //  console.log(data); //song's name
     //          //  console.log(data); //preview link of song from spotify
     //          //  console.log(data); //the album that the song is from
     //      })
     //      .catch(function(err) {
     //          console.error('Error occurred: ' + err);
     //      });
     spotify.search({ type: "track", query: input }, function(err, data) {
         if (err) {
             console.log('Error occurred: ' + err);
             return;
         } else {
             //  var songInfo = data.tracks.items[0];
             console.log("Artist name: " + data.tracks.items[0].artists[0].name) //artist name
             console.log("Song name: " + data.tracks.items[0].name) //song name
             console.log("Album of song: " + data.tracks.items[0].album.name) //album name
             console.log("Preview URL: " + data.tracks.items[0].preview_url) //url

         };
     });
 }


 //************************************************************ */
 //OTHER
 //************************************************************ */
 if (command === "do-what-it-says") {
     fs.readFile('random.txt', 'utf8', function(error, content) {
         if (error) {
             return console.log(error);
         }
         console.log(content);
         const contentList = content.split(',');
         console.log(contentList);

     });
 }