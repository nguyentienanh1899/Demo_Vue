<template>
  <div :class="{error:errorMsg}">
    <label>{{ labelText }}<span v-if="isRequired" class="cl-red">(*)</span></label
    ><br />
    <input type="text" class="textbox-default" :class="{'input-notvalid':errorMsg}"
    v-model="inputValue" 
    @input="onInput" 
    @blur="validateInputOnBlur()"
    />
    <div class="tooltiptext">{{errorMsg}}</div>
  </div>
</template>

<script>
import ValidateCommon from "../../scripts/validate"
export default {
  name: "BaseFieldInput",
  props: {
    labelText: String,
    isRequired:Boolean,
    originValue:String,
    dataType:String,
  },
  data() {
    return {
        inputValue:"",
        errorMsg:""
    };
  },
  watch:{
      originValue : function(){
          this.inputValue = this.originValue;
      }
  },
  methods: {
      onInput(){
          this.$emit("input",this.inputValue);
      },
      validateInputOnBlur(){
        console.log("validating")
        this.errorMsg=null
        this.errorMsg = ValidateCommon.validateType(this.isRequired,this.dataType,this.inputValue);
        if(!this.errorMsg){
          return true
        }
        return false;
      }
  },
};
</script>

<style>
</style>