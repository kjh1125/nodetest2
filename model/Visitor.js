const mysql = require('mysql');  // mysql 모듈 로드


// local에서 할 때.
 const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'sesac',
    multipleStatements : true
    });

// docker로 올릴 때

// const con = mysql.createConnection({
//     host: '192.168.0.104',
//     port: 3306,
//     user: 'user',
//     password: '1234',
//     database: 'sesac',
//     dialect: 'mysql'
// });

//방명록 전체 정보 조회
exports.get_visitors = (cb) => {
    // mysql과 질의. query 메서드는 첫번째 인자로 SQL 구문을 받음.
    // 콜백의 rows는 SQL 구문에 해당하는 행을 받음.

    con.query(`select * from nodetest order by idx desc limit 0,5 ; select count(*) as ct from nodetest`, (err, rows)=> {
        if ( err ) throw err;
       // console.log( rows); 

        cb(rows);
    });
}


//방명록 검색 조회
exports.get_search = (page, search, sel, cb) => {
    // mysql과 질의. query 메서드는 첫번째 인자로 SQL 구문을 받음.
    // 콜백의 rows는 SQL 구문에 해당하는 행을 받음.
    var a ="";
    if(sel == 1){
        a = "subject";
    }
    else if(sel ==2){
        a = "writer";
    }
    else{
        a = "content";
    }

    var sql = "";
    var anum = 5*page-5;
    
    if(page==1){
        sql = `select * from nodetest where ${a} like '%${search}%' order by idx desc limit 0, 5`;
    }
    else{
        sql = `select * from nodetest where ${a} like '%${search}%' order by idx desc limit ${anum}, 5`;
    }
    console.log(sql);
    con.query(`${sql}; select count(*) as ct from nodetest where ${a} like '%${search}%'`, (err, rows)=> {
        if ( err ) throw err;
       // console.log( rows );

        cb(rows);
    });
}

//update_view 단일정보 조회
exports.update_view = (id, cb) => {
    // mysql과 질의. query 메서드는 첫번째 인자로 SQL 구문을 받음.
    // 콜백의 rows는 SQL 구문에 해당하는 행을 받음.
    con.query('select * from nodetest where idx='+id, (err, rows)=> {
        if ( err ) throw err;
        console.log( rows ); 

        cb(rows);
    });
}

//방명록 수정
exports.update = (data, cb) => {
    var sql = "update nodetest set subject="+data.subject+", writer="+data.writer+", password="+data.password+", content="+data.content+" where idx="+data.idx;
    con.query(sql, (err, rows) => {
        if ( err ) throw err;
        console.log( rows );
        cb(); // 콜백을 해줘야 이전으로 다시 넘어가서 redirect를 작동함.

    });
}



//방명록 등록
exports.insert = (subject, writer, password, content, cb ) => {
    var sql = "INSERT INTO nodetest (idx, subject, writer, password, content) VALUES ('0','" + subject + "', '" + writer + "', '" + password + "', '" + content + "');";
    con.query(sql, (err, rows) => {
        if ( err ) throw err;
        console.log( rows ); 
        cb(); // 콜백을 해줘야 이전으로 다시 넘어가서 redirect를 작동함.

    });
}


//방명록 정보 삭제
exports.delete = (id, cb) => {
    con.query("DELETE FROM nodetest WHERE idx="+id+"", (err, rows) => {
        if ( err ) throw err;
        console.log( rows );

        cb(rows);
    })
}