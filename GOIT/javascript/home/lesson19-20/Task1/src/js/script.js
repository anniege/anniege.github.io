$(function() {

	var info = {
		news: {
			title: 'latest news',
			articles: [
				{
					date: {
						day: 23,
						month: 'Jan'
					},
					src: 'dist/img/news_1.jpg',
					title: 'Advanced Machinery Helps Improve Quality',
					user: 'cmsmasters',
					comments: 6,
					content: 'Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem.'
				},
				{
					date: {
						day: 21,
						month: 'Jan'
					},
					src: 'dist/img/news_2.jpg',
					title: 'Powerful Techniques for Advanced Service',
					user: 'cmsmasters',
					comments: 3,
					content: 'Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem.'
				}
			]
		},
		banners: {
			title: 'Banners Place',
			bannerList: [
				{
					title: 'Accordion Panel 1',
					content: 'Cum sociis natoque penatibus et magnis dis parturient mus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur momo. Cum sociis natoque penatibus et magnis dis parturient ontesmus. Nemo enim ipsam voluptatem quia ptas sit aspernatur samomoPro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur'
				},
				{
					title: 'Accordion Panel 2',
					content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam non repudiandae ratione temporibus, dolor consequatur nesciunt magni rerum, consectetur esse, fugit, reprehenderit fuga quo deserunt quidem soluta vitae sed et!.'
				},
				{
					title: 'Accordion Panel 3',
					content: 'Cum sociis natoque penatibus et magnis dis enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem.'
				},
				{
					title: 'Accordion Panel 4',
					content: 'Cum sociis natoque penatibus et magnis dis parturient mus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur momo. Cum sociis natoque penatibus et magnis dis parturient ontesmus. Nemo enim ipsam voluptatem quia ptas sit aspernatur samomoPro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur.'
				}
			]
		}
	}

 var appRun = function() {
	var temp = _.template($('#tmpl').html());
	$('.news-banners').html(temp(info));

	function bannerControl(){
		var banner = $('.banners__i').eq(0);
		banner.addClass('banners__i--active').children('.banners__i__title span').html('-');
		banner.children('.banners__content').slideDown();

		$('.banners__list').on('click', '.banners__i', function() {
			$('.banners__i--active').removeClass('banners__i--active');
			$('.banners__i__title span').html('+');
			$(this).addClass('banners__i--active').children('.banners__i__title span').html('-');
			$(this).children('.banners__content').slideDown();
		});
	}

	function menuControl() {
		$('.menu__list').on('click', menuClick);
	}

	function menuClick (e) {
			var target = e.target;
			$(this).find('.menu__link--active').removeClass('menu__link--active');

			if (target.nodeName === 'A') {
					$(target).addClass('menu__link--active');
			}
	}

	function resonsiveMenu() {
		if (matchMedia) {
		  var mq = window.matchMedia("(max-width: 956px)");
		  mq.addListener(WidthChange);
		  WidthChange(mq);
		}

		function WidthChange(mq) {

		  if (mq.matches) {
			var menuHandler = document.querySelector('.menu__icon');

			menuHandler.addEventListener('click', function(){
				document.body.style.overflow = "hidden";
				var menuLarge = document.createElement('div');
				var exit = document.createElement('span');
				exit.className = 'fa fa-times';
				exit.classList.add('menu--large__exit');

				menuLarge.classList.add('menu--large');
				// menuLarge.style.height = heightScreen + "px";
				menuLarge.classList.add('clearfix');
				var targetNode = document.querySelector('ul.menu__list');
				var cloneMenu = targetNode.cloneNode(true);
				cloneMenu.classList.add('menu__list--active');
				cloneMenu.addEventListener('click', menuClick);

				menuLarge.appendChild(exit);
				menuLarge.appendChild(cloneMenu);
				document.body.appendChild(menuLarge);

				exit.addEventListener('click', function() {
					document.body.style.overflow = "scroll";
					var menuLarge = document.querySelector('div.menu--large');
					document.body.removeChild(menuLarge);
				})
			});
		  } else {
			// window width is less than 500px
		  }

		}
	}

	function carouselControl () {

		$('.jcarousel').jcarousel({
				wrap: 'both'
		}).jcarouselAutoscroll({
					interval: 4000,
					target: '+=1',
					autostart: true
		});

		$('.jcarousel-pagination')
		.on('jcarouselpagination:active', 'a', function() {
			$(this).addClass('jcarousel-pagination__link--active');
			var i = $(this).index();
			$('.jcarousel li').eq(i).find('h3').addClass('slider__title--active');
		})
		.on('jcarouselpagination:inactive', 'a', function() {
			$(this).removeClass('jcarousel-pagination__link--active');
			var i = $(this).index();
			$('.jcarousel li').eq(i).find('h3').removeClass('slider__title--active');
		})
		.jcarouselPagination();

		$('.slider__list').find('img').each(function(){
			var realsrc = $(this).attr('data-src');
			$(this).one('load', function(){
				$(this).addClass('acarousel-img').animate({opacity: 1}, 500);
			});
			$(this).attr('src', realsrc);
		});
	}

	carouselControl();
	bannerControl();
	resonsiveMenu();
	menuControl();
}

appRun();
});

