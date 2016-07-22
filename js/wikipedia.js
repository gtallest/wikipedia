$(document).ready(function(){

  var resultData = [];

$('#search').submit(function(e) {
  $('#spin-load').css('display','block');
  queryAPI();
  e.preventDefault();
});

$('#clear-x').on('click',function(){
  $('#results-row').fadeOut(500,function(){$('#results-list').html("");});

});

function queryAPI() {
  var searchTerm = $('#search-term').val();
  var searchURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&redirects=resolve&search=' + searchTerm;

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

});
