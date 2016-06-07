<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<html>
<head>
    <title>로그인 페이지</title>
</head>
<body>
<form method="post" id="join_form">
    ID : <input type="text" name="join_id" value=""><br>
    PW : <input type="password" name="join_password" value=""><br>
    <input type="submit" value="join" onclick="goNextPage(this.value)">
</form>
<script type="text/javascript" src="./js/joinSrcript.js"></script>
</body>
</html>
