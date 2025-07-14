




(function () {
  let timerStarted = false;
  let seconds = 0;
  let intervalId;
  
  function startTimer() {
    intervalId = setInterval(() => {
      seconds++;
      console.log(`LeetCode Timer: ${seconds}s`);
    }, 1000);
  }

function submitted(time) {
  const targetNode = document.body;

  const observer = new MutationObserver(() => {
    const resultSpan = document.querySelector('span[data-e2e-locator="submission-result"]');
    
    if (resultSpan) {
      const status = resultSpan.textContent.trim();
      console.log("Current status:", status);

      if (status === "Accepted") {
        console.log("✅ Submission Accepted!");
        // Optional: Trigger your logic
        // alert("Accepted!");
        GotAccepted(time);
        observer.disconnect(); // Stop observing if needed
      } else {
        console.log("❌ Submission not accepted yet:", status);
        startTimer(); // Restart timer if needed
        // Optional: Keep observing or restart logic
      }
    }
  });

  observer.observe(targetNode, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}



  function stopTimer() {
    clearInterval(intervalId);
    console.log(`⏹️ Timer stopped at ${seconds}s`);
    return seconds;
  }
  
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "Enter") {
      timerStarted = false;
      const time_taken = stopTimer();
      submitted(time_taken);
    }
  });
  function bindToEditableDiv() {
    
    const editable = document.querySelector('.monaco-editor textarea.inputarea');

    if (editable) {
      editable.addEventListener('keydown', () => {
        if (!timerStarted) {
          timerStarted = true;
          startTimer();
        }
      });
      console.log("✅ Typing timer bound to Monaco editor.");
    } else {
      setTimeout(bindToEditableDiv, 1000); // Retry until it's loaded
    }
  }
  function bindToSubmitButton() {
    const submitBtn = document.querySelector('[data-e2e-locator="console-submit-button"]');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (timerStarted) {
          timerStarted = false;
          const time_taken = stopTimer();
          submitted(time_taken);
        }
      });
      console.log("✅ Submit button listener added.");
    } else {
      setTimeout(bindToSubmitButton, 1000);
    }
  }
  bindToSubmitButton();
  bindToEditableDiv();
})();
