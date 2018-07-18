/**
 * Created by zhangxin on 2018/5/19.
 */
$(function () {
    /**
     * bootstrap-table
     * @type a
     */
    var $table = $("#table");
    function initTable() {
        $table.bootstrapTable({
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
                    field: 'field2',
                    title: '车系',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '车系ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '媒体名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field5',
                    title: '媒体ID',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '广告位名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field8',
                    title: '广告素材',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '投放原生URL',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '曝光监测代码',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field10',
                    title: '点击监测代码',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        // sometimes footer render error.
        setTimeout(function () {
            $table.bootstrapTable('resetView');
        }, 200);
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    }
    initTable();
})