class FixedLetter {
	constructor( y, char) {

		const path = helvetica[char];
		this.letter = raphael.path(path).attr({ fill: "#00f", stroke: "#00f", "fill-opacity": .5, "stroke-width": 1, "stroke-linecap": "round" });

		this.letter.translate(10,y);
		this.letter.click(function() { 
			Letter.ofFixedLetter( y, char);
		});
	}


}
