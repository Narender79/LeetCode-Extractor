chrome.storage.local.get(["leetcodeCode"], (data) => {
    const codeDisplay = document.getElementById("codeDisplay");
    if (data.leetcodeCode) {
        codeDisplay.innerText = data.leetcodeCode;
    } else {
        codeDisplay.innerText = "No code found!";
    }
});
