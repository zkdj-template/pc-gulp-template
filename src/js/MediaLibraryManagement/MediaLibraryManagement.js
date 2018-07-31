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
            pagination: true,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            columns: [
                {
                    title: '序号',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle',
                    formatter:function(value,row,index){
                    }

                },
                {
                    field: 'id',
                    title: '序号',
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field2',
                    title: '媒介ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '媒介平台',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '主媒介',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '分媒介',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '媒体名称',
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field6',
                    title: '频道栏目/站点/<br>ID/主页',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '参加公关<br>活动次数',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '关联主动<br>传播次数',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '级别',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '影响范围',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '省份',
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field5',
                    title: '城市',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '邮箱',
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field6',
                    title: '联系电话',
                    align: 'center',
                    valign: 'middle',

                },
                {
                    field: 'field11',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function () {
                        return '' +
                            '<a href="javascript:void(0);">编辑<i class="iconfont icon-bianji1"></i></a>  ' +
                            '<br/>'+
                            '<a href="javascript:void(0);">删除<i class="iconfont icon-shanchu"></i></a>'
                    }
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();
    $('#Email_to').click(function(){
        var selectContent = $table.bootstrapTable('getSelections');
        /*判断有没有数据，显示对应模态框*/
        selectContent.length>0?$("#modal_yes").modal('show'):$("#modal_no").modal('show')
    });

});