/* function Song(){
  this.title = ''
  this.artist = ''
  this.author = ''
  this.content = [
    {
      this.sectionname = 'Verse',
      this.objects = [
         {word: 'Hello', chord:'A'}
        ,{word: 'World', chord:'Em'}
        ,{word:'how', chord:'G'}
        ,{word: 'are', chord:'C'}
      ]
    },
    {
      this.sectionname = 'Chorus',
      this.objects = [
        {word:'Chorus', chord:'G'}
        {word:'here.', chord:'Am'}
      ]
    }
  ]
}


function Section(name){
  this.sectionname = name;
  this.objects = [];
}
*/


/*      */

function Song(){
  this.chords = [];
  this.content = [];
  this.sections = [];
};

Song.prototype.addLyriChord = function(lyrichord){
  var found = false;
  var lyric = lyrichord.lyric || '';
  var chord = lyrichord.chord || '';
  for(var c=0;c<=this.chords.length;c++){ //check if chord object exists with chord name, if it does, return it, otherwise insert it
    if       (chord === ''){ this.content.push(new LyriChord(lyric,-1)); c++;}
    else if  ( c===this.chords.length && found===false ) { //end of array and no chord found, insert new chord and lyric with index of that chord
      chord = chord.charAt(0).toUpperCase() + chord.slice(1);
      this.chords.push(new Chord(chord));
      this.content.push(new LyriChord(lyric,c));
      c++;
      console.log(this);
    }
    else if  ( c!=this.chords.length && this.chords[c].name.toLowerCase()===chord.toLowerCase()){ //found existing chord object
      this.content.push(new LyriChord(lyric,c));
      found = true;
      console.log(this);
    };
    
  };
};



function Chord(name){
  this.name = name;
};

function LyriChord(lyric,chordIndex){
  this.lyric = lyric;
  this.chordIndex = chordIndex;
};

function Section(name,begin,end){
  this.name = name || '';
  this.begin = begin;
  this.end = end;
};


/*   testing   */

var mySong = new Song();
mySong.addLyriChord({lyric:'Hello',chord:'Amaj7'});
mySong.addLyriChord({lyric:'World',chord:'amaJ7'});
mySong.addLyriChord({lyric:'whadddup'});
mySong.addLyriChord({lyric:'whadddup doe'});
mySong.addLyriChord({chord:'Cmin7'});
mySong.addLyriChord({lyric:'test',chord:'cmin7'});

console.log(mySong.content[0]);

