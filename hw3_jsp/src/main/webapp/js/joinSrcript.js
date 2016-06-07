/**
 * Created by junyoung on 2016. 6. 7..
 */
var goNextPage = function (value) {
    var frm = document.getElementById("join_form");

    console.log(frm.join_id.value);

    if (frm.join_id.value === "") {
        alert("아이디를 입력하세요");
    }
    else if (frm.join_password.value === "") {
        alert("비밀번호를 입력하세요");
    }
    else {
        frm.action = "joinresult.jsp";
        frm.submit();
    }

};
