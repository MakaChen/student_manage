var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var assert = require('assert');
var url = require('url');
var host = "localhost";
var port = "27017";
var Urls = 'mongodb://localhost:27017/classweb';



//add
var add = function (db, collections, selector, fn) {
    var collection = db.collection(collections);
    collection.insertMany([selector], function (err, result) {
        try {
            assert.equal(err, null)
        } catch (e) {
            console.log(e);
            result = [];
        };

        fn(result);
        db.close();
    });
}
var adds = function (db, collections, selector, fn) {
    var collection = db.collection(collections);
    collection.insertMany([selector], function (err, result) {
        try {
            assert.equal(err, null)
        } catch (e) {
            console.log(e);
            result = [];
        };

        fn(result);
        db.close();
    });
}
var addss = function (db, collections, selector, fn) {
    var collection = db.collection(collections);
    collection.insertMany([selector], function (err, result) {
        try {
            assert.equal(err, null)
        } catch (e) {
            console.log(e);
            result = [];
        };

        fn(result);
        db.close();
    });
}
//delete
var deletes = function (db, collections, selector, fn) {
    var collection = db.collection(collections);
    collection.deleteOne(selector, function (err, result) {
        try {
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        } catch (e) {
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
        db.close;
    });
};
var deletess = function (db, collections, selector, fn) {
    var collection = db.collection(collections);
    collection.deleteOne(selector, function (err, result) {
        try {
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        } catch (e) {
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
        db.close;
    });
};
var deletesss = function (db, collections, selector, fn) {
    var collection = db.collection(collections);
    collection.deleteOne(selector, function (err, result) {
        try {
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        } catch (e) {
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
        db.close;
    });
};
//find
var find = function (db, collections, selector, fn) {
    //collections="hashtable";
    var collection = db.collection(collections);

    collection.find(selector).toArray(function (err, result) {
        //console.log(docs);
        try {
            assert.equal(err, null);
        } catch (e) {
            console.log(e);
            result = [];
        }

        fn(result);
        db.close();
    });

}

//page
var page = function (db, collections, selector, fn) {

    var collection = db.collection(collections);
    var count = 0;
    collection.count({}, function (err1, count1) {
        try {
            assert.equal(err1, null);
        } catch (e) {
            console.log(e);
        }
        count = count1;
    });
    collection.find(selector[0], selector[1]).toArray(function (err, result) {
        try {
            assert.equal(err, null);
        } catch (e) {
            console.log(e);
            result = [];
        }

        fn(result, count); //回掉函数可接收两个参数，查询的数据 和 总数据条数
        db.close();
    });


}

//update
var updates = function (db, collections, selector, fn) {
    var collection = db.collection(collections);

    collection.updateOne(selector[0], selector[1], function (err, result) {
        try {
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        } catch (e) {
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
        db.close();
    });

}
var updatess = function (db, collections, selector, fn) {
    var collection = db.collection(collections);

    collection.updateOne(selector[0], selector[1], function (err, result) {
        try {
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        } catch (e) {
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
        db.close();
    });

}
var updatesss = function (db, collections, selector, fn) {
    var collection = db.collection(collections);

    collection.updateOne(selector[0], selector[1], function (err, result) {
        try {
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        } catch (e) {
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
        db.close();
    });

}
var methodType = {
    login: find,
    show: find,
    add: add,
    adds: adds,
    addss: addss,
    updates: updatess,
    updatesss: updatesss,
    deletess: deletess,
    deletesss: deletesss,
    update: updates,
    delete: deletes,
    updatePwd: updates,
    showCourse: find,
    register: add,
    page: page //分页
};


module.exports = function (req, res, collections, selector, fn) {
    MongoClient.connect(Urls, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        methodType[req.route.path.substr(1)](db, collections, selector, fn);

        db.close();
    });

};
