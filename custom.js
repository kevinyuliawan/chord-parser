function CustomParser(plaintext){
  var outputHTML = '';
  var sections = plaintext.split(/(\*[a-z|A-Z|\s|\d|-]+\*)/); //split by asterisk headers, and store them in the array
  sections = sections.filter(function(n){return n;}); //filter out empty, how this works i do not know
  for(var s=0;s<sections.length;s++){
    if (sections[s].contains('*')){ outputHTML+='<div class="section"><p class="lead">'+sections[s].replace("*","").replace("*","")+'</p>'; }
    else{
      outputHTML += formatASection(sections[s])+'</div>';
    }
  }
  return outputHTML;
};

function formatASection(plaintext){ //given the lyrics of a text, separate by a new line and generate each div for each word
  //clean first if IE
  var lines = plaintext.split(/\r\n|\r|\n/g); //should also split by two \n , signifying a new subsection similar to <p>
  lines = lines.filter(function(n){return n;}); 
  var outputHTML = '';
  var curCount = 0;
  for(var i=0;i<lines.length;i++){
    var line = lines[i].split(' ');
    for(var k=0;k<line.length;k++){
      var word = '&nbsp;'
      var chord = '&nbsp;' //default values
      var splits = line[k].split('[').filter(function(n){return n;}); //split if chord exists, and if it does, it will have a '[' and need the ']' to filter out later, and filter out empty
      if(splits[0].contains(']')){ chord = splits[0].replace(']','')} // chord is only element
      else {word = splits[0]; if(splits[1]){ chord = splits[1].replace(']','')} };
      outputHTML+='<div class="object" data-index="'+curCount+'"><div class="chord">'+chord+'</div><div class="word">'+word+'</div></div>';
      curCount++;
    }
    outputHTML += '<br/>';
  }
  return outputHTML;
}

// used to check if a value is in an array
String.prototype.contains = function(val){
  if(this.indexOf(val) >= 0){return true;  }
  else{return false;};
};

$(document).ready(function(){

$('.convert').click(function(){
  $('.results-div').html(CustomParser($('.inputmd').val()));
})

});

