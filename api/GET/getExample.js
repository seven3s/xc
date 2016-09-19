/**
 * @file example
 * @author 刘彪(liubiao@itoxs.com)
 * @version V0.01
 * @date 2016-09-09 16:03:48
 */
var moment = require('moment');
moment.locale('zh-cn');
var example = {
    init: function(app) {
        var me = this;
        // 请求参数
        var url = '/api/example';
        app.get(url, function(req, res) {
            var db = app.get('db');
            var exampleModel = require('../../db/models/example');
            var query = req.query;
            // 没有参数则是全部查询
            if (me.isEmpty(query)) {
                res.send('没有参数');
                return;
            }
            // 根据ID查询
            var id = query.id;
            if (id) {
                me.getExampleById(exampleModel, req, res);
            }
        });
    },

    /**
     * getExampleById 根据ID查询
     *
     */
    getExampleById: function (exampleModel, req, res) {
        var id = req.query.id;
        if (id === undefined) {
            res.send({
                status: 0,
                message: 'ID错误',
                data: []
            });
        }else {
            var data = {};
            exampleModel.findById(id, function(err, example) {
                // 查询
                if (poem === null) {
                    res.send({
                        status: 0,
                        message: '没有找到该作品,请刷新后再试!',
                        data: []
                    });
                }
                if (err) {
                    res.send(err);
                }
            }).then(function (example) {
                // 查询完毕应该做的事情
                res.send({
                    status: 1,
                    message: '成功',
                    data: data
                });
            });
        }
    },

    /**
     * isEmpty 是否为空对象 {}
     *
     * @param  {Object}    val
     *
     * @return {Boolean}   返回布尔值
     */
    isEmpty: function (val) {
        return Object.prototype.isPrototypeOf(val) && Object.keys(val).length === 0;
    }
};
module.exports = example.init;