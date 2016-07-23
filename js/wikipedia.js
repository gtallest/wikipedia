$(document).ready(function(){

  var resultData = [];

$('#search').submit(function(e) {
  $('#spin-load').css('display','block');
  queryAPI();
  e.preventDefault();
});

$('#clear-x').on('click',function(){
  $('#results-row').fadeOut(500,function(){$('#results-list').html("");});
  $('#search-term').val('');
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

$('#info-button').on('click',function(){
  if($('#project-description').css('top') == "-365px"){
    $('#project-description').css('top','0');
    $('#info-button').css({'background':'white','color':'#c9302c','transform':'rotate(90deg)'});
  }
  else {
    $('#project-description').css('top','-365px');
    $('#info-button').css({'background':'#d9534f','color':'white','transform':'rotate(0deg)'});
    $('#info-button:hover').css('background','#7f52d2;')
  }
});

});
