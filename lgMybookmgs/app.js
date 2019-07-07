//引入express框架
var express = require("express");
var app = express();
//模板引擎
var template = require("art-template");
var ecpTemplate = require("express-art-template");
//获取fs
var fs = require("fs");
var path = require("path");
// 引入express-session
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
//引入获取图片路径的包
var formidable=require('formidable')
//表单提交的框架
var bodydata = require("body-parser");
app.use(bodydata.urlencoded({ extended: false }))
//处理json数据
app.use(bodydata.json());
//渲染模板引擎
app.set("views", path.join(__dirname, "views"));
app.set("views engine", "art");
app.engine("art", ecpTemplate);
//连接数据库
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/book", { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log(err)
  }
})
var Schemas = mongoose.Schema;
//给数据库集合约束条件
var bookSchemas = new Schemas({
  "id": { type: Number, default: 1 },
  "name": String,
  "bookname": String,
  "fenclass": String,
  "desc": String,
  "jjbook": String,
  "show":{ type: Number, default: 1 },
  "imgurl":String
})
var userSchemas = new Schemas({
  "username": String,
  "password": String
})
//创建数据库中的集合，有则直接调用。集合名以s结尾
var books = mongoose.model("books", bookSchemas)
var users = mongoose.model("users", userSchemas)
//显示数据
app.get("/index", function (req, res) {    
    books.find({"show":1}, function (err, data) {
      console.log(data);
      res.render("index.art", { 
        list: data,
        login:req.session.login,
        username:req.session.username
       })
    })
    
})
//进入添加页
app.get("/toaddbook", function (req, res) {
  res.render("addbook.art", {});
})
//添加数据
app.post("/addbook", function (req, res) {
  // var info = req.body;
  var from =new formidable.IncomingForm();
  from.uploadDir="./upload";
  from.keepExtensions=true;  
  from.parse(req,function(err,fields,files){
   fields.imgurl=files.imgurl.path;

   

    books.find({}, function (err, data) {
      var arr = [];
      data.forEach(function (v) {
        arr.push(v.id)
        var id = Math.max.apply(null, arr) + 1;
        fields.id = id;
        console.log(fields);

      })
      books.create(fields);
  }) 
   
    res.redirect("/index")
  })
})
//加载静态资源
app.use("/upload",express.static('upload'))
//删除数据
app.get("/delbook", function (req, res) {
  var id = req.query.id;
  // console.log(id); 
  books.deleteOne({ "id": id }, function (err) {
    if (!err) {
      console.log("ok");
    }
    res.redirect("/huishou")
  });
  

})
//回收站功能
app.get("/hui", function (req, res) {
  var id = req.query.id;
  // console.log(id); 
  books.update({ "id": id },{$set:{"show":0}}, function (err) {
    if (!err) {
      console.log("ok");
    }
    res.redirect("/index")
    
  });
})
//还原数据
app.get("/huan", function (req, res) {
  var id = req.query.id;
  // console.log(id); 
  books.update({ "id": id },{$set:{"show":1}}, function (err) {
    if (!err) {
      console.log("ok");
    }
    res.redirect("/huishou");
    
  });
})
//回收页面数据展示
app.get("/huishou", function (req, res) {   
  books.find({"show":0}, function (err, data) {
    console.log(data);
    res.render("huishou.art", { 
      list: data,
      login:req.session.login,
      username:req.session.username
     })
  })
  
})

//进入修改页面
app.get("/toeidtbook", function (req, res) {
  var id = req.query.id;
  books.find({ "id": id }, function (err, docs) {
    //  console.log(data);
    res.render("eidtbook.art", { list: docs })
  })
})
// //修改数据
// app.post("/eidtbook", function (req, res) {
//   var info = req.body;
//   books.update({ "id": info.id }, { $set: info }, function (err, data) {
//     console.log(data)
//   })
//   res.redirect("/index")
// })

//修改数据
app.post("/eidtbook", function (req, res) {
  var from =new formidable.IncomingForm();
  from.uploadDir="./upload";
  from.keepExtensions=true;  
  from.parse(req,function(err,fields,files){
   fields.imgurl=files.imgurl.path;
   books.update({ "id": fields.id }, { $set: fields }, function (err, data) {
    console.log(data)
  })
  })
  res.redirect("/index")
})
//进入简介页面
app.get("/tojj", function (req, res) {
  var id = req.query.id;
  books.find({ "id": id }, function (err, data) {
    console.log(data);
    res.render("jj.art", { list: data })
  })
})
//进入注册页面
app.get('/tozhuce', function (req, res) {
  res.render("zhuce.art", {})
})

//注册页面
app.post("/zhuce", function (req, res) {
  var user = req.body.username;
  var pass = req.body.password1;
  users.find({}, function (err, data) {
    var arr = [];
    data.forEach(function (v) {
      arr.push(v.username);
      if (arr.indexOf(user) == 0) {
        res.send("用户名已占用");
      }
    })
    if (pass != req.body.password2) {
      res.send("两次密码输入不正确，请重新输入密码");
    }
  })
  // 插入数据
  users.create({ "username": user, "password": pass }, function (err, data) {
    console.log(data);
    res.redirect("/login")
  })
})

//进入登陆页
app.get('/login', function (req, res) {
  res.render("login.art", {})
})


app.post("/login", function (req,res) {
  var user = req.body.username;
  console.log(user);
  var pass = req.body.password;
  console.log(pass);
  users.find({"username":user},function(err,data){
    if(data.length==0){
      res.send("用户不存在");
      return;
    }else{
      if(data[0].password==pass){
        //进入登入页面传值session
        req.session.login=true;
        req.session.username=user;
       res.redirect("/index") 
      }else{
        res.send("密码输入有误");
      }

    }
})
})
//退出页面
app.get("/cut",function(req,res){
  delete req.session.login;
  res.redirect("/index");
})

//监听端口号
app.listen(2019, function () {
  console.log("127.0.0.1:2019");
});