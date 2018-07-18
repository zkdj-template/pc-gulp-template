/**
 * create by zx on 2018/05/10
 */
$(function () {
    /**
     * 全国广告投放热度分布-切换事件
     */

    $(".toggle-btn-box").on("click",">.btn",function(){
        $(this).removeClass("btn-default").addClass("btn-blue").siblings('.btn').removeClass("btn-blue").addClass("btn-default");
    });
    $(".search-tab>.btn").last().trigger("click");
    /**
     * 初始化选择框
     */
    $('input[type=checkbox]').iCheck({
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
     * 地图-全国广告投放热度分布
     */
    var mapChart = echarts.init(document.getElementById("map"),'customed')

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
            name: '上海浦东'
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
    mapChart.setOption(MapOption);

    /**
     * 柱状图-全国top10
     */
    var topChart = echarts.init(document.getElementById("top"),"customed");
    var TopOption = {
        color: ["#3ca1ff"],
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
            data: ['北京','上海','广州','深圳','重庆','郑州','海口','张家口','张家界','珠海']
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
     * 圆环图-媒体占比分析
     */
    var circleChart = echarts.init(document.getElementById("circle"),'customed')
    var CircleOption = {
        legend:{
            type: 'scroll',
            orient: 'vertical',
            left: 0,
            top: 20,
            bottom: 20,
            data:["门户","垂直","用车","出行","新闻","生活","运动","社交","视频","精准","搜索","音乐","B2B","金融","OTT","电竞","直播","电商","社交媒体"]
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'媒体',
                type:'pie',
                radius: ['40%', '55%'],
                data:[
                    {value:335, name:'门户'},
                    {value:310, name:'垂直'},
                    {value:234, name:'用车'},
                    {value:135, name:'出行'},
                    {value:1048, name:'新闻'},
                    {value:251, name:'生活'},
                    {value:147, name:'运动'},
                    {value:102, name:'社交'},
                    {value:310, name:'视频'},
                    {value:234, name:'精准'},
                    {value:135, name:'搜索'},
                    {value:1048, name:'音乐'},
                    {value:251, name:'B2B'},
                    {value:147, name:'金融'},
                    {value:102, name:'OTT'},
                    {value:1048, name:'电竞'},
                    {value:251, name:'直播'},
                    {value:147, name:'电商'},
                    {value:102, name:'社交媒体'}
                ]
            }
        ]
    };
    circleChart.setOption(CircleOption);

    /**
     * 折线图 - 广告媒体走势分析
     */
    var lineChart = echarts.init(document.getElementById('line'),'customed');

    var LineOption = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
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
                width: '40%',
                height: '45%',
                left: '30%',
                top: '50%',
                data:[
                    {value: 60, name:'访问'},
                    {value: 30, name:'咨询'},
                    {value: 10, name:'订单'},
                    {value: 80, name:'点击'},
                    {value: 100, name:'展现'}
                ]
            },
            {
                name: '金字塔',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '30%',
                top: '5%',
                sort: 'ascending',
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

    var lineAreaChart = echarts.init(document.getElementById("lineArea"),"customed");
    var LineAreaOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
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
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    lineAreaChart.setOption(LineAreaOption);
});
