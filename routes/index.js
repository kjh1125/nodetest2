const express = require('express');
const visitorRouter = express.Router();
const visitor = require("../controller/Controller"); 

/* GET home page. */
visitorRouter.get('/index', visitor.get_visitors); // visitor/index일 때 작동, 여기에서 값 보내는 거 아님. 
// controller의 get_visitors를 실행.

visitorRouter.get('/write', function(req, res) {
  res.render('write');
});
//등록
visitorRouter.post('/index', visitor.insert);

//삭제
visitorRouter.get('/del', visitor.delete);

//수정 view
visitorRouter.get('/update', visitor.update_view);

//수정
visitorRouter.post('/update', visitor.update);



module.exports = visitorRouter;
