/**
 * Created by zhangxin on 2018/5/23.
 */
$(function () {
    /**
     * bootstrap-table
     * @type a
     */
    $("[data-toggle='tooltip']").tooltip();
    $(document).on("click",".tooltip .btn",function () {
        alert($(this).text());
    });
});