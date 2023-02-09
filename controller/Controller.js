const Visitor = require("../model/Visitor");

//방명록 전체 정보와 검색 조회
exports.get_visitors = (req, res) => {
    
   // paging을 위해 count 값 구하기
   Visitor.get_ct(function( re ) {
    console.log("ct: ", re);
    });

    if(req.query.search==undefined){
    Visitor.get_visitors(function( result ) {
       // console.log("result: ", result);
       // console.log("index");
        
        res.render("index", {data: result});
    });
    }
    else{
        Visitor.get_search(req.query.page, req.query.search, req.query.sel, function( result ) {
            console.log("result: ", result);
            res.render("index", {data: result});
        });
    }

}

//방명록 단일 정보 조회 (업데이트 뷰)
exports.update_view = (req, res) => {
    Visitor.update_view(req.query.id, function(result) {
        res.render("update", {data: result});
    })    
}


//방명록 등록
exports.insert = (req, res) => {
    console.log( req.body );
    
    Visitor.insert( req.body.subject, req.body.writer, req.body.password, req.body.content,  function( result ) {
        //res.send( {id: result} );
        res.redirect("/visitor/index"); // 문제없이 실행이 되면 visitor/index로 실행.
    });
}

//방명록 정보 삭제
exports.delete = (req, res) => {
    //console.log(req) 로 어떤 값으로 오는지 확인.
    Visitor.delete(req.query.id, function(result) {
        console.log( result );
        res.send( "success Delete!" ); //ajax 사용 시 뭐라도 값을 보내야 ajax에 설정한 alert등이 작동함.
    });
}

//방명록 정보 수정
exports.update = (req, res) => {
    Visitor.update(req.body, function(result) {
       // console.log( result );
       res.redirect("/visitor/index"); // 문제없이 실행이 되면 visitor/index로 실행. model에서 cb를 써야 함.
       
        //res.send( "success Update!" );
    });
}