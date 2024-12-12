import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";

function App() {
	const [statement1, setStatement1] = useState("");
	const [statement2, setStatement2] = useState("");
	const st1 = trimAll(statement1);
	const st2 = trimAll(statement2);
	const [result, setResult] = useState("");
	const booleanCombinations = [
		[true, true, true],
		[true, true, false],
		[true, false, true],
		[true, false, false],
		[false, true, true],
		[false, true, false],
		[false, false, true],
		[false, false, false],
	];
	function trimAll(str) {
		return str.replace(/\s+/g, "");
	}

	function btnHandler() {
		if (st1 === st2) {
			return setResult(true);
		}
		setResult(false);
		for (const combi of booleanCombinations) {
			const st1Eval = evaluate(st1, ...combi);
			const st2Eval = evaluate(st2, ...combi);
			if (st1Eval !== st2Eval) {
				return setResult(
					`false, counter example: p: ${combi[0]} q: ${combi[1]} r: ${combi[2]}`
				);
			}
		}
		return setResult(true);
	}

	function evaluate(statement, p, q, r) {
		const st = statement
			.replace(/∧/g, "&&")
			.replace(/∨/g, "||")
			.replace(/~/g, "!")
			.replace(/→/g, "=>");

		function implicationToDisjunction(expr) {
			const regex =
				/([^()]+|(\([^()]*\)))\s*=>\s*([^()]+|(\([^()]*\)))/g;
			return expr.replace(regex, (match, p1, p2, p3) => {
				return `(!(${p1.trim()}) || (${p3.trim()}))`;
			});
		}

		const finalStatement = implicationToDisjunction(st);
		return eval(finalStatement);
	}
	const [activeInput, setActiveInput] = useState(null);
	const input1Ref = useRef(null);
	const input2Ref = useRef(null);

	function handleKeyClick(char) {
		if (activeInput === "statement1") {
			setStatement1(statement1 + char);
			input1Ref.current.focus();
		} else if (activeInput === "statement2") {
			setStatement2(statement2 + char);
			input2Ref.current.focus();
		}
	}

	function handleFocus(inputName) {
		setActiveInput(inputName);
	}

	const keyboardKeys = [
		"p",
		"q",
		"r",
		"→",
		"∨",
		"∧",
		"~",
		"(",
		")",
	];

	return (
		<div className="App">
			<header className="App-header">
				<input
					type="text"
					value={statement1}
					onChange={e => setStatement1(e.target.value)}
					onFocus={() => handleFocus("statement1")}
					className="input-box"
					style={{
						padding: "10px",
						margin: "10px",
						borderRadius: "5px",
						border: "1px solid #ccc",
						fontSize: "16px",
					}}
					ref={input1Ref}
				></input>
				<p>≡</p>
				<input
					type="text"
					value={statement2}
					onChange={e => setStatement2(e.target.value)}
					onFocus={() => handleFocus("statement2")}
					className="input-box"
					style={{
						padding: "10px",
						margin: "10px",
						borderRadius: "5px",
						border: "1px solid #ccc",
						fontSize: "16px",
					}}
					ref={input2Ref}
				></input>

				<div
					className="keyboard"
					style={{ marginTop: "20px" }}
				>
					{keyboardKeys.map(key => (
						<button
							key={key}
							onClick={() => handleKeyClick(key)}
							className="key-button"
							style={{
								padding: "10px 20px",
								margin: "5px",
								borderRadius: "5px",
								border: "1px solid #ccc",
								backgroundColor: "#f0f0f0",
								fontSize: "16px",
								cursor: "pointer",
							}}
						>
							{key}
						</button>
					))}
				</div>
				<button
					style={{
						marginTop: "2rem",
						padding: "10px 20px",
						borderRadius: "5px",
						border: "none",
						backgroundColor: "#007bff",
						color: "#fff",
						fontSize: "16px",
						cursor: "pointer",
					}}
					onClick={btnHandler}
					className="calculate-button"
				>
					Calculate
				</button>
				{result !== "" && <h1>{result.toString()}</h1>}
			</header>
		</div>
	);
}

export default App;
