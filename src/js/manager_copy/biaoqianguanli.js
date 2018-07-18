/**
 * Created by zhangxin on 2018/5/17.
 */
$(function () {
    /**
     * bootstrap-table
     * @type a
     */
    var $table = $("#table"),
        $table2 = $("#table2"),
        $table3 = $("#table3"),
        $table4 = $("#table4");
    function initTable() {
        $table.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: {},
            pagination: true,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            columns: [
                {
                    field: 'id',
                    title: '车型ID',
                    width: '100px',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '车型',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '100px',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" data-toggle="modal" data-target="#myModal"><i class="iconfont icon-xiugai"></i></a> ',
                            '<a href="javascript:void(0);" title="Remove" class="remove"><i class="iconfont icon-shanchu"></i></a>'
                        ].join('');
                        return a;
                    }
                }
            ]
        });
        $table2.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: {},
            pagination: true,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            columns: [
                {
                    field: 'id',
                    title: '序号',
                    width: '100px',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'id',
                    title: '代理商ID',
                    width: '100px',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '代理商',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '100px',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" data-toggle="modal" data-target="#myModal2"><i class="iconfont icon-xiugai"></i></a> ',
                            '<a href="javascript:void(0);" title="Remove" class="remove2"><i class="iconfont icon-shanchu"></i></a>'
                        ].join('');
                        return a;
                    }
                }
            ]
        });
        $table3.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: {},
            pagination: true,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            columns: [
                {
                    field: 'id',
                    title: '序号',
                    width: '100px',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '广告主题',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '100px',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" data-toggle="modal" data-target="#myModal3"><i class="iconfont icon-xiugai"></i></a> ',
                            '<a href="javascript:void(0);" title="Remove" class="remove3"><i class="iconfont icon-shanchu"></i></a>'
                        ].join('');
                        return a;
                    }
                }
            ]
        });
        $table4.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: {},
            pagination: true,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            columns: [
                {
                    field: 'id',
                    title: '序号',
                    width: '100px',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '本品车型',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '容量市场',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '100px',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" data-toggle="modal" data-target="#myModal4"><i class="iconfont icon-xiugai"></i></a> ',
                            '<a href="javascript:void(0);" title="Remove" class="remove4"><i class="iconfont icon-shanchu"></i></a>'
                        ].join('');
                        return a;
                    }
                }
            ]
        });
        setTimeout(function () {
            $table.bootstrapTable('resetView');
        },200)
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    window.operateEvents = {
        'click .remove': function (e, value, row, index) {
            $("#warningMsgModal").modal("show").find(".btn-blue").one("click",function () {
                /**
                 * 这段代码是删除行的
                 */
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
                $(this).parents("#warningMsgModal").modal("hide");
                Notification.init({
                    title:"提示",
                    type:"success",
                    duration:4500,
                    message:"删除成功",
                    onClose:function(){
                        console.log("关闭后的回调函数");
                    },
                    onClick:function(){
                        console.log("点击的回调函数");
                    }
                });
            }).parents("#warningMsgModal").on('hidden.bs.modal',function () {
                /**
                 * 当模态窗口关闭后
                 */
                $(this).find(".btn-blue").off('click');
            });
        },
        'click .remove2': function (e, value, row, index) {
            $("#warningMsgModal").modal("show").find(".btn-blue").one("click",function () {
                /**
                 * 这段代码是删除行的
                 */
                $table2.bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
                $(this).parents("#warningMsgModal").modal("hide");
                Notification.init({
                    title:"提示",
                    type:"success",
                    duration:4500,
                    message:"删除成功",
                    onClose:function(){
                        console.log("关闭后的回调函数");
                    },
                    onClick:function(){
                        console.log("点击的回调函数");
                    }
                });
            }).parents("#warningMsgModal").on('hidden.bs.modal',function () {
                /**
                 * 当模态窗口关闭后
                 */
                $(this).find(".btn-blue").off('click');
            });
        },
        'click .remove3': function (e, value, row, index) {
            $("#warningMsgModal").modal("show").find(".btn-blue").one("click",function () {
                /**
                 * 这段代码是删除行的
                 */
                $table3.bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
                $(this).parents("#warningMsgModal").modal("hide");
                Notification.init({
                    title:"提示",
                    type:"success",
                    duration:4500,
                    message:"删除成功",
                    onClose:function(){
                        console.log("关闭后的回调函数");
                    },
                    onClick:function(){
                        console.log("点击的回调函数");
                    }
                });
            }).parents("#warningMsgModal").on('hidden.bs.modal',function () {
                /**
                 * 当模态窗口关闭后
                 */
                $(this).find(".btn-blue").off('click');
            });
        },
        'click .remove4': function (e, value, row, index) {
            $("#warningMsgModal").modal("show").find(".btn-blue").one("click",function () {
                /**
                 * 这段代码是删除行的
                 */
                $table4.bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
                $(this).parents("#warningMsgModal").modal("hide");
                Notification.init({
                    title:"提示",
                    type:"success",
                    duration:4500,
                    message:"删除成功",
                    onClose:function(){
                        console.log("关闭后的回调函数");
                    },
                    onClick:function(){
                        console.log("点击的回调函数");
                    }
                });
            }).parents("#warningMsgModal").on('hidden.bs.modal',function () {
                /**
                 * 当模态窗口关闭后
                 */
                $(this).find(".btn-blue").off('click');
            });
        },
        'click .onOff': function (e, value, row, index) {
            var _thisOnOff = $(this).find('.iconfont');
            _thisOnOff.hasClass('icon-kaiguan4') ? _thisOnOff.removeClass('icon-kaiguan4').prev().addClass('text-blue').siblings().removeClass("text-blue") : _thisOnOff.addClass('icon-kaiguan4').next().addClass('text-blue').siblings().removeClass("text-blue")
        }
    };
    initTable();
});