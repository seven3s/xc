/**
 * @File:      示例post接口
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-09-07 18:22:02
 */
var mongoose = require('mongoose');
var _ = require('underscore');
var example = {
    init: function(app) {
        // post 请求url
        var url ='/api/example';
        app.post(url, function(req, res) {
            var db = app.get('db');
            var ExampleModel = require('../../db/models/example');
            var id = req.body._id;
            var exampleObj = req.body;
            // 添加作者
            exampleObj.author = req.session.user;
            if (!exampleObj.time) {
                var moment = require('moment');
                exampleObj.time = moment(Date.now()).format('YYYY-MM-DD');
            }
            var _example;
            if (id !== undefined) {
                ExampleModel.findById(id, function(err, example) {
                    if (err) {
                        res.send({
                            status: -1,
                            message: err,
                            data: []
                        });
                    }
                    if (id === undefined) {
                        res.send({
                            status: 0,
                            message: 'ID错误',
                            data: []
                        });
                    }
                    _example = _.extend(example, exampleObj);
                    _example.save(function(err, example) {
                        if (err) {
                            res.send(err);
                        }else {
                            res.send({
                                status: 1,
                                message: '更新成功!',
                                data: {
                                    id: example._id
                                }
                            });
                        }
                    });
                });
            } else {
                var _exampleObj = exampleObj;
                delete _exampleObj._id;
                // 添加诗歌
                _example = new exampleModel(_exampleObj);
                _example.save(function(err, example) {
                    if (err) {
                        res.send(err);
                    }else {
                        res.send({
                            status: 1,
                            message: '新增成功！',
                            data: {
                                    id: example._id
                                }
                        });
                    }
                });
            }
        });
    }
};
module.exports = example.init;