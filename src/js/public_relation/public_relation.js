
(function(){
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

    /*车型声量走势*/
    var car_type = echarts.init(document.getElementById('car_type'),'customed');
    var car_typeOption = {
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
    car_type.setOption(car_typeOption);


    /*车型声量统计*/
    var car_num = echarts.init(document.getElementById('car_num'),'customed');
    var car_numLineOption  = {
        color: ['#2a93ed','#ff846b'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
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
                }
            ]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件销售',
                type:'bar',
                barWidth: '20%',
                data:[10, 52, 200, 334, 390, 330, 220]
            },
            {
                name:'联盟广告',
                type:'bar',
                barWidth: '20%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };


    car_num.setOption(car_numLineOption);

    /*媒体结构占比*/
    var car_madel = echarts.init(document.getElementById('car_madel'),'customed');
    var car_madelLineOption  = {
        legend: {
            type: 'plain',
            show: true,
            top: 'top',
            left: 'right',
            data: [
                {
                    name: '预算分配',
                    icon: 'circle'
                },
                {
                    name: '实际开销',
                    icon: 'circle'
                }
                ]
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '销售', max: 6500},
                { name: '管理', max: 16000},
                { name: '信息技术', max: 30000},
                { name: '客服', max: 38000},
                { name: '研发', max: 52000},
                { name: '市场', max: 25000}
            ]
        },
        series: [{
            name: '预算 vs 开销',
            type: 'radar',
            data : [
                {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : '预算分配',
                    lineStyle: {                // 单项线条样式。
                        normal: {
                            opacity: 0.5            // 图形透明度
                        }
                    },
                    areaStyle: {                // 单项区域填充样式
                        normal: {
                            color: 'rgba(42,147,237,0.6)'       // 填充的颜色。[ default: "#000" ]
                        }
                    }
                },
                {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : '实际开销',
                    lineStyle: {                // 单项线条样式。
                        normal: {
                            opacity: 0.5            // 图形透明度
                        }
                    },
                    areaStyle: {                // 单项区域填充样式
                        normal: {
                            color: 'rgba(255,132,107,0.6)'       // 填充的颜色。[ default: "#000" ]
                        }
                    }
                }
            ]
        }]
    };
    car_madel.setOption(car_madelLineOption);

    /*媒体结构分布*/
    var car_madel2 = echarts.init(document.getElementById('car_madel2'),'customed');
    var car_madel2LineOption  = {
        color: ['#2a93ed','#ff846b'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            type: 'plain',
            show: true,
            top: 'top',
            left: 'right',
            data:[
                {
                    name: '2011年',
                    icon: 'circle'
                },
                    {
                        name: '2012年',
                        icon: 'circle'
                    }
                ]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };

    car_madel2.setOption(car_madel2LineOption);

    /*媒体排行*/
    var car_top = echarts.init(document.getElementById('car_top'),'customed');
    var car_topLineOption = {
        color: ['#2a93ed','#ff846b'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            type: 'plain',
            show: true,
            top: 'top',
            left: 'right',
            data: [
                {
                    name: '2011年',
                    icon: 'circle'
                },
                {
                    name: '2012年',
                    icon: 'circle'
                }
            ]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
    car_top.setOption(car_topLineOption);



    $("#myTab2").on('click','.btn',function () {
        $(this).addClass('btn-blue').siblings().removeClass('btn-blue');
    })
    var $table = $("#table"),
        $table2 = $("#table2");
    var $table3 = $("#table3");
    var $table_model = $("#table_model");
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
                    field: 'field2',
                    title: '关联媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '文章标题',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '作者',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '文章属性',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '阅读量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '评论回复量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '负面评论',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '负面评论占比',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '发布日期',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
            $table2.bootstrapTable('resetView');
            $table3.bootstrapTable('resetView');
        });
    }
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
                    title: '关联媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '负面文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '阅读量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '评论回复量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '负面评论',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '负面评论占比',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
            ]
        });
    }
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
            columns:  [
                {
                    field: 'id',
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '作者',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value) {
                        console.log(value)
                        return '<a href="#tablePane_model" ' +
                            'data-toggle="modal" ' +
                            'data-target=".bs-example-modal-lg"' +
                            'data-target=".bs-example-modal-lg"' +
                            '>'+ value +'</a>'
                    }
                },
                {
                    field: 'field3',
                    title: '发布文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '负面文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '阅读量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '评论回复量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '负面评论',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '负面评论占比',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }
    function initTable_model() {
        $table_model.bootstrapTable({
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
            columns:  [
                {
                    field: 'id',
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '作者',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field3',
                    title: '发布文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '负面文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '阅读量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '评论回复量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '负面评论',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '负面评论占比',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }
    initTable();
    initTable2();
    initTable3();
    $('#myModel').on('shown.bs.modal', function (e) {
        initTable_model()
    })
    $('.stop-event input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
})()
