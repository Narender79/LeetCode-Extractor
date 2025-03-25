// Ensure background script is running
console.log("✅ Background script loaded");

// Track tabs where a submission was stored
let storedTabs = {};

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("/submissions/")) {
        console.log("✅ Page loaded:", tab.url);

        // Prevent duplicate extraction on refresh
        if (storedTabs[tabId] === tab.url) {
            console.log("⏳ Skipping duplicate extraction on refresh...");
            return;
        }
        
        storedTabs[tabId] = tab.url;

        // Inject content.js
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        }, () => {
            if (chrome.runtime.lastError) {
                console.error("🚨 Error injecting content.js:", chrome.runtime.lastError);
            } else {
                console.log("✅ content.js injected successfully!");
            }
        });
    }
});

// Remove submission from storage when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    console.log(`🚨 Tab ${tabId} closed. Removing last submission.`);

    // Clear the last submission when the tab is closed
    chrome.storage.local.set({ submissions: {} }, function () {
        console.log("✅ Last submission removed from storage.");
    });

    delete storedTabs[tabId];
});
