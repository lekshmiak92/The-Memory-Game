$(function() {
  var selectionCount=0;
  var storedTileCount=0;
  var chosenTile=0;
  var tileStack=[];
  var matchCount=0;
  var numberOfMoves=0;
  var numArray=[];
  var time=0;
  var hr=0;
  var min=0;
  var sec= 0;
  var timer;
  var levelOption = document.getElementsByClassName("difficulty-modal-wrap");
  var submit = document.getElementById("submit-button");
  var Trial, Easy, Medium, Hard;
  var chosenLevel=0;
  var numberOfRowAndCol=0;
  var defaultRowAndCol="Trial";
  var totalNoOfTiles=0;
  var numberOfPairs=0;




  // show only 2 tiles at a time 
  function revealOnlyTwoTiles() {
    numberOfMoves++;
    updateClicksCounter();
    chosenTile=$(this).children().attr('id');          
    if (selectionCount>1) {
      selectionCount=0;
      $(".tiletext").addClass("hidden");
      $(".tiletext").removeClass("clicked");
    }
    openTile(chosenTile);
  }

  //show the selected tile
  function openTile(chosenTile){
    if ($(document.getElementById(chosenTile)).hasClass('clicked')) {
      return
    }
    else{
      if ($(document.getElementById(chosenTile)).hasClass('hidden')) {
        $(document.getElementById(chosenTile)).removeClass('hidden'); 
        $(document.getElementById(chosenTile)).addClass('clicked');
      }
    }
    selectionCount++;
    storeTileContent(chosenTile);
  }

  // storing the selected tile contents to array
  function storeTileContent(chosenTile) {
    tileStack.push(chosenTile);
    console.log(tileStack);
    storedTileCount++;
    if (storedTileCount==2) {
      compareTileContent(tileStack);
      storedTileCount=0;
      tileStack.length = 0;
    }
  }

  // comparing the opened tile contents
  function compareTileContent(tileStack) {

   if ($('#'+tileStack[0]).text()===$('#'+tileStack[1]).text()) {
      $('#'+tileStack[0]).addClass('match-found');
      $('#'+tileStack[1]).addClass('match-found');
      matchCount++
    }
    if (matchCount==numberOfPairs) {
      $("div.success").removeClass('hidden');
      console.log(numberOfMoves);
      clearInterval(timer);
    }
  }

  // generating random numbers for tiles
  function generateRandomNumbers(){
    for (var i = 0; i < numberOfPairs; i++) {
      numArray[i]= Math.round((Math.random()*100)+1);
      console.log(numArray);
    }
    numArray=numArray.concat(numArray);
    numArray.sort(function() { 
      return 0.5 - Math.random()
       });
    console.log(numArray);
    for (var i = numArray.length ; i > 0; i--) {
      $("#tile-"+i).text(numArray[i-1]);
    }
  }

  function updateClicksCounter(){
   $(".click-count").text(numberOfMoves + " clicks"); 
  }

  function resetGame(){
    selectionCount=0;
    storedTileCount=0;
    tileStack=[];
    numArray.length=0;
    matchCount=0;
    numberOfMoves=0;
    $(".tiletext").addClass("hidden");
    $(".tiletext").removeClass("clicked match-found");
    updateClicksCounter();
    generateRandomNumbers();
    resetTimer();
    $("div.success").addClass('hidden');

  }



  function timecheck(){

    if (time<18000) {
      hr= Math.trunc(time/3600);
      min= Math.trunc((time%3600)/60);
      sec= time-((hr*3600)+(min*60));
      min=timeFormat(min);
      sec=timeFormat(sec);
      $("h1").text(hr+':'+ min + ":"+ sec);
      time= time+1;
    } 
    else {
      $("h1").text('timeout');
    }
  }
  function timeFormat(value){
    if (value<10) {
      value= "0"+value;
      return value;
    }
    else{
      return value;
    }
    
  }
  function resetTimer(){
    time=0;
    hr=0;
    min=0;
    sec= 0;
    clearInterval(timer);
    startTimer();
  }

  function startTimer(){
    timer = setInterval(function(){timecheck()}, 1000);
  }

  function startGame(){

    generateRandomNumbers();
    startTimer();
    $(levelOption).remove();

  }


  function tileLayout(num){
    for (var i = 1; i <= num; i++) {
        $('div.game-area').append('<div class="tile" tabindex="0"><div class="tiletext hidden" id="tile-'+i+'"></div></div>')
      }
  }

  function generateTileLayout(chosenLevel){
    if (chosenLevel==="Trial") {
      $('div.game-container').css('width','53%');
      for (var i = 1; i < 9; i++) {
        $('div.game-area').append('<div class="tile" tabindex="0"><div class="tiletext hidden" id="tile-'+i+'"></div></div>')
        if (i==4) {
          $('div.game-area').append('<div class="tile" tabindex="0"><div class="tiletext" id="static">*</div></div>')
        }
      }
      numberOfRowAndCol=3;
      totalNoOfTiles=9;
      numberOfPairs=4;


    }
    else if (chosenLevel==="Easy") {
      $('div.game-container').css('width','60%');
      $('div.game-area').css('width','408px');
      numberOfRowAndCol=4;
      totalNoOfTiles=16;
      numberOfPairs=8;
      tileLayout(totalNoOfTiles);
    }
    else if (chosenLevel==="Medium") {
      $('div.game-container').css('width','75%');
      $('div.game-area').css('width','612px');
      numberOfRowAndCol=6;
      totalNoOfTiles=36;
      numberOfPairs=18;
      tileLayout(totalNoOfTiles);
    }
    else if (chosenLevel==="Hard") {
      $('div.game-container').css('width','90%');
      $('div.game-area').css('width','816px');
      numberOfRowAndCol=8;
      totalNoOfTiles=64;
      numberOfPairs=32;
      tileLayout(totalNoOfTiles);
    }

  }

  function clearCurrentLayout(){
    $('div.game-area').text("");
  }
  function chooseDifficulty(){
    chosenLevel=$("input[name='level']:checked").val();
    console.log(chosenLevel);
    clearCurrentLayout();
    generateTileLayout(chosenLevel);
    startGame();
  }
  generateTileLayout(defaultRowAndCol);
  $(levelOption).show();
  $(submit).on("click",chooseDifficulty);
  $('div.game-area').on("click",".tile",revealOnlyTwoTiles);
  $('#reset-button').on("click",resetGame);

});