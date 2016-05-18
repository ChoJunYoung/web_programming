<%@page contentType="text/html; charset=UTF-8" %>
<%@page import="java.io.*" %>

<%
    request.setCharacterEncoding("UTF-8");
    String name = request.getParameter("name");
    String sex = request.getParameter("sex");
    String age = request.getParameter("age");
    String phone = request.getParameter("phone");
    String result;
    PrintWriter writer = null;


    try {
        String filePath = application.getRealPath("/user/" + name + ".txt");

        File file = new File(filePath);

        if (file.isFile()) {
            result = "ISFILE";
        } else {
            writer = new PrintWriter(filePath);
            writer.println(name);
            writer.println(sex);
            writer.println(age);
            writer.println(phone);
            result = "SUCCESS";
        }
    } catch (IOException ioe) {
        result = "FAIL";
    } finally {
        try {
            writer.close();
        } catch (Exception e) {
        }
    }

    if (result.equals("SUCCESS")) {
        out.println("<script>");
        out.println("alert('전송 성공')");
        out.println("location.href='index.html'");
        out.println("</script>");
    } else if (result.equals("ISFILE")) {
        out.println("<script>");
        out.println("alert('존재하는 이름')");
        out.println("location.href='index.html'");
        out.println("</script>");
    } else {
        out.println("<script>");
        out.println("alert('실패')");
        out.println("location.href='index.html'");
        out.println("</script>");
    }

%>