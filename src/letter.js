class Letter {

	constructor() {
		this.scale = 0.2;
	}

	static ofDb(dbInfo) {
		const letter = new Letter();
		letter.initFromDb(dbInfo);
	}

	static ofFixedLetter(y, char) {
		const letter = new Letter();
		letter.initFromFixedLetter(y, char);
	}

	static ofFixedSVG(y, scale, svg) {
		const letter = new Letter();
		letter.scale = scale;
		letter.initFromFixedSVG(y, svg);
	}

	initFromFixedSVG(y, svg) {

		this.svg = svg;
		this.startY = y;
		this._id = -1;
		this.isReplaced = false;

		this.path = raphael.nested();
		this.path.svg(svg);
		this.path.move(10, y);
		this.path.scale(this.scale, this.scale);

		this.path.draggable()
			.on('dragmove', e => {

				if (!this.isReplaced) {
					Letter.ofFixedSVG(this.startY, this.scale, this.svg);
					this.isReplaced = true;
				}
			});

		this.path.draggable()
			.on('dragend', e => {
				this.savePosition();
			}); 

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

			this.path = raphael.nested();
			this.path.path(p);
			log("initilized at ", { dbInfo });
			this.path.move(dbInfo.x, dbInfo.y);

			this.path.scale(this.scale, this.scale);
			this.path.attr({ fill: "black", "fill-opacity": 1 });

			this.path.draggable()
				.on('dragend', e => {
					this.savePosition();
				});
		}
		
		if (this.svg != null) {
			this.path = raphael.nested();
			this.path.svg(this.svg);
			this.path.move(dbInfo.x, dbInfo.y);
			this.path.scale(this.scale, this.scale);
			
			this.path.draggable()
				.on('dragend', e => {
					this.savePosition();
				});
		}
		
	}


	initFromFixedLetter(y, char) {

		this.char = char;
		this.startY = y;
		this._id = -1;
		this.isReplaced = false;

		const p = helvetica[char];

		this.path = raphael.nested();
		this.path.path(p);
		this.path.move(10, y);
		this.path.scale(this.scale, this.scale);
		this.path.attr({ fill: "black", "fill-opacity": 1 });

		this.path.draggable()
			.on('dragmove', e => {

				if (!this.isReplaced) {
					Letter.ofFixedLetter(this.startY, this.char);
					this.isReplaced = true;
				}
 
//				log("dm event=", { x: X, y: Y });

//				if (Y < 300) {
//					this.path.attr({ fill: "cyan" });
//				} else {
//					this.path.attr({ fill: "red" });
//				}
			});

		this.path.draggable()
			.on('dragend', e => {
				this.savePosition();
			});

	}

	isTrashArea() {
		return false;
	}

	savePosition(e) {

		const x = this.path.x();
		const y = this.path.y();

		log("moveup", { x: x, y: y });

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

