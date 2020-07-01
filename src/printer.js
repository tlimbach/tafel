class Printer {

	constructor() {

	}

	print(dbInfos) {
		document.getElementById("printdiv").innerHTML = '';
		this.generateHtml(dbInfos);
	}

	generateHtml(dbInfos) {

		const a4factor = 192 / 272;

		const width = 400;
		const height = width / a4factor;

		const printael = SVG().addTo('#printdiv').size(width, height);

		for (const dbInfo of dbInfos) {

			const p = helvetica[dbInfo.char];

			const translation = this.computeTranslation(dbInfo);
			
			this.path = printael.nested();
		this.path.path(p);
		log("initilized for print at ", {x: translation.x, y:translation.y});
		this.path.move(translation.x, translation.y);
		this.path.scale(Letter.scale, Letter.scale);

//			printael.path(path).attr({ fill: "#000", stroke: "#000", "fill-opacity": .5, "stroke-width": 1, "stroke-linecap": "round" })
//				.translate(translation.x, translation.y)
//				.scale(Letter.scale, Letter.scale)
//				.rotate(0);
		}

		try {
			this.printContent('printdiv');
		} catch(err) {
			console.log(err);
		}

	}

	computeTranslation(dbinfo) {
		const x = -1310*0.68 + dbinfo.x*0.68;
		const y = 134*0.68 + dbinfo.y*0.68;

		return { x, y };
	}

	printContent(el) {

		const baseHeight = -18;
		const offsetHeight = 70;

		const snippetHeight = 210 / 2;
		const snippedWidth = 297 / 4;

		var divContents = document.getElementById("printdiv").innerHTML;
		var a = window.open('', '', 'width=800');
		a.document.write('<style type="text/css">'
			+ '* {margin:0; padding:0;-moz-box-sizing: border-box;box-sizing:border-box;}'
			+ '@page {  size: A4;  padding: 1px; margin: 0;}'
			+ 'html, body {width:300mm;height:210mm;background-color:green;}'
			+ '.small {background-color:yellow;position:fixed;height:105mm;width:75.25mm;border:1px dotted gray;}'
			+ '#print1{top:0mm; left:0mm;}'
			+ '#print2{top:0mm; left:75mm;}'
			+ '#print3{top:0mm; left:150mm;}'
			+ '#print4{top:0mm; left:225mm;}'
			+ '#print5{top:106mm; left:0mm;}'
			+ '#print6{top:106mm; left:75mm;}'
			+ '#print7{top:106mm; left:150mm;}'
			+ '#print8{top:106mm; left:225mm;}'
			+ '</style>');
		a.document.write('<html><body><div id="print1" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write('<div id="print2" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write("</div>");
		a.document.write('<div id="print3" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write("</div>");
		a.document.write('<div id="print4" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write('<div id="print5" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write('<div id="print6" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write('<div id="print7" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write('<div id="print8" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write('</body></html>');
		a.document.close();

		const element = a.document.getElementById("print1");

		let degree = 0;

		element.style.webkitTransform = 'rotate(' + degree + 'deg)';
		element.style.mozTransform = 'rotate(' + degree + 'deg)';
		element.style.msTransform = 'rotate(' + degree + 'deg)';
		element.style.oTransform = 'rotate(' + degree + 'deg)';
		element.style.transform = 'rotate(' + degree + 'deg)';

		const element2 = a.document.getElementById("print2");


		element2.style.webkitTransform = 'rotate(' + degree + 'deg)';
		element2.style.mozTransform = 'rotate(' + degree + 'deg)';
		element2.style.msTransform = 'rotate(' + degree + 'deg)';
		element2.style.oTransform = 'rotate(' + degree + 'deg)';
		element2.style.transform = 'rotate(' + degree + 'deg)';


		const element3 = a.document.getElementById("print3");


		element3.style.webkitTransform = 'rotate(' + degree + 'deg)';
		element3.style.mozTransform = 'rotate(' + degree + 'deg)';
		element3.style.msTransform = 'rotate(' + degree + 'deg)';
		element3.style.oTransform = 'rotate(' + degree + 'deg)';
		element3.style.transform = 'rotate(' + degree + 'deg)';


		const element4 = a.document.getElementById("print4");


		degree = 180;

		element4.style.webkitTransform = 'rotate(' + degree + 'deg)';
		element4.style.mozTransform = 'rotate(' + degree + 'deg)';
		element4.style.msTransform = 'rotate(' + degree + 'deg)';
		element4.style.oTransform = 'rotate(' + degree + 'deg)';
		element4.style.transform = 'rotate(' + degree + 'deg)';


		const element5 = a.document.getElementById("print5");


		element5.style.webkitTransform = 'rotate(' + degree + 'deg)';
		element5.style.mozTransform = 'rotate(' + degree + 'deg)';
		element5.style.msTransform = 'rotate(' + degree + 'deg)';
		element5.style.oTransform = 'rotate(' + degree + 'deg)';
		element5.style.transform = 'rotate(' + degree + 'deg)';

		a.print();
//					a.close();
	}


}

