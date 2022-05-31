$(document).ready(function () {
	new WOW().init();
	$('.slider').owlCarousel({
		nav: true,
		navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
		items: 1,
		center: true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:false,
		onInitialized  : counter, 
  		onTranslated : counter,
		responsive: {
			425: {
				items: 1,
			},
			768: {
				items: 3,
			},
			1024: {
				items: 3
			},
			
		}
	});

	$('.slider-sale').owlCarousel({
		items: 1,
		nav: true,
		dots: true,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:false,
		onInitialized  : counter, 
  		onTranslated : counter,
		responsive: {
			425: {
				items: 1,
			},
			768: {
				items: 2,
			},
			1024: {
				items: 3
			},
			
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



	// Отрисовка ползунка в "ОНЛАЙН КАЛЬКУЛЯТОР"
	const range = document.getElementById("kv-range");
	// Отрисовка ползунка в "ОНЛАЙН КАЛЬКУЛЯТОР"
	const scale = (num, in_min, in_max, out_min, out_max) => {
		return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
	};
	// Отрисовка ползунка в "ОНЛАЙН КАЛЬКУЛЯТОР"
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

		$('.kv-range-gradient')[0].style.background = `linear-gradient(90deg, #1A1F26 ${left * 1.1 + 5}px, rgba(26, 31, 38, 0.23) ${left * 1 + 10}px)`;

	});

	





	// Отрисовка результата в "ОНЛАЙН КАЛЬКУЛЯТОР"
	const calculate = {
		work: [
			{ number: 1, price: 1500 },
			{ number: 2, price: 6000 },
			{ number: 3, price: 15000 },
			{ number: 4, price: 10000 },
			{ number: 5, price: 10000 },
			{ number: 6, price: 1500 },
			{ number: 7, price: 10000 },
			{ number: 8, price: 1 },
			{ number: 9, price: 1 },
			{ number: 10, price: 1 },
			{ number: 11, price: 1 },
			{ number: 12, price: 1 },
		],

		getCalculated(kv_selected, work_id = 1) {
			this.kv_value = parseInt(kv_selected) * this.getWork(work_id).price
		},

		getWork(number) {
			console.log(this.work.find(w => w.number === number))
			return this.work.find(w => w.number === number)
		},

		draw(price) {
			$('.sum-result').text(`${this.formatCurrency(price)} тг`)
		},

		formatCurrency(number) {
			var n = String(number).split('').reverse().join("");
			var n2 = n.replace(/\d\d\d(?!$)/g, "$& ");
			return n2.split('').reverse().join('');
		},

		set(kv_selected, work_id) {
			this.getCalculated(kv_selected, work_id)
			this.draw(this.kv_value)
		},

		plus(val) {
			let price = parseInt($('.sum-result').text().replace(/\s/g, '').slice(0, -2));
			price = price + parseInt(val);
			this.draw(price)
		},

		minus(val) {
			let price = parseInt($('.sum-result').text().replace(/\s/g, '').slice(0, -2));
			price = price - parseInt(val);
			this.draw(price)
		}
	}
	// Отрисовка результата в "ОНЛАЙН КАЛЬКУЛЯТОР"
	$('.kv-selector').on('click', function () {
		$('.kv-selector.selected').removeClass('selected')
		$('.opt-selector.selected').removeClass('selected')
		$(this).addClass('selected')

		const kv_value = $(this)[0].dataset.value;

		calculate.set(kv_value, 1);
	})
	// Отрисовка результата в "ОНЛАЙН КАЛЬКУЛЯТОР"
	$('#kv-range').on('input', function () {
		$('.kv-selector.selected').removeClass('selected')
		$('.opt-selector.selected').removeClass('selected')
		calculate.set($(this).val(), 1);
	})
	// Отрисовка результата в "ОНЛАЙН КАЛЬКУЛЯТОР"
	$('.opt-selector').on('click', function () {
		if ($(this).hasClass('selected')) {
			calculate.plus($(this)[0].dataset.price)
			$(this).removeClass('selected')
		}
		else {
			calculate.minus($(this)[0].dataset.price)
			$(this).addClass('selected')
		}
	})

});

$(function() {
    var owl = $('.slider-card'),

        owlOptions = {
          loop: false,
			    margin: 30,
			    smartSpeed: 700,
			    nav: false,
			    items: 1,
				loop: true,
				responsive: {
					426: {
						items: 1,
					},
					768: {
						items: 2,
					},
					1024: {
						items: 3
					}
				}
        };

    if ( $(window).width() < 770 ) {
        var owlActive = owl.owlCarousel(owlOptions);
    } else {
        owl.addClass('off');
    }

    $(window).resize(function() {
        if ( $(window).width() < 770 ) {
            if ( $('.owl-carousel').hasClass('off') ) {
                var owlActive = owl.owlCarousel(owlOptions);
                owl.removeClass('off');
            }
        } else {
            if ( !$('.owl-carousel').hasClass('off') ) {
                owl.addClass('off').trigger('destroy.owl.carousel');
                owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
            }
        }
    });
});



function burgerMenu(selector) {
	let menu = $(selector);
	let button = menu.find('.burger-menu_button', '.burger-menu_lines');
	let links = menu.find('.burger-menu_link');
	let overlay = menu.find('.burger-menu_overlay');
	
	button.on('click', (e) => {
	  e.preventDefault();
	  toggleMenu();
	});
	
	links.on('click', () => toggleMenu());
	overlay.on('click', () => toggleMenu());
	
	function toggleMenu(){
	  menu.toggleClass('burger-menu_active');
	  
	  if (menu.hasClass('burger-menu_active')) {
		$('body').css('overlow', 'hidden');
	  } else {
		$('body').css('overlow', 'visible');
	  }
	}
  }
  
  burgerMenu('.burger-menu');

  
  function counter(event) {
	var element   = event.target;         // DOM element, in this example .owl-carousel
	 var items     = event.item.count;     // Number of items
	 var item      = event.item.index + 1;     // Position of the current item
   
   // it loop is true then reset counter from 1
   if(item > items) {
	 item = item - items
   }
   $('#counter').html("<span class='counter-span-1'>0"+item+"</span>"+" / "+"<span class='counter-span-2'>0" +items+"</span>")
 }

 var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

