/**
 * Created by zhangxin on 2018/7/28.
 */
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
    /**
     * 折线图 - 经销商声量走势分析
     */
    var lineChart = echarts.init(document.getElementById('line'),'customed');/**
     * 圆环图 - 评论回复量占比
     */
    var pieChart = echarts.init(document.getElementById("pie"),"customed");
    /**
     * 评论区舆情
     */
    var pie2Chart = echarts.init(document.getElementById("pie2"),"customed");
    /**
     * 设置折线图 - 活经销商声量走势的参数
     */
    function lineFun (){

        var LineOption = {
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
                        name: '邮件销售',
                        icon: 'circle'
                    },
                    {
                        name: '联盟广告',
                        icon: 'circle'
                    },
                    {
                        name: '视频广告',
                        icon: 'circle'
                    },
                    {
                        name: '直接访问',
                        icon: 'circle'
                    },
                    {
                        name: '搜索引擎',
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
                    name:'数量',
                    type:'line',
                    data:[120, 132, 101, 134, 90, 230, 210]
                }
            ]
        };

        lineChart.setOption(LineOption, true);
    };
    function pieFun() {
        var pieOption = {
            legend:{
                type: 'plain',
                show: true,
                top: 'top',
                left: 'right',
                icon: 'circle',
                data: ["未完成任务","已完成任务"]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'占比分析',
                    type:'pie',
                    radius: ['40%', '55%'],
                    data:[
                        {value:30, name:'未完成任务'},
                        {value:300, name:'已完成任务'},
                    ]
                }
            ]
        };
        pieChart.setOption(pieOption, true);
        var pie2Option = {
            legend:{
                type: 'plain',
                show: true,
                top: 'top',
                left: 'right',
                icon: 'circle',
                data: ["未完成","100%完成"]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '占比分析',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    data: [
                        {
                            value: 60, name: '未完成'
                        },
                        {
                            value: 300, name: '100%完成'
                        }
                    ]
                }
            ]
        };
        pie2Chart.setOption(pie2Option, true);
    }
    lineFun();
    pieFun();

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
                    title: '排行',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '所在区域',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '所在省/市',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '所在市/区',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '单位代码',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '单位名称',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field9',
                    title: '任务数',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '完成数',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '完成率',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    var countFlag = true;
    $("#myTab>li:eq(1)>a").on("shown.bs.tab", function () {
        if(countFlag){
            initTable();
            countFlag = false;
        }
    });
});