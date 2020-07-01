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

		const p = helvetica[this.char];

		this.path = raphael.nested();
		this.path.path(p);
		log("initilized at ", {dbInfo});
		this.path.move(dbInfo.x, dbInfo.y);
		
		this.path.scale(Letter.scale, Letter.scale);
		this.path.attr({ fill: "black", "fill-opacity": 1 });
//
				this.path.draggable()
			.on('dragend', e => {
				this.savePosition();
			});
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
		this.path.scale(Letter.scale, Letter.scale);
		this.path.attr({ fill: "black", "fill-opacity": 1 });
		
		this.path.draggable()
			.on('dragmove', e => {
				
						if (!this.isReplaced) {
			Letter.ofFixedLetter(this.startY, this.char);
			this.isReplaced = true;
		}
				
//				e.preventDefault()
//				e.detail.handler.move(100, 200)
				// events are still bound e.g. dragend will fire anyway
				const X = e.detail.event.clientX;
				const Y = e.detail.event.clientY;
				log("dm event=", {x:X, y:Y});
				
				if (Y<300) {
					this.path.attr({fill: "cyan"});
				} else {
					this.path.attr({fill: "red"});
	//				this.path.animate({duration:1000}).move(0,0);
				}
			});
			
			this.path.draggable()
			.on('dragend', e => {
				
				
				
				
//				if (Y<300) {
//
//				} else {
//log("YOu are doomed!");
//				}
				
				this.savePosition();
			});

	}

//	moveStart() {
//
//		this.odx = 0;
//		this.ody = 0;
//
//		this.path.animate({ "fill-opacity": 0.2 }, 100);
//	}






	isTrashArea() {
		return false;
	}

	savePosition(e) {
		
		const x = this.path.x();
		const y = this.path.y();
		
		log("moveup", {x:x, y:y});
		

		if (this._id === -1) {
			Letter.dbId++;
			this._id = Letter.dbId;
		}

		const savedata = {
			char: this.char,
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
Letter.scale = 0.2;
