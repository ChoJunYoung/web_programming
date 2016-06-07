/**
 * Created by junyoung on 2016. 5. 20..
 */
var goNextPage = function (value) {
    var login_form = document.getElementById("login_form");
    if (value === "로그인") {
        var id = document.getElementsByName("login_id");
        var pw = document.getElementsByName("login_password");
        if (id.value <= 0) {
            alert("아이디를 입력하세요");
        }
        else if (pw.value <= 0) {
            alert("비밀번호를 입력하세요");
        }
        else {
            login_form.action = "login.jsp";
        }

    }
    else {
        login_form.action = "join.jsp";
    }
    login_form.submit();
};

