getAllItems();

$("#btnGetAllItems").click(function () {
    getAllItems();
});

function getAllItems() {
    $("#tblItem").empty();
    $.ajax({
        url: 'http://localhost:8080/Json_with_Ajax_Web_exploded/pages/item',
        dataType: "json",
        method: "GET",
        success: function (items) {
            for (let i in items) {
                let item = items[i];
                let code = item.code;
                let description = item.itemName;
                let qtyOnHand = item.qty;
                let unitPrice = item.unitPrice;
                let row = `<tr><td>${code}</td><td>${description}</td><td>${qtyOnHand}</td><td>${unitPrice}</td></tr>`;
                $("#tblItem").append(row);
            }
        },
        error: function (error) {
            console.log(error);
            alert(error.responseJSON.message);
        }
    });
}

$("#btnItem").click(function () {
    let formData = $("#itemForm").serialize();
    $.ajax({
        url: "http://localhost:8080/Json_with_Ajax_Web_exploded/pages/item",
        method: "POST",
        data: formData,
        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllItems();
        },
        error: function (error) {
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});

$("#btnItemDelete").click(function () {
    let code = $('#txtItemCode').val();

    $.ajax({
        url: 'http://localhost:8080/Json_with_Ajax_Web_exploded/pages/item?code=' + code,
        method: 'DELETE',

        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllItems();
        },
        error: function (error) {
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});

$("#btnItemUpdate").click(function () {

    let code = $('#itemCode').val();
    let itemName = $('#itemName').val();
    let itemQty = $('#itemQty').val();
    let itemPrice = $('#itemPrice').val();

    let item = {
        "itemCode": code,
        "itemName": itemName,
        "itemQty": itemQty,
        "itemPrice": itemPrice
    }

    $.ajax({
        url: 'http://localhost:8080/Json_with_Ajax_Web_exploded/pages/item',
        method: 'put',
        contentType: "application/json",
        data: JSON.stringify(item),

        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllItems();
        },
        error: function (error) {
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});