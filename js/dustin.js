function executeSearch() {
  if($("#search-field").val() == ""){
    errorMessage("Please enter a search term!");
  }
  else if($("#search-field").val().indexOf("#") >= 0){
    errorMessage("Please don\'t use # in your search term...");
  }
  else {
    $("#search-field").removeClass("error");
    hideErrorMessage();
    var noResults = $(".results-pane > h3:first-child");
    var resultsPaneUl = $(".results-pane > ul");
    var resultsPane = $(".results-pane");
    noResults.css("display", "none");
    resultsPane.css("height", "100%");
    resultsPaneUl.css("display", "block");
  }
}

function errorMessage(msg){
  $("#search-field").addClass("error");
  $(".error-message").css("display","inherit").text(msg);
}

function hideErrorMessage(){
    $(".error-message").css("display","none").empty();
}

function likeListener() {
  $(".like").click(function(e){
    e.preventDefault();
    var myClass = $(this).attr("class");
    if(myClass.indexOf("icono-checkCircle") >= 0){
      $(this).removeClass("icono-checkCircle");
      $(this).addClass("icono-smile");
    } else {
        $(this).removeClass("icono-smile");
        $(this).addClass("icono-checkCircle");
    }
  });
}

function savedSearchListener() {
  $(".saved-search").click(function(e){
    var search = $(this).find("p");
    $("#search-field").val(search.text().substring(1));
    executeSearch();
  })
}

$(document).ready(function(){
  likeListener();
  savedSearchListener();
});
