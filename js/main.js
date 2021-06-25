$(document).ready(function () {
	new WOW().init();
	$('.slider').owlCarousel({
		nav: true,
		navText: '',
		items: 1,
		responsive: {
			425: {
				items: 2,
			},
			768: {
				items: 3,
			},
			1024: {
				items: 4
			}
		}
	});

	$('.popup').magnificPopup({
		type: 'inline',
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}

	});

	//E-mail Ajax Send
	$("#form-kta").submit(function () {
		var th = $(this);

		$.ajax({
			type: "POST",
			url: "thanks.php",
			data: th.serialize()
		}).done(function () {
			// alert("Спасибо, ваша заявка принята!");
			$.magnificPopup.open({
				items: {
					src: '#thanksPopup'
				},
				type: 'inline'
			});
			setTimeout(function () {
				// Done Functions
				// $.magnificPopup.close();
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	// window.onscroll = function() {fixMMenu()};
	// var header = document.getElementById("headerTop");
	// var menu = document.getElementById("mmWrap");
	// var sticky = header.offsetTop;
	// function fixMMenu() {
	// 	if (window.pageYOffset > sticky) {
	// 		menu.classList.add("fix");
	// 	} else {
	// 		menu.classList.remove("fix");
	// 	}
	// }

	// if(window.matchMedia('(max-width: 540px)').matches){

	// 	$('.slider-wrap').addClass('owl-carousel');

	// 	$('.slider-wrap').owlCarousel({
	// 		nav:true,
	// 		navText: '',
	// 		items:1
	// 	});
	// }
	// $('#mmenu-popup .menu a').on('click', function(){
	// 	$.magnificPopup.close();
	// });

	// const observer = lozad(); // lazy loads elements with default selector as '.lozad'
	// observer.observe();




	const range = document.getElementById("kv-range");

	// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
	const scale = (num, in_min, in_max, out_min, out_max) => {
		return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
	};

	range.addEventListener("input", (e) => {
		const value = +e.target.value;
		const label = e.target.nextElementSibling;
		const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
		const labelWidth = getComputedStyle(label).getPropertyValue("width");
		// remove px
		const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
		const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
		const max = +e.target.max;
		const min = +e.target.min;
		const left =
			value * (numWidth / max) -
			numLabelWidth / 2;
		label.style.left = `${left - 15}px`;
		label.style.background = `#ffffff`;
		label.innerHTML = value;

		$('.kv-range-gradient')[0].style.background = `linear-gradient(90deg, #1A1F26 ${left * 0.5 + 2}%, rgba(26, 31, 38, 0.23) ${left * 0.5 + 10}%)`;

	});




	let _calc = {
		kv_list: {
			1: {
				price: 1500,
				kv: 30
			},
			2: {
				price: 1500,
				kv: 35
			},
			3: {
				price: 1500,
				kv: 36
			},
			4: {
				price: 1500,
				kv: 42
			},
			5: {
				price: 1500,
				kv: 47
			},
			6: {
				price: 1500,
				kv: 54
			},
			7: {
				price: 1500,
				kv: 64
			},
			8: {
				price: 1500,
				kv: 72
			},
			9: {
				price: 1500,
				kv: 81
			},
			10: {
				price: 1500,
				kv: 90
			},
			11: {
				price: 1500,
				kv: 100
			},
			12: {
				price: 1500,
				kv: 200
			},
		},
		work_price: {
			1: {
				price: 1500,
			},
			2: {
				price: 1500,
			},
			3: {
				price: 1500,
			},
			4: {
				price: 1500,
			},
			5: {
				price: 1500,
			},
			6: {
				price: 1500,
			},
			7: {
				price: 1500,
			},
			8: {
				price: 1500,
			},
			9: {
				price: 1500,
			},
			10: {
				price: 1500,
			},
			11: {
				price: 1500,
			},
			12: {
				price: 1500,
			},
		},
		work_selected: 1,
		kv_selected: 0,
		rprice: 0,
		kv_selected: 0,

		setKV(number, fromData = false) {
			if (fromData == true) {
				this.kv_selected = this.kv_list[number].kv
			}
			else {
				this.kv_selected = number
			}


			this.calcSelected(fromData)
		},
		calcSelected(fromData = false) {
			this.rprice = this.kv_selected * this.work_price[this.work_selected].price;
			this.draw(this.rprice)
		},

		draw(number) {
			$('.sum-result').text(`${this.formatCurrency(number)} тг`)
		},

		formatCurrency(number) {
			var n = String(number).split('').reverse().join("");
			var n2 = n.replace(/\d\d\d(?!$)/g, "$& ");
			return n2.split('').reverse().join('');
		},
	}



	$('.kv-selector').on('click', function () {
		$('.kv-selector.selected').removeClass('selected')
		$(this).addClass('selected')

		_calc.setKV(parseInt($(this).attr('id')), true);
	})


	$('#kv-range').on('input', function () {
		_calc.setKV(parseInt($(this).val()));
	})

});

