 //------------------------//
 //---2017-5-25 By Lily----//
 //--动态生成树状菜单栏----//
 //------------------------//
 //------------------------//
客户端代码：

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>菜单栏选择</title>
    <meta name="viewport" content="width=device-width,user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="apple-touch-fullscreen" content="yes"/>
    <meta name="format-detection" content="telephone=no"/>
    <!--监测字符串是否为手机号-->
    <meta http-equiv="x-rim-auto-match" content="none"/>
    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <meta name="HandheldFriendly" content="true"/>
    <link href="../Css/MenuBox.css"rel="stylesheet" type="text/css"/>
    <script src="../js/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="../js/MenuBox.js"  type="text/javascript"></script>
    <script type="text/javascript" language="javascript">
     function grade1(id){
        
        $(this).css("width","50%");
        $("#inHere2")[0].style.display = 'none';
	   document.getElementById("transfValueForarea").value=id;//有待学习，不知道为什么如果不写这一句，ajax会报错
           
	     $.ajax({    
            //要用post方式    
            type: "Post",    
            //方法所在页面和方法名    
            url: "MenuBox.aspx/ClickArea",
            //传入的参数名和值
            data: "{'id': '" + id + "' }",        
            contentType: "application/json; charset=utf-8",    
            dataType: "json",    
            success: function(data) {    
                //返回的数据用data获取内容 
                $("#inHere").html(data);
                $(".grade-w-1").css("left","33.3%");
                $(".grade-w-1 li").css("cursor","pointer")
            },    
             error: function(err) {    
                alert(err);    
            }    
        });    
    } 
     function grade2(b,c,id){
        $("#inHere2")[0].style.display = 'block';
        document.getElementById("transfValueForroad").value=id;
           
           $.ajax({    
            //要用post方式    
            type: "Post",    
            //方法所在页面和方法名    
            url: "MenuBoxForJZ.aspx/ClickRoad",
            data: "{'id':'" + id + "'}",        
            contentType: "application/json; charset=utf-8",    
            dataType: "json",    
            success: function(data) {    
                //返回的数据用data获取内容 
                $("#inHere2").html(data);
                $(".grade-w-11").css("left","50%");
                $(".grade-w-11 li a").css("text-decoration","none")
            },    
            error: function(err) {    
                alert(err);    
            }    
        });    
    }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <!--top1-->      
        <div class="screening" id="screening1"> 
    	    <ul>
    		    <li style="cursor:pointer;" class="Regional" id="Regional1"><%=userName%></li>
    	    </ul>	
        </div>
        <!--End top1-->
        <!--sort1-->
        <div class="grade-eject" id="grade-eject-1"> 
            <input type="hidden" value="" id="transfValueForarea" runat="server" name="transfValueForarea"/>
            <input type="hidden" value="" id="transfValueForroad" runat="server" name="transfValueForroad"/>
    	    <ul class="grade-w" id="gradew">
        	    <%for (int i = 0; i <AreaNameArr.Length; i++) { %>
                    <li style="cursor:pointer;" onclick="grade1(<%=AreaIdArr[i]%>);"><%=AreaNameArr[i]%> </li> 
                <%} %>
    	    </ul>
    	   <div id="inHere" runat="server"></div> 
    	   <div id="inHere2" runat="server" style="display:none;"></div> 
        </div>
        <!--End sort1-->
    </form>
</body>
</html>

服务端代码：

using System.Web.Services;
using System.Web.Script.Services;

    [WebMethod] 
    public static string ClickRoad(string id) 
    {
        //动态生成html语句
        string inHtml = "<div class='grade-w-11'> <ul>";
        for(int c=0;c<NodeNameArr.Length;c++){
            inHtml += "<li>插入内容1</li>";
        }
        inHtml += "</ul></div>";
        return inHtml;//返回，然后按需求插入到页面
    }

    [WebMethod]
    public static string ClickArea(string id) 
    {
        string inHtml = "<div class='grade-w-1'>";
        inHtml += " <ul>";
        for (int t = 0; t < RoadIdArr.Length; t++)
        {
            inHtml += "<li onclick='grade2(1,1," + RoadIdArr[t] + ")'>" + RoadNameArr[t];
        }
        inHtml += " </ul></div>";
        return inHtml;
    }