<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%
    String id = "";

    id = (String) session.getAttribute("id");

    if (id != null) {
        response.sendRedirect("main.jsp");
    }
%>
<html>
<head>
    <title>title</title>
    <link rel="stylesheet" href="./css/main.css"/>
</head>
<body>
<form method="post" id="login_form">
    <table>
        <tr>
            <td>ID :</td>
            <td><input type="text" name="login_id" value=""></td>
        </tr>
        <tr>
            <td>PW :</td>
            <td><input type="password" name="login_password" value=""></td>
        </tr>
        <tr>
            <td colspan="2">
                <input type="button" value="로그인" onclick="goNextPage(this.value)">
                <input type="button" value="회원가입" onclick="goNextPage(this.value)">
            </td>
        </tr>
    </table>
</form>
<script type="text/javascript" src="./js/indexScript.js"></script>
</body>
</html>
