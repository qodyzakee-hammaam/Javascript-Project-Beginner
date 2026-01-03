const quotes = [
    { teks: "The only way to do great work is to love what you do.", pembuat: "Steve Jobs" },
    { teks: "Success is not final, failure is not fatal: It is the courage to continue that counts.", pembuat: "Winston Churchill" },
    { teks: "Believe you can and you're halfway there.", pembuat: "Theodore Roosevelt" },
    { teks: "Act as if what you do makes a difference. It does.", pembuat: "William James" },
    { teks: "You are never too old to set another goal or to dream a new dream.", pembuat: "C.S. Lewis" },
    { teks: "Your time is limited, so don't waste it living someone else's life.", pembuat: "Steve Jobs" }
];

const kataText = document.getElementById('quote')
const author = document.getElementById('author')
const newQuotes = document.getElementById('newquote')

function generateKata() {
    const randomIdx = Math.floor(Math.random() * quotes.length)
    const randomQ = quotes[randomIdx]

    kataText.textContent = `"${randomQ.teks}"`
    author.textContent = `${randomQ.pembuat}`
}
newQuotes.addEventListener('click', generateKata);

generateKata()