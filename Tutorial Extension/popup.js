// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor, //change color
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() { //alter this
    // chrome.storage.sync.get("color", ({ color }) => {
    //   document.body.style.backgroundColor = color;
    // });
    const addCSS = s => document.head.appendChild(document.createElement("style")).innerHTML=s;

    addCSS("html { -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); filter: grayscale(100%); </style>");
  }

