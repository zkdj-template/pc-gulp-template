/**
 * Created by zhangxin on 2018/5/19.
 */
$(function () {
    /**
     * bootstrap-table
     * @type a
     */
    $(".btn-box").on("click",'.btn-link',function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
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
    var $table = $("#table");
    function initTable() {
        $table.bootstrapTable({
            width: '1600px',
            url: '../data/data.json',
            method:'get',
            scroll: true,
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
                    width: '200px',
                    field: 'field2',
                    title: '账号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    width: '200px',
                    field: 'field3',
                    title: '姓名',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    width: '200px',
                    field: 'field4',
                    title: '项目ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    width: '200px',
                    field: 'field5',
                    title: '投放车系',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    width: '200px',
                    field: 'field8',
                    title: '代理商',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    width: '200px',
                    field: 'field8',
                    title: '项目名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    width: '200px',
                    field: 'field10',
                    title: '申请日期',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    width: '200px',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function() {
                        var a = "已解决";
                        return a;
                    }
                }
            ]
        });
        $table.on("click-row.bs.table",function (e, row, element, field) {
            console.log(e, row, element, field);
            window.location.href = 'meitipaiqiguanli02.html'
        });
        // sometimes footer render error.
        setTimeout(function () {
            $table.bootstrapTable('resetView');
        }, 200);
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();
})