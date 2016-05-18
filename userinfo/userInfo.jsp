<%@page contentType="text/html; charset=UTF-8" %>
<%@page import="java.io.*" %>

<%


    request.setCharacterEncoding("UTF-8");
    String name = request.getParameter("viewname");
    String sex;
    String age;
    String phone;

    String filePath = application.getRealPath("/user/" + name + ".txt");
    BufferedReader reader = new BufferedReader(new FileReader(filePath));

    name = reader.readLine();
    sex = reader.readLine();
    age = reader.readLine();
    phone = reader.readLine();

    if(sex.equals("m")){
        sex = "남성";
    }
    else{
        sex = "여성";
    }


    out.println("당신의 이름은 " + name + "이며, 성별은 " + sex + "이고");
    out.println("나이는 " + age + "이며, 전화번호는 " + phone + " 입니다.");

%>
