var appendCheck = false; // 식을 불러 왔을 경우, 사칙연산을 실행하였을 경우 뒤이어 숫자가 붙어지는것을 방지하기 위한 flag
var exData; // '=' 버튼을 눌렀을 때 필요한 직전 데이터
var exOper; // '=' 버튼을 눌렀을 때 필요한 직전 연산자
var exResult; // 직전 결과값
var maxNum = 16; //크기 지정
/**
 * 버큰 클릭 이벤트
 * @param obj
 * 				입력된 값을 나타냄
 */
function input(obj) {
	var value;
	
	if (obj.innerHTML != undefined) value = obj.innerHTML;
	else value = obj;
	
	if (!isNaN(value)) { // 숫자인가?
		if (!appendCheck) { // 글자가 이어져야 하는 상태
			var curValue = document.getElementById("curInput").innerHTML;
			if( checkNumLength(curValue) ){
				curValue == '0' ? document.getElementById("curInput").innerHTML = value
						: document.getElementById("curInput").innerHTML += value;
			}
		} else { // 식이 불러졌을때, =이 눌린 후
			document.getElementById("curInput").innerHTML = value;
			appendCheck = false;
		}
	} else { // 연산자
		var curValue = document.getElementById("curInput").innerHTML;
		var beforeValue = document.getElementById("beforeInput").innerHTML;
		if (value == "←") {
			if (curValue != '0') {
				curValue = curValue.substring(0, curValue.length - 1) == "" ? 0
						: curValue.substring(0, curValue.length - 1);
				document.getElementById("curInput").innerHTML = curValue;
			}
		} else if (value == "=") {
			if (beforeValue == "" && exData == undefined && exOper == undefined) {
				return false;
			} else {
				if (curValue == 0) {
					alert("0으로 나눌 수 없습니다.");
					return false;// 현 입력상태가 0이면 실행되지 않는다.
				}
				curValue = flaotCheck(curValue);
				var history = document.getElementById("history");
				var li = document.createElement("li");
				li.setAttribute("onclick", "load(this)");
				var resultString;
				if( beforeValue == "" ){
					beforeValue = (curValue + " " + exOper);
					resultString = curValue + " " + exOper + " " + exData + " = ";
					curValue = exData;
				} else if( !isNaN(beforeValue.charAt(beforeValue.length-1) ) && (curValue == exResult)){ // 1. 식을 불러오자마자 =를 누를 경우 beforeInput이 사라지며 한번 더 눌렀을 때 계산,
																										 // 2. 식을 불러오고 다른 숫자를 입력 했을 경우는 바로 계산
					document.getElementById("beforeInput").innerHTML = "";
					return;
				} else { // 1 정상적인 경우 2 load해왔을 경우
					if( isNaN(beforeValue.charAt(beforeValue.length-1) ) ) exData = curValue; // 1번 경우
					else {
						var datas = beforeValue.split(" ");
						beforeValue = beforeValueMerge(datas);
						beforeValue = beforeValue.substring(0, beforeValue.length-1);
						exData = curValue;
					}
					resultString = beforeValue + " " + curValue + " = ";
				}
				
				
				result = cal(beforeValue, curValue);
				li.innerHTML = resultString + result;
				history.appendChild(li);
				document.getElementById("curInput").innerHTML = result;
				document.getElementById("beforeInput").innerHTML = "";
			}
			appendCheck = true;
		} else if (value == "±") {
			document.getElementById("curInput").innerHTML = parseInt(curValue) * -1;
		} else if (value == "C") {
			document.getElementById("curInput").innerHTML = "0";
			document.getElementById("beforeInput").innerHTML = "";
			exData = undefined;
			exOper = undefined;
			appendCheck = false;
		} else if (value == ".") {
			if( appendCheck ){
				document.getElementById("curInput").innerHTML = "0.";
				appendCheck = false;
			}
			if (curValue.indexOf(".") == -1)
				document.getElementById("curInput").innerHTML = curValue + ".";
		} else { // 4칙연산
			if (!appendCheck) {
				if (curValue == 0) {
					return false; // 현 입력상태가 0이면 실행되지 않는다.
				}
				curValue = flaotCheck(curValue);
				if (beforeValue == "") {
					document.getElementById("beforeInput").innerHTML = curValue	+ " " + value;
				} else {
					if (value == "/" && curValue == 0)
						return false;// 나누기에다가 0이면 안나뉜다.
					document.getElementById("beforeInput").innerHTML += " "	+ curValue + " " + value;
					document.getElementById("curInput").innerHTML = cal(beforeValue, curValue);
				}
				appendCheck = true;
			} else { // 2가지 경우, 1 "="이 눌린 다음   2. 사칙연산이 정상적으로 눌린 후( 사칙연산 뒤이어 붙이는거 방지 )
				if( beforeValue == "" ) document.getElementById("beforeInput").innerHTML = curValue + " " + value; //1번경우
				else { // 사칙연산이 정상적으로 눌린 후
					var exDataCur = beforeValue[beforeValue.length-1]; //현재의 직전 식 상태의 마지막
					if (isNaN(value) && exDataCur != " " && exDataCur != undefined ) {
						//value가 바꼈을 경우와 그렇지 않은 경우
						if( exDataCur == value ) return; // 마지막과 현재가 같은 경우
						else document.getElementById("beforeInput").innerHTML = beforeValue.substring(0, beforeValue.length-1) + value;
					}
					else document.getElementById("beforeInput").innerHTML += value;
				}
			}
		}
	}
}


