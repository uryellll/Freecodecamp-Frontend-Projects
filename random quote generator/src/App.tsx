import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface quotesArr {
	quote: string;
	author: string;
}

function App() {
	const API_URL =
		"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

	const [quotesArr, setQuotesArr] = useState<Array<quotesArr>>([]);
	const [loading, setLoading] = useState(false);

	async function getQuote() {
		setLoading(true);
		await axios
			.get(API_URL)
			.then((res) => {
				console.log(res.data.quotes);
				setQuotesArr(res.data.quotes);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getQuote();
	}, []);

	return (
		<div className="App">
			<div className="quote-box" id="quote-box">
				<blockquote id="text">
					<p>{quotesArr[0].quote}</p>
				</blockquote>
				<p id="author">- {quotesArr[0].author}</p>
				<div className="links">
					<button id="new-quote">New Qoute</button>
					<a href="twitter.com/intent/tweet" id="tweet-quote">
						tweet-quote
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
