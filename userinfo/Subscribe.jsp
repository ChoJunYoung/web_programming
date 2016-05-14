<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*"%>
<%  String agree = request.getParameter("AGREE");
    String result = null;
    if(agree.equals("YES")){
        String id = (String) session.getAttribute("id");
        String password = (String) session.getAttribute("password");
        String name = (String) session.getAttribute("name");
        PrintWriter writer = null;

        try{
            String filePath = application.getRealPath("/JSP-ex/sub1/"+id+".txt");
            writer = new PrintWriter(filePath);
            writer.println("아이디:"+id);
            writer.println("패스워드:"+password);
            writer.println("이름:"+name);
            result="SUCCESS";}

        catch(IOException ioe) {result="FAIL";}

        finally{
                try{writer.close();}
                catch(Exception e){}
        }

    }
    else{ result = "FAIL";}
    session.invalidate();
    response.sendRedirect("Result.jsp?RESULT="+result);
    %>