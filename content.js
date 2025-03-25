console.log("✅ content.js loaded!");

// Function to extract code, language, and title after 'Accepted' status
function extractSubmission() {
    console.log("🚀 Extracting submission data...");

    try {
        // ✅ Check if submission status is 'Accepted'
        let statusElement = document.querySelector("span[data-e2e-locator='submission-result']");
        let status = statusElement ? statusElement.innerText.trim() : "Unknown";

        if (status !== "Accepted") {
            console.log("❌ Submission not accepted. Skipping...");
            return;
        }

        // ✅ Extract Question Title
        let questionTitleElement = document.querySelector("h1.text-heading-large");
        let questionTitle = questionTitleElement ? questionTitleElement.innerText.trim() : "Unknown Question";

        // ✅ Extract Code
        let codeElement = document.querySelector("pre code");
        let code = codeElement ? codeElement.innerText.trim() : "Code not found";

        // ✅ Extract Language
        let language = codeElement ? (codeElement.className.replace("language-", "").trim() || "Unknown") : "Unknown";

        // ✅ Get current URL
        let submissionUrl = window.location.href;

        // ✅ Create Submission Data Object
        let submissionData = {
            title: questionTitle,
            code: code,
            language: language,
            url: submissionUrl,
            timestamp: new Date().toLocaleString(),
        };

        console.log("✅ Extracted Submission Data:", submissionData);

        // ✅ Save submission data to Chrome storage
        chrome.storage.local.get({ submissions: {} }, function (data) {
            let submissions = data.submissions;
            if (!submissions[questionTitle]) submissions[questionTitle] = {};
            submissions[questionTitle][language] = submissionData;

            chrome.storage.local.set({ submissions }, function () {
                console.log("✅ Submission saved successfully!");
            });
        });

    } catch (error) {
        console.error("🚨 Error extracting submission:", error);
    }
}

// 🔥 MutationObserver to detect status change to 'Accepted'
const observer = new MutationObserver(() => {
    let statusElement = document.querySelector("span[data-e2e-locator='submission-result']");
    if (statusElement && statusElement.innerText.trim() === "Accepted") {
        console.log("✅ Submission detected: Accepted");
        extractSubmission();
    }
});

// ✅ Watch for changes in the result area
const statusContainer = document.querySelector(".ant-card-body");
if (statusContainer) {
    observer.observe(statusContainer, { childList: true, subtree: true });
    console.log("👀 Watching for Accepted status...");
} else {
    console.error("🚨 Status container not found!");
}
