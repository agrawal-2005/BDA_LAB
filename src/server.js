const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const mysql=require("mysql2/promise");
const { name } = require('ejs');


app.use(express.static(__dirname+'/assests'));
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}));


function connection(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "bda_lab"
    });
}






var CURRENT_USER;

app.get("/",function(req,res){
    res.sendFile(__dirname+"/views/homepage.html");
})
app.get("/homepage.html",function(req,res){
    res.sendFile(__dirname+"/views/homepage.html");
})

app.post("/login",async function(req,res){
    var role=req.body.roles;
    var username=req.body.username;
    var password=req.body.password;
    

    try{
        var con=await connection();
        var sql1="SELECT * FROM login WHERE username=(?)";
        var login_info=await con.query(sql1,[username],function(err,result){
            if(err) throw err ;
            return result;
            con.end();
        })
        console.log(login_info[0][0]);
    
        var role_in_db=( login_info[0][0].type );
        var password_in_db=( login_info[0][0].password);
        
        CURRENT_USER=username;
    
        if(role_in_db==role && password_in_db===password){
            console.log("Correct password");
            if (role==="admin"){
                console.log("Admin logged in with username"+username);
                res.redirect("/admin.ejs");
            }
            else if (role==="faculty"){
                console.log("Faculty logged in with username"+username);
                
                    
                res.redirect("/profileFaculty")
                
                
            }
            else if (role==="mtech"){
                console.log("MTECH logged in with username"+username);
                
                    
                res.redirect("/profileMTECH")
                
                
            }
            else if (role==="btech"){
                
                console.log("BTECH logged in with username"+username);
                res.redirect("/profileBTECH");
            }
            else if (role==="phd"){
                console.log("PHD logged in with username "+username);
                res.redirect("/profilePHD")
                
            }
        }
        else {
            console.log("incorrect credentials");
            res.send("Incorrect Credetials")
        }
    }
    catch(err){
        res.send("Incorrect Credetials")


    }
    


})

app.get("/feedback.html",function(req,res){
    res.sendFile(__dirname+"/views/feedback.html")
})

app.post("/feedback",async function(req,res){
    var { name, email, feedback} = req.body;
    var con=await connection();
    var sql="INSERT INTO feedback(name,email,feedback) VALUES(?,?,?)";
    
    await con.query(sql,[name,email,feedback],function(err,result){
        if(err) throw err;        
        return result;    
    })
    res.sendFile(__dirname+"/views/homepage.html");
})

app.get("/conferences.ejs",async function(req,res){
    var con=await connection();
    var sql="SELECT id,date,platform,title FROM conferences ORDER BY date DESC";
    
    var conferences= await con.query(sql,[],function(err,result){
        if(err) throw err;        
        return result;    
    })
    
    
    res.render("conferences",{conferences:conferences[0]})
})

app.get("/projects.ejs",async function(req,res){
    var con=await connection();
    var sql="SELECT project_id,title,description,project_lead,citations,domain,YEAR(year) as year FROM projects";
    
    var projects= await con.query(sql,[],function(err,result){
        if(err) throw err;        
        return result;    
    })
    
    res.render("projects",{projects:projects[0]})
})

app.get("/profileFaculty",async function(req,res){
    var con=await connection();
    var sql="SELECT * FROM people WHERE email=(?)";
    
    var user= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })

    

    var sql="SELECT paper_id FROM coauthors WHERE coauthor=(?)";

    var all_paper= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })
    
   
    var arr=[];
    for(let i in all_paper[0]){

        arr.push(all_paper[0][i].paper_id)
    }
   

    if(arr.length>0){
        var sql1="Select * from coauthors where paper_id in  (?)";

        var coauthors= await con.query(sql1,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
     
        

        var sql="SELECT project_id,title,description,project_lead,citations,YEAR(year) as year FROM projects WHERE project_id in (?)";

        var papers= await con.query(sql,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
    }
    else{
        var coauthors=[{}];
        var papers=[{}]
    }
   
    var sendDATA=user[0][0];
   
    
    res.render('profileFaculty',{userDATA:sendDATA,papers:papers[0],coauthors:coauthors[0]})
})

app.get("/profilePHD",async function(req,res){
    var con=await connection();
    var sql="SELECT * FROM people WHERE email=(?)";
    
    var user= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })

    

    var sql="SELECT paper_id FROM coauthors WHERE coauthor=(?)";

    var all_paper= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })
    
   
    var arr=[];
    for(let i in all_paper[0]){

        arr.push(all_paper[0][i].paper_id)
    }
    
    if(arr.length>0){
        var sql1="Select * from coauthors where paper_id in  (?)";

        var coauthors= await con.query(sql1,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
        
        

        var sql="SELECT project_id,title,description,project_lead,citations,YEAR(year) as year FROM projects WHERE project_id in (?)";

        var papers= await con.query(sql,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
    }
    else{
        var coauthors=[{}];
        var papers=[{}]
    }


    var sendDATA=user[0][0];
   
    console.log(sendDATA)
    console.log(papers[0])
    res.render('profilePHD',{userDATA:sendDATA,papers:papers[0],coauthors:coauthors[0]});
})

app.get("/profileBTECH",async function(req,res){
    var con=await connection();
    var sql="SELECT * FROM people WHERE email=(?)";
    
    var user= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })

    

    var sql="SELECT paper_id FROM coauthors WHERE coauthor=(?)";

    var all_paper= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })
    
   
    var arr=[];
    for(let i in all_paper[0]){

        arr.push(all_paper[0][i].paper_id)
    }
   

    if(arr.length>0){
        var sql1="Select * from coauthors where paper_id in  (?)";

        var coauthors= await con.query(sql1,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
      
        

        var sql="SELECT project_id,title,description,project_lead,citations,YEAR(year) as year FROM projects WHERE project_id in (?)";

        var papers= await con.query(sql,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
    }
    else{
        var coauthors=[{}];
        var papers=[{}]
    }
   
    var sendDATA=user[0][0];
   
    
    res.render('profileBTECH',{userDATA:sendDATA,papers:papers[0],coauthors:coauthors[0]});
})
app.get("/profileMTECH",async function(req,res){
    var con=await connection();
    var sql="SELECT * FROM people WHERE email=(?)";
    
    var user= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })

    

    var sql="SELECT paper_id FROM coauthors WHERE coauthor=(?)";

    var all_paper= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })
    
   
    var arr=[];
    for(let i in all_paper[0]){

        arr.push(all_paper[0][i].paper_id)
    }
   

    if(arr.length>0){
        var sql1="Select * from coauthors where paper_id in  (?)";

        var coauthors= await con.query(sql1,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
     
        

        var sql="SELECT project_id,title,description,project_lead,citations,YEAR(year) as year FROM projects WHERE project_id in (?)";

        var papers= await con.query(sql,[arr],function(err,result){
            if(err) throw err;        
            return result;    
        })
    }
    else{
        var coauthors=[{}];
        var papers=[{}]
    }
   
    var sendDATA=user[0][0];
   
    
    res.render('profileMTECH',{userDATA:sendDATA,papers:papers[0],coauthors:coauthors[0]});
})


app.get("/admin.ejs",async function(req,res){
    var con=await connection();
    var sql="SELECT * FROM people WHERE email=(?)";
    
    var user= await con.query(sql,[CURRENT_USER],function(err,result){
        if(err) throw err;        
        return result;    
    })
    var sql1="SELECT * FROM feedback order by id DESC";
    var all_feedback= await con.query(sql1,[],function(err,result){
        if(err) throw err;        
        return result;    
    })
    var sql1="SELECT count(*)as conference FROM  conferences";
    var conference= await con.query(sql1,[],function(err,result){
        if(err) throw err;        
        return result;    
    })
    var sql1="SELECT count(*) as people FROM people";
    var people= await con.query(sql1,[],function(err,result){
        if(err) throw err;        
        return result;    
    })
    var sql1="SELECT count(*) as projects FROM projects";
    var projects= await con.query(sql1,[],function(err,result){
        if(err) throw err;        
        return result;    
    })
    
    var counts={people:people[0][0].people,projects:projects[0][0].projects,conference:conference[0][0].conference}

    
  
    
    var sendDATA={userDATA:user[0][0],all_feedback:all_feedback[0],counts:counts};
    
    res.render('admin',sendDATA);
})


