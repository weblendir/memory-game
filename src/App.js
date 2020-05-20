import React, { useState, useEffect } from "react";
import "./App.css";

function dizin(numofCards) {
	const arabalar = [];

	for (let index = 0; index < numofCards; index++) {
		arabalar.push(`cars/${index}.png`);
		arabalar.push(`cars/${index}.png`);
	}
	shuffle(arabalar);
	return arabalar;
}
function shuffle(a) {
	let j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

const buttonSound = new Audio("sounds/button.mp3");
const laughSound = new Audio("sounds/laugh.mp3");
const yeahSound = new Audio("sounds/yeah.mp3");
const successSound = new Audio("sounds/success.mp3");

function FlipApp({ cars, setGameReady }) {
	const [show, setShow] = useState([...new Array(cars.length)].map(() => false));
	const [selected, setSelected] = useState(["", ""]);
	const [selectedID, setSelectedID] = useState([0, 1]);
	const [count, setCount] = useState(0);

	function toggleShow(id, i) {
		const newList = [...show];
		const selList = [...selected];
		const selIdList = [...selectedID];

		newList[id] = !show[id];
		setShow(newList);
		selList[count] = i;
		selIdList[count] = id;
		setSelected(selList);
		setSelectedID(selIdList);
		setCount(count + 1);
		console.log(count + "deger");
		console.log(i);
		buttonSound.play();
	}

	useEffect(() => {
		document.title = `You clicked ${count} times`;
		const newList = [...show];
		const selList = [...selected];
		const selIdList = [...selectedID];

		if (count === 2) {
			if (selList[0] !== selList[1]) {
				laughSound.play();
				console.log("different pictures");

				console.log(selIdList[0] + " " + selIdList[1]);
				setTimeout(() => {
					newList[selIdList[0]] = !show[selIdList[0]];
					newList[selIdList[1]] = !show[selIdList[1]];
					setShow(newList);
					setCount(0);
				}, 1000);
			} else {
				if (show.includes(false)) {
					yeahSound.play();
				} else {
					successSound.play();
					newGame();
				}
				setCount(0);
			}
		}

		console.log("sayı = " + count);
	}, [count]); // Only re-run the effect if count changes

	function newGame() {
		const newShow = [...new Array(cars.length)].map(() => false);
		setShow(newShow); //reset show to false
		let newCars = shuffle(cars); // reset cars positions
		cars = newCars;
		setCount(0); // reset counter
		setGameReady();
	}
	return (
		<div className="App">
			<h1> Memory Game!</h1>
			<div className="cards">
				{cars.map((i, ind) => (
					<div
						className={`blocks ${show[ind] ? "flipped" : ""}`}
						key={ind}
						onClick={count !== 2 && !show[ind] ? () => toggleShow(ind, i) : null}>
						<img src={i} alt="Arabalar" className={`pict ${show[ind] ? "showPict" : "noPict"}`} />
					</div>
				))}
				<button className="buttonRestart" onClick={newGame}>
					New Game
				</button>
			</div>
		</div>
	);
}

function App() {
	const [numofCars, setNumofCars] = useState(6);
	const [ncars, setNcars] = useState([]);
	const [gameready, setGameready] = useState(0);

	function handleChange(event) {
		setNumofCars(Number(event.target.value));
	}
	function prepareGame() {
		setNcars(dizin(numofCars));
		setGameready(1);
	}

	return (
		<div>
			<div className={`input ${gameready === 0 ? "" : "noInput"}`}>
				{/* <button onClick={() => prepareGame()}>New Game</button> */}
				<label>
					Number of Cards :
					<input
						className="inputText"
						type="number"
						id="myNumber"
						value={numofCars}
						name="numofCars"
						onChange={handleChange}
						min="1"
						max="16"
					/>
				</label>
				<button className="button" onClick={() => prepareGame()}>
					New Game
				</button>
			</div>
			{gameready ? <FlipApp cars={ncars} setGameReady={() => setGameready(0)} /> : null}
		</div>
	);
}

export default App;
