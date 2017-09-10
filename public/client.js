// client-side js

let langCode = "en";  // default to english

(function() {

  window.fetch('/api/lang').then(function(response) {
    return response.text();
  }).then(myText => {
    langCode = myText;
    
    // change random button url to match the language detected
    let randomBtn = document.getElementById("randomBtn");
    let searchText = document.getElementById("searchText");
    randomBtn.href = "http://" + langCode + ".wikipedia.org/wiki/Special:Random"
    // change the search text placeholder text to suit language detected
    if(langCode === "en") {
      searchText.placeholder = "Search Wikipedia for...";
    }    
    if(langCode === "fr") {
      searchText.placeholder = "Rechercher Wikipedia pour...";
    }
    if(langCode === "es") {
      searchText.placeholder = "Buscar en Wikipedia para...";
    }
    if(langCode === "de") {
      searchText.placeholder = "Suche Wikipedia für...";
    }
  });
  // Setup UI event handlers
  let searchBtn = document.getElementById("searchBtn");
  let searchTextField = document.getElementById("searchText");
 
  function onSearchBtnClicked() {
      let searchText = searchTextField.value;
      if (searchText.length > 0) {
        let resultsList = document.getElementById("resultsList");
        resultsList.innerHTML = "";

        searchWikiFor(searchText).then((results) => {
          let titles = results.map((result) => result.title );
          if(titles.length > 0) {
            getWikiExtracts(titles.join("|"))
              .then(pages => showResults(pages) )
              .catch(err => console.log(err))               
          }
          else {
            showNoResultsFound();
          }
        })
        .catch(err => console.log(err));
      }  
  }

    // Trap Enter key pressed
  searchTextField.onkeypress = function(event) {
      if(event.keyCode == 13) {
        onSearchBtnClicked();
      }
  }
  
  searchBtn.addEventListener("click", onSearchBtnClicked, false);

})();

function searchWikiFor(query) {
  return new Promise((resolve, reject) => {   
    fetchJsonp(`//` + langCode + `.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=` + query)
      .then(response => response.json())
      .then(json => resolve(json.query.search))
      .catch(ex => reject(ex));
  });
}

function getWikiExtracts(titles) {
  return new Promise((resolve, reject) => {
    fetchJsonp(`//` + langCode + `.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&exlimit=10&titles=` + titles)
      .then(response => response.json())
      .then(json => resolve(json.query.pages))
      .catch(ex => reject(ex));
  });
}

function showResults(pages) {
  let resultsList = document.getElementById("resultsList");
  for(var page in pages) {
    resultsList.insertAdjacentHTML("beforeend", "<a href='https://en.wikipedia.org/?curid=" + pages[page]["pageid"] + "' target='_blank' class='list-group-item'><h4 class='list-group-item-heading'>" + pages[page]["title"] + "</h4><p class='list-group-item-text'>" + firstParagraph(pages[page]["extract"]) + "</p></a>");
  }
}

function showNoResultsFound() {
  let resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "<a href='#' class='list-group-item'><h4 class='list-group-item-heading'>Wikipedia returned no results for this search.</h4><p class='list-group-item-text'></p></a>";
}

// return just the first paragraph of the passed text
function firstParagraph(extract) { 
  return extract.split("\n")[0];  
}
