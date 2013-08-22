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
  this.tempchords = {};
  this.content = [];
  this.sections = [];
};


/*
/* 
  Internal functions 
*
*/

Song.prototype.addLyriChord = function(lyrichord){
  var lyric = lyrichord.lyric || '';
  if (!lyrichord.chord){ this.content.push(new LyriChord(lyric,-1)); return this.content.length-1; }
  else {
    var chordIndex = this.addChord(lyrichord.chord);
    this.content.push(new LyriChord(lyric,chordIndex))
    return this.content.length-1;
  }
};


Song.prototype.updateLyriChord = function(objectupdate){
  var index = objectupdate.index;
  //update only if specified
  if(objectupdate.lyric){ this.content[index].lyric = objectupdate.lyric };
  if(objectupdate.chord){ this.content[index].chordIndex = this.addChord(objectupdate.chord); }
  // console.log('updated', this);
}


Song.prototype.addChord = function(chord){
  var found = false;
  for(var c=0;c<=this.chords.length;c++){
    if (c===this.chords.length && found===false){
      chord = chord.charAt(0).toUpperCase() + chord.slice(1);
      this.chords.push(new Chord(chord));
      // console.log('new chord at ' + c, this.chords)
      return c;
    }
    else if (this.chords[c].name.toLowerCase() === chord.toLowerCase()){
      found = true;
      // console.log('found chord at ' +c);
      return c;
    }
  }
}

Song.prototype.addSection = function(sectionobject){
  this.sections.push(new Section(sectionobject));
  // console.log(this);
};

Song.prototype.lookupSection = function(sectionname){
  var found = false;
  for(var s=0;s<this.sections.length;s++){
    if (this.sections[s].name === sectionname){ return this.sections[s]; found = true; }
  }
  if(!found){ return false };
};

Song.prototype.sectionObjects = function(sectionname){
  var section = this.lookupSection(sectionname);
  if(section){ 
    var arrayObjects = [];
    for(var i=section.begin;i<=section.end;i++){
      arrayObjects.push(this.content[i]);
    }
    return arrayObjects;
  }
  else{ return false };
}

Song.prototype.transposeChords = function(halfsteps){
  console.log('original: ', this.chords);
  var newChords = [];
  for(var t=0;t<this.chords.length;t++){
    newChords.push(new Chord(this.transpose(this.chords[t].name,halfsteps)));
  }
  var temp = {};
  temp['tempchords'] = newChords;
  temp['transposed'] = halfsteps;
  this.tempchords = temp;
  return this.tempchords;
}

Song.prototype.transpose = function(chordname,halfsteps){ // should replace this with a linked list
  var steps = halfsteps;
  if(steps<0){ steps = 12-Math.abs(steps) }; //account for if steps are negative
  var chord = chordname[0].toUpperCase() + chordname.slice(1);
  var result = ''
  while(steps > 0){
    if(chord[1]==='#'){
      chord = chord.slice(0,1) + chord.slice(2);
      switch(chord[0]){
        case 'C': chord = 'D'+chord.slice(1); break;
        case 'D': chord = 'E'+chord.slice(1); break;
        case 'F': chord = 'G'+chord.slice(1); break;
        case 'G': chord = 'A'+chord.slice(1); break;
        case 'A': chord = 'B'+chord.slice(1); break;
      }
    }
    else if(chord[1]!='#'){
      switch(chord[0]){
        case 'C':
        case 'D':
        case 'F':
        case 'G':
        case 'A':
          chord = chord[0]+'#'+chord.slice(1);
          break;
        case 'E':
          chord = 'F'+chord.slice(1);
          break;
        case 'B':
          chord = 'C'+chord.slice(1);
          break;
      }
    }
    steps--;
  }
  return chord;
}



/*
/* 
  Conversion functions
*
*/




/*
/* 
  Helper classes
*
*/

function Chord(name){
  this.name = name;
};

function LyriChord(lyric,chordIndex){
  this.lyric = lyric;
  this.chordIndex = chordIndex;
};

function Section(sectionobject){
  this.name = sectionobject.name || '';
  this.begin = sectionobject.begin;
  this.end = sectionobject.end;
};







/*
/* 
  Testing
*
*/

var mySong = new Song();


mySong.addLyriChord({lyric:'Hello',chord:'Amaj7'});
mySong.addLyriChord({lyric:'World',chord:'amaJ7'});

mySong.addLyriChord({lyric:'whadddup'});
mySong.addLyriChord({lyric:'whadddup doe'});
mySong.addLyriChord({chord:'Cmin7'});
mySong.addLyriChord({lyric:'test',chord:'cmin7'});

mySong.addChord('amaj7');
mySong.addChord('Amaj7');
mySong.addChord('Cmin7');
mySong.addChord('F');

mySong.addLyriChord({lyric:'testing',chord:'F'});
mySong.updateLyriChord({index:0,chord:'Em'});
mySong.addSection({name: 'Verse1', begin:0, end:3});
// console.log(mySong.lookupSection('Verse1'));
// console.log(mySong.sectionObjects('Verse1'));

// console.log(mySong.transpose('A#min7',3));
console.log(mySong.transposeChords(-2));
console.log(mySong.tempchords);

// console.log(mySong.content[0]);

