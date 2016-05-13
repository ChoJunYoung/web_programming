<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*"%>

<%
    request.setCharacterEncoding("UTF-8");
    String name = request.getParameter("name");
    String sex = request.getParameter("sex");
    String age = request.getParameter("age");
    String phone = request.getParameter("phone");
    String result;
    PrintWriter writer = null;



    try{
        String filePath = application.getRealPath("/user/"+name+".txt");

        reader = new BufferedReader(new FileReader(filePath));

        if(reader == null) {
            writer = new PrintWriter(filePath);
            writer.println(name);
            writer.println(sex);
            writer.println(age);
            writer.println(phone);
            result = "SUCCESS";
        }

        else{
            result = "FAIL1";
        }
    }

    catch(IOException ioe) {result="FAIL";}

    finally{
        try{writer.close();}
        catch(Exception e){}
    }

    if(result.equals("SUCCESS")){ %>
        <script>alert("성공")</script>
    <%}
    else{%>
      <script>alert("실패")</script>
    <%}

    response.sendRedirect("index.html");

%>