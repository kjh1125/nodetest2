const express = require('express');
const visitorRouter = express.Router();
const visitor = require("../controller/Controller"); 
const fs = require('fs');

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

// //이미지
// visitorRouter.get('/img', (req, res) => {
//   fs.readFile('apple.png', function (err, data)
//   {
//       //http의 헤더정보를 클라이언트쪽으로 출력
//       //image/jpg : jpg 이미지 파일을 전송한다
//       //write 로 보낼 내용을 입력
//       res.writeHead(200, { "Context-Type": "image/png" });//보낼 헤더를 만듬
//       res.write(data);   //본문을 만들고
//       res.end();  //클라이언트에게 응답을 전송한다

//   })
// })

module.exports = visitorRouter;
