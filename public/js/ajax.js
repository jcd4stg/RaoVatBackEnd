const { name } = require("ejs");

$(document).ready(() => {
    
    var url = "http://localhost:3000";

    $("#btn_AddNewCity").click(() => {
        var cityName = $("#cityName").val();

        $.post(url + "/city/add", { name: cityName }, (data) => {
            console.log(data);
            if (data.kq == 1) {
                $("#cityName").val("");
                $.post(url +"/city", (data2) => {
                    console.log(data2)
                    if(data2.kq == 1) {
                        $("#city_List").html("");
                        data2.list.forEach(city => {
                            $("#city_List").append(
                                `<li class="city" cityID="`+ city._id + `">` + city.name +`</li>`
                            );
                        });
                    }
                });
            }
        }); 
    });

});


