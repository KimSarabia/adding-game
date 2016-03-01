'use strict';

var sum = 0;

$(document).ready(init);

function init(){
  $('.num').click(clickNum);
  $('body').ready(randomNum);
  $('#submit').click(submitAnswer);
  $('#roll').click(rollRefresh);
  $('#newGame').click(resetGame);
}

function randomNum(){
  var randNum = Math.floor(Math.random() * 9) + 1;
  console.log('randNum: ', randNum);
  var $stars = [];
  for(var i = 0; i < randNum; i++){
    var $newCup = $('<div>').addClass('star');
    $stars.push($newCup);
  }
  $('#randomNums').append($stars);
}

function clickNum(){
  var $this = $(this);
  var num = $(this).text();
  var wasSelected = $this.hasClass('selected');
  $this.removeClass('selected');
  if(!wasSelected){
    $this.addClass('selected');
  }
}

function submitAnswer(){
  var starLength = $('.star').length;
      sum = 0;
  $('.selected').each(function(index, element){
    sum = sum + parseInt(element.innerHTML);
  })
  
  if(starLength === sum) {
    $('#messages').empty();
    $('#messages').text('Awesome!');
    $('.selected').each(function(index, element){
      element.classList.add('disabled');
      element.classList.remove('selected');
    })
    $('.disabled').off();
    $('#randomNums').empty();
    randomNum();
    var disabledNums = $('.disabled').length;
    if(disabledNums === 9){
      $('#messages').empty();
      $('#messages').text('Hey you got it!').addClass('winner');
    }
  } else {
    $('#messages').empty();
    $('#messages').text('Wrong, try again!');
  }
}

function rollRefresh(){
  var turns = $('#rollChances').text();
  $('#randomNums').empty();
  randomNum();
  turns = turns - 1;
  $('#rollChances').text(turns);
  if (turns <= 0) {
    $('#roll').addClass('disabled');
    $('#roll').off();
  }
}

function resetGame(){
  $('#randomNums').empty();
  randomNum();
  $('.num').off();
  $('.num').click(clickNum);
  $('.num').removeClass('disabled selected');
  $('#messages').empty().removeClass('winner');
  $('#rollChances').empty().text(10);
}