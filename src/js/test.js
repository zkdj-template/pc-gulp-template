/**
 * Created by zhangxin on 2018/6/4.
 */
$(function () {
    /**
     * 页面加载，初始化echarts图表
     * topOption 是图表的配置
     */
    var topCharts = echarts.init(document.getElementById("ids"),'customed');
    var topOption = {
        legend: {
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
        }
    };

    /**
     * 渲染echarts图表的方法
     */
    function renderCharts(){
        /**
         * 获取form表单内的参数
         * @type {*}
         */
        var params = $("form").buildFormData();
        /**
         * 把不在form表单内的参数，跟form表单内的参数合并
         * @type {string}
         */
        params.xxx = "form表单以外的参数";
        /**
         * 获取#select的值，跟form表单内的参数进行合并
         * @type {*}
         */
        params.selected = $("#select").selectpicker("val");

        $.ajax({
            url: '',       // 请求地址
            asycn: true,  // 是否异步，默认为true，如果是异步请求，这行可以忽略。
            method: 'post',  // 请求方式
            data: params,  //接口需要的参数
            dataType: 'json',  //服务器返回的数据类型  可用值：xml,html,script,json,jsonp,text
            beforeSend: function (xhr) {
                /**
                 * 方法说明：
                 * ajax请求发送之前调用
                 * xhr ===> XMLHttpRequest
                 */

                topCharts.showLoading();   //请求开始，打开echarts的loading动画
            },
            complete: function (xhr, ts) {
                /**
                 * 方法说明：
                 * ajax请求完成之后（无论成功、失败）调用
                 * xhr ===> XMLHttpRequest
                 * ts  ===> textStatus
                 */

                topCharts.hideLoading();   //请求完成   关闭echarts的loading动画
            },
            success: function (result) {
                /**
                 * 方法说明：
                 * ajax请求成功之后调用
                 * result ===> 返回值
                 */

                /**
                 * 步骤说明
                 * 解析result内可用的数据
                 * 拼装成echarts图表可用的格式。
                 */

                topOption.legend.data = ["aaa","bbb"];  // 修改图例的内容
                topOption.xAxis.data = ["sssss","assssas"];  // 修改X轴显示的内容
                topOption.series[0].data = [123123,12392,1002,102082];  // 修改第一条数据
                topOption.series[1].data = [3123,392,1002,12082,102];  // 修改第二条数据

                topCharts.setOption(topOption, true);
            },
            error: function (xhr, textStatus, errorThrown) {
                /**
                 * 方法说明：
                 * ajax请求成功之后调用
                 * xhr ===> XMLHttpRequest
                 * ts  ===> textStatus
                 * thrown  ===> errorThrown
                 */
            }
        })
    };
    /**
     * 渲染select的方法
     *
     */
    function renderSelect(){
        var params = {
            a:1,
            b:2
        };
        $.ajax({
            url: '',       // 请求地址
            asycn: true,  // 是否异步，默认为true，如果是异步请求，这行可以忽略。
            method: 'post',  // 请求方式
            data: params,  //接口需要的参数
            dataType: 'json',  //服务器返回的数据类型  可用值：xml,html,script,json,jsonp,text
            beforeSend: function (xhr) {
                /**
                 * 方法说明：
                 * ajax请求发送之前调用
                 * xhr ===> XMLHttpRequest
                 */

            },
            complete: function (xhr, ts) {
                /**
                 * 方法说明：
                 * ajax请求完成之后（无论成功、失败）调用
                 * xhr ===> XMLHttpRequest
                 * ts  ===> textStatus
                 */

            },
            success: function (result) {
                /**
                 * 方法说明：
                 * ajax请求成功之后调用
                 * result ===> 返回值
                 */

                /**
                 * 步骤说明
                 * 解析result内可用的数据
                 * [{name:xxx,text: xxx},{name:xxx,text: xxx}]。
                 */
                var selectOption = [
                        {name:'xxx',text: 'xxx'},
                        {name:'yyy',text: 'yyy'}
                    ];
                $("#select").buildSelectOption(selectOption).selectpicker('val','xxx');  // 给select插入option,并给select赋值
                /**
                 * 渲染echart图表
                 */
                renderCharts();
            },
            error: function (xhr, textStatus, errorThrown) {
                /**
                 * 方法说明：
                 * ajax请求成功之后调用
                 * xhr ===> XMLHttpRequest
                 * ts  ===> textStatus
                 * thrown  ===> errorThrown
                 */
            }
        });
    };

    /**
     * 初始化调用渲染select框的方法
     */
    renderSelect();

    /**
     * 点击搜索按钮，重新渲染echarts图表
     */
    $("#search").on("click",function () {
        renderCharts();
    });

    /**
     * 下拉框的值发生改变，重新渲染图表
     */
    $("#select").on("changed.bs.select",function () {
        renderCharts();
    });
});