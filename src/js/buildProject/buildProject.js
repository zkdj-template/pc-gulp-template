/**
 * Created by zhangxin on 2018/5/23.
 */
$(function () {
    $(".datepicker").daterangepicker({
        maxDate : moment(), //最大时间
        dateLimit : {
            days : 180
        },//起止时间的最大间隔
        autoApply:true,
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        separator : ' 到 ',
        autoUpdateInput: false,
        ranges : {
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            '最近7日': [moment().subtract('days', 6), moment()],
            '最近30日': [moment().subtract('days', 29), moment()]
        },
        locale: {
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        }
    }).on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
    }).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

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
                    title: '项目ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '投放车系',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '代理商',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '代理商ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '项目名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value) {
                        console.log(value);
                        return '<a href="projectDetails.html">'+ value +'</a>'
                    }
                },
                {
                    field: 'field8',
                    title: '广告主题',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '项目开通日期',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '项目状态',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '推荐至看板',
                    align: 'center',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" title="Remove" class="onOff"><span class="text-blue">是</span><i class="iconfont icon-kaiguan3" style="font-size: 30px;"></i><span>否</span></a>'
                        ].join('');
                        return a;
                    }
                },
                {
                    title: '设置默认值',
                    align: 'center',
                    valign: 'middle',
                    events: operateEvents,
                    formatter: function() {
                        var a = [
                            '<a href="javascript:void(0);" title="Remove" class="onOff"><span class="text-blue">是</span><i class="iconfont icon-kaiguan3" style="font-size: 30px;"></i><span>否</span></a>'
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
                    message:"用户账号删除成功",
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
    /**
     * T弹出层内的表格
     * @type {*}
     */
    var $table1 = $("#table1");
    function initTable1() {
        $table1.bootstrapTable({
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
                    field: 'field7',
                    title: '代理商',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'id',
                    title: '代理商ID',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }
    var $table2 = $("#table2");
    function initTable2() {
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
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '平台',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '主渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '分渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '子渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '媒体ID',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }
    var $table3 = $("#table3");
    function initTable3() {
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
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '项目名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'id',
                    title: '项目ID',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }
    var $table4 = $("#table4");
    function initTable4() {
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
                    field: 'id',
                    title: '车型ID',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }
    initTable();
    initTable1();
    initTable2();
    initTable3();
    initTable4();
});