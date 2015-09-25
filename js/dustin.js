function search() {
  var noResults = $(".results-pane > h3:first-child");
  var resultsPaneUl = $(".results-pane > ul");
  var resultsPane = $(".results-pane");
  noResults.css("display", "none");
  resultsPane.css("height", "100%");
  resultsPaneUl.css("display", "block");
}
