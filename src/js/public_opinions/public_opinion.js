
(function(){
    $(".list_dt").on("click",function () {
        $('.list_dd').stop();
        $(this).siblings("dt").removeAttr("id");
        if($(this).attr("id")=="open"){
            $(this).removeAttr("id").siblings("dd").slideUp();
        }else{
            $(this).attr("id","open").next().slideDown().siblings("dd").slideUp();
        }
    });
    $('.list_dd>ul>li').click(function(){
        $(this).addClass('active_li')
        $(this).siblings().removeClass('active_li')
        $(this).parents('dd').siblings().find('li').removeClass('active_li')

    })

    $('.s_a').click(function(){
        $(this).addClass("blue_text")
        $(this).siblings().removeClass('blue_text')
    })
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

})()
