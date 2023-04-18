function LoadPropertiesList(type)
{
    $("#LoadMoreloader").show();
    $("#loadMore").hide();
    var RentTypeId = $("#txtGeneralRentType").val();
    var page = $("#txtGeneralPage").val();
    $.ajax({
        url: "/RoomRentHome/GetProperties",
        type: "POST",
        dataType: "html",
        data:{RentTypeId:RentTypeId,page:page},
        success: function (data) {
            //var message = data.Message; 
           // alert(data);
            if (data==1)
            {
                $("#LoadMoreloader").hide();
                $('#loadMore').hide();
            }
            else {
                $('#loadMore').show();
                if (type == 'replace') {
                    $('#portfolio-grid1').html(data);
                } else {
                    $('#portfolio-grid1').append(data);
                }
                $("#txtGeneralPage").val(parseInt($("#txtGeneralPage").val()) + 1);
                $("#LoadMoreloader").hide();
                $("#loadMore").show();
            }
          
        }
    })
}

function ClickRentType(RentTypeId)
{
    $("#txtGeneralPage").val('0');
    $("#txtGeneralRentType").val(RentTypeId);
    LoadPropertiesList('replace');
}

//function ClickRentTypeOnSearch(RentTypeId) {
//    $("#txtGeneralPage").val('0');
//    $("#SearchRoomTypeId").val(RentTypeId);
//    LoadSearchPropertiesList('replace');
//}

$(document).ready(function () {
    
});

//function LoadSearchPropertiesList(type)
//{
//    debugger;
//    $("#SearchLoadMoreloader").show();
//    $("#loadMore").hide();
    
//    var RentTypeId = $("#SearchRoomTypeId").val();
//    var page = $("#txtGeneralPage").val();
//    var address = $("#SearchAddress").val();
//    var fromCharge = $("#SearchFromCharge").val();
//    var toCharge = $("#SearchToCharge").val();
//    var pFor = $("#searchForProperty").val();

//    var room = $("#searchForBedRoom").val();

//    $.ajax({
//        url: "/RoomRentHome/GetSearchProperties",
//        type: "POST",
//        dataType: "html",
//        data: { RentTypeId: RentTypeId, page: page, address: address, fromCharge: fromCharge,toCharge:toCharge, pFor: pFor,room:room },
//        success: function (data) {
//            //var message = data.Message; 
//            if (data == 1) {
//                $("#SearchLoadMoreloader").hide();
//                $('#loadMore').hide();
//            }
//            else {
//                $('#loadMore').show();
//                if (type == 'replace') {
//                    $('#portfolio-grid').html(data);
//                } else {
//                    $('#portfolio-grid').append(data);
//                }
//                $("#txtGeneralPage").val(parseInt($("#txtGeneralPage").val()) + 1);
//                $("#SearchLoadMoreloader").hide();
//                $("#loadMore").show();
//            }
//        }
//    })
//}





//function LoadFeaturedPropertiesList(type) {
//    $("#ViewMoreloader").show();
//    $("#viewMore").hide();
//    var RentTypeId = $("#txtFeaturedRentType").val();
//    var page = $("#txtFeaturedPage").val();

//    $.ajax({
//        url: "/RoomRentHome/GetFeaturedProperties",
//        type: "POST",
//        dataType: "html",
//        data: { RentTypeId: RentTypeId, page: page },
//        success: function (data) {

//            if (data == 1) {
//                $("#ViewMoreloader").hide();
//                $('#viewMore').hide();
//            }
//            else {
//                $('#viewMore').show();
//                if (type == 'replace') {
//                    $('#portfolio-grid').html(data);
//                } else {
//                    $('#portfolio-grid').append(data);
//                }
//                $("#txtFeaturedPage").val(parseInt($("#txtFeaturedPage").val()) + 1);
//                $("#ViewMoreloader").hide();
//                $("#viewMore").show();
//            }
//        }
//    })
//}

//function ClickRentTypeFor(RentTypeId) {
//    $("#txtFeaturedPage").val('0');
//    $("#txtFeaturedRentType").val(RentTypeId);
//    LoadFeaturedPropertiesList('replace');
//}







