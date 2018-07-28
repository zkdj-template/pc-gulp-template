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
     * 地图-全国经销商声量分布
     */
    var mapChart = echarts.init(document.getElementById("map"),'customed')
    /**
     * 折线图 - 经销商声量走势分析
     */
    var lineChart = echarts.init(document.getElementById('line'),'customed');
    /**
     * 柱状图 - 经销商传播媒介分析统计
     */
    var barChart = echarts.init(document.getElementById("bar"),"customed");
    /**
     * 设置 地图-全国经销商声量分布的数据
     */
    function mapFun() {
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
                name: '热度和经销商',
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
    }
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
    /**
     * 设置柱状图 - 经销商传播媒介分析的参数
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
                data: ['汽车之家','易车','腾讯汽车','网易汽车']
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
    /**
     * 页面加载完成后调用渲染图表的方法
     */
    mapFun();
    lineFun();
    barFun();
    /**
     * 评论回复量占比的表格
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
            sortName: 'id',
            pagination: false,
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
                    title: '经销商',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '所在地区',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '总发声量',
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
     * 当窗口完全显示后，渲染表格
     */
    initTable();
});