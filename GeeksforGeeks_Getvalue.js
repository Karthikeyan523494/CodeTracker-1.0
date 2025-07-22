const GetValue = () => {
  // ✅ Get problem title
  const nameElement = document.getElementsByClassName('problems_header_content__o_4YA')[0];
  const Name_Problem = nameElement ? nameElement.textContent.trim() : 'Unknown';

  // ✅ Get difficulty
  let Difficult = '';
  const difficultySpan = document.querySelector('.problems_header_description__t_8PB span');
  if (difficultySpan) {
    const strong = difficultySpan.querySelector('strong');
    if (strong) {
      Difficult = strong.textContent.trim();
    }
  }

  // ✅ Get topic tags
  const tagElements = document.querySelectorAll('.problems_accordion_tags__JJ2DX .ui.label');
  const topics = Array.from(tagElements).map(el => el.textContent.trim());

  // ✅ Date + platform
  const now = new Date();
  const date = now.toLocaleDateString();
  const Plateform = 'GeeksforGeeks';

  // ✅ Debug logs (optional)
  console.log("📘 Problem:", Name_Problem);
  console.log("💪 Difficulty:", Difficult);
  console.log("🏷️ Tags:", topics);
  console.log("📅 Date:", date);

  return {
    Name_Problem,
    Difficult,
    topics,
    date,
    Plateform
  };
};
