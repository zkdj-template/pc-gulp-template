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
    /**************************************************************************************************************************
     * 初始化图表的容器
     */
    /**
     * 柱状图-媒体排行TOP10
     */
    var topChart = echarts.init(document.getElementById("top"),"customed");

    /**
     * 折线图 - 活动声量走势分析
     */
    var lineChart = echarts.init(document.getElementById('line'),'customed');

    /**
     * 折线图 - 评论区舆情走势分析
     */
    var line2Chart = echarts.init(document.getElementById('line2'),'customed');
    /**
     * 柱状图 - 活动声量统计
     */
    var barChart = echarts.init(document.getElementById("bar"),"customed");
    /**
     * 圆环图 - 评论回复量占比
     */
    var pieChart = echarts.init(document.getElementById("pie"),"customed");
    /**
     * 评论区舆情
     */
    var pie2Chart = echarts.init(document.getElementById("pie2"),"customed");
    /**
     * 设置柱状图-媒体排行TOP10的图表参数
     */
    function topFun() {
        var TopOption = {
            grid: {
                top: '0',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                data: ['搜狐汽车','太平洋汽车','网易汽车','腾讯汽车','网上车市','瓜子二手车','新浪汽车','爱卡','汽车之家','易车']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    barWidth: 10,
                    legendHoverLink: false,
                    label: {
                        normal: {
                            show: true,
                            color: '#000',
                            position: 'right',
                            distance: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 10,
                            borderType: "solid",
                            barBorderRadius: [0,2,2,0],
                        }
                    },
                    data: [18203, 23489, 29034, 104970, 131744, 630230,18203, 23489, 29034, 104970].sort(function(a,b){return a-b})
                }
            ]
        };
        topChart.setOption(TopOption, true);
    }
    /**
     * 设置折线图 - 活动声量走势的参数
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
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };

        lineChart.setOption(LineOption, true);
        line2Chart.setOption(LineOption, true);
    };
    /**
     * 设置柱状图 - 活动声量统计的参数
     */
    function barFun() {
        var BarOption = {
            tooltip:{
                show: true,
            },
            grid: {
                top: '6%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
            },
            xAxis: {
                type: 'category',
                data: ['文章量','评论量','评论回复量','阅读量']
            },
            series: [
                {
                    type: 'bar',
                    barWidth: 10,
                    legendHoverLink: false,
                    label: {
                        normal: {
                            show: true,
                            color: '#000',
                            position: 'top',
                            distance: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 10,
                            borderType: "solid",
                            barBorderRadius: [0,2,2,0],
                        }
                    },
                    data: [12030, 2389, 2934, 104970].sort(function(a,b){return a-b})
                }
            ]
        };
        barChart.setOption(BarOption,true);
    }
    function pieFun() {
        var pieOption = {
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
                        {value:30, name:'回复率'},
                        {value:300, name:'评论量'},
                    ]
                }
            ]
        };
        pieChart.setOption(pieOption, true);
        pieOption.series = [
            {
                name: '舆情占比',
                type: 'pie',
                radius: ['40%', '55%'],
                data: [
                    {
                        value: 60, name: '负面'
                    },
                    {
                        value: 300, name: '正面'
                    }
                ]
            }
        ];
        pie2Chart.setOption(pieOption, true);
    }
    /**
     * 页面加载完成后调用渲染图表的方法
     */
    topFun();
    lineFun();
    barFun();
    pieFun();
    /**
     * 选择活动弹窗内的表格
     * @type {*}
     */
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
                    title: '活动ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '活动名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '推广车型',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '活动类型',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '区域',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '活动起止周期',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '项目状态',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    };
    /**
     * 当窗口完全显示后，渲染图表
     */
    $('#myModal').on('shown.bs.modal', function (e) {
        initTable();
    });
});