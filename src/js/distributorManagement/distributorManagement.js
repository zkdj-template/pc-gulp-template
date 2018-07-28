/**
 * Created by zhangxin on 2018/7/28.
 */
$(function(){
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
                    field: 'id',
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '网络品牌',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '所在大区',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '省/市',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '市/区',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field6',
                    title: '单位代码',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '监管状态',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '地址',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '邮箱',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '电话',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field11',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function () {
                        return '<a href="javascript:void(0);"><i class="iconfont icon-bianji1"></i>编辑</a>  <a href="javascript:void(0);"><i class="iconfont icon-shanchu"></i>删除</a>'
                    }
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();
});