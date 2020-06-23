class Printer {




	constructor() {

	}

	print(dbInfos) {
		//		this.mywindow = window.open('', '_blank', 'height=400,width=600');
		//		this.mywindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
		//		this.mywindow.document.write('<html><head><title></title></head><body >');
		//		this.mywindow.document.write('<style type="text/css" media="print">@page {  size: auto;  margin: 0;}</style>');
		//		this.mywindow.document.write('<div id="printarea"></div>');
		//		this.mywindow.document.write('</body></html>');
		//		this.mywindow.document.close(); // necessary for IE >= 10
		//
		//		this.generateHtml(dbInfos)
		//
		//		this.mywindow.focus(); // necessary for IE >= 10
		//		this.mywindow.print();
		//		this.mywindow.close();
		//		return true;

		this.generateHtml(dbInfos);

	}

	generateHtml(dbInfos) {

		for (var dbInfo of dbInfos) {

			const path = helvetica[dbInfo.char];

			this.path = printael.path(path).attr({ fill: "#000", stroke: "#000", "fill-opacity": .5, "stroke-width": 1, "stroke-linecap": "round" })
				.translate(dbInfo.x, dbInfo.y);



		}

		this.printContent('printdiv');
	}

	printContent(el) {
		var restorepage = $('body').html();
		var printcontent = $('#' + el).clone();
		$('body').empty().html(printcontent);
		window.print();
		$('body').html(restorepage);
	}


}

