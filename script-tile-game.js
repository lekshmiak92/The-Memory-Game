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
  var Trial, Easy, Medium, Hard,chosenLevel;
  var numberOfRowAndCol=0;
  var defaultRowAndCol=3;




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
    if (matchCount==4) {
      $("div.success").removeClass('hidden');
      console.log(numberOfMoves);
      clearInterval(timer);
    }
  }

  // generating random numbers for tiles
  function generateRandomNumbers(){
    for (var i = 0; i < 4; i++) {
      numArray[i]= Math.round((Math.random()*100)+1);
      console.log(numArray);
    }
    numArray=numArray.concat(numArray);
  }

  // randomly sort the generated numbers
  function randomSort(){
    numArray.sort(function() { 
      return 0.5 - Math.random()
       });
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
    randomSort();
    resetTimer();
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
    randomSort();
    startTimer();
    $(levelOption).remove();

  }


  function tileLayout(num){
    for (var i = 1; i <= num; i++) {
        $('div.game-area').append('<div class="tile" tabindex="0"><div class="tiletext hidden" id="tile-'+i+'"></div></div>')
      }
  }

  function generateTileLayout(numberOfRowAndCol){
    if (numberOfRowAndCol=="3") {
      $('div.temp').css('width','53%');
      for (var i = 1; i < 9; i++) {
        $('div.game-area').append('<div class="tile" tabindex="0"><div class="tiletext hidden" id="tile-'+i+'"></div></div>')
        if (i==4) {
          $('div.game-area').append('<div class="tile" tabindex="0"><div class="tiletext" id="static">*</div></div>')
        }
      }
    }
    else if (numberOfRowAndCol=="4") {
      $('div.temp').css('width','60%');
      $('div.game-area').css('width','408px');
      tileLayout(16);
    }
    else if (numberOfRowAndCol=="6") {
      $('div.temp').css('width','75%');
      $('div.game-area').css('width','612px');
      tileLayout(36);
    }
    else if (numberOfRowAndCol=="8") {
      $('div.temp').css('width','90%');
      $('div.game-area').css('width','816px');
      tileLayout(64);
    }

  }
  function findNumberOfRowAndCol(chosenLevel){
    console.log(chosenLevel)
    if(chosenLevel==="Trial"){
      numberOfRowAndCol=3
    }
    else if (chosenLevel==="Easy"){
      numberOfRowAndCol=4;
    }
    else if (chosenLevel==="Medium") {
      numberOfRowAndCol=6;
      console.log(numberOfRowAndCol)
    } 
    else if(chosenLevel==="Hard"){
      numberOfRowAndCol=8;
    }
  }
  function clearCurrentLayout(){
    $('div.game-area').text("");
  }
  function chooseDifficulty(){
    chosenLevel=$("input[name='level']:checked").val();
    console.log(chosenLevel);
    findNumberOfRowAndCol(chosenLevel);
    clearCurrentLayout();
    generateTileLayout(numberOfRowAndCol);
    startGame();
  }
  generateTileLayout(defaultRowAndCol);
  $(levelOption).show();
  $(submit).on("click",chooseDifficulty);
  $('.tile').on("click",revealOnlyTwoTiles);
  $('#reset-button').on("click",resetGame);

});