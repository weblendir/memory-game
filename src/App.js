import React, { useState, useEffect } from "react";
import "./App.css";

function dizin(numofCards) {
	const arabalar = [];
	let say = 0;

	for (let index = 0; index < numofCards; index++) {
		// arabalar[index] = `cars/${index}.png`;
		arabalar.push(`cars/${index}.png`);
		say += 1;
		arabalar.push(`cars/${index}.png`);
		say += 1;
		// arabalar[index] = "\"<img src='cars/'" + index + ".png' alt='Arabalar" + index + "' />\"";
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
const numofCars = 6;
let cars = dizin(numofCars);

function FlipApp() {
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
		const successsound = new Audio("sounds/button.mp3");
		successsound.play();
	}

	useEffect(() => {
		document.title = `You clicked ${count} times`;
		const newList = [...show];
		const selList = [...selected];
		const selIdList = [...selectedID];

		if (count === 2) {
			if (selList[0] !== selList[1]) {
				const successsound = new Audio("sounds/laugh.mp3");
				successsound.play();
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
					const successsound = new Audio("sounds/yeah.mp3");
					successsound.play();
				} else {
					const successsound = new Audio("sounds/success.mp3");
					successsound.play();
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
				<button className="button" onClick={newGame}>
					New Game
				</button>
			</div>
		</div>
	);
}

function App() {
	return <FlipApp />;
}

export default App;
