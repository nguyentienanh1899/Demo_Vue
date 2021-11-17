<template lang="">
    <div class="container-header">
        <div class="container-header-left">
            <div class="toggle"></div>
        </div>
        <div class="container-header-right">
            <div class="restaurant-selector">
                <div class="restaurant-name"><b>Nhà hàng Biển Đông</b></div>
                <div class="arrow"></div>
            </div>
            <div class="user">
                <div class="user-avatar"></div>
                <div class="user-name">Nguyễn Tiến Anh</div>
                <div class="user-selector-function"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Header"
}
</script>
<style scope>
    @import url('../../styles/Layout/container-header.css');
</style>