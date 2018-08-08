(function(){
    var $table = $("#table")
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
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '导入日期批号',
                    align: 'center',
                    valign: 'middle',
                formatter: function (value) {
                return '<a href="./public_Initiative_table_detail.html" ' +
                '>'+ value +'</a>'
                }
                },
                {
                    field: 'field3',
                    title: '文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '总阅读量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '总评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '总评论回复量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '总负面评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function () {
                        return '' +
                            '<div class="no-break-warp">'+
                            '<a href="javascript:void(0);">编辑<i class="iconfont icon-bianji1"></i></a>  ' +
                            '<a href="javascript:void(0);">删除<i class="iconfont icon-shanchu"></i></a>'
                            +'</div>'
                    }
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();

    var $table2 = $("#table2")
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
                    title: '导入日期批号',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'field3',
                    title: '文章量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '总阅读量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '总评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '总评论回复量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '总负面评论量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function () {
                        return '' +
                            '<div class="no-break-warp">'+
                            '<a href="javascript:void(0);">编辑<i class="iconfont icon-bianji1"></i></a>  ' +
                            '<a href="javascript:void(0);">删除<i class="iconfont icon-shanchu"></i></a>'
                            +'</div>'
                    }
                }
            ]
        });
        $(window).resize(function () {
            $table2.bootstrapTable('resetView');
        });
    }
    initTable2();
})()