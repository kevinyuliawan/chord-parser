API
----

var mySong = new Song();

- mySong.addLyriChord({lyric:'Hello', chord:'E'}); /* new LyriChord takes an object and sets all of the LyriChord properties to that object. used for if you need prototypes down the road */

- mySong.updateLyriChord({ index:0, lyric:'Hola', chord:'F' });  /* can also exclude certain info, except for index */

- mySong.addChord('Fmaj7'); /* return the index of the chord, either if it already exists or needed to be added */

- mySong.addSection({name:'Verse 1',begin:0,end:10}) /* add a new section with the name and beginning and ending objects indeces */

- mySong.lookupSection('Verse 1') /*lookup a section by name */

- mySong.sectionObjects('Verse 1') /*get the objects defined by the session's beginning and ending props, searching for it by name

- mySong.transposeChords(2 OR -2) /* transpose the current chords by that number and return them. Also stores them in a tempchords object which holds the number transposed by and the chord objects (chord.name for the name)

- mySong.transpose('A',2 OR -2) /* helper function used by transposeChords to transpose a given chord name. implemented hardcoded with switch cases but should be implemented with a circular, doubly linked list of notess */



- mySong.generateFromMarkdown('*Verse 1* Hello[E] World[F]');      /* take in Markdown, and populate the song object */

- mySong.generateSectionFromMarkdown(section,sectionName) /* helper function used by generateFromMarkdown to generate the sections and populate the song with the LyriChords */

- mySong.generateToMarkdown()     /* return Markdown text. currently set to this.generatedMarkdown instead of this.markdown in order to test */

- mySong.generateToHTML()     /* return HTML representation of object */

mySong.generateMonospace()      /* return monospaced text, for plain-text editors */