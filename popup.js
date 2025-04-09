document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get("submissions", (data) => {
        if (data.submissions) {
            let submission = data.submissions;

            // Fill in the popup fields
            document.getElementById("submission-title").innerText = submission.title || "Unknown Question";
            document.getElementById("submission-language").innerText = `Language: ${submission.language || "N/A"}`;
            document.getElementById("submission-timestamp").innerText = `Timestamp: ${submission.timestamp || "N/A"}`;
            document.getElementById("submission-url").innerHTML = `<a href="${submission.url}" target="_blank">View Submission</a>`;

            // Display the code properly with preserved formatting
            let codeElement = document.getElementById("submission-code");
            codeElement.innerText = submission.code || "No code found";
            codeElement.style.whiteSpace = "pre-wrap"; // Ensures long code wraps properly
        } else {
            document.getElementById("submission-container").innerText = "No submission found!";
        }
    });
});
