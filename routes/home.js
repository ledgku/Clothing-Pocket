var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var item_path = 'http://52.68.143.198:3000/item/img/';
    var coordi_path = 'http://52.68.143.198:3000/coordi/img/';
    var profile_path = 'http://52.68.143.198:3000/user/img/';

    res.json([
        {
            "mycloset_coordi_today": [{"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'}
            ]
        },
        {
            "mycloset_coordi_wear_recent": [{"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'}
            ]
        },
        {
            "mycloset_both_reg_recent": [{"img_url": item_path + 'shirts'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": item_path + 'shirts'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": item_path + 'shirts'},
                {"img_url": coordi_path + 'coordi'}
            ]
        },
        {
            "list_coordi_hot": [{"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'},
                {"img_url": coordi_path + 'coordi'}
            ]
        },
        {
            "list_user_hot": [{"img_url": profile_path + 'profile'},
                {"img_url": profile_path + 'profile'},
                {"img_url": profile_path + 'profile'},
                {"img_url": profile_path + 'profile'},
                {"img_url": profile_path + 'profile'},
                {"img_url": profile_path + 'profile'},
                {"img_url": profile_path + 'profile'}
            ]
        }
    ]);
});

module.exports = router;