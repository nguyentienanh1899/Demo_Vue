<template>
  <div id="cbbPosition" class="m-combobox" style="width: 260px">
    <input
      type="text"
      class="m-combobox-input"
      v-model="selectedItem[itemText]"
      @input="comboboxOnInput($event.target.value)"
    />
    <button class="m-combobox-button">
      <div class="arrow" @click="arrowBtnOnClick"></div>
    </button>
    <div class="m-combobox-select" :class="{ 'd-none': isHideItem }">
      <div
        class="m-combobox-item"
        :class="{ 'm-item-selected': item[itemId] == selectedItem[itemId] }"
        v-for="item in filteredItems"
        :key="item[itemId]"
        @click="itemOnClick(item)"
      >
        {{ item[itemText] }}
      </div>
      <!-- <div class="m-combobox-item" value="1">Kinh doanh</div>
      <div class="m-combobox-item" value="2">Nhân sự</div>
      <div class="m-combobox-item m-item-selected" value="3">Phát triển</div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Resources from "../../scripts/Resources";
export default {
  name: "BaseCombobox",
  props: {
    itemId: String,
    itemText: String,
    myUrl: String,
    originId:String
    // comboboxItems:Array,
  },

  data() {
    return {
      comboboxItems: [],
      filteredItems: [],
      isHideItem: true,
      selectedItem: {},
    };
  },
  created() {
    this.loadDataCombobox();
  },
  watch:{
    originId:function(){
      console.log("loadorigin",this.originId);
      this.loadDataCombobox();
    }
  },
/*   mounted() {
    console.log(this.comboboxItems);
    this.filteredItems = this.comboboxItems;
  }, */

  methods: {
    /**
     * Sự kiện bấm mũi tên hiển thị list item
     */
    arrowBtnOnClick() {
      this.isHideItem = !this.isHideItem;
    },
    /**
     * Tìm item được truyền về từ đối tượng của hàm sửa
     */
    initValueCombobox(){
      for(let item of this.comboboxItems){
        if(item[this.itemId] == this.originId){
          this.itemOnClick(item);
        }
      }
    },

    itemOnClick(item) {
      let tmpObj = {};
      Object.assign(tmpObj, item);
      this.selectedItem = tmpObj;
      this.$emit("input", item[this.itemId]);
      this.isHideItem = true;
    },
    /**
     * Sự kiện nhập ô input của combobox tìm kết quả tương ứng
     */
    comboboxOnInput(value) {
      console.log(value);
      this.isHideItem = false;
      let newFilteredItems = [];
      if (value) {
        for (let item of this.comboboxItems) {
          if (item[this.itemText].includes(value)) {
            newFilteredItems.push(item);
          }
        }
        /*  if (!newFilteredItems.length) {
          let emptyItem = {};
          emptyItem[this.itemId] = -1;
          emptyItem[this.itemText] = "Không có kết quả phù hợp";
          newFilteredItems = [emptyItem];
        } */
        this.filteredItems = newFilteredItems;
      } else {
        this.filteredItems = this.comboboxItems;
      }
    },
    resetCombobox(){
      this.selectedItem = {};
    },
    /**
     * Load data Khởi tạo cho Combobox
     */
    async loadDataCombobox() {
      this.resetCombobox();
      switch (this.itemText) {
        case "GenderName":
          this.comboboxItems = [
            {
              Gender: "0",
              GenderName: Resources.VN.Gender.Female,
            },
            {
              Gender: "1",
              GenderName: Resources.VN.Gender.Male,
            },
          ];
          break;
        case "WorkStatusName":
          this.comboboxItems = [
            {
              WorkStatus: "0",
              WorkStatusName: Resources.VN.WorkStatus.Testing,
            },
            {
              WorkStatus: "1",
              WorkStatusName: Resources.VN.WorkStatus.Working,
            },
            {
              WorkStatus: "2",
              WorkStatusName: Resources.VN.WorkStatus.Quitted,
            },
          ];
          break;
        default:
          if (this.myUrl) {
            await axios
              .get(`${this.myUrl}`)
              .then((respone) => {
                this.comboboxItems = respone.data;
                
              })
              .catch((error) => {
                console.log(error);
              });
          }
          break;
      }
      this.filteredItems = this.comboboxItems;
      this.initValueCombobox();
    },
  },
};
</script>
<style>
@import "../../styles/Common/common.css";
</style>