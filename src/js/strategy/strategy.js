/**
 * Created by zhangxin on 2018/5/23.
 */
$(function () {
    /**
     * 地图热度分布-切换事件
     */

    $(".toggle-btn-box").on("click",">.btn",function(){
        $(this).removeClass("btn-default").addClass("btn-blue").siblings().removeClass("btn-blue").addClass("btn-default");
    });
    /**
     * 阻止dropdown内标签事件冒泡
     */
    $(".stop-event").on("click","a,label",function (e) {
        e.stopPropagation();
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
     * 柱状图-全国top10
     */
    var barChart = echarts.init(document.getElementById("bar"),"customed"),
        bar2Chart = echarts.init(document.getElementById("bar2"),"customed"),
        bar3Chart = echarts.init(document.getElementById("bar3"),"customed");
    var BarOption = {
        legend: {
            top: '0',
            right: "4%",
            show: true,
            data: ["点击率","转化率"],
            selectedMode: 'single',
            selected:{
                '点击率': true,
                '转化率': false
            }
        },
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
            data: ['搜狐汽车','太平洋汽车','网易汽车','腾讯汽车','网上车市','瓜子二手车','新浪汽车','爱卡','汽车之家','易车']
        },
        series: [
            {
                name: '点击率',
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
                data: [18203, 23489, 29034, 104970, 131744, 630230,18203, 23489, 29034, 104970].sort(function(a,b){return a-b})
            },
            {
                name: '转化率',
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
                data: [12030, 2389, 29034, 10490, 131744, 63020,18203, 23489, 2934, 104970].sort(function(a,b){return a-b})
            }
        ]
    };
    bar3Chart.setOption(BarOption,true);
    BarOption.legend.show = false;
    BarOption.series = BarOption.series.shift();
    barChart.setOption(BarOption,true);
    bar2Chart.setOption(BarOption,true);
    /**
     * 关系图
     *
     */
    var graphChart = echarts.init(document.getElementById("graph"),'customed');
    var graph = {"nodes":[{"id":"0","name":"Myriel","symbolSize":28.685715,"x":-336.5,"y":100,"attributes":{"modularity_class":0}},{"id":"1","name":"Napoleon","symbolSize":4,"x":-418.08344,"y":446.8853,"attributes":{"modularity_class":0}},{"id":"2","name":"MlleBaptistine","symbolSize":9.485714,"x":-212.76357,"y":245.29176,"attributes":{"modularity_class":1}},{"id":"3","name":"MmeMagloire","symbolSize":9.485714,"x":-242.82404,"y":235.26283,"attributes":{"modularity_class":1}},{"id":"4","name":"CountessDeLo","symbolSize":24,"x":-379.30386,"y":429.06424,"attributes":{"modularity_class":0}},{"id":"5","name":"Geborand","symbolSize":4,"x":-417.26337,"y":406.03506,"attributes":{"modularity_class":0}},{"id":"6","name":"Champtercier","symbolSize":4,"x":-332.6012,"y":485.16974,"attributes":{"modularity_class":0}},{"id":"7","name":"Cravatte","symbolSize":4,"x":-382.69568,"y":475.09113,"attributes":{"modularity_class":0}},{"id":"8","name":"Count","symbolSize":4,"x":-320.384,"y":387.17325,"attributes":{"modularity_class":0}},{"id":"9","name":"OldMan","symbolSize":4,"x":-344.39832,"y":451.16772,"attributes":{"modularity_class":0}}],"links":[{"id":"0","name":null,"source":"1","target":"0","lineStyle":{"normal":{}}},{"id":"1","name":null,"source":"2","target":"0","lineStyle":{"normal":{}}},{"id":"2","name":null,"source":"3","target":"0","lineStyle":{"normal":{}}},{"id":"3","name":null,"source":"3","target":"2","lineStyle":{"normal":{}}},{"id":"4","name":null,"source":"4","target":"0","lineStyle":{"normal":{}}},{"id":"5","name":null,"source":"5","target":"0","lineStyle":{"normal":{}}},{"id":"6","name":null,"source":"6","target":"0","lineStyle":{"normal":{}}},{"id":"7","name":null,"source":"7","target":"0","lineStyle":{"normal":{}}},{"id":"8","name":null,"source":"8","target":"0","lineStyle":{"normal":{}}},{"id":"9","name":null,"source":"9","target":"0","lineStyle":{"normal":{}}},{"id":"13","name":null,"source":"11","target":"0","lineStyle":{"normal":{}}},{"id":null,"name":null,"source":"11","target":"2","lineStyle":{"normal":{}}}]};
    graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.symbolSize *=3;
        node.label = {
            normal: {
                show: true
            }
        };
        node.category = node.attributes.modularity_class;
    });
    var graphOption = {
        animation: false,
        series : [
            {
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                roam: true,
                focusNodeAdjacency: true,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: "#fff",
                        position: 'inside',
                        verticalAlign:'middle'
                    },
                    emphasis: {
                        color: '#333'
                    }
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    lineStyle: {
                        width: 10
                    },
                }
            }
        ]
    };

    graphChart.setOption(graphOption);
    /**
     * 排行分析-----表格
     */
    var $table = $("#table");
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
                    field: 'field6',
                    title: '线索量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '转化率',
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
    initTable();
});