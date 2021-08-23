function removeTask(selectedTask){
    $ajax({
        type: 'DELETE',
        url: '/del/'+ selectedTask,
        success:function(data){
            location.reload();
        }
    });
}
// $(document).ready(function(){
//     $('li').click(function(){
//         $ajax({
//             type: 'DELETE',
//             url: '/del',
//             success:function(data){
//                 location.reload();
//             }
//         });
//     })
// })





