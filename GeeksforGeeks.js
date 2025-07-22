
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
    const resultSpan = document.querySelector('.problems_problem_solved_successfully__Zb4yG');
    if (resultSpan) {
      const status = resultSpan.textContent.trim();
      console.log("Current status:", status);

      if (status === "Problem Solved SuccessfullySuggest Feedback") {
        console.log("✅ Submission Accepted!");
        // Optional: Trigger your logic
        // alert("Accepted!");
        GotAccepted(time);
        // Celebrate();
        observer.disconnect(); // Stop observing if needed
      } else {
        console.log("❌ Submission not accepted yet:", status);
        observer.disconnect();
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

    const editable = document.querySelector('.problems_editor_content__zXHUI');

    if (editable) {
      editable.addEventListener('keydown', () => {
        if (!timerStarted) {
          timerStarted = true;
          startTimer();
        }
      });
      console.log("✅ Editable div listener added.");
    } else {
      setTimeout(bindToEditableDiv, 1000); // Retry until it's loaded
    }
  }
  function bindToSubmitButton() {
    const submitBtn = document.querySelector('.ui.button.problems_submit_button__6QoNQ');

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
