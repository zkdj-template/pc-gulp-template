$(function(){
    /**
     * 初始化日期插件
     */
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

    /*媒体vip产出*/
    var $table = $("#table");
    function initTable() {
        $table.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: function (params) {
                return {
                    pageSize: params.limit,
                    pageNumber: params.offset/params.limit+1,
                    sort:params.sort,
                    sortOrder: params.order
                }
            },
            sortable: true,
            sortOrder: 'asc',
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
                    field: 'field3',
                    title: '作者名',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value) {
                        return '<a href="./public_Initiative_table_detail.html">'+ value +'</a>'
                    }

                },
                {
                    field: 'field4',
                    title: '关联媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '发布文章量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '负面文章量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field11',
                    title: '阅读量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field5',
                    title: '评论量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '评论回复量',
                    align: 'center',
                    sortable: true,
                    valign: 'middle',

                },
                {
                    field: 'field11',
                    title: '负面评论',
                    sortable: true,
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field6',
                    title: '负面评论占比',
                    sortable: true,
                    align: 'center',
                    valign: 'middle',

                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();

    /*媒体vip产出下探页------作者*/
    var $table_admin = $("#table_admin");
    function initTable_admin() {
        $table_admin.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: function (params) {
                return {
                    pageSize: params.limit,
                    pageNumber: params.offset/params.limit+1,
                    sort:params.sort,
                    sortOrder: params.order
                }
            },
            sortable: true,
            sortOrder: 'asc',
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
                    title: '媒体名称',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field3',
                    title: '作者ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '作者名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '标题',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '文章属性',
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field11',
                    title: '阅读量',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field5',
                    title: '评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '评论回复量',
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field11',
                    title: '负面评论',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field11',
                    title: '负面评论占比',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field6',
                    title: '发布日期',
                    align: 'center',
                    valign: 'middle',

                }
            ]
        });
        $(window).resize(function () {
            $table_admin.bootstrapTable('resetView');
        });
    }
    initTable_admin();
    /*作者声量走势*/
    var admin_trend = echarts.init(document.getElementById('admin_trend'),'customed');
    var admin_trendOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend:{
            type: 'plain',
            show: true,
            top: 'top',
            left: 'right',
            data: [
                {
                    name: '发布文章量',
                    icon: 'circle'
                },
                {
                    name: '评论量',
                    icon: 'circle'
                }
            ]
        },
        dataZoom: [
            {
                show: true,
                start: 30,
                end: 70
            }
        ],
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        grid: {
            left: '3%',
            right: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'发布文章量',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'评论量',
                type:'line',
                stack: '总量',
                data:[12, 13, 11, 34, 9, 23, 21]
            },

        ]
    };
    admin_trend.setOption(admin_trendOption);
});