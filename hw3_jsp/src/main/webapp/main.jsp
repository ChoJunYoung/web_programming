<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileReader" %>
<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>

<% request.setCharacterEncoding("euc-kr");%>
<%

    String id = "";
    BufferedReader reader;

    id = (String) session.getAttribute("id");

    if (id == null || id.equals("")) {
        response.sendRedirect("index.jsp");
    }


%>

<html>
<head>
    <title>���� ������</title>
    <link rel="stylesheet" href="./css/main.css">
</head>
<body>
<h1>�¶��� ���� �ý���</h1>
<table>
    <%

        String filePath = application.getRealPath("./shopContent/");
        File dirFile = new File(filePath);
        File[] fileList = dirFile.listFiles();    //���� ����Ʈ �̱�
        int i = 0;

        for (File tempFile : fileList) {
            if (tempFile.isFile() && tempFile.getName().endsWith(".txt")) {

                String tempFileName = tempFile.getName();
                reader = new BufferedReader(new FileReader(filePath + "/" + tempFileName));
                String name = reader.readLine();
                String price = reader.readLine();
                String stock = reader.readLine();
                String imgsrc = reader.readLine();
                if((i%2)==0){out.println("<tr>");};
                out.println("<td>");
                out.println("<img src =\"" + imgsrc + "\">");
                out.print("<div id=\"text\">");
                out.println("�̸� : " + name + "<br>");
                out.println("���� : " + price + "<br>");
                out.println("��� : " + stock + "<br>");
                out.println("</div>");
                out.println("</td>");
                if((i%2)!=0){out.println("</tr>");};
                i++;
            }
        }
    %>
</table>
<form method="post" id="logout_form" action="logout.jsp">
    <input type="submit" value="logout">
</form>

