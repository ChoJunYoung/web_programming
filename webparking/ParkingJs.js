var carList = [];
var parkingCar = 0;
var table_InfoInCarListPart = document.getElementById("table_InfoInCarListPart");
var maxParkingNumber = 1;


function Car(brand, kind, price, size) {
    this.brand = brand;
    this.kind = kind;
    this.price = price;
    this.size = size;
    this.inout = "출고";

}

function onlyNumberInput(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
        return true;
    else {
        onlyNumberInputRemove(event);
        return false;
    }
}

var input_CarOnList = function () {

    var newCar = makeCarObject();
    var nullTest = isNullTest(newCar);

    if (nullTest != null) {
        alert("\"" + nullTest + "\" 미입력");
        return;
    }

    carList.push(newCar);
    registerPart_reset();
    addTableRow(newCar);
    registerCarView();


    console.log(carList.length);

};

function delete_CarOnList() {
    var index = getSelectedRadioIndex();

    if (index != null) {
        table_InfoInCarListPart.deleteRow(index + 1);
        if (carList[index].inout == "입고") {
            parkingCar--;
        }
        carList.splice(index, 1);

        registerCarView();
        registerPart_reset();
    }
}

function parking_Setting(value) {
    var index = getSelectedRadioIndex();

    if (index == null) {
        alert("차량을 선택하세요");
        return;
    }

    else if (index != null && carList[index].inout == value) {
        if (value == "입고") {
            alert("현재 입고 상태 입니다.");
            return;
        }
        else {
            alert("현재 출고 상태 입니다.");
            return;
        }
    }

    else {
        if (value === "입고" && maxParkingNumber <= parkingCar) {
            alert("더 이상 주차할 수 없습니다.");
            return;

        }
        carList[index].inout = value;

        if (value === "입고") {
            parkingCar++;
        }
        else {
            parkingCar--;
        }
        inout_ViewSetting(index);
    }
}

/*
 내부 사용 function
 */


function inout_ViewSetting(index) {
    table_InfoInCarListPart.rows[index + 1].cells[5].innerHTML = carList[index].inout;
    registerCarView();
}


function registerCarView() {
    document.getElementById("totalCar").textContent = "등록차량수 : " + carList.length;
    document.getElementById("parkingCar").textContent = "입고차량수 : " + parkingCar;
}


function getSelectedRadioIndex() {
    var radio = document.getElementsByName("carListRadio");
    var deleteIndex;
    for (var x = 0; x < radio.length; x++) {
        if (radio[x].checked) {
            deleteIndex = x;
            break;
        }
    }

    return deleteIndex;
}


function selectCar() {
    var index = getSelectedRadioIndex();
    document.getElementById("register_Brand").value = carList[index].brand;
    document.getElementById("register_Kind").value = carList[index].kind;
    document.getElementById("register_Price").value = carList[index].price;
    document.getElementById("register_Size").value = carList[index].size;
    console.log(carList[index]);
}


function addTableRow(newCar) {
    var newRow = table_InfoInCarListPart.insertRow(table_InfoInCarListPart.rows.length - 2);
    var radio = newRow.insertCell(0);
    radio.innerHTML = '<input type="radio" name="carListRadio" onclick="selectCar()">'

    var count = 1;
    for (var x in newCar) {
        var newCell = newRow.insertCell(count++);
        console.log(newCar[x]);
        newCell.innerHTML = newCar[x];
    }
}


function onlyNumberInputRemove(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
        return;
    else {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }

}

function registerPart_reset() {
    document.getElementById("register_Brand").value = "";
    document.getElementById("register_Kind").value = "";
    document.getElementById("register_Price").value = "";
    document.getElementById("register_Size").value = "경차";

}

function getCarSize(id) {
    var size = document.getElementById(id);

    size = size.options[size.selectedIndex].text;

    return size;
}

function getValue(id) {
    var element = document.getElementById(id);
    return element.value;
}


function isNullTest(newCar) {
    var blank = null;

    for (var x in newCar) {
        console.log("key = " + x);
        if (newCar[x] === "") {
            switch (x) {
                case "brand":
                    blank = "제조사";
                    break;
                case "kind":
                    blank = "차종";
                    break;
                case "price":
                    blank = "가격";
                    break;
                case "size":
                    blank = "크기";
                    break;
            }
            console.log("key in if = " + x);
            return blank;
        }
    }

    return blank;
}

function makeCarObject() {
    var brand;
    var kind;
    var price;
    var size;
    var inout;

    brand = getValue("register_Brand");
    kind = getValue("register_Kind");
    price = getValue("register_Price");
    size = getCarSize("register_Size");


    return new Car(brand, kind, price, size);
}
