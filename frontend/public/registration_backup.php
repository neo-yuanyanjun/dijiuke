
<?php
/**
 * Created by PhpStorm.
 * User: zhucanxiang
 * Date: 16/9/29
 * Time: 下午8:27
 */
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi,width=750,user-scalable=0" />
    <title>第九课堂</title>
    <link rel="stylesheet" type="text/css" href="<?php echo $res_url; ?>/css/base.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $res_url; ?>/css/registration.css">
</head>
<body>
    <div class="header">
        <div class="btn-show-menu"></div>
    </div>
    <div class="module-registration">
        <div class="main-title">
            课程报名
        </div>
        <form action="/enter" method="post" id="form-registration">
            <div class="sub-title">
                报名课程信息
                <!-- <div class="btn btn-view-courses">查看最新开课计划</div> -->
            </div>
            <div class="form-row">
                <div class="form-label">报名课程</div>
                <input type="hidden" name="sub_course_id" value="<?php echo $sub_course['id'];?>">
                <div class="form-field">
                    <div class="wrapper-select">
                        <select name="course">
                            <option value="1"><?php echo $sub_course['name'];?></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">上课城市</div>
                <div class="form-field">
                    <div class="wrapper-select">
                        <select name="city">
                            <option value="1"><?php echo $sub_course['city'];?></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">开始时间</div>
                <div class="form-field">
                    <div class="wrapper-select">
                        <select name="time">
                            <option value="1"><?php echo $sub_course['time'];?></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">报名人数</div>
                <div class="form-field form-field-num">
                    <div class="ui-number" data-min="1" data-max="100" data-valid="int" data-value="1">
                        <div class="btn-plus">-</div>
                        <div class="number-input">
                            <input type="text" name="enter_num">
                        </div>
                        <div class="btn-add">+</div>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">报名费用</div>
                <div class="form-field form-field-cost">
                    <label for="cost-pre">
                        <input id="cost-pre" type="radio" name="pay_type" value="0" checked="">
                        ￥<?php echo $sub_course['deposit'];?>(定金)
                    </label>
                    <label for="cost-all">
                        <input id="cost-all" type="radio" name="pay_type" value="1">
                        ￥<?php echo $sub_course['price'];?>(全款)
                    </label>
                </div>
            </div>
            <div class="warning">
                *支付成功后，定金部分不予退还
            </div>
            <hr>
            <div class="sub-title">上课人员信息登记</div>
            <div class="form-row">
                <div class="form-label">真实姓名</div>
                <div class="form-field">
                    <input type="text" name="student_name" placeholder="(此项为必填项)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">手机号码</div>
                <div class="form-field">
                    <input type="text" name="student_phone_num" placeholder="(接收上课凭证)">
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">电子邮箱</div>
                <div class="form-field">
                    <input type="text" name="student_email" placeholder="(接收上课凭证)">
                </div>
            </div>
            <div class="warning">
                *请再次确认您的手机号码/电子邮箱，我们会发送上课凭证到你手机/电子邮箱
            </div>
            <hr>
            <div class="sub-title">特别说明</div>
            <div class="special-info">
                1.本课程可开具增值税普通发票，优惠政策不开发票<br>
                2.本课程定金不予退换<br>
                3.本课程内容版权均属第九课堂所有，课上不可录音录像，违者本公司将依法追究责任<br>
                *最终解释权归第九课堂所有。
            </div>
            <div class="sub-title">支付方式</div>
            <div class="pay-by">
                <div class="alipay">
                    <label for="alipay">
                        <img src="<?php echo $res_url; ?>/img/alipay.png" alt=""><br>
                        <input id="alipay" type="radio" name="pay_channel" value="0" checked>支付宝
                    </label>
                </div>
                <div class="weixin">
                    <label for="weixin">
                        <img src="<?php echo $res_url; ?>/img/weixin.png" alt=""><br>
                        <input id="weixin" type="radio" name="pay_channel" value="1">微信
                    </label>
                </div>
            </div>
            <div class="summary">
                您即将预约<span class="time"><?php echo $sub_course['time'];?></span>的<span class="city"><?php echo $sub_course['city'];?></span>站《<span class="course-name"><?php echo $sub_course['name'];?></span>》<span class="num">1</span>个上课名额<br>
                预约费用金额为：￥<span class="cost">499</span>
            </div>
            <div class="wrapper-btn">
                <button type="submit" class="btn-pay">确认支付</button>
            </div>
        </form>
    </div>
    <script src="<?php echo $res_url; ?>/lib/zepto/zepto.min.js"></script>
    <script src="<?php echo $res_url; ?>/lib/zepto/zepto.touch.js"></script>
    <script src="<?php echo $res_url; ?>/js/registration.js"></script>
</body>
</html>