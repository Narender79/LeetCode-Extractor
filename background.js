chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.code) {
        console.log("Code received in background:", message.code);
        chrome.storage.local.set({ leetcodeCode: message.code });
    }
});
