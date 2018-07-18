/**
 * Created by zhangxin on 2018/5/22.
 */
$(function () {
    $(".btn-box").on("click",'.btn-link',function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    /**
     * 地图热度分布-切换事件
     */

    $(".toggle-btn-box").on("click",">.btn",function(){
        $(this).removeClass("btn-default").addClass("btn-blue").siblings().removeClass("btn-blue").addClass("btn-default");
    });
    /**
     * 初始化选择框
     */
    $('.stop-event input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
    /**
     * 阻止dropdown内标签事件冒泡
     */
    $(".stop-event").on("click","a,label",function (e) {
        e.stopPropagation();
    });
    /**
     * 初始化日期插件
     */
    $(".datepicker").daterangepicker({
        maxDate : moment(), //最大时间
        dateLimit : {
            days : 180
        },//起止时间的最大间隔
        opens: 'left',
        // autoApply:true,
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        separator : ' 到 ',
        autoUpdateInput: false,
        buttonClasses: 'btn',
        applyClass: 'btn-blue',
        cancelClass: 'btn-default',
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
        $("input[name=startDate]").val(picker.startDate.format('YYYY-MM-DD'));
        $("input[name=endDate]").val(picker.endDate.format('YYYY-MM-DD'));
    }).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });


    /*******************
     * ************************项目热度分布****************************
     */
    /**
     * 地图-全国广告投放热度分布
     */
    var mapChart = echarts.init(document.getElementById("map"),'customed');
    var cityMapChart = echarts.init(document.getElementById("cityMap"),'customed');

    //数据纯属虚构
    function randomData() {
        return Math.round(Math.random()*100);
    }
    var data = [

        {
            name: '齐齐哈尔'
        }, {
            name: '盐城'
        }, {
            name: '青岛'
        }, {
            name: '金昌'
        }, {
            name: '泉州'
        }, {
            name: '拉萨'
        }, {
            name: '攀枝花'
        }, {
            name: '威海'
        }, {
            name: '承德'
        }, {
            name: '汕尾'
        }, {
            name: '克拉玛依'
        }, {
            name: '重庆市'
        }

    ];

    var geoCoordMap = {
        '齐齐哈尔': [123.97, 47.33],
        '盐城': [120.13, 33.38],
        '青岛': [120.33, 36.07],
        '金昌': [102.188043, 38.520089],
        '泉州': [118.58, 24.93],
        '拉萨': [91.11, 29.97],
        '上海浦东': [121.48, 31.22],
        '攀枝花': [101.718637, 26.582347],
        '威海': [122.1, 37.5],
        '承德': [117.93, 40.97],
        '汕尾': [115.375279, 22.786211],
        '克拉玛依': [84.77, 45.59],
        '重庆市': [108.384366, 30.439702],

    };
    var convertData = function(data) {
        var res = [];

        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];

            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }

        return res;
    };
    var MapOption = {
        title: {
            text:'全国投放热度分布',
            show: true,
            textStyle: {
                fontWeight: 400,
                fontSize: 16
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'item'

        },
        visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
        },
        geo: {
            map: 'china',
            left: '20%',
            zoom: 1.2,
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#fbfbfb',
                    borderColor: '#b9b4b7'

                }
            }
        },
        series: [{
            name: '供需占比',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#00fff6',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            }
        }, {
            type: 'map',
            mapType: 'china',
            geoIndex: 0,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: [{
                name: '北京',
                value: randomData()
            }, {
                name: '天津',
                value: randomData()
            }, {
                name: '上海',
                value: randomData()
            }, {
                name: '重庆',
                value: randomData()
            }, {
                name: '河北',
                value: randomData()
            }, {
                name: '河南',
                value: randomData()
            }, {
                name: '云南',
                value: randomData()
            }, {
                name: '辽宁',
                value: randomData()
            }, {
                name: '黑龙江',
                value: randomData()
            }, {
                name: '湖南',
                value: randomData()
            }, {
                name: '安徽',
                value: randomData()
            }, {
                name: '山东',
                value: randomData()
            }, {
                name: '新疆',
                value: randomData()
            }, {
                name: '江苏',
                value: randomData()
            }, {
                name: '浙江',
                value: randomData()
            }, {
                name: '江西',
                value: randomData()
            }, {
                name: '湖北',
                value: randomData()
            }, {
                name: '广西',
                value: randomData()
            }, {
                name: '甘肃',
                value: randomData()
            }, {
                name: '山西',
                value: randomData()
            }, {
                name: '内蒙古',
                value: randomData()
            }, {
                name: '陕西',
                value: randomData()
            }, {
                name: '吉林',
                value: randomData()
            }, {
                name: '福建',
                value: randomData()
            }, {
                name: '贵州',
                value: randomData()
            }, {
                name: '广东',
                value: randomData()
            }, {
                name: '青海',
                value: randomData()
            }, {
                name: '西藏',
                value: randomData()
            }, {
                name: '四川',
                value: randomData()
            }, {
                name: '宁夏',
                value: randomData()
            }, {
                name: '海南',
                value: randomData()
            }, {
                name: '台湾',
                value: randomData()
            }, {
                name: '香港',
                value: randomData()
            }, {
                name: '澳门',
                value: randomData()
            }, {
                name: '南海诸岛',
                value: randomData()
            }]
        }]
    };
    var cityMapOption = {
        title: {
            text:'地级市热度分布',
            show: true,
            textStyle: {
                fontWeight: 400,
                fontSize: 16
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'item'

        },
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
        },
        geo: {
            map: '广东',
            left: '10%',
            zoom: 1.2,
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#fbfbfb',
                    borderColor: '#b9b4b7'

                }
            }
        },
        series: [{
            type: 'map',
            geoIndex: 0,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data: [{
                name: '广州市',
                value: randomData()
            }, {
                name: '深圳市',
                value: randomData()
            }, {
                name: '东莞市',
                value: randomData()
            }, {
                name: '清远市',
                value: randomData()
            }, {
                name: '肇庆市',
                value: randomData()
            }, {
                name: '湛江市',
                value: randomData()
            }, {
                name: '茂名市',
                value: randomData()
            }, {
                name: '阳江市',
                value: randomData()
            }, {
                name: '云浮市',
                value: randomData()
            }, {
                name: '江门市',
                value: randomData()
            }, {
                name: '佛山市',
                value: randomData()
            }, {
                name: '中山市',
                value: randomData()
            }, {
                name: '珠海市',
                value: randomData()
            }, {
                name: '惠州市',
                value: randomData()
            }, {
                name: '清远市',
                value: randomData()
            }, {
                name: '汕尾市',
                value: randomData()
            }, {
                name: '河源市',
                value: randomData()
            }, {
                name: '梅州市',
                value: randomData()
            }, {
                name: '揭阳市',
                value: randomData()
            }, {
                name: '潮州市',
                value: randomData()
            }, {
                name: '汕头市',
                value: randomData()
            }, {
                name: '韶关市',
                value: randomData()
            }, {
                name: '郑州市',
                value: randomData()
            },{
                name: '商丘市',
                value: randomData()
            }, {
                name: '合肥市',
                value: randomData()
            },{
                name: '北京市',
                value: randomData()
            }, {
                name: '石家庄市',
                value: randomData()
            },{
                name: '西安市',
                value: randomData()
            }]
        }]
    };
    mapChart.setOption(MapOption);
    cityMapChart.setOption(cityMapOption);
    mapChart.on("click",function (e) {
        console.log(e);
        var cityName = e.name,
            strArr = cityName.split(''),
            strArrLen = strArr.length;
        if(strArr[strArrLen-1] === '市' || e.seriesType!='map')return
        cityMapOption.geo.map = cityName;
        cityMapChart.setOption(cityMapOption);
    });
    /**
     * 漏斗图
     */
    /**
     * 广告投放多漏斗分析
     */
    var funnelChart = echarts.init(document.getElementById("funnel"),'customed');
    var FunnelOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        calculable: true,
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                left: '25%',
                width: '50%',
                data:[
                    {value: 60, name:'访问'},
                    {value: 30, name:'咨询'},
                    {value: 10, name:'订单'},
                    {value: 80, name:'点击'},
                    {value: 100, name:'展现'}
                ]
            }
        ]
    };

    funnelChart.setOption(FunnelOption);
    /**
     * 柱状图-全国top10
     */
    var topChart = echarts.init(document.getElementById("top"),"customed");
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
    topChart.setOption(TopOption);

    /**
     * 折线图 - 走势分析
     */
    var lineChart = echarts.init(document.getElementById('line'),'customed');

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

    lineChart.setOption(LineOption);

    var line2Chart = echarts.init(document.getElementById("line2"),"customed");
    var line3Chart = echarts.init(document.getElementById("line3"),"customed");

    line2Chart.setOption(LineOption);
    line3Chart.setOption(LineOption);

    /**
     * ***********************排行分析***********************
     */

    /**
     * 排行分析-----表格
     */
    $("#myTab2").on('click','.btn',function () {
        $(this).addClass('btn-blue').siblings().removeClass('btn-blue');
    })
    var $table = $("#table"),
        $table2 = $("#table2");
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
                    title: '媒体主渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '投放媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '广告主题',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '广告创意',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '线索量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '广告位',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '曝光量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '点击量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '点击率',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: 'CPM',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: 'CPC',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
            $table2.bootstrapTable('resetView');
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
                    field: 'field2',
                    title: '媒体主渠道',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '投放媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '广告主题',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '曝光量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '点击量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '点击率',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '线索量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '转化率',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '潜客贡献量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '成交贡献量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '销量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '线索成交转化率',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: 'CPM',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: 'CPC',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: 'CPA',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: 'CPL',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
    }

    /**
     * 落地页分析
     * @type {*}
     */
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
                    field: 'field2',
                    title: '关联链接',
                    align: 'center',
                    valign: 'middle',
                    formatter: function () {
                        return '<a href="javascript:void(0)" class="text-blue">具体路径</a>';
                    }
                },
                {
                    field: 'field3',
                    title: 'PV',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: 'UV',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: 'UV访问次数（<5秒）',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '访问时长5秒内的UV占比',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '平均访问时长',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '落地页路径分析',
                    align: 'center',
                    valign: 'middle',
                    formatter: function () {
                        return '<a href="javascript:void(0);" class="btn btn-blue btn-sm">分析</a>'
                    }
                }
            ]
        });
    }
    initTable();
    initTable2();
    initTable3();
    /**
     * 切换项目弹出层的表格
     */
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
                    title: '项目ID',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field3',
                    title: '投放车系',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '代理商',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '代理商ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '项目名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '广告主题',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '项目开通日期',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field8',
                    title: '项目状态',
                    align: 'center',
                    valign: 'middle',
                }
            ]
        });
    }
    initTable4();

    /**
     * 终端设备分析
     */
    var pieOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
        // },
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'直达', selected:true},
                    {value:679, name:'营销广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            },
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '55%'],
                data:[
                    {value:335, name:'直达'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1048, name:'百度'},
                    {value:251, name:'谷歌'},
                    {value:147, name:'必应'},
                    {value:102, name:'其他'}
                ]
            }
        ]
    };
    var pie2Option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        // },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };
    $('a[href="#tab4"]').on("shown.bs.tab",function () {
        var pieChart = echarts.init(document.getElementById("pie"),"customed"),
            pie2Chart = echarts.init(document.getElementById("pie2"),"customed");
        pieChart.setOption(pieOption);
        pie2Chart.setOption(pie2Option);
    });
});