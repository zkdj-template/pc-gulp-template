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
                    title: '排行',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '所在区域',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '所在省/市',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '单位代码',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '单位名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field9',
                    title: '任务数',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '完成数',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '完成率',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();
});