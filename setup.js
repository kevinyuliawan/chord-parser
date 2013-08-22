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
  Helper classes
*
*/

function Chord(name){
  this.name = name;
};

function LyriChord(object){
  for(var prop in object){
    this[prop] = object[prop];
  };
};

function Section(sectionobject){
  if(sectionobject.name){ this.name = sectionobject.name }
    this.begin = sectionobject.begin;
  this.end = sectionobject.end;
};


/*
/* 
  Internal functions 
*
*/

Song.prototype.addLyriChord = function(lyrichord){
  var lyric = lyrichord.lyric || '';
  var lastInLine = lyrichord.lastInLine || false;
  var object = {};
  for(var prop in lyrichord){
    if(prop!='chord') { object[prop] = lyrichord[prop] };
  };

  if (!lyrichord.chord){ this.content.push(new LyriChord(object)); return this.content.length-1; }
  else {
    var chordIndex = this.addChord(lyrichord.chord);
    object.chordIndex = chordIndex;
    this.content.push(new LyriChord(object));
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

String.prototype.contains = function(val){ //helper function
  if(this.indexOf(val) >= 0){return true;  }
  else{return false;};
};

Song.prototype.generateFromMarkdown = function(markdown){
  this.markdown = markdown;
  var sections = markdown.split(/(\*[a-z|A-Z|\s|\d|-]+\*)/); //split by asterisk headers, and store them in the array
  sections = sections.filter(function(n){return n;}); //filter out empty, how this works i do not know
  // console.log('THE SECTIONS',sections);
  var sectionName='';
  for(var s=0;s<sections.length;s++){
    if(sections[s].contains('*')){ sectionName = sections[s].replace("*","").replace("*","") }
      else{
        this.generateSectionFromMarkdown(sections[s],sectionName);
      };

    };
    return this;
  };


  Song.prototype.generateSectionFromMarkdown = function(section,sectionName){
    var sectionobject = {};
    sectionobject.name = sectionName;
    sectionobject.begin = this.content.length;
    var subsections = section.split(/\n\n|\r\r|\r\n\r\n/g);
    for(var b=0;b<subsections.length;b++){
      var lines = subsections[b].split(/\r\n|\r|\n/g); //should also split by two \n , signifying a new subsection similar to <p>
      lines = lines.filter(function(n){return n;}); 
      for(var i=0;i<lines.length;i++){
        var line = lines[i].split(' ');
        for(var k=0;k<line.length;k++){
          var lyric = null;
          var chord = null;
          var object = {};
          var splits = line[k].split('[').filter(function(n){return n;}); //split if chord exists, and if it does, it will have a '[' and need the ']' to filter out later, and filter out empty
          if(splits[0].contains(']')){ chord = splits[0].replace(']','')} // chord is only element
            else {lyric = splits[0]; if(splits[1]){ chord = splits[1].replace(']','')} };
          if(lyric){ object.lyric = lyric };
          if(chord){ object.chord = chord };
          if(k===line.length-1){ object.lastInLine = true };
          if(k===0 && i===0){ object.firstInSection = true };
          if(i===lines.length-1 && k===line.length-1){ object.lastInSection = true };
          this.addLyriChord(object);
        }
      }
    }
sectionobject.end = this.content.length-1;
this.addSection(sectionobject);
}

Song.prototype.generateToMarkdown = function(){
  var returnString = '';
  var curCount = 1;
  var objCount = this.content.length;
  for(var s=0;s<this.sections.length;s++){
    if(this.sections[s].name){ returnString+= '*'+this.sections[s].name+'*'+'\n'};
    for(var k=this.sections[s].begin;k<=this.sections[s].end;k++){
      var lyric = this.content[k].lyric;
      var chordIndex = this.content[k].chordIndex;
      var chord = null;
      if (chordIndex >= 0) { chord = this.chords[chordIndex].name };
      if(lyric){ returnString+=lyric };
      if(chord){ returnString+='['+chord+']' };
      if(this.content[k].lastInLine && curCount!=objCount){ if(this.content[k].lastInSection){returnString+='\n'}; returnString+='\n' }
        else if(curCount!=objCount){ returnString+=' ' };
      curCount++;
    }
  }
  this.markdownGenerated = returnString; //currently set to markdownGenerated in order to compare
  return returnString;
}


Song.prototype.generateHTML = function(){
  var returnHTML = '';
  var curCount = 0;
  for(var s=0;s<this.sections.length;s++){
    if(this.sections[s].name){ returnHTML+= '<div class="section"><p class="lead">'+this.sections[s].name+'</p>'};
    for(var k=this.sections[s].begin;k<=this.sections[s].end;k++){
      var lyric = this.content[k].lyric || '&nbsp';
      var chordExists = false; //needed since 0 returns a null
      if(this.content[k].chordIndex === 0){ chordExists = true };
      var chord = '';
      if(this.content[k].chordIndex || chordExists){ chord = this.chords[this.content[k].chordIndex].name };

      if(this.content[k].firstInSection){ returnHTML+='<div class="subsection">' };
      // if(k==this.sections[s].begin){ console.log('first', this.content[k], chord)}
      returnHTML+='<div class="object" data-index="'+curCount+'"><div class="chord">'+chord+'</div><div class="lyric">'+lyric+'</div></div>';
      if(this.content[k].lastInLine && this.content[k].lastInSection){ returnHTML+='</div>' }
        else if(this.content[k].lastInLine){ returnHTML+='<br/>' };
      curCount++;
    }
    returnHTML +='</div>';
  }
  this.generatedHTML = returnHTML;
  return returnHTML;
}


Song.prototype.testSplit = function(text){
  var arr = text.split(/(\*[a-z|A-Z|\s|\d|-]+\*)/);
  console.log(arr);
}









/*
/* 
  Testing
*
*/

var mySong = new Song();

var text  = "*verse 1*\nfdsa fdsafdsa fdsa[c]\nfdsafdsafds[emaj7] [f] [em7] fdsafdsafdsa[b]\n\n*verse 2*\nqwerqwer qwer\nqwerqwerqwerqwer";

// mySong.testSplit(text);

// console.log(mySong.generateFromMarkdown(text));

/*
mySong.addLyriChord({lyric:'Hello',chord:'Amaj7'});
mySong.addLyriChord({lyric:'World',chord:'amaJ7'});

mySong.addLyriChord({lyric:'whadddup'});
mySong.addLyriChord({lyric:'whadddup doe'});
mySong.addLyriChord({chord:'Cmin7'});
mySong.addLyriChord({lyric:'test',chord:'cmin7', lastInLine:true});

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
console.log(mySong);

// console.log(mySong.content[0]);
*/



