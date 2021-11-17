<template lang="">
    <div class="container-menu">
        <div class="item item-selected">
            <div class="item-icon dashboard"></div>
            <div class="item-name">Tổng quan</div>
        </div>
        <div class="item">
            <div class="item-icon report"></div>
            <div class="item-name">Báo cáo</div>
        </div>
        <div class="item">
            <div class="item-icon purchase "></div>
            <div class="item-name">Mua hàng</div>
        </div>
        <router-link class="item" to="/employee">
            <div class="item-icon employee-directory"></div>
            <div class="item-name">Danh mục nhân viên</div>
        </router-link>
        <router-link class="item" to="/customer">
            <div class="item-icon employee-directory"></div>
            <div class="item-name">Danh mục khách hàng</div>
        </router-link>
        <div class="item">
            <div class="item-icon setting"></div>
            <div class="item-name">Thiết lập hệ thống</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Menu"
}
</script>
<style scope>
    @import url('../../styles/Layout/container-menu.css');
</style>