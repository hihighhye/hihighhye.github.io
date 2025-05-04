export function initQuotes(quoteElement, authorElement) {
    const quotes = [
        {
            quote: "Magic exists. Who can doubt it, when there are rainbows and wildflowers, the music of the wind, and the silence of the stars?",
            author: "Nora Roberts"
        },
        {
            quote: "But the heart sometimes blindly seeks suffering.",
            author: "Albert Camus"
        },
        {
            quote: "Doubt is a thief that often makes us fear to tread where we might have won.",
            author: "William Shakespeare"
        },
        {
            quote: "Follow your bliss, and the universe will open doors where there were only walls.",
            author: "Joseph Campbell"
        },
        {
            quote: "Some people look for a beautiful place. Others make a place beautiful.",
            author: "Hazrat Inayat Khan"
        },
        {
            quote: "A lot of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down.",
            author: "Oprah Winfrey"
        },
        {
            quote: "Don’t let the noise of others’ opinions drown out your own inner voice.",
            author: "Steve Jobs"
        },
        {
            quote: "Our bodies are our gardens. Our wills are our gardeners.",
            author: "William Shakespeare"
        },
        {
            quote: "You don’t always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
            author: "Mandy Hale"
        },
        {
            quote: "Some people care too much. I think it’s called love.",
            author: "Winnie the Pooh"
        }
    ];
    
    
    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)]
    
    quoteElement.innerText = `"${todaysQuote.quote}"`;
    authorElement.innerText = `~ ${todaysQuote.author}`;
    
}

