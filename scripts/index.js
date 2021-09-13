
/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 //.addEventListener("click", playSong);
function playSong(songId) {
    let arr = document.getElementsByClassName("now");
    for(let wow of arr){
        wow.classList.remove("now");
    }
    const some = document.getElementById(songId);
    some.classList.add("now");

}

/** 
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleEl = createElement("span",[`Title: ${title}`],[],{id:`title${id}`});
    const albumEl = createElement("span",[`Album: ${album}`],[],{id:`album${id}`});
    const artistEl = createElement("span",[`Artist: ${artist}`],[],{id:`artist${id}`});
    const durationEl = createElement("span",[showDuration(duration)],[],{id:`duration${id}`});
    const children = [titleEl, displayImg(coverArt) , albumEl, artistEl,durationEl]
    const classes = ['songs']
    const attrs = {id:`song${id}`,onclick:`playSong('song${id}')`}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const nameEl = createElement("span",[`Name: ${name}`],[],{id:`name${id}`});
    const durationEl = createElement("span",[showDuration(playlistDuration(id))],[],{id:`duration${id}`});
    const numSongEl = createElement("span",[`Number Of Songs: ${songs.length}`],[],{id:`${songs.length}`});
    const children = [nameEl,,durationEl,numSongEl];
    const classes = ['playlists'];
    const attrs = {id: id};
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
  const element = document.createElement(tagName);
            /*For children */ 
    children.forEach(child => {         
        const listItem = document.createElement(`div`);
        if(typeof child ==="string"){
        listItem.textContent = child;
        }
         else { listItem.appendChild(child)}
         element.appendChild(listItem);
    });
                /*For classes */
    classes.forEach(cl => element.classList.add(cl));

                /*For attributes */     
    for(const att in attributes){
        element.setAttribute(att,attributes[att]);
    }
 return element;
}


// function gets an array and id, check if the array have a cell with that id.
// returns the object or the index based on how the function was called.
// using it also to know if an array consists of somethign where indexOf didnt work
// return undefined if wasnt
function getById(arr,id) {
    try {
        for(let i of arr){
          if(i.id==id){
           return i;
        }
      }
        return undefined;
    }
    catch {
      throw "You should call this function with an array and an id of an item in that array";
    }
    }

    // gets a playlist id and returning its duration
    function playlistDuration(id) {
        try{
        let total = 0;
        const arr = getById(player.playlists,id).songs;
        for(let i = 0; i < arr.length; i++){
          total += getById(player.songs,arr[i]).duration; //getting the song duration from the property songs in player
        }
        return total;
      }
      catch {
         throw "There isn`t such Playlist";
      }
      }
      
    
function showDuration(duration){ 
    try {
    let x = new Date(duration * 1000).toISOString().substr(14, 5);
    return "Duration: " + x;
    }
    catch {
      throw "Please send this function a number"
    }
  } 


  function displayImg(link){
    const image = document.createElement('img'); // creates new element
    image.src = `${link}`;                       // adding attributes
    image.alt ="Song Picture";
    image.classList.add("picture");              //adding class
    return image; 
} 


for(let i=0;i<player.playlists.length;i++){
    document.getElementById('playlists').append(createPlaylistElement(player.playlists[i]));
}
for(let i=0;i<player.songs.length;i++){
  const newSong = createSongElement(player.songs[i])
  document.getElementById('songs').append(newSong);
   }
