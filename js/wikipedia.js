$(document).ready(function(){

var resultData = [];

//When search input is submitted, display the spinning loading animation and query the Wikipedia API
$('#search').submit(function(e) {
  $('#spin-load').css('display','block');
  queryAPI();
  e.preventDefault();
});

//Logic for clearing results / input value when clicking the 'X'
$('#clear-x').on('click',function(){
  $('#results-row').fadeOut(500,function(){$('#results-list').html("");});
  $('#search-term').val('');
});

//Function that accesses Wikipedia's API
function queryAPI() {
  var searchTerm = $('#search-term').val();
  var searchURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&redirects=resolve&search=' + searchTerm;

  //API Call to Wikipedia: on success, call 'results' function
  $.ajax({
    url: searchURL,
    dataType: 'jsonp',
    type: 'GET',
    headers: {
      'Api-User-Agent': 'Example/1.0'
    },
    success: results
  });

}

//Handle the results JSON data, create list element for each result, and add to #results-list
function results(data) {
  resultData = data;
  var searchedTerm = data[0];
  $('#term-searched').html(searchedTerm);

  var resultsList = "";

  for (var i = 0; i < resultData[1].length; i++) {
    var articleTitle = resultData[1][i];
    var articleSummary = resultData[2][i];
    var articleURL = resultData[3][i];

    var resultListItem = '<a href="' + articleURL + '" target="_blank"><li class="result-item">' + articleTitle + ' - ' + articleSummary + '</li></a>';

    resultsList += resultListItem;
  }

  $('#spin-load').fadeOut(1000);
  $('#results-list').html(resultsList);
  $('#results-row').fadeIn(500);
}

//Logic for the info button and project description.
//Keep track of initialTop and currentTop for responsive design.
//$('#project-description').css('top') will vary depending on screen size.
var initialTop = $('#project-description').css('top').split("p")[0];
var currentTop = $('#project-description').css('top').split("p")[0];
$('#info-button').on('click',function(){
  if(currentTop <= -365){
    $('#project-description').css('top','0');
    currentTop = 0;
    $('#info-button').css({'background':'white','color':'#c9302c','transform':'rotate(90deg)'});
  }
  else {
    $('#project-description').css('top',initialTop + 'px');
    currentTop = initialTop;
    $('#info-button').css({'background':'#d9534f','color':'white','transform':'rotate(0deg)'});
    $('#info-button:hover').css('background','#7f52d2;')
  }
});

});