/**
 * 계산하는 함수.
 * @param beforeValue
 *            전 숫자와 기호를 담고있음
 * @param curValue
 *            현재의 숫자
 * @param value
 *            입력한 기호
 */
function cal(beforeValue, curValue) {
	var datas = beforeValue.split(" ");//계산식을 볼 수 있다.
	var tempData;
	var result = 0;
	var oper;
	for (var i = 0; i <= datas.length; i++) { //
		if( i % 2 == 0 || i == datas.length ){//짝수면
			tempData = i != datas.length ? datas[i] : curValue;
			if( i != 0 ){
				if (oper == "-") result = parseFloat(result) - parseFloat(tempData); 
				else if (oper == "*") result = parseFloat(result) * parseFloat(tempData);
				else if (oper == "+") result = parseFloat(result) + parseFloat(tempData);
				else if (oper == "/") {
					if (curValue == 0) result = "div0";
					else result = parseFloat(result) / parseFloat(tempData);
				}
			} else {
				result = tempData;
			}
		} else {
			oper = datas[i];
		} 
	}
	exOper = oper;
	return result;
}

/**
 * History 클릭 시 입력창으로 불러오는 함수
 * @param obj
 *            클릭된 값들 li들의 표현
 */
function load(obj) {
	var datas = obj.innerHTML.split("=");
	document.getElementById("curInput").innerHTML = datas[1].trim();
	document.getElementById("beforeInput").innerHTML = datas[0];
	exData = datas[0].split(" ")[datas[0].split(" ").length-2];
	exOper = datas[0].split(" ")[datas[0].split(" ").length-3];
	exResult = datas[1].split(" ")[1];
	appendCheck = true;
}

/**
 * 소수점 뒤에 숫자 여부로 정수인지 실수인지 판단
 * @param num 입력 값
 * @returns 소수점 뒤에 수가 있는지 없는지를 판단하여 없으면 정수를 있으면 실수를 리턴
 */
function flaotCheck(num) {
	return num.split(".")[1] == "" ? num.split(".")[0] : num;
}

/**
 * 10글자 이상인지 확인
 * @param num 입력 값
 * @returns {Boolean} 16글자 이하면 트루 아니면 false
 */
function checkNumLength( num ){
	if( num.length < maxNum ) return true;
	else if( num == undefined ) return true;
	else return false;
}

/**
 * 
 * @param 데이터들
 * @returns beforeValue
 */
function beforeValueMerge( datas ){
	var returnData = "";
	for( var i = 0; i < datas.length - 2; i++ ){
		returnData += datas[i] + " ";
	}
	return returnData;
}

