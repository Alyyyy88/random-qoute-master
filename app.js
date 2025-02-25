const random = document.querySelector("#random");

const author = document.querySelector(".title");

const q = document.querySelector(".quote");

const category = document.querySelector(".qoute-cat");

const tag = document.querySelector(".qoute-title");

async function getQuote() {
  const url ="https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json";

  try {
    const response = await fetch(url);

    if(!response.ok) throw new Error (response.status);

    const quotes = await response.json();

    const randomIndex = Math.floor(Math.random() * quotes.length);

    const { author: quoteAuthor, quote, tags } = quotes[randomIndex];

    author.textContent = quoteAuthor;

    q.textContent = `"${quote}"`;

    category.textContent = tags[0];

    tag.textContent = tags[1];
    
  } catch (error) {
    console.log(error);
  }
  
}

const shareButton = document.querySelector(".share");

shareButton.addEventListener("click", function () {
  const quoteText = q.textContent;
  const authorText = author.textContent;
  const shareableText = `${quoteText} - ${authorText}`;

  navigator.clipboard.writeText(shareableText)
    .then(() => {
      alert("Quote copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy quote:", error);
      alert("Failed to copy quote. Please try again.");
    });
});

random.addEventListener("click", getQuote);

document.addEventListener("DOMContentLoaded", getQuote);
