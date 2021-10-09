const media_blacklist = ["facebook.com", "instagram.com", "reddit.com", "twitter.com"];

// Listen for new tabs being created
chrome.tabs.onCreated.addListener((tab) =>{
    if (tab.status = "complete") {
        if (tab.url != null) {
            console.log(`New tab created: ${tab.url}`);
        }
    }
});

// Listen for tabs being updated with respect to their url
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status = "complete") {
        if (changeInfo.url != null) {
            console.log(`Tab has been updated: ${tab.url}`);

            media_blacklist.forEach(url => {
                if (tab.url.includes(url)) {
                    console.log("This website is not for you.");
                    setTimeout(() => {
                        chrome.tabs.remove(tab.id);
                    }, 3000);
                }
            });
        }
    }
});