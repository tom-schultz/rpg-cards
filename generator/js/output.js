function receiveMessage(event) {
    var html = event.data.html;
    insertCards(html);

    if(event.data.wrapText) {
      // Delay to allow cards to render as we use rendered height to wrap
      setTimeout(wrapCards, 500);
    }
}

function insertCards(html) {
    // Remove all previous content
    while (document.body.hasChildNodes()) {
        document.body.removeChild(document.body.lastChild);
    }

    // Create a div that holds all the received HTML
    var div = document.createElement("div");
    div.setAttribute("class", "output-container");
    div.id = "output-container";
    div.innerHTML = html;

    // Add the new div to the document
    document.body.appendChild(div);
}

function wrapCards() {
  [...document.getElementsByClassName('card-content-container')].forEach(function(cardContent) {
    card = cardContent.parentElement;

    if(card.scrollHeight === card.clientHeight) {
      return;
    }

    cardContent.innerHTML += '<div class="card-element card-description-line"><p class="card-p card-description-text wrap-message">(continued on back)</p></div>';

    page = card.parentElement;
    nextPage = page.nextElementSibling;
    title = card.getElementsByClassName('card-title')[0].textContent;

    back = getBack(nextPage, title);
    backContent = back.getElementsByClassName('card-content-container')[0];

    while(card.scrollHeight !== card.clientHeight) {
      el = cardContent.removeChild(cardContent.lastElementChild.previousElementSibling);
      backContent.insertBefore(el, backContent.firstElementChild);
    }
  });
}

function getBack(nextPage, title) {
  for (cardTitle of [...nextPage.getElementsByClassName('card-title')]) {
    if (cardTitle.textContent === title) {
      return cardTitle.parentElement;
    }
  }
}

window.addEventListener("message", receiveMessage, false);
