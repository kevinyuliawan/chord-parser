API
----

var mySong = new Song();
mySong.addLyriChord({lyric:'Hello', chord:'E'});
mySong.updateLyriChord({ index:0, lyric:'Hola', chord:'F' });  /* can also exclude certain info, except for index */

mySong.generateFromMarkdown('*Verse 1* Hello[E] World[F]');      /* take in Markdown, and populate the song object */
mySong.generateToMarkdown()     /* return Markdown text */
mySong.generateToHTML()     /* return HTML representation of object */
mySong.generateMonospace()      /* return monospaced text, for plain-text editors */