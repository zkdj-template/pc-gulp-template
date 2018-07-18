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
                left: '30%',
                right: '30%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一'],
                    axisLabel: {
                        show: false
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
                    name:'百度',
                    type:'bar',
                    barWidth: 70,
                    stack: '搜索引擎',
                    data:[620]
                },
                {
                    name:'谷歌',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[120]
                },
                {
                    name:'必应',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[60]
                },
                {
                    name:'其他',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[62]
                }
            ]
        };
    barChart.setOption(BarOption);

    /**
     * 线索状态占比
     */
    var pieOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     icon: 'circle',
        //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
        // },
        series: [
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
        legend: {
            orient: 'vertical',
            x: 'left',
            icon: 'circle',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '55%'],
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
    var pieChart = echarts.init(document.getElementById("pie"),"customed"),
        pie2Chart = echarts.init(document.getElementById("pie2"),"customed");
    pieChart.setOption(pieOption);
    pie2Chart.setOption(pie2Option);

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
});