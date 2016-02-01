$(function(){

	var $googleSearch = function(index) {
		$('.search-result').html("");
		var urlAdded = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&q=";
		var valueInput = encodeURIComponent($('.search__input').val());
		if (valueInput) {
			urlAdded +=valueInput+"&rsz=8&start="+index*8+"&callback=GoogleCallback&context=?";
			var pages;
			$.ajax({
				url: urlAdded,
				dataType : "jsonp",
				success: function (data) {
					if (data.results.length) {
						pages = data.cursor.pages.length;
						$.each(data.results, function(i, val){
							var ul = $('<ul></ul>').addClass('search-result__list');
							var li = $('<li></li>').addClass('search-result__list__item');
							var title = $('<h2></h2>').addClass('search-result__list__item__title');
							var link = $('<a></a>').attr('href',val.url).addClass('search-result__list__item__link');
							$(link).html(val.titleNoFormatting);
							var content = $('<div></div>').addClass('search-result__list__item__content');
							var cite = $('<cite></cite>').addClass('search-result__list__item__content__url').html(val.url);
							var contentData = $('<p></p>').addClass('search-result__list__item__content__data').html(val.content);
							$(content).append(cite);
							$(content).append(contentData);
							$(title).append(link);
							$(li).append(title);
							$(li).append(content);
							$(ul).append(li);
							$('.search-result').append(ul);  
						}); 
							var pagesList = $('<ol></ol>').addClass('search-result__pages');
							for (var i=1; i<=pages; i++) {
								var pagesItem = $('<li></li>').addClass('search-result__pages__item');
								var pagesLink = $('<a></a>').addClass('search-result__pages__item__link').html(i);
								if (i === (index+1)) {
									$(pagesLink).addClass('search-result__pages__item__link--current');
								}
								$(pagesItem).append(pagesLink);
								$(pagesList).append(pagesItem);
							}
							$('.search-result').append(pagesList); 
							$('.search-result__pages__item__link').click(function(e) {
								$googleSearch(e.target.innerHTML-1);
							});
					} else {
							var message = $('<p></p>').addClass('search-result__message').html("На запит не знайдено жодного документа.");
							$('.search-result').append(message);
					}
				}
			});
		}
	}

	$('.search__button').click(function(e) {
			e.preventDefault();
			$googleSearch(0);
	});
});
function GoogleCallback(func, data){
	window[func](data);
}
