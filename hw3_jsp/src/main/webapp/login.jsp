<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileReader" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%
    String id = request.getParameter("login_id");
    String password = request.getParameter("login_password");

    String filePath = application.getRealPath("./user/" + id + ".txt");

    out.print(filePath);
    File file = new File(filePath);

    String filePW;

    if (file.isFile()) {
        BufferedReader reader = new BufferedReader(new FileReader(filePath));
        filePW = reader.readLine();

        if (password.equals(filePW)) {

            session.setAttribute("id", id);
            response.sendRedirect("main.jsp");

            out.println("<script>");
            out.println("alert('로그인 성공')");
            out.println("location.href='main.jsp'");
            out.println("</script>");
        } else {
            out.println("<script>");
            out.println("alert('비밀번호가 틀립니다.')");
            out.println("history.go(-1)");
            out.println("</script>");
        }

    } else {
        out.println("<script>");
        out.println("alert('ID 가 없습니다.')");
        out.println("location.href='index.jsp'");
        out.println("</script>");
    }
%>