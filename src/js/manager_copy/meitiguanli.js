/**
 * Created by zhangxin on 2018/5/19.
 */
$(function () {
    /**
     * bootstrap-table
     * @type a
     */
    var $table = $("#table");
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
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '媒体平台',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '主渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '分渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '子渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '媒体ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" class="edit"><i class="iconfont icon-xiugai"></i></a> ',
                            '<a href="javascript:void(0);" title="Remove" class="remove"><i class="iconfont icon-shanchu"></i></a>'
                        ].join('');
                        return a;
                    }
                }
            ]
        });
        // sometimes footer render error.
        setTimeout(function () {
            $table.bootstrapTable('resetView');
        }, 200);
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
                    message:"媒体库删除成功",
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
        'click .edit': function (e, value, row, index) {
            $("#myModal").modal("show").find("#myModalLabel").text("编辑媒体库");
        }
    };
    initTable();
})