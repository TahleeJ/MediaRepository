// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
//changeColor.addEventListener()
//const tabId = getTabId();
changeColor.addEventListener("click", async () => {
  //  const tabId = getTabId();
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("Button test");
    //const tabId = getTabId();
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: backgroundColor, //change color
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() { //alter this

    const addCSS = s => document.body.appendChild(document.createElement("style")).innerHTML=s;
    addCSS("html { -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); filter: invert(75%); filter: grayscale(10%); </style>");
  }
