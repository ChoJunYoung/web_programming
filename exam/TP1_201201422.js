var PARKSTATEOUT = 0; //출고 상태
var PARKSTATEIN = 1; // 입고 상태
var ArrayCars = []; //차량 목록
function Car(production, model, price, weight){
	this.production= production;
	this.model= model;
	this.price= price;
	this.weight= weight;
	this.parkstate= PARKSTATEIN;
	this.getProduction= function(){return this.production;}
	this.getModel= function(){return this.model;}
	this.getPrice= function(){return this.price;}
	this.getWeight= function(){return this.weight;}
	this.getParkstate= function(){
		if(this.parkstate == PARKSTATEIN)
			return "입고";
		else
			return "출고";
	}
	this.setParkstate_in = function(){this.parkstate = PARKSTATEIN;}
	this.setParkstate_out = function(){this.parkstate = PARKSTATEOUT;}
	this.toString = function(){return "제조사: "+this.getProduction()+" 차종: "+this.getModel()+" 가격: "+this.getPrice()+" 크기: "+this.getWeight()+" 주차상태: "+this.getParkstate()}
} // 제조사, 차종, 가격, 크기, 주차상태
var Parkstation = {
	MAXNUMBEROFPARK : 3, //최대 주차 할 수 있는 차의 대수
	MAXNUMBEROFENROLL : 5, //최대 등록 할 수 있는 차의 대수
	ParkStateIn_Count: 0,
	EnrollCars_Count: 0
}
function init() {
	changeCount();
	document.getElementById("MAXNUMBEROFPARK").innerHTML = "최대 주차 수 : "+Parkstation.MAXNUMBEROFPARK + "대";
	document.getElementById("MAXNUMBEROFENROLL").innerHTML = "최대 등록 수 : "+Parkstation.MAXNUMBEROFENROLL + "대";
}
function changeCount() {
	document.getElementById("EnrollOfNumber").innerHTML = "등록 차량 수 : "+Parkstation.EnrollCars_Count + "대";
	document.getElementById("ParkInOfNumber").innerHTML = "입고 차량 수 : "+Parkstation.ParkStateIn_Count+ "대";
}
function Enroll_Car() {
	if(Parkstation.EnrollCars_Count == Parkstation.MAXNUMBEROFENROLL){
		alert("더 이상 차량을 등록 할 수 없습니다.")
		return;
	}
	var productionCompany = document.getElementById("Production_Company_Value").value;
	var model = document.getElementById("Model").value;
	var price = document.getElementById("Price").value;
	var weight = document.getElementById("Weight").value;

	var table = document.getElementById("ListOfTable");
	if(validationForm(productionCompany,model,price,weight)){
		var CarNode = new Car(productionCompany,model,price,weight);
		ArrayCars.push(CarNode);

		var tr = document.createElement("tr");
		tr.setAttribute("class","w3-hover-black");

		var td0 = document.createElement("td");
		td0.setAttribute("class", "row");
        var input = document.createElement("INPUT");
        input.setAttribute("type", "radio");
        input.setAttribute("value", ""+Parkstation.EnrollCars_Count);
        input.setAttribute("name", "radioButton");
        input.setAttribute("id", "radio"+Parkstation.EnrollCars_Count);
        input.addEventListener("click", inputClicked);
        td0.appendChild(input);

        var td1 = document.createElement("td");
        td1.setAttribute("class", "row");
        td1.innerText = CarNode.getProduction();

        var td2 = document.createElement("td");
        td2.setAttribute("class", "row");
        td2.innerText = CarNode.getModel();

        var td3 = document.createElement("td");
        td3.setAttribute("class", "row");
        td3.innerText = convert(CarNode.getPrice());

        var td4 = document.createElement("td");
        td4.setAttribute("class", "row");
        td4.innerText = CarNode.getWeight();

        var td5 = document.createElement("td");
        td5.setAttribute("class", "row");
        CarNode.setParkstate_out();
        td5.innerText = CarNode.getParkstate();

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        table.appendChild(tr);

        (Parkstation.EnrollCars_Count)++;
        changeCount();
    }
}
function inputClicked() {
	var productionCompany = document.getElementById("Production_Company_Value");
	var model = document.getElementById("Model");
	var price = document.getElementById("Price");
	var weight = document.getElementById("Weight");

	productionCompany.value = ArrayCars[this.value].getProduction();
	model.value = ArrayCars[this.value].getModel();
	price.value = ArrayCars[this.value].getPrice();
	weight.value = ArrayCars[this.value].getWeight();
}
function Delete_Car() {
	var RadioList = document.getElementsByName("radioButton");
	var mytable = document.getElementById("ListOfTable");
	for(var i =0 ; i < RadioList.length; i++){
		if(RadioList[i].checked){
			mytable.deleteRow(i+1);
			(Parkstation.EnrollCars_Count)--;
			if(ArrayCars[i].parkstate == PARKSTATEIN){
				(Parkstation.ParkStateIn_Count)--;
			}
			ArrayCars.splice(i,1);
			changeCount();
			for(var i =0 ; i < RadioList.length; i++){
				RadioList[i].value = i;
				RadioList[i].id = "radio"+i;
			}
			return;
		}
	}
	alert("삭제할 차량을 선택해주세요.");
}
function ParkIn() {
	var RadioList = document.getElementsByName("radioButton");

	for(var i =0 ; i < RadioList.length; i++){
		if(RadioList[i].checked){
			if(ArrayCars[i].parkstate == PARKSTATEIN){
				alert("현재 입고 상태입니다.");
				return;
			}
			if(Parkstation.ParkStateIn_Count == Parkstation.MAXNUMBEROFPARK){
				alert("더 이상 주차 할 수 없습니다.");
				return;
			}
			ArrayCars[i].setParkstate_in();
			(Parkstation.ParkStateIn_Count)++;
			changeCount();
			var trNode = document.getElementById("ListOfTable").children[i+1]
			trNode.children[5].innerHTML = "입고";
			return;
		}
	}
	alert("차량을 선택하세요.");
}
function ParkOut() {
	var RadioList = document.getElementsByName("radioButton");

	for(var i =0 ; i < RadioList.length; i++){
		if(RadioList[i].checked){
			if(ArrayCars[i].parkstate == PARKSTATEOUT){
				alert("현재 출고 상태입니다.");
				return;
			}
			ArrayCars[i].setParkstate_out();
			(Parkstation.ParkStateIn_Count)--;
			changeCount();
			var trNode = document.getElementById("ListOfTable").children[i+1]
			trNode.children[5].innerHTML = "출고";
			return;
		}
	}
	alert("차량을 선택하세요.");
}
function validationForm(productionCompany,model,price,weight) {
	var pattern = /\s/g;
	if(productionCompany.match(pattern)||productionCompany==""){
		alert("제조사 값에 공백이 들어갔습니다. 다시 입력해주세요.")
		return false;
	}
	if(model.match(pattern)||model==""){
		alert("차종 값에 공백이 들어갔습니다. 다시 입력해주세요.")
		return false;
	}
	if(price.match(pattern)||isNaN(price)||price==""){
		alert("가격 값에 공백이 들어갔거나 숫자가 아닙니다. 다시 입력해주세요.")
		return false;	
	}
	return true;
}
function convert(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}