'use client';

import React, { useState } from 'react';

// This chatbot is designed to help users with any questions or issues they have while using the app.
// It can be extended to use AI or connect to a backend for smarter responses.
const defaultQuestions = [
	{
		question: 'How do I sign up?',
		answer:
			'To sign up, click on the Sign Up button and fill in your personal details. If you need help, let me know!',
	},
	{
		question: 'How do I link my bank account?',
		answer:
			'After signing up, you will be prompted to link your bank account using Plaid. Just follow the on-screen instructions.',
	},
	{
		question: 'How do I transfer money?',
		answer:
			'To transfer money, go to the Payment Transfer page from the sidebar, enter the details, and submit your transfer.',
	},
	{
		question: 'How do I view my transaction history?',
		answer:
			'You can view your transaction history by navigating to the Transaction History page. All your past transactions will be listed there.',
	},
	{
		question: 'Is my data secure?',
		answer:
			'Yes, your data is encrypted and securely stored. We take your privacy and security very seriously.',
	},
	{
		question: 'Can I add more than one bank account?',
		answer:
			'Yes! You can add multiple bank accounts by going to the My Banks page and following the prompts to connect another account.',
	},
	{
		question: 'Are there any fees for transfers?',
		answer:
			'Most transfers are free, but some may incur a small fee depending on your bank. You’ll see any fees before confirming a transfer.',
	},
];

const frequentQuestions = [
	'How do I transfer money?',
	'How do I link my bank account?',
];

const BOT_NAME = 'Abdirahman';

const Chatbot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ from: 'bot', text: `Hi! I am ${BOT_NAME}, your assistant. Ask me anything about using Arel Bank.` },
	]);
	const [input, setInput] = useState('');
	const [isTyping, setIsTyping] = useState(false);

	const handleSend = (question?: string) => {
		const value = question !== undefined ? question : input;
		if (!value.trim()) return;
		const userMessage = { from: 'user', text: value };
		let botReply = {
			from: 'bot',
			text: `Sorry, I don't know the answer to that yet. Try asking about signing up, linking a bank, or transferring money in Arel Bank.`,
		};
		const inputLower = value.toLowerCase();
		for (const q of defaultQuestions) {
			// Improved: check if the input includes a significant part of the question or answer
			const questionWords = q.question.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
			if (questionWords.some(word => word.length > 3 && inputLower.includes(word))) {
				botReply = { from: 'bot', text: q.answer.replace(/web app/gi, 'Arel Bank') };
				break;
			}
		}
		setMessages(prev => [...prev, userMessage]);
		setIsTyping(true);
		setTimeout(() => {
			setMessages(prev => [...prev, botReply]);
			setIsTyping(false);
		}, 900 + Math.random() * 800); // Simulate typing delay
		setInput('');
	};

	return (
		<div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
			{isOpen ? (
				<div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 shadow-2xl rounded-2xl w-80 p-4 flex flex-col border-2 border-blue-300/60 backdrop-blur-md">
					<div className="flex justify-between items-center mb-2 pb-2 border-b border-blue-200">
						<span className="font-bold text-blue-800 text-lg flex items-center gap-2">
							<img src="/icons/logo.png" alt="Arel Bank" className="w-6 h-6 rounded-full border border-blue-400" />
							{BOT_NAME} <span className="text-xs text-blue-400">(Chatbot)</span>
						</span>
						<button onClick={() => setIsOpen(false)} className="text-blue-400 hover:text-blue-600 text-xl font-bold">✕</button>
					</div>
					{/* Frequent Questions */}
					<div className="flex flex-wrap gap-2 mb-3">
						{frequentQuestions.map((fq, idx) => (
							<button
								key={idx}
								onClick={() => handleSend(fq)}
								type="button"
								className="bg-blue-200 hover:bg-blue-300 text-blue-800 px-3 py-1 rounded-full text-xs font-medium transition border border-blue-300"
							>
								{fq}
							</button>
						))}
					</div>
					<div className="flex-1 overflow-y-auto mb-2 px-1" style={{ maxHeight: 220 }}>
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`mb-2 text-sm flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
							>
								<span className={`px-3 py-2 rounded-xl max-w-[80%] whitespace-pre-line ${msg.from === 'bot' ? 'bg-blue-100 text-blue-900 border border-blue-200' : 'bg-blue-600 text-white border border-blue-500'}`}>{msg.text}</span>
							</div>
						))}
						{isTyping && (
							<div className="mb-2 text-sm text-blue-700 italic">{BOT_NAME} is typing...</div>
						)}
					</div>
					<div className="flex gap-2 mt-2">
						<input
							className="border border-blue-300 bg-white/80 rounded-lg px-3 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
							value={input}
							onChange={e => setInput(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && handleSend()}
							placeholder="Ask a question..."
							disabled={isTyping}
						/>
						<button
							onClick={handleSend}
							className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md disabled:opacity-60"
							disabled={isTyping}
						>
							Send
						</button>
					</div>
				</div>
			) : (
				<button
					onClick={() => setIsOpen(true)}
					className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-105 transition border-4 border-white"
					aria-label="Open chatbot"
				>
					<img src="/icons/logo.png" alt="Arel Bank" className="w-8 h-8 mr-1" />
				</button>
			)}
		</div>
	);
};

export default Chatbot;
