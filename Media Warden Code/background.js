// import { Stopwatch } from "./stopwatch";
self.importScripts("./stopwatch.js");

const media_blacklist_sites = ["facebook.com", "instagram.com", "reddit.com", "twitter.com", "youtube.com"];
let media_blacklist_active_tabs = new Map();

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
            // Check if the current tab is for a blacklisted site and newly created or not
            if (!media_blacklist_active_tabs.has(tab.id)) {
                console.log(`Tab has been updated: ${tab.url}`);

                // Check if the tab's url is one for one of the blacklisted social media sites
                media_blacklist_sites.forEach(url => {
                    if (tab.url.includes(url)) {
                        if (media_blacklist_active_tabs.size == 0) {
                            startStopwatch();
                        }

                        // Add tab to "blacklisted tabs" collection if it is on a blacklisted site
                        media_blacklist_active_tabs.set(tab.id, {"original_url": url});
                        console.log(`You have opened a tab for ${url}`);
                        // setTimeout(() => {
                        //     chrome.tabs.remove(tab.id);
                        // }, 3000);
                    }
                });
            } else if (!changeInfo.url.includes(media_blacklist_active_tabs.get(tab.id).original_url)) {
                // Handle the tab's url changing, the "pseudo-session" for the tab
                console.log(`You have left ${media_blacklist_active_tabs.get(tab.id).original_url}`);

                let is_blacklist = false;

                // Check if the new url is still for a blacklisted site
                media_blacklist_sites.forEach(url => {
                    if (changeInfo.url.includes(url)) {
                        is_blacklist = true;
                        // Change the tab's "original" url to the current url
                        media_blacklist_active_tabs.get(tab.id).original_url = url;
                        console.log(`You have moved to new blacklisted site: ${url}`);
                    }
                })

                // Handle the tab's new url not being a part of the blacklisted site collection
                if (!is_blacklist) {
                    // Remove tab from "blacklisted tabs" collection
                    media_blacklist_active_tabs.delete(tab.id);
                    console.log("This tab has left all blacklisted sites.");

                    if (media_blacklist_active_tabs.size == 0) {
                        console.log("All active blacklisted tabs in this session have been navigated away from.");
                        console.log(stopStopwatch());
                    }
                }
            }
        } 
    }
});