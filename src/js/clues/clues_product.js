/**
 * Created by zhangxin on 2018/5/23.
 */
$(function () {
    $(".btn-box").on("click",'.btn-link',function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    /**
     * 初始化选择框
     */
    $('input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });
    /*******************
     * ************************按项目****************************
     */
    /**
     * 柱状图-全国top10
     */
    var barChart = echarts.init(document.getElementById("bar"),"customed");
    var BarOption = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['百度','谷歌','必应','其他']
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
                    data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',],
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'百度',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[620,1200,230,90,900,162,630,865,543,345,120,1000]
                },
                {
                    name:'谷歌',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[120,1200,230,90,900,162,630,865,543,345,120,1000]
                },
                {
                    name:'必应',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[60,1200,230,90,900,162,630,865,543,345,120,1000]
                },
                {
                    name:'其他',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[62,1200,230,90,900,162,630,865,543,345,120,1000]
                }
            ]
        };
    barChart.setOption(BarOption);

    var bar2Chart = echarts.init(document.getElementById('bar2'),'customed');
    var bar2Option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data:['降水量','平均温度']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '水量',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '温度',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 1,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };
    bar2Chart.setOption(bar2Option);
});