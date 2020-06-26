class Letter {

	static ofDb(dbInfo) {
		const letter = new Letter();
		letter.initFromDb(dbInfo);
		
	}

	static ofFixedLetter(y, char) {
		const letter = new Letter();
		letter.initFromFixedLetter(y, char);
	}

	initFromDb(dbInfo) {
		this.char = dbInfo.char;
		this._id = dbInfo._id;
		this.isReplaced = true;

		if (Letter.dbId <= this._id) {
			Letter.dbId = "" + (Number(this._id) + 1);
		}
	
		const path = helvetica[this.char];

		this.path = raphael.path(path)
			.attr({ fill: "#000", stroke: "#000", "fill-opacity": .5, "stroke-width": 1, "stroke-linecap": "round" })
			.translate(dbInfo.x, dbInfo.y)
			.scale(Letter.scale, Letter.scale);

		this.path.drag(this.moveDrag.bind(this), this.moveStart.bind(this), this.moveUp.bind(this));
		
		this.totalDx = dbInfo.x;
		this.totalDy = dbInfo.y;
	}
	

	initFromFixedLetter(y, char) {

		this.char = char;
		this.startY= y;
		this._id = -1;
		this.isReplaced = false;

		const path = helvetica[char];

		this.path = raphael.path(path).attr({ fill: "#00f", stroke: "#00f", "fill-opacity": 0, "stroke-width": 0, "stroke-linecap": "round" })
			.translate(10, y)
			.scale(Letter.scale, Letter.scale);
		this.path.drag(this.moveDrag.bind(this), this.moveStart.bind(this), this.moveUp.bind(this));
		this.path.animate({ "fill-opacity": 0.5 }, 1000);
		
		this.totalDx = 10;
		this.totalDy = this.startY;

	}

	moveStart() {
		
		this.odx = 0;
		this.ody = 0;
		
		this.path.animate({ "fill-opacity": 0.2 }, 100);
	}
	
	moveDrag(dx, dy) {
		
//		log("drag:", {x:dx, y:dy});
		
		this.totalDx = this.totalDx + dx - this.odx;
		this.totalDy = this.totalDy + dy - this.ody;

		const moveX = (dx - this.odx) / Letter.scale;
		const moveY = (dy - this.ody) / Letter.scale;

		this.path.translate(moveX, moveY);
		this.odx = dx;
		this.ody = dy;

		if (this.isTrashArea()) {
			this.path.attr("fill", "red");
		} else {
			this.path.attr("fill", "#000");
		}
		
		if (!this.isReplaced) {
			Letter.ofFixedLetter(this.startY, this.char);
			this.isReplaced = true;
		}

	}

	isTrashArea() {
		return false;
	}

	moveUp() {
		log("moveup");
		this.path.animate({ "fill-opacity": 1 }, 2000);

		if (this._id === -1) {
			Letter.dbId++;
			this._id=Letter.dbId;
		}
		
		const savedata = {
			char: this.char,
			x: this.totalDx,
			y: this.totalDy,
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
Letter.scale = 0.2;
