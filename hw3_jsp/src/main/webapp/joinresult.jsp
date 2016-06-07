<%@ page import="java.io.File" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<%
    PrintWriter writer = null;
    String id = request.getParameter("login_id");
    String password = request.getParameter("login_password");
    String result;
    boolean isHaveFile;
    try {
        isHaveFile = isFile(application, id);

        if (!isHaveFile) {
            String filePath = application.getRealPath("./user/" + id + ".txt");
            writer = new PrintWriter(filePath);
            writer.println(password);
            result = "s";
        } else {
            result = "h";
        }
    } catch (IOException ioe) {
        result = "f";
    } finally {
        try {
            writer.close();
        } catch (Exception e) {
        }
    }

    if (result.equals("s")) {
        out.println("<script>");
        out.println("alert('전송 성공')");
        out.println("location.href='main.jsp'");
        out.println("</script>");
    } else if (result.equals("h")) {
        out.println("<script>");
        out.println("alert('존재하는 이름')");
        out.println("history.go(-1)");
        out.println("</script>");
    }
%><%!
    private boolean isFile(javax.servlet.ServletContext application, String id) {
        boolean isFile;
        String userfilePath = application.getRealPath("./user/");
        File dirFile = new File(userfilePath);
        File[] fileList = dirFile.listFiles();

        for (File temp : fileList) {
            if (temp.getName().equals(id + ".txt")) {
                return true;
            }
        }

        return false;
    }
%>