<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
    request.setCharacterEncoding("UTF-8");
    String id = request.getParameter("id");
    String password = request.getParameter("password");
    String name = request.getParameter("name");
    session.setAttribute("id",id);
    session.setAttribute("password",password);
    session.setAttribute("name",name);
%>
<html>
    <head>
        <meta charset="utf-8">
        <title>회원가입</title>
    </head>

    <body>
        <h3>약관</h3>
        -------------------------------------------------------------------------<BR>
        1. 회원 정보는 웹 사이트의 운영을 위해서만 사용됩니다.<BR>
        2. 웹 사이트의 정상 운영을 방해하는 회원은 탈퇴 처리합니다.<BR>
        -------------------------------------------------------------------------<BR>
    <form action="Subscribe.jsp" method="post">
        <input type="radio" name="AGREE" value="YES">동의함
        <input type="radio" name="AGREE" value="NO">동의하지 않음 <br><br>
        <input type="submit" value="확인">
    </form>
    </body>

</html>