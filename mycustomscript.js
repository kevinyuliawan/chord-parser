$(document).ready(function(){

  var newSong = new Song();
  var $ta = $('#textarea-input');
  var $submit = $('#btn-submit');
  var $clear = $('#btn-clear');
  var $result = $('.result-div');

  function sanitize(markdown){
    // TODO: sanitize input
    return markdown;
  }

  function regenerate(){
    var markdown = sanitize($ta.val());
    newSong = new Song();
    newSong.generateFromMarkdown(markdown);
    newSong.generateToMarkdown();
    $result.html(newSong.generateToHTML());
  }

  $ta.focus(function(){
    if($ta.val()=='Edit in chord markdown here.'){ $ta.val(''); }
  });

  $submit.click(function(){
    regenerate();
  });

  $ta.keyup(function(){
    regenerate();
  });

  $clear.click(function(){
    $ta.val('');
    regenerate();
    $ta.focus();
  });




});