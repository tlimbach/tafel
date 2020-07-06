class Letter {

	constructor() {
	}

	static ofDb(dbInfo) {
		const letter = new Letter();
		letter.initFromDb(dbInfo);
	}

	static ofFixedLetter(x, y, char, scale) {
		const letter = new Letter();
		const path = letter.initFromFixedLetter(x, y, char, scale);

		Letter.lettigroup.push(path);

		log("lettergroup", Letter.lettigroup.length);
	}

	initFromFixedLetter(x, y, char, scale) {

		this.char = char;
		this.scale = scale;
		this.startY = y;
		this._id = -1;
		this.isReplaced = false;

		const p = helvetica[char];

		this.path = raphael.nested().path(p);
		this.scaledPath = raphael.group().add(this.path);
		this.scaledPath.scale(this.scale, this.scale);

		this.scaledPath.move(x, y);
		this.path.attr({ fill: "black", "fill-opacity": 1 });

		this.path.draggable()
			.on('dragmove', e => {

				if (!this.isReplaced) {
					Letter.removeElement(Letter.lettigroup, this.path);
					Letter.ofFixedLetter(x, this.startY, this.char, this.scale);
					this.isReplaced = true;
				}

			});

		this.path.draggable()
			.on('dragend', e => {
				this.savePosition();
			});


		return this.path;

	}


	static ofFixedSVG(y, scale, svg) {
		const letter = new Letter();
		letter.scale = scale;
		const path = letter.initFromFixedSVG(y, svg);
		Letter.wauzigroup.push(path);
	}

	static removeElement(array, elem) {
		const index = array.indexOf(elem);
		if (index > -1) {
			array.splice(index, 1);
		}
	}

	initFromFixedSVG(y, svg) {

		this.svg = svg;
		this.startY = y;
		this._id = -1;
		this.isReplaced = false;

		this.path = raphael.nested().svg(svg);
		this.scaledPath = raphael.group().add(this.path);
		this.scaledPath.scale(this.scale, this.scale);
		this.scaledPath.move(10, y);

		this.path.draggable()
			.on('dragmove', e => {

				if (!this.isReplaced) {
					Letter.removeElement(Letter.wauzigroup, this.path);
					Letter.ofFixedSVG(this.startY, this.scale, this.svg);
					this.isReplaced = true;
				}
			});

		this.path.draggable()
			.on('dragend', e => {
				this.savePosition();
			});

		return this.path;

	}

	initFromDb(dbInfo) {
		this.char = dbInfo.char;
		this.svg = dbInfo.svg;
		this.scale = dbInfo.scale;
		this._id = dbInfo._id;
		this.isReplaced = true;

		if (Number(Letter.dbId) <= Number(this._id)) {
			Letter.dbId = "" + (Number(this._id) + 1);
		}

		if (this.char != null) {
			const p = helvetica[this.char];

			this.path = raphael.nested().path(p);
			this.scaledPath = raphael.group().add(this.path);
			this.scaledPath.scale(this.scale, this.scale);
			this.scaledPath.move(dbInfo.x, dbInfo.y);

			this.path.attr({ fill: "black", "fill-opacity": 1 });

			this.path.draggable()
				.on('dragend', e => {
					this.savePosition();
				});
		}

		if (this.svg != null) {
			this.path = raphael.nested().svg(this.svg);
			this.scaledPath = raphael.group().add(this.path);
			this.scaledPath.scale(this.scale, this.scale);
			this.scaledPath.move(dbInfo.x, dbInfo.y);

			this.path.draggable()
				.on('dragend', e => {
					this.savePosition();
				});
		}

	}



	isTrashArea() {
		return false;
	}

	savePosition(e) {

		const x = this.path.x();
		const y = this.path.y();

		log("moveup", { x: x, y: y, scale: this.scale });

		if (this._id === -1) {
			Letter.dbId++;
			this._id = Letter.dbId;
		}

		const savedata = {
			char: this.char,
			svg: this.svg,
			scale: this.scale,
			x: x,
			y: y,
			_id: "" + this._id
		};

		const that = this;

		db.get(savedata._id, function(err, doc) {
			if (err) {
				console.log('0', err);
				// Noch nicht in Datenbank vorhanden
				db.put(savedata,
					function(err, response) {
						if (err) {
							console.log('1', err);
						}
						if (response) {
							console.log('2', response);
						}
					});
			} else {
				console.log('found doc for id ' + JSON.stringify(doc));
				savedata._rev = doc._rev;

				if (that.isTrashArea()) {
					console.log("deleting", savedata);
					db.remove(savedata);
					that.path.remove();
				} else {
					db.put(savedata);
				}

			}
		});

	}

}

Letter.dbId = 0;

