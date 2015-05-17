function showInfo(nickname){
    logger.info('nickname ', nickname);
    pool.getConnection(function (err, conn) {
        if (err) {
            logger.error('getConnection error', err);
            done(false);
        } else {
            async.series([
                function (callback) {
                    var sql = "select user.USER_NICKNAME, user.USER_PROFILE_URL from user where user.USER_NICKNAME=?";
                    conn.query(sql, nickname, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 1/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 1/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) item_cnt from item where item.USER_NICKNAME=?";
                    conn.query(sql, nickname, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 2/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 2/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) coordi_cnt from coordi where coordi.USER_NICKNAME=?";
                    conn.query(sql, nickname, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 3/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 3/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) follow_cnt from follow where follow.USER_NICKNAME=?";
                    conn.query(sql, nickname, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 4/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 4/5 success');
                            callback(null, row);
                        }
                    });
                }, function (callback) {
                    var sql = "select count(*) follower_cnt from follow where follow.USER_NICKNAME2=?";
                    conn.query(sql, nickname, function (err, row) {
                        if (err) {
                            logger.error('db_mycloset info 5/5 error', err);
                            callback(err);
                        } else {
                            logger.info('db_mycloset info 5/5 success');
                            callback(null, row);
                        }
                    });
                }
            ], function (err, results) {
                if (err) {
                    logger.error('db_mycloset info error', err);
                    conn.release();
                    done(false);
                } else {
                    logger.info('db_mycloset info results', results);
                    conn.release();
                    done(true, results);
                }
            });
        }
    });    
}

function showItems(nickname){
    
}

function showCoordis(nickname){
    
}

function showZzimItems(nickname){
    
}

function showZzimCoordis(nickname){
    
}