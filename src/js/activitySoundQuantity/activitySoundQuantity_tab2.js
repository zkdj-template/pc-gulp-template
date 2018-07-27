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
    /**
     * 选择活动弹窗内的表格
     * @type {*}
     */
    var $table = $("#table"),
        $table2 = $("#table2"),//媒体
        $table3 = $("#table3");//文章
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
            pagination: true,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            columns: [
                {
                    field: 'id',
                    title: '活动ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '活动名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '推广车型',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '活动类型',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '区域',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '活动起止周期',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '项目状态',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    };
    function initTable2() {
        $table2.bootstrapTable({
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
            pagination: true,
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
                    field: 'field2',
                    title: '媒体',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '发布文章量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '负面文章量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
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
                    field: 'field7',
                    title: '评论回复量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '负面评论',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '负面评论占比',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table2.bootstrapTable('resetView');
        });
    };
    function initTable3() {
        $table3.bootstrapTable({
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
            pagination: true,
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
                    field: 'field2',
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
                    field: 'field4',
                    title: '作者',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '文章属性',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '阅读量',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
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
                    field: 'field9',
                    title: '负面评论占比',
                    sortable: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '发布日期',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table3.bootstrapTable('resetView');
        });
    };
    initTable2();
    /**
     * 当文章的tab标签页显示的时候，请求数据，展示table。只请求一次
     * @type {boolean}
     */
    var once = true;
    $("#myTab>li:eq(1)>a").on("shown.bs.tab",function () {
        if(once){
            initTable3();
            once = false;
        }
    });
    /**
     * 当窗口完全显示后，渲染图表
     */
    $('#myModal').on('shown.bs.modal', function (e) {
        initTable();
    });
});