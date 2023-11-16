$("#add_user").submit(function(event){
    alert("Data Inserted!");
});

$("#update_user").submit(function(event){ 
    event.preventDefault();
    var unindexed_array = $(this).serializeArray(); 
    var data = {};
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value'];
    });

    console.log(unindexed_array);

    var request = {
        url: `http://localhost:3000/api/users/${data.id}`, 
        method: "PUT",
        data: data
    };

    $.ajax(request).done(function(response){
        alert("Data Updated");
    });
});

if (window.location.pathname === "/") { // Corrected the equality check
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id"); // Corrected attribute name
        var request = {
            url: `http://localhost:3000/api/users/${id}`, // Used the correct variable 'id'
            method: "DELETE",
        };
        if(confirm("Are you sure?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted");
                location.reload(); // Corrected the function call
            });
        }
    });
}
