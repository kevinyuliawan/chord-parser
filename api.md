API
----

var mySong = new Song();

- mySong.addLyriChord({lyric:'Hello', chord:'E'});

- mySong.updateLyriChord({ index:0, lyric:'Hola', chord:'F' });  /* can also exclude certain info, except for index */

- mySong.addChord('Fmaj7'); /* return the index of the chord, either if it already exists or needed to be added */

- mySong.addSection({name:'Verse 1',begin:0,end:10}) /* add a new section with the name and beginning and ending objects indeces */

- mySong.lookupSection('Verse 1') /*lookup a section by name */

- mySong.sectionObjects('Verse 1') /*get the objects defined by the session's beginning and ending props, searching for it by name

mySong.generateFromMarkdown('*Verse 1* Hello[E] World[F]');      /* take in Markdown, and populate the song object */

mySong.generateToMarkdown()     /* return Markdown text */

mySong.generateToHTML()     /* return HTML representation of object */

mySong.generateMonospace()      /* return monospaced text, for plain-text editors */