import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface QuotesArr {
	quote: string;
	author: string;
}

function App() {
	const API_URL =
		"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

	const [quotesArr, setQuotesArr] = useState<Array<QuotesArr>>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [quoteNumber, setQuoteNumber] = useState<number>(0);

	async function fetchApi() {
		await axios
			.get(API_URL)
			.then((res) => {
				setQuotesArr(res.data.quotes);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		setIsLoading(true);
		fetchApi();
	}, []);

	function getRandomQuote() {
		setQuoteNumber(Math.floor(Math.random() * 101));
	}

	if (isLoading) {
		return <div className="App">Loading...</div>;
	}

	return (
		<div className="App">
			<div className="quote-box" id="quote-box">
				<blockquote id="text">
					<p>{quotesArr[quoteNumber].quote}</p>
				</blockquote>
				<p id="author">- {quotesArr[quoteNumber].author}</p>
				<div className="links">
					<button id="new-quote" onClick={getRandomQuote}>
						New Quote
					</button>
					<a href="twitter.com/intent/tweet" id="tweet-quote">
						tweet-quote
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
