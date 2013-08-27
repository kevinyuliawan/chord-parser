$(document).ready(function(){

  var newSong = new Song();
  var $ta = $('#textarea-input');
  var $submit = $('#btn-submit');
  var $clear = $('#btn-clear');
  var $result = $('.result-div');
  var $test = $('#btn-test');
  var $chord = $('.chord');
  var $object = $('.object');


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

  $test.click(function(){
    console.log('test2');
    console.log(newSong);
    newSong.updateLyriChord({index:8, lyric:'test',chord:'F#7'});
    $ta.val(newSong.generateToMarkdown());
    $result.html(newSong.generateToHTML());
  });



  $(document).click(function(){
    $('.lyric').popover({
      animation: true,
      html:'true',
      selector:'[class="selected"]',
      placement:'top',
      trigger: 'manual',
      content:'<p>Hello</p>',
    });
  });


  $result.on('click','.lyric',function(){
    /*
    1. Setup popover parameters.
    2. Remove all 'selected' classes then add it to the current one.
    3. Hide all the popovers that aren't '.selected'
    4. Show the popover for the current one.
    */
    $('.lyric').popover({
      animation: true,
      html:'true',
      selector:'[class="selected"]',
      placement:'top',
      trigger: 'manual',
      content:'<p>Hello</p>',
    });


    $('.lyric').removeClass('selected');
    $(this).addClass("selected");
    $('.lyric').not('.selected').popover('hide');

    // $(this).popover('toggle');
    console.log('lyric: ', $(this));
    $(this).popover('show');
  });

  

/*
  function hideOthers(elem){
    elem.addClass("selected");
    $('.lyric').not(".selected").popover('hide');
    $('.lyric').not(".selected").removeClass("selected");
  };
  */



  $chord.click(function(){
    console.log('chord click');
  });




  


});