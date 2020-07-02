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
		
		Letter.ofFixedSVG(600, 0.6, '<svg width="96px" height="96px" viewBox="0 -14.49 96 96" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-288.456 -192.331)"><path d="M336.456,193.307a12.651,12.651,0,0,0-5.248-.953c-5.773.437-14.711,2.99-18.05,7.485-4.852,6.533-10.925,34.569-9.7,44.368s21.567,15.152,33,15.152Z" fill="#f7dcc6"/><path d="M336.456,227.442s-6.963.544-11.455,5.522-12.853,10.983-11.967,16.74,2.82,12.191,13.121,8.572a42.352,42.352,0,0,0,10.3,1.083Z" fill="#d6af92"/><path d="M330.215,208.55c4.822,1.814,1.644,16.83,6.241,17.783V228.6s-6.887-.116-12.123,2.773c-3.766,2.078-9.745,1.4-11.228-6.913-.6-3.356,2.639-7.909,9.333-10.289C327.413,212.406,327.688,207.6,330.215,208.55Z" fill="#d6af92"/><path d="M331.208,233.046c-.072,1.706,5.248,3.4,5.248,3.4v-9.008S331.381,228.962,331.208,233.046Z" fill="#3d2a2e"/><path d="M336.456,227.442a13.362,13.362,0,0,0-3.552.768c-1.211.576-2.3,3.915-1.7,4.836s2.048.346,2.538,0-.853-2.994,0-2.878,1.58,3.914.732,4.145,1.978,2.137,1.978,2.137Z" fill="#4c383d"/><path d="M331,225.556c-.5-.967-4.083-7.948-10.012-7.948-4.962,0-7.953,5.764-7.953,6.856s2.042,6.224,7.077,6.857,7.622-4.267,8.847-4.4S331.952,227.4,331,225.556Z" fill="#bb8d6f"/><ellipse cx="6.648" cy="6.855" rx="6.648" ry="6.855" transform="translate(314.339 217.609)" fill="#4c383d"/><ellipse cx="4.014" cy="4.139" rx="4.014" ry="4.139" transform="translate(316.973 220.325)" fill="#3d2a2e"/><ellipse cx="1.239" cy="1.277" rx="1.239" ry="1.277" transform="translate(316.579 220.799)" fill="#fbfcfc"/><path d="M316.482,197.173s-6.513-.136-9.833,3.675-15.756,7.3-17.754,15.867c-2.262,9.7,4.671,19.47,10.348,25.234,7.566,7.683,6.768-17.148,11.493-27.355S316.482,197.173,316.482,197.173Z" fill="#3d2a2e"/><path d="M336.456,244.615a10.4,10.4,0,0,0-5.42,2.586c-3.963,3.67-9.194,5.852-12.387,4.083s-3.766-1.72-1.117.705,8.907,1.794,11.972,0,6.952-.841,6.952-.841Z" fill="#3d2a2e"/><path d="M336.456,248.508s-3.888-.79-5.42,1.81.5,7.363,5.42,7.363Z" fill="#f37777"/><path d="M288.895,216.715c-1.229,5.273.266,10.559,2.79,15.216-1.964-6.179,1.981-13.4,5.724-16.486,3.47-2.858,6.019-11.031,8.619-13.987C302.014,205.047,290.786,208.6,288.895,216.715Z" fill="#4c383d"/><path d="M336.456,193.307a12.651,12.651,0,0,1,5.248-.953c5.773.437,14.711,2.99,18.05,7.485,4.853,6.533,10.926,34.569,9.705,44.368s-21.567,15.152-33,15.152Z" fill="#f7dcc6"/><path d="M336.456,227.442s6.963.544,11.455,5.522,12.853,10.983,11.967,16.74-2.82,12.191-13.121,8.572a42.352,42.352,0,0,1-10.3,1.083Z" fill="#d6af92"/><path d="M342.7,208.55c-4.822,1.814-1.644,16.83-6.241,17.783V228.6s6.887-.116,12.123,2.773c3.767,2.078,9.745,1.4,11.229-6.913.6-3.356-2.64-7.909-9.333-10.289C345.5,212.406,345.224,207.6,342.7,208.55Z" fill="#d6af92"/><path d="M341.7,233.046c.072,1.706-5.248,3.4-5.248,3.4v-9.008S341.531,228.962,341.7,233.046Z" fill="#3d2a2e"/><path d="M336.456,227.442a13.362,13.362,0,0,1,3.552.768c1.211.576,2.3,3.915,1.7,4.836s-2.048.346-2.538,0,.853-2.994,0-2.878-1.58,3.914-.732,4.145-1.978,2.137-1.978,2.137Z" fill="#4c383d"/><path d="M341.913,225.556c.5-.967,4.083-7.948,10.012-7.948,4.963,0,7.953,5.764,7.953,6.856s-2.041,6.224-7.077,6.857-7.622-4.267-8.846-4.4S340.961,227.4,341.913,225.556Z" fill="#bb8d6f"/><ellipse cx="6.648" cy="6.855" rx="6.648" ry="6.855" transform="translate(345.277 217.609)" fill="#4c383d"/><ellipse cx="4.014" cy="4.139" rx="4.014" ry="4.139" transform="translate(347.911 220.325)" fill="#3d2a2e"/><ellipse cx="1.239" cy="1.277" rx="1.239" ry="1.277" transform="translate(353.855 220.799)" fill="#fbfcfc"/><path d="M356.43,197.173s6.513-.136,9.833,3.675,15.756,7.3,17.754,15.867c2.262,9.7-4.671,19.47-10.347,25.234-7.566,7.683-6.768-17.148-11.493-27.355S356.43,197.173,356.43,197.173Z" fill="#3d2a2e"/><path d="M336.456,244.615a10.4,10.4,0,0,1,5.42,2.586c3.963,3.67,9.2,5.852,12.387,4.083s3.767-1.72,1.117.705-8.907,1.794-11.971,0-6.953-.841-6.953-.841Z" fill="#3d2a2e"/><path d="M336.456,248.508s3.888-.79,5.42,1.81-.5,7.363-5.42,7.363Z" fill="#f37777"/><path d="M384.017,216.715c1.229,5.273-.266,10.559-2.789,15.216,1.963-6.179-1.981-13.4-5.724-16.486-3.47-2.858-6.02-11.031-8.62-13.987C370.9,205.047,382.126,208.6,384.017,216.715Z" fill="#4c383d"/></g></svg>');

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