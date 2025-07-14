GetValue = () => {
  const Name_elements = document.getElementsByClassName('no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-text whitespace-normal hover:!text-[inherit]');
  const Name_Problem = Name_elements[0]?.textContent?.trim().replace(/^\d+\.\s*/, '');
  console.log(Name_Problem); // "Two Sum" 
  let Difficult = '';
  const Easy_Difficult_element = document.getElementsByClassName('relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-easy dark:text-difficulty-easy');
  if (Easy_Difficult_element.length > 0) {
    Difficult = Easy_Difficult_element[0]?.textContent?.trim().replace(/^\d+\.\s*/, '');
    console.log(Difficult); // "Easy"
  }

  const Mediem_Difficult_element = document.getElementsByClassName('relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-medium dark:text-difficulty-medium');
  if (Mediem_Difficult_element.length > 0) {
    Difficult = Mediem_Difficult_element[0]?.textContent?.trim().replace(/^\d+\.\s*/, '');
    console.log(Difficult);
  }

  const Hard_Difficult_element = document.getElementsByClassName('relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-hard dark:text-difficulty-hard');
  if (Hard_Difficult_element.length > 0) {
    Difficult = Hard_Difficult_element[0]?.textContent?.trim().replace(/^\d+\.\s*/, '');
    console.log(Difficult); // "Hard"
  }

const topicElements = document.querySelectorAll('a[class="no-underline hover:text-current relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-text-secondary"]');

const topics = Array.from(topicElements).map(el => el.textContent.trim());
console.log(topics);

const now = new Date();
const date = now.toLocaleDateString();

let Plateform = 'Leetcode';
return {
  Name_Problem,
  Difficult,
  topics,
  date,
  Plateform
};


}