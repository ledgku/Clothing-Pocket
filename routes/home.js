var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var item_path = 'http://52.68.143.198:3000/item/img/';
    var coordi_path = 'http://52.68.143.198:3000/coordi/img/';
    var profile_path = 'http://52.68.143.198:3000/user/img/';

    res.json(
        {
            "myclosetCoordiToday": [{
                "CD_NUM": 9,
                "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
            }, {
                "CD_NUM": 9,
                "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
            },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                }
            ]
            ,
            "myclosetCoordiWearRecent": [{
                "CD_NUM": 9,
                "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
            },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                }
            ]
            ,
            "myclosetBothRegRecent": [{
                "CD_NUM": 9,
                "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
            },
                {
                    "ITEM_NUM": 33,
                    "ITEM_URL": "http://52.68.143.198/item/img/shirts1431669925054.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "ITEM_NUM": 33,
                    "ITEM_URL": "http://52.68.143.198/item/img/shirts1431669925054.png"
                },
                {
                    "ITEM_NUM": 33,
                    "ITEM_URL": "http://52.68.143.198/item/img/shirts1431669925054.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                }
            ]
            ,

            "listCoordiHot": [{
                "CD_NUM": 9,
                "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
            },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                },
                {
                    "CD_NUM": 9,
                    "CD_URL": "http://52.68.143.198/coordi/img/coordi1431671363876.png"
                }
            ]
            ,

            "listUserHot": [{
                "USER_NICKNAME": "DK",
                "USER_PROFILE_URL": "http://52.68.143.198/user/img/default.png"
            },
                {
                    "USER_NICKNAME": "DK",
                    "USER_PROFILE_URL": "http://52.68.143.198/user/img/default.png"
                },
                {
                    "USER_NICKNAME": "DK",
                    "USER_PROFILE_URL": "http://52.68.143.198/user/img/default.png"
                },
                {
                    "USER_NICKNAME": "DK",
                    "USER_PROFILE_URL": "http://52.68.143.198/user/img/default.png"
                },
                {
                    "USER_NICKNAME": "DK",
                    "USER_PROFILE_URL": "http://52.68.143.198/user/img/default.png"
                },
                {
                    "USER_NICKNAME": "DK",
                    "USER_PROFILE_URL": "http://52.68.143.198/user/img/default.png"
                },
                {
                    "USER_NICKNAME": "DK",
                    "USER_PROFILE_URL": "http://52.68.143.198/user/img/default.png"
                }
            ]


        });
});

module.exports = router;