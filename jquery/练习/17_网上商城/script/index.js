//最新动态
$('.tooltip').on('mouseover',function (e) {
    this.currTitle= this.title;
    $('<div id="tip">'+this.currTitle+'</div>').appendTo('body').offset({
        left:e.pageX+20,
        top:e.pageY+20
    });
    $(this).attr('title','');
}).on('mousemove',function (e) {
    $('#tip').offset({
        left:e.pageX+20,
        top:e.pageY+20
    });
}).on('mouseout',function () {
    $('#tip').remove();
    $(this).attr('title',this.currTitle);
});



//最新动态