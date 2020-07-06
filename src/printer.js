class Printer {

	print(dbInfos) {
		document.getElementById("printdiv").innerHTML = '';
		const a4factor = 192 / 272;

		const width = 400;
		const height = width / a4factor;

		const printael = SVG().addTo('#printdiv').size(width, height);
		printael.rect(width, height).move(0, 0).fill("green");

		for (const dbInfo of dbInfos) {

			this.path = printael.nested();


			if (dbInfo.char != null) {
				this.path.path(helvetica[dbInfo.char]);
			}

			if (dbInfo.svg != null) {
				this.path.svg(dbInfo.svg);
			}

			const scaledPath = printael.group().add(this.path);

			scaledPath.scale(dbInfo.scale, dbInfo.scale);

			const t = this.computeTranslation(dbInfo);

			scaledPath.move(t.x, t.y);

		}

		try {
			this.printContent('printdiv');
		} catch (err) {
			console.log(err);
		}

	}

	computeTranslation(dbinfo) {

		const x = dbinfo.x - (300 / dbinfo.scale);
		const y = dbinfo.y - (20 / dbinfo.scale);



		return { x, y };


	}


	printContent(el) {
		var divContents = document.getElementById("printdiv").innerHTML;
		var a = window.open('', '', 'width=800');
		a.document.write('<style type="text/css">'
			+ '* {margin:0; padding:0;-moz-box-sizing: border-box;box-sizing:border-box;}'
			+ '@page {  size: A4;  padding: 0; margin: 0;}'
			+ 'html, body {width:297mm;height:210mm;background-color:green;}'
			+ '.small {background-color:yellow;position:fixed;border:1px dotted red;}'
			+ '#print1{top:-11mm; left:-16mm;}'
			+ '#print2{top:-11mm; left:59mm;}'
			+ '#print3{top:-11mm; left:133mm;}'
			+ '#print4{top:-11mm; left:208mm;}'
			+ '#print5{top:94mm; left:-16mm;}'
			+ '#print6{top:94mm; left:59mm;}'
			+ '#print7{top:94mm; left:133mm;}'
			+ '#print8{top:94mm; left:208mm;}'
			+ '</style>');
		a.document.write('<html><body><div id="print1" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");

		a.document.write('<div id="print2" class="small">');
		a.document.write(divContents);
		a.document.write("</div>");
		a.document.write('<div id="print3" class="small">');
		a.document.write(divContents);
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

		const scale = "scale(0.69, 0.69)";


		a.document.getElementById("print1").style.transform = scale;
		a.document.getElementById("print2").style.transform = scale;
		a.document.getElementById("print3").style.transform = scale;
		a.document.getElementById("print4").style.transform = scale;
		a.document.getElementById("print5").style.transform = scale;
		a.document.getElementById("print6").style.transform = scale;
		a.document.getElementById("print7").style.transform = scale;
		a.document.getElementById("print8").style.transform = scale;




		a.print();
		a.document.close();
	}

	_printContent(el) {

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

		//		a.print();
		//					a.close();
	}


}

