'use strict';

module.exports = function (Savingmemo) {
    Savingmemo.beforeRemote('create', function (context, user, next) {
        context.args.data.createdDate = Date.now();
        context.args.data.recorderId = context.req.accessToken.userId;
        next();
    });
    Savingmemo.beforeRemote('find', function (context, user, next) {
        if (context.args.filter === undefined) {
            context.args.filter = {
                where: {
                    recorderId: context.req.accessToken.userId
                }
            };
        }
        next();
    });
    Savingmemo.beforeRemote('replaceById', function (context, user, next) {
        context.args.data.updatedDate = Date.now();
        context.args.data.recorderId = context.req.accessToken.userId;
        next();
    });
    Savingmemo.beforeRemote('*.*', function (context, user, next) {
        console.log(context.method.name);
        next();
    });
    
};
