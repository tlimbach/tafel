class Start {

	constructor() {
		this.init();
	}

	init() {
		this.dbid = 0;
				
		db = new PouchDB('letterdb');
		db.info().then(function(info) {
			console.log(info);
		});
		
		this.startup();
	}

	startup() {

		const width = 800;
		const a4factor = 192 / 272;
		const height = width / a4factor;
		
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		raphael = SVG().addTo('#canvasdiv').size(windowWidth, windowHeight);
		
		const pgWidth = 400;
		const pgHeight = pgWidth / a4factor;
		 
		raphael.rect(pgWidth, pgHeight).move(300, 20).fill("lightgray");
		
		Letter.ofFixedLetter(100, 'A');
		Letter.ofFixedLetter(200, 'B');
		Letter.ofFixedLetter(300, 'C');
		Letter.ofFixedLetter(400, 'D');
		Letter.ofFixedLetter(500, 'e');

		this.showDbContent();

		db.allDocs({ include_docs: true, descending: true }, function(err, docs) {
			for (let t = 0; t < docs.rows.length; t++) {
				const doc = docs.rows[t].doc;
//				log("instantiating: ", doc);
				Letter.ofDb(doc);
			}
		});
		
		const drucki = raphael.text("Drucki").move(windowWidth-200, 20 ).scale(2,2);
		const deleti = raphael.text("Deleti").move(windowWidth-200, 60);

		

		deleti.click(function() {
			db.destroy(function(err, response) {
				if (err) {
					return console.log(err);
				} else {
					db = new PouchDB('letterdb');
				}
			});
		});

		drucki.click(function() {
			const dbInfos = [];
			db.allDocs({ include_docs: true, descending: true }, function(err, docs) {

				for (let t = 0; t < docs.rows.length; t++) {
					const doc = docs.rows[t].doc;
					dbInfos.push(doc);
				}

				new Printer().print(dbInfos);

			});

		});

	}

	showDbContent() {
		db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
			console.log(JSON.stringify(doc));
		});
	}



}