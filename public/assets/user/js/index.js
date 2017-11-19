$(document).ready(function () {
    var now = 1;
    $('#load-more').on('click', function () {

        var id = $(this).parent().find('input#page').val();
        var numpage = Math.ceil(id / 6);

        var url = '/loadmore';
        var target = $('#append-load-more');
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            data: { now: now },
            success: function (data) {
                if (data) {
                    now = now + 1;
                    if (now == numpage)
                        $('#load-more').remove();
                    target.append(data);
                }
                else alert('Vui lòng thử lại sau!');
            }
        });

    });

    $('#load-more-cate').on('click', function () {

        var id = $(this).parent().find('input#page').val();
        var slug = $(this).parent().find('input#slug').val();
        var numpage = Math.ceil(id / 6);
        var url = '/loadmore-cate';
        var target = $('#append-load-more');
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            data: { now: now, slug: slug },
            success: function (data) {
                if (data) {
                    now = now + 1;
                    if (now == numpage)
                        $('#load-more-cate').remove();
                    target.append(data);
                }
                else alert('Vui lòng thử lại sau!');
            }
        });

    });

    $('#load-more-cata').on('click', function () {

        var id = $(this).parent().find('input#page').val();
        var slug = $(this).parent().find('input#slug').val();
        var numpage = Math.ceil(id / 6);
        var url = '/loadmore-cata';
        var target = $('#append-load-more');
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            data: { now: now, slug: slug },
            success: function (data) {
                if (data) {
                    now = now + 1;
                    if (now == numpage)
                        $('#load-more-cata').remove();
                    target.append(data);
                }
                else alert('Vui lòng thử lại sau!');
            }
        });

    });
});	