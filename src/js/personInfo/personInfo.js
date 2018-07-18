/**
 * Created by zhangxin on 2018/5/23.
 */
$(function () {
    $("#form1").bootstrapValidator({
        live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
        excluded: [':disabled', ':hidden', ':not(:visible)'],//排除无需验证的控件，比如被禁用的或者被隐藏的
        submitButtons: '#save',//提交按钮
        message: '请输入正确的内容',
        fields:{
            id: {
                validators: {
                    notEmpty:{
                        message: '员工编号不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '员工编号长度必须在6到18位之间'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: '用户名只能是数字'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty:{
                        message: '姓名不能为空'
                    },
                    stringLength: {
                        min: 4,
                        max: 10,
                        message: '姓名的长度2-5个中文字符'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    },
                    emailAddress: {
                        message: '邮箱地址格式错误'
                    }
                }
            },
            dept: {
                validators: {
                    notEmpty: {
                        message: '部门名称不能为空'
                    },
                    stringLength: {
                        min: 1,
                        max: 50,
                        message: '部门名称长度不能超过25个字'
                    }
                }
            },
            phoneNumber: {
                validators: {
                    notEmpty: {
                        message: '手机号不能为空'
                    },
                    regexp: {
                        regexp: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                        message: '请输入正确的手机号'
                    }
                }
            }
        }
    });
    $("#save").click(function () {//非submit按钮点击后进行验证，如果是submit则无需此句直接验证
        $("#form1").bootstrapValidator('validate');//提交验证
        if ($("#form1").data('bootstrapValidator').isValid()) {//获取验证结果，如果成功，执行下面代码
            alert("yes");//验证成功后的操作，如ajax
        }else{
            alert("no");
        }
    });
    $("#form2").bootstrapValidator({
        live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
        excluded: [':disabled', ':hidden', ':not(:visible)'],//排除无需验证的控件，比如被禁用的或者被隐藏的
        submitButtons: '#save2',//提交按钮
        message: '请输入正确的内容',
        fields:{
            oldPassword: {
                validators: {
                    notEmpty:{
                        message: '原密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '原密码的长度6-16个字符'
                    }
                }
            },
            newPassword: {
                validators: {
                    notEmpty:{
                        message: '新密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '新密码的长度6-16个字符'
                    }
                }
            },
            reNewPassword: {
                validators: {
                    notEmpty:{
                        message: '请输入新密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '新密码的长度6-16个字符'
                    },
                    identical: {
                        field: 'newPassword',
                        message: '两次输入的内容不一致'
                    }
                }
            }
        }
    });
    $("#save2").click(function () {//非submit按钮点击后进行验证，如果是submit则无需此句直接验证
        $("#form2").bootstrapValidator('validate');//提交验证
        if ($("#form2").data('bootstrapValidator').isValid()) {//获取验证结果，如果成功，执行下面代码
            alert("yes");//验证成功后的操作，如ajax
        }else{
            alert("no");
        }
    });
});