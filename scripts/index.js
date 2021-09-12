
/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */

function playSong(songId) {
    const song = document.getElementById(songId);
    if(song.hasAttribute("id"))
    song.removeAttribute("id");
    else{
    song.setAttribute("id","now");
    }
    
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [`Title: ${title}`, `Album: ${album}`, `Artist: ${artist}`, displayImg(coverArt) ,showDuration(duration)]
    const classes = ['songs']
    const attrs = {id:id, onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
   
    const children = [`Name: ${name}`,`Number Of Songs: ${songs.length}`,showDuration(playlistDuration(id))]
    const classes = ['playlists']
    const attrs = {id: id}
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
    children.forEach(child => {
        const listItem = document.createElement(`div`);
        if(typeof child ==="string"){
        listItem.innerHTML = child;
        }
         else { listItem.appendChild(child)}
         element.appendChild(listItem);
    });
    classes.forEach(cl => element.classList.add(cl));

    for(const att in attributes){
        element.setAttribute(att,attributes[att]);
    }
 return element;
}

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
    const image = document.createElement('img');
    image.src = `${link}`;
    image.alt ="Song Picture";
    image.classList.add("picture");
    return image; 
} 
  
for(let i=0;i<player.songs.length;i++){
   document.getElementById('songs').append(createSongElement(player.songs[i]));
    }
for(let i=0;i<player.playlists.length;i++){
    document.getElementById('playlists').append(createPlaylistElement(player.playlists[i]));
}
