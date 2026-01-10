const faqData = [
  {
    question: "What is HTML?",
    answer: "HTML stands for HyperText Markup Language. It is the standard language for creating web pages.",
  },
  {
    question: "What is CSS?",
    answer: "CSS stands for Cascading Style Sheets. It is used to style and layout web pages.",
  },
  {
    question: "What is JavaScript?",
    answer: "JavaScript is a programming language that is used to create dynamic and interactive effects on web pages.",
  },
];

const accordionContainer = document.getElementById("accordion");

function generateAccordionItem(faqData) {
  faqData.forEach((item) => {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    const header = document.createElement("button");
    header.classList.add("accordion-header");
    header.textContent = item.question;

    const content = document.createElement("div");
    content.classList.add("accordion-content");

    const contentText = document.createElement("p");
    contentText.textContent = item.answer;

    content.appendChild(contentText);
    accordionItem.appendChild(header);
    accordionItem.appendChild(content);

    accordionContainer.appendChild(accordionItem);
  });
}
generateAccordionItem(faqData);

const accordionHeader = document.querySelectorAll(".accordion-header");

accordionHeader.forEach((header) => {
  header.addEventListener("click", () => {
    header.classList.toggle("active");
    const accordionContent = header.nextElementSibling;

    if (header.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }

    accordionHeader.forEach((otherHeader) => {
      if (otherHeader !== header && otherHeader.classList.contains("active")) {
        otherHeader.classList.remove("active");
        otherHeader.nextElementSibling.style.maxHeight = 0;
      }
    });
  });
});
