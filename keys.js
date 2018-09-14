//OMDb Key: trilogy
//"http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy"
//
//BandsinTown Key: codingbootcamp
//"https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp"
//
//Spotify Keys:
//Client ID 7946ab7703324615be4cbb2b2f03dfbd
//Client Secret d9473ffbc0b44af9b8ec0ad532d244d7

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};