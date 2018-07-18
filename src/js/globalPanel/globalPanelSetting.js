/**
 * Created by zhangxin on 2018/5/23.
 */

var $table = $("#table"),
    $table2 = $("#table2");

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
                field: 'id',
                title: '首页名称',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'field2',
                title: '类型',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '是否可见',
                align: 'center',
                valign: 'middle',
                events: operateEvents,
                formatter: function() {
                    var a = [
                        '<a href="javascript:void(0);" title="Remove" class="onOff"><span class="text-blue">是</span><i class="iconfont icon-kaiguan3" style="font-size: 30px;"></i><span>否</span></a>'
                    ].join('');
                    return a;
                }
            },
            {
                title: '排序',
                align: 'center',
                valign: 'middle',
                // events: operateEvents,
                formatter: function() {
                    var a = [
                        '<a href="javascript:void(0);"><i class="iconfont icon-shangjiantou"></i>上移</a>  ',
                        '<a href="javascript:void(0);"><i class="iconfont icon-xiajiantou"></i>下移</a>'
                    ].join('');
                    return a;
                }
            }
        ]
    });
}

function initTable2() {
    $table2.bootstrapTable({
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
                title: '首页名称',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'field2',
                title: '类型',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '是否可见',
                align: 'center',
                valign: 'middle',
                events: operateEvents,
                formatter: function() {
                    var a = [
                        '<a href="javascript:void(0);" title="Remove" class="onOff"><span class="text-blue">是</span><i class="iconfont icon-kaiguan3" style="font-size: 30px;"></i><span>否</span></a>'
                    ].join('');
                    return a;
                }
            },
            {
                title: '排序',
                align: 'center',
                valign: 'middle',
                // events: operateEvents,
                formatter: function() {
                    var a = [
                        '<a href="javascript:void(0);"><i class="iconfont icon-shangjiantou"></i>上移</a>  ',
                        '<a href="javascript:void(0);"><i class="iconfont icon-xiajiantou"></i>下移</a>'
                    ].join('');
                    return a;
                }
            }
        ]
    });
}
window.operateEvents = {
    'click .onOff': function (e, value, row, index) {
        var _thisOnOff = $(this).find('.iconfont');
        _thisOnOff.hasClass('icon-kaiguan4') ? _thisOnOff.removeClass('icon-kaiguan4').prev().addClass('text-blue').siblings().removeClass("text-blue") : _thisOnOff.addClass('icon-kaiguan4').next().addClass('text-blue').siblings().removeClass("text-blue")
    }
};

initTable();
initTable2();