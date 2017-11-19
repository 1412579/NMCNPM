$(document).ready(function(){
    $('.banUser').click(function(){
        if(window.confirm("Bạn chắc chắn muốn cấm thành viên này?")){
            var id =$(this).parent().find('input#id').val();
            var url ='/admin/user/ban';
            var target = $(this).parent().parent();
            $.ajax({
                url: url,
                type: 'POST',
                cache: false,
                data:{id:id},
                success: function (data){
                    if(data){
                        target.remove();
                    }
                    else alert('Ban user không thành công!');
                 }
            });
        }
        else return false;
    });
    $('div.alert').delay(5000).slideUp();
});	