class Letter {
	constructor(db, dbid, raphael, x, char) {

		this.db = db;
		this._id = dbid;

		const path = helvetica[char];

		const that = this;

		this.letter = raphael.path(path).attr({ fill: "#000", stroke: "#000", "fill-opacity": .5, "stroke-width": 1, "stroke-linecap": "round" });
		this.letter.drag(this.moveDrag.bind(this), this.moveStart.bind(this), this.moveUp.bind(this));

		db.get("" + this._id, function(err, doc) {
			if (err) {
				console.log("niemand da" + err);
				// Noch nicht in Datenbank vorhanden
				that.letter.translate(x, 50);

			} else {
				console.log("found doc for id " + JSON.stringify(doc));

				that.letter.translate(doc.x, doc.y);
			}

		});

	}

	moveStart = function() {
		this.odx = 0;
		this.ody = 0;
		this.letter.animate({ "fill-opacity": 0.2 }, 100);
	};

	moveDrag = function(dx, dy) {

		this.letter.translate(dx - this.odx, dy - this.ody);
		this.odx = dx;
		this.ody = dy;

		let box = this.letter.getBBox();

		console.log("box now " + box);

	};

	moveUp = function() {
		this.letter.animate({ "fill-opacity": 1 }, 2000);

		const box = this.letter.getBBox();

		let savedata = {};
		savedata.x = box.x;
		savedata.y = box.y;
		savedata._id = "" + this._id;

		db.get(savedata._id, function(err, doc) {
			if (err) {
				console.log('0' + err);
				// Noch nicht in Datenbank vorhanden
				db.put(savedata,
					function(err, response) {
						if (err) {
							console.log('1' + err);
						}
						if (response) {
							console.log('2' + response);
						}
					});
			} else {
				console.log('found doc for id ' + JSON.stringify(doc));
				savedata._rev = doc._rev;
				db.put(savedata);
			}

		});
	};

}
