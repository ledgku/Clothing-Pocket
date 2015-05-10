var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.json([{
        "date": "2015-05-03 11:21:54",
        "title":"업데이트 안내",
        "content":"업데이트 안내 드립니다. 오늘 자정에 업데이트 진행될 예정입니다."
    },{
        "date": "2015-05-01 10:21:54",
        "title":"100번째 가입자 이벤트",
        "content":"100번째 가입자에게 3만원 상당의 기프티콘을 드려요."
    },{
        "date": "2015-04-03 11:21:54",
        "title":"친구 추천 이벤트",
        "content":"친구 추천 이벤트 진행중입니다."
    }]);
});

router.post('/service', function(req, res, next) {
    res.json({
        "title":"서비스 이용 약관",
        "content":"제 1조(약관의 적용)..."
    });
});

router.post('/private', function(req, res, next) {
    res.json({
        "title":"개인정보 보호정책",
        "content":"제 1조 consequat..."
    });
});

router.post('/faq', function(req, res, next) {
    res.json([{
        "num": "1",
        "title":"로그인",
        "content":"자체 회원가입, 페이스북 아이디로 가입 가능"
    },{
        "num": "2",
        "title":"로그아웃",
        "content":"프로필 화면에서 로그아웃 버튼 클릭"
    },{
        "num": "3",
        "title":"비밀번호 변경",
        "content":"프로필 화면에서 비밀번호 변경 클릭"
    }]);
});

module.exports = router;