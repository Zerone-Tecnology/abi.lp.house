$(document).ready(function(){
	new WOW().init();
	$('.slider').owlCarousel({
		nav:true,
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
	$("#form-kta").submit(function() {
				var th = $(this);
				
		$.ajax({
			type: "POST",
			url: "thanks.php",
			data: th.serialize()
		}).done(function() {
			// alert("Спасибо, ваша заявка принята!");
			$.magnificPopup.open({
					items: {
							src: '#thanksPopup'
					},
					type: 'inline'
			});
			setTimeout(function() {
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

});