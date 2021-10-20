import * as loremIpsum from "lorem-ipsum";

// Disable form submit
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// Disable list-group links
[...document.querySelectorAll("a.list-group-item")].forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// Add FAB click alert
document.querySelector(".btn-fab").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Hi!\nThis is a 'Floating Action Button', .btn-fab");
});

// Enchance code tags
const lorem = new loremIpsum.LoremIpsum({
  wordsPerSentence: {
    max: 20,
    min: 15,
  },
});

[...document.querySelectorAll("[data-lorem]")].forEach((elem) => {
  elem.innerHTML = null;

  for (let i = 0; i <= 4; i++) {
    elem.innerHTML += "<code>" + lorem.generateSentences(1) + "</code>\n";
  }
});
