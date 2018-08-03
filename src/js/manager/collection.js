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
                    field: 'field2',
                    title: 'VIP作者',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '媒体平台',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '主媒介',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '分媒介',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '媒体名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '账号ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '账号昵称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '添加日期',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '监测状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value) {

                        return value>6?"<div class='btn btn-blue'>监测中</div>":"<div class='btn btn-default'>未监测</div>";
                    }
                }
            ]
        });
        setTimeout(function () {
            $table.bootstrapTable('resetView');
        }, 200);
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();
})