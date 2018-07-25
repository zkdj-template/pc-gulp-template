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
    /*初始化导出*/
    $('.stop-event input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });

    $('.s_a').click(function(){
        $(this).addClass("blue_text")
        $(this).siblings().removeClass('blue_text')
    })

    var $table_media = $("#table_media");
    function initTable_media() {
        $table_media.bootstrapTable({
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
                    title: '媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '文章量',
                    sortable: true,
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
            ]
        });
    }
    initTable_media();

    var $table_article = $("#table_article");
    function initTable_article() {
        $table_article.bootstrapTable({
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
                    title: '媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '文章量',
                    sortable: true,
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
            ]
        });
    }
    initTable_article();
})()