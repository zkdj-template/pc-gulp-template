
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

    /*添加竞品*/
    $('#add_item').click(function(){
        if($(this).parent().siblings().length>5){
            return
        }else{
            $(this).parent().before("<div class=\"col-md-1\"><input class=\"form-control\" type=\"text\"></div>")
        }

    })


    /*指数趋势*/
    var exponent = echarts.init(document.getElementById('exponent'),'customed');
    var exponentOption = {
        color:['#FFC939','#9E84F5','#2A93ED','#20D7DA'],
        tooltip: {
            trigger: 'axis'
        },
        legend:{
            type: 'plain',
            show: true,
            top: 'top',
            right: '3%',
            data: [
                {
                    name: '邮件营销',
                    icon: 'circle'
                },
                {
                    name: '邮件营销1',
                    icon: 'circle'
                }
                ,
                {
                    name: '邮件营销2',
                    icon: 'circle'
                }
                ,
                {
                    name: '邮件营销3',
                    icon: 'circle'
                }
            ]
        },

        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        grid: {
            left: '3%',
            right: '5%',
            containLabel: false
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
                data:[125, 136, 181, 174, 80, 210, 270]
            },
            {
                name:'邮件营销1',
                type:'line',
                stack: '总量1',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'邮件营销2',
                type:'line',
                stack: '总量2',
                data:[20, 32, 11, 34, 9, 23, 21]
            },
            {
                name:'邮件营销3',
                type:'line',
                stack: '总量3',
                data:[720, 432, 201, 334, 490, 530, 310]
            },

        ]
    };
    exponent.setOption(exponentOption);


    /*时间轴*/
    var timeLength = $('.time-box li').length,
        timeliWidth = $('.time-box li').outerWidth();
    var index = 0;
    $('.time-box ul').width(timeLength * timeliWidth);
    function slideOne(i) {
        var scrollVal = i * timeliWidth; //每次切换的数量
        $('.time-box').stop().animate({
            scrollLeft: scrollVal
        }, 300);
    }
    $('.time-box ul li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
    $('.right-btn').click(function() {
        index = index >= (timeLength-4) ? 0 : index + 1;
        slideOne(index);
    })
    $('.left-btn').click(function() {
        index = index <= 0 ? (timeLength-4) : index - 1;
        slideOne(index);
    })
})()