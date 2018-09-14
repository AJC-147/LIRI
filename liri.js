require("dotenv").config();
var moment = require('moment');
var request = require('request');
var nodeSpotify = require('node-spotify-api');

var inquirer = require('inquirer')
var bandsintown = require('bandsintown')('codingbootcamp');

var keys = require("./keys.js")

var spotify = new nodeSpotify(keys.spotify);

inquirer.prompt([

        {
            type: "checkbox",
            type: "list",
            message: "Select a command",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "command",
    }
])
    .then(function (inquirerResponse) {

        if (inquirerResponse.command == "concert-this") {
            //        console.log("1");
            
            inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter a band: ",
                        name: "band"
            }

        ])
            .then(function(concertEntry)
                 
                 {
                bandsintown
  .getArtistEventList(concertEntry.band)
  .then(function(events) {
                    
                console.log(events);
  });
                
            });
            
            
            
        } 
    
    
    else if (inquirerResponse.command == "spotify-this-song") {
            //        console.log("2");
            
            inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter a song: ",
                        name: "song"
            }

        ])
            .then(function(spotifyEntry){
                
                spotify.search({ type: 'track', query: spotifyEntry.song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
console.log("Artist: " + data.tracks.artist); 
});
                
            });

        } 
    
    else if (inquirerResponse.command == "movie-this") {
            //        console.log("3");

            inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter a movie: ",
                        name: "movie"
            }

        ])
                .then(function (movieEntry) {

                    var movieTitle = movieEntry.movie;
                    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle;

                    request(queryURL, function (err, res, body) {

                        if (!err && res.statusCode === 200) {


                            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                        }

                    });
                });

        } 
    
    else if (inquirerResponse.command == "do-what-it-says") {
            //        console.log("4");
            

        }

    });


//  Commands:
//   * `concert-this`
//node liri.js concert-this <artist/band name here>
//    Return:
//        * Name of the venue
//
//        * Venue location
//
//        * Date of the Event (use moment to format this as "MM/DD/YYYY")
//
//   * `spotify-this-song`
//node liri.js spotify-this-song '<song name here>'
//    Return:
//        * Artist(s)
//     
//        * The song's name
//     
//        * A preview link of the song from Spotify
//     
//        * The album that the song is from
//(If no song is provided then your program will default to "The Sign" by Ace of Base.)
//
//   * `movie-this`
//node liri.js movie-this '<movie name here>'
//        Return:
//            * Title of the movie.
//            * Year the movie came out.
//            * IMDB Rating of the movie.
//            * Rotten Tomatoes Rating of the movie.
//            * Country where the movie was produced.
//            * Language of the movie.
//            * Plot of the movie.
//            * Actors in the movie.
//(If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.')
//
//   * `do-what-it-says`
//node liri.js do-what-it-says`
//            * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//
//* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
//* Make sure you append each command you run to the `log.txt` file. 
//* Do not overwrite your file each time you run a command.