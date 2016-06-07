/**
 * Created by junyoung on 2016. 5. 20..
 */
var goNextPage = function (value) {
    var login_form = document.getElementById("login_form");
    if (value === "로그인") {
        if (login_form.login_id.value === "") {
            alert("아이디를 입력하세요");
        }
        else if (login_form.login_password.value === "") {
            alert("비밀번호를 입력하세요");
        }
        else {
            login_form.action = "login.jsp";
            login_form.submit();
        }

    }
    else {
        login_form.action = "join.jsp";
        login_form.submit();
    }
};

