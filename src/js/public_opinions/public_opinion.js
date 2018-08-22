
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
    var arr = [
        {
            "name": "花鸟市场",
            "flag":'0',
            "value": 1446
        },
        {
            "name": "汽车",
            "flag":'0',
            "value": 928
        },
        {
            "name": "视频",
            "flag":'0',
            "value": 906
        },
        {
            "name": "电视",
            "flag":'0',
            "value": 825
        },
        {
            "name": "Lover Boy 88",
            "flag":'0',
            "value": 514
        },
        {
            "name": "动漫",
            "flag":'0',
            "value": 486
        },
        {
            "name": "音乐",
            "flag":'0',
            "value": 53
        },
        {
            "name": "直播",
            "flag":'0',
            "value": 163
        },
        {
            "name": "广播电台",
            "flag":'0',
            "value": 86
        },
        {
            "name": "戏曲曲艺",
            "flag":'1',
            "value": 17
        },
        {
            "name": "演出票务",
            "flag":'1',
            "value": 6
        },
        {
            "name": "给陌生的你听",
            "flag":'1',
            "value": 1
        },
        {
            "name": "资讯",
            "flag":'0',
            "value": 1437
        },
        {
            "name": "商业财经",
            "flag":'1',
            "value": 422
        },
    ]
    var dom = document.getElementById('car_type');
    var imgSrc = "../images/ciyun_bg_suv1.png";
    var myChart = new CarWCloud(dom, imgSrc);
    myChart.draw(arr);


    /*top10*/
    $("#small_table").on('click','.btn',function () {
        $(this).addClass('btn-blue').siblings().removeClass('btn-blue');
    })
    var $table = $("#table")
    function initTable() {
        $table.bootstrapTable({
            url: '../data/data.json',
            method:'post',
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
            pagination: false,
            sidePagination: 'server',
            columns: [
                {
                    field: 'id',
                    title: '关键词',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '热度',
                    align: 'center',
                    valign: 'middle'
                },
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();


    /*正负面分布*/
    var good_bad = echarts.init(document.getElementById('good_bad'),'customed');
    var hours = ['2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09'];
    var days = ['正面', '负面'];
    var data =[
        [0,0,5],[0,1,8],[0,2,10],[0,3,20],[0,4,20],[0,5,18],
        [1,0,5],[1,1,8],[1,2,10],[1,3,20],[1,4,20],[1,5,18]
    ]
    data = data.map(function (item) {
        return {
            name:'声量',
            value:[item[1], item[0], item[2]],
            itemStyle:{
                normal: {
                    color:item[0]==0?'#2a93ed':'#ff846b',
                },

            }
        }
    });
    var good_badLineOption = {
        tooltip: {
            position: 'top',
            formatter: function (params) {
                return ' 声量数 '+ params.value[2] ;
            }
        },
        grid: {
            left: 2,
            bottom: 10,
            right: 50,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: hours,
            boundaryGap: false,
            splitLine: {
                show:true,
                lineStyle: {
                    show:true,
                    type: 'dashed'
                }
            },

            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: days,
            axisLine: {
                show: false
            }
        },
        series: [{
            name: 'Punch Card',
            type: 'scatter',
            symbolSize: function (val) {
                return val[2] * 2;
            },
            data: data,
            animationDelay: function (idx) {
                return idx * 5;
            },
        }]
    };
    good_bad.setOption(good_badLineOption);

    /*声量正负面占比*/
    var car_bad = echarts.init(document.getElementById('car_bad'),'customed');
    var car_badLineOption =  {
        color: ['#2a93ed','#ff846b'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            show: false,
            x: 'left',
            data: ['正面', '负面']
        },
        series: [
            {
                name: '声量',
                type: 'pie',
                radius: ['40%', '55%'],
                labelLine: {
                    normal: {
                        length: 20,
                        length2: 20,
                        lineStyle: {
                            color: '#333'
                        }
                    }
                },
                label: {
                    normal: {
                        formatter: '{b|{b}}',
                        borderWidth: 0,
                        borderRadius: 4,
                        padding: [0, 0],
                        rich: {
                            a: {
                                color: '#333',
                                fontSize: 16,
                                lineHeight: 20
                            },
                            hr: {
                                borderColor: '#333',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 20,
                                color: '#333'
                            }
                        }
                    }
                },
                data: [{
                    value: 1351,
                    name: '正面'
                }, {
                    value: 148,
                    name: '负面   '
                }]
            }
        ]
    };
    car_bad.setOption(car_badLineOption);

    /*负面情感走势分析*/
    var bad_Feel = echarts.init(document.getElementById('bad_Feel'),'customed');
    var bad_FeelOption = {
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

        ]
    };
    bad_Feel.setOption(bad_FeelOption);

    /*负面媒体结构*/
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
                name: '2012年',
                type: 'bar',
                barWidth:15,
                itemStyle: {
                    normal: {
                        show: true,
                        barBorderRadius: 50,
                        borderWidth: 5,
                        borderColor: '#333',
                    }
                },
                barGap: '0%',
                barCategoryGap: '50%',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
    car_madel2.setOption(car_madel2LineOption);

    /*关联负面媒体*/
    var car_madel3 = echarts.init(document.getElementById('car_madel3'),'customed');
    var car_madel3pLineOption = {
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
                    name: '2012年',
                    icon: 'circle'
                },
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
                name: '2012年',
                type: 'bar',
                barWidth:15,
                itemStyle: {
                    normal: {
                        show: true,
                        barBorderRadius: 50,
                        borderWidth: 5,
                        borderColor: '#333',
                    }
                },
                barGap: '0%',
                barCategoryGap: '50%',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
    car_madel3.setOption(car_madel3pLineOption);


    var $table6 = $("#table6");
    function initTable6() {
        $table6.bootstrapTable({
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
            pagination: false,
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
                    field: 'field8',
                    title: '作者',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '阅读量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '评论量',
                    sortable: true,
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
                    field: 'field6',
                    title: '负面评论占比',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '发布日期',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }
    initTable6();



})()
