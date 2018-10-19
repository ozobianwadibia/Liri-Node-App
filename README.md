
## Using the Liri-node-app

This is a command line application that is used to perform certain tasks.

The bulk of the application is contained in the liri.js file.

The application requires certain modules before it can be fully functional. Some of them include: "fs", "dotenv", and "moment" packages / modules - to be downloaded unto the computer of display.

To start the application, all the necessary files must be present. Load up the liri.js file by opening it in the bash terminal.

In the terminal, for every action to be performed, the first two arguments are: 'node' 'liri.js'. This is followed by two others and vary depending on the task to be performed.

The program takes at most four entries. The command "concert-this" followed by an artist's or band's name will yield information about the artist's upcoming concerts together with time and venue.

The command "movie-this" followed by the name of a movie will yield information about the movie such as title, year of shoot, rating et cetera. If no movie name is entered after "movie-this", information about the movie, "Mr. Nobody", is displayed by default.

The command "spotify-this-song" followed by a song name, will display information about the song, such as title, album and singer. If no song name is provided after the command,information about the song "What's my age again" by Blink-182 is displayed by default.

The command "do-what-it-says" will run a function whose instructions are contained in a text file.

The following is a sample complete command: node liri.js concert-this Lauren Daigle

This one too is a complete command: node liri.js movie-this The Matrix

As is this one: node liri.js spotify-this-song Radioactive