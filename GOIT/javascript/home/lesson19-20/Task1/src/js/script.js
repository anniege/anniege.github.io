(function() {
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
					content: 'Cum sociis natoque penatibus et magnis dis parturient mus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur momo. Cum sociis natoque penatibus et magnis dis parturient ontesmus. Nemo enim ipsam voluptatem quia ptas sit aspernatur samomoPro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur\
	samomo enim ipsam voluptatem.'
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

function loadData() {
	var newsBanners = document.querySelector('.news-banners');
	var temp = _.template(document.getElementById('tmpl').innerHTML);
	newsBanners.innerHTML = temp(info);

		$('.jcarousel').jcarousel({
				wrap: 'both'
		}).jcarouselAutoscroll({
					interval: 4000,
					target: '+=1',
					autostart: false
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
}

document.addEventListener('DOMContentLoaded', loadData);


})();