app.get("/registration.html",function(req,res){
    res.sendFile(__dirname+"/views/registration.html");
})
app.get("/people.ejs",async function(req,res){
    var con=await connection();
    var sql="SELECT * FROM people";
    
    var users= await con.query(sql,[],function(err,result){
        if(err) throw err;        
        return result;    
    })
   

    res.render('people',{users:users[0]});
})

app.get("/signup.html",function(req,res){
    res.sendFile(__dirname+"/views/signup.html")
})

app.post("/signup",async function(req,res){
   
    var { name, email, department, domain,password,type} = req.body;
    var con=await connection();
    var sql1="INSERT INTO people(name,email,department,type,domain) values(?,?,?,?,?)";
    await con.query(sql1,[name,email,department,type,domain],function(err,result){
        if(err) throw err ;
        return result;
        con.end();
    })
    var sql2="INSERT INTO login(username,password,type) values(?,?,?)";
    await con.query(sql2,[email,password,type],function(err,result){
        if(err) throw err ;
        return result;
        con.end();
    })
    console.log("Done");
    res.sendFile(__dirname+"/views/homepage.html")

})


app.post("/conference",async function(req,res){
    
    var conference=req.body.conference;
    var date=req.body.date;
    var platform_name=req.body.platform_name;

    try{

        var con=await connection();
        var sql1="INSERT INTO conferences(title,date,platform) values(?,?,?)";
        await con.query(sql1,[conference,date,platform_name],function(err,result){
            if(err) throw err ;
            return result;
            con.end();
        })
        console.log("Done");

        res.sendFile(__dirname+"/views/registration.html");


    }
    catch(err){

        res.send("Invalid Email")

    }

    
})
app.post("/project",async function(req,res){
   
    var topic=req.body.topic;
    var project_lead=req.body.project_lead;
    var faculty=req.body.project_faculty
    var description=req.body.description;
    var domain=req.body.domain;
    var year=req.body.year;

    var con=await connection();


    try{
        var sql1="INSERT INTO projects(title,description,project_lead,domain,year,instructor_email) values(?,?,?,?,?,?)";
        await con.query(sql1,[topic,description,project_lead,domain,year,faculty],function(err,result){
            if(err) throw err ;
            return result;
            con.end();
        })
        
        var sql1="SELECT LAST_INSERT_ID() as mp;";
        var project_id=await con.query(sql1,[],function(err,result){
            if(err) throw err ;
            return result;
            con.end();
        })
       console.log(project_id[0][0].mp)
        var paper_id=project_id[0][0].mp
        var sql1="SELECT name from people where email=(?)";
        var name_of_author=await con.query(sql1,[project_lead],function(err,result){
            if(err) throw err ;
            return result;
            con.end();
        })
      
        var name=name_of_author[0][0].name
        var sql1="INSERT INTO coauthors(paper_id,coauthor,name) values(?,?,?)";
        await con.query(sql1,[paper_id,project_lead,name],function(err,result){
            if(err) throw err ;
            return result;
            con.end();
        })
        console.log("Done");
    
        res.sendFile(__dirname+"/views/registration.html");

    }
    catch(err){
        res.send("Instructor or project lead mentioned is not in user group.")

    }
   
})


app.post("/coauthor",async function(req,res){

    var paper_id=req.body.project_id;
    var name=req.body.coauthor_name;
    var coauthor_email=req.body.coauthor_email;


    try{
        var con=await connection();
        var sql1="INSERT INTO coauthors(coauthor,name,paper_id) values(?,?,?)";
        await con.query(sql1,[coauthor_email,name,paper_id],function(err,result){
            if(err) throw err ;
            return result;
            con.end();
        })
        console.log("Done");
        res.sendFile(__dirname+"/views/registration.html");
    }
    catch(err){
        res.send("Coauthor mentioned is not in the user group.")
    }
  
})






app.listen(3000,function(){
    console.log("Server started on port 3000");
});


