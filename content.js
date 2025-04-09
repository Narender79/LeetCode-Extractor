console.log("✅ content.js is running!");

// Function to extract submission data
function extractSubmission() {
    console.log("✅ Running extractSubmission...");
    // This setTimeout making sure that it will run only one time
    setTimeout(() => {
        try {
            // Check if submission is "Accepted"
            let statusElement = document.querySelector("span[data-e2e-locator='submission-result']");
            let status = statusElement ? statusElement.innerText.trim() : "Unknown";

            // console.log("Status element ->", statusElement);
            // console.log("Status ->", status);

            if (status !== "Accepted") {
                console.log("🚨 Submission was not accepted. Ignoring this submission.");
                return; // Do not proceed if submission is not accepted
            }

            // Extract Question Title
            let questionTitleElement = document.querySelector("div.text-title-large a");
            let questionTitle = questionTitleElement ? questionTitleElement.innerText.trim() : "Unknown Question";

            // Extract Code
            let codeElement = document.querySelector("div.group.relative pre code");
            let code = codeElement ? codeElement.innerText.trim() : "Code not found";

            // console.log("Code element ->", codeElement);
            // console.log("Code ->", code);

            // Extract Language
            let language = codeElement ? (codeElement.className.replace("language-", "").trim() || "Unknown") : "Unknown";

            // Get Submission URL
            let submissionUrl = window.location.href;

            // Create Submission Object
            let submissionData = {
                title: questionTitle,
                code: code,
                language: language,
                url: submissionUrl,
                timestamp: new Date().toLocaleString()
            };

            // ✅ Log extracted data
            console.log("✅ Extracted Submission Data:", submissionData);
            
            //Saving the data in the local storage
            chrome.storage.local.set({ submissions: submissionData }, function () {
                console.log("✅ Submission data stored.");
            });
                   

        } catch (error) {
            console.error("🚨 ERROR in extractSubmission:", error);
        }
    }, 2000); // Wait 2 seconds before running extraction to allow elements to load
}

// Run the extraction function
extractSubmission();
