getAllCustomers();

$("#btnGetAll").click(function () {
    getAllCustomers();
});

function getAllCustomers() {
    $("#tblCustomer").empty();

    $.ajax({
        url: 'http://localhost:8080/Json_with_Ajax_Web_exploded/pages/customer',
        dataType: "json",
        method: "GET",
        success: function (customers) {
            for (let i in customers) {
                let cus = customers[i];
                let id = cus.id;
                let name = cus.name;
                let address = cus.address;
                let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td></tr>`;
                $("#tblCustomer").append(row);
            }
        },
        error: function (error) {
            console.log(error + " error");
            alert(error.responseJSON.message);
        }
    });
}

$("#btnCustomer").click(function () {
    let formData = $("#customerForm").serialize();
    $.ajax({
        url: "http://localhost:8080/Json_with_Ajax_Web_exploded/pages/customer",
        method: "POST",
        data: formData,
        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error: function (error) {
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });

});

$("#btnCusDelete").click(function () {
    //   let formData=$("#customerForm").serialize();
    let id = $('#txtCustomerID').val();

    $.ajax({
        url: 'http://localhost:8080/Json_with_Ajax_Web_exploded/pages/customer?id=' + id,
        method: 'DELETE',

        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error: function (error) {
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});

$("#btnUpdate").click(function () {
    //  let formData=$("#customerForm").serialize();

    let id = $('#txtCustomerID').val();
    let name = $('#txtCustomerName').val();
    let address = $('#txtCustomerAddress').val();

    let customer = {
        "cusID": id,
        "cusName": name,
        "cusAddress": address
    }

    $.ajax({
        url: 'http://localhost:8080/Json_with_Ajax_Web_exploded/pages/customer',
        method: 'put',
        contentType: "application/json",
        data: JSON.stringify(customer),

        success: function (res) {
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error: function (error) {
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});