class Printer {

	constructor() {

	}

	print(dbInfos) {

		document.getElementById("printdiv").innerHTML = '';
		this.generateHtml(dbInfos);

	}

	generateHtml(dbInfos) {

		const a4factor = 192 / 272;

		const width = 800;
		const height = width / a4factor;

		const printael = Raphael('printdiv', width, height);

		//		printael.rect(0,0, width/1, height/1);

		var st = printael.set();

		for (var dbInfo of dbInfos) {

			const path = helvetica[dbInfo.char];

			printael.path(path).attr({ fill: "#000", stroke: "#000", "fill-opacity": .5, "stroke-width": 1, "stroke-linecap": "round" })
				.translate(-30 + (dbInfo.x * 1 / 3), -30+(dbInfo.y * 1 / 3))
				.scale(1 / 5, 1 / 5)
				.rotate(0);
		}

		this.printContent('printdiv');

	}

	printContent(el) {

		var divContents = document.getElementById("printdiv").innerHTML;
		var a = window.open('', '', 'width=1800');
		a.document.write('<style type="text/css">'
			+ '* {margin:0; padding:0;}'
			+ '@page {  size: A4;  padding: 0; margin: 0;}'
			+ 'body {background-color:green;}'
			+ '.small {background-color:cyan;position:absolute;width:7.425cm;height:10.5cm;border:1px dotted red;}'
			+ '#print1 {top:-15mm;left:1cm;}'
			+ '#print2 {top:6cm;left:1cm;}'
			+ '</style>');
		a.document.write('<html><body><div id="print1" class="small">');
		a.document.write(divContents);
		a.document.write("</div>")
		a.document.write('<div id="print2" class="small">');
		a.document.write(divContents);
		a.document.write('</div></body></html>');
		a.document.close();

		const element = a.document.getElementById("print1");

		let degree = 90;

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

				a.print();
				a.close();
	}


}

