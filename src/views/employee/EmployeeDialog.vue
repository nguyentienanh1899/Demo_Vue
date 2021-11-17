<template>
  <div
    ref="dlgDetail"
    id="dlgCustomerDetail"
    class="container-dialog"
    :class="{ isnone: isHidden }"
  >
    <div class="container-dialog-modal"></div>
    <div class="container-dialog-box">
      <div class="container-dialog-header">
        <div class="container-dialog-title">Thông tin nhân viên</div>
        <div class="container-dialog-close" @click="btnCloseOnClick"></div>
      </div>
      <div class="container-dialog-content">
        <div class="avatar">
          <div class="image"></div>
          <!-- sửa thành dùng Whitespace vs wrap -->
          <div class="text-center">(Vui lòng chọn ảnh có định</div>
          <div class="text-center">dạng</div>
          <div class="text-center">.jqg,.jepg,.png,.gif.)</div>
        </div>
        <div class="private-info">
          <div class="A">
            <div>A. THÔNG TIN CHUNG:</div>
            <div class="line"></div>
            <div class="row">
              <div class="col">
                <BaseFieldInput
                  :isRequired="true"
                  labelText="Mã nhân viên"
                  v-model="employee.EmployeeCode"
                  :originValue="employee.EmployeeCode"
                  ref="ValidateFieldCode"
                />
              </div>
              <div class="col">
                <BaseFieldInput
                  :isRequired="true"
                  labelText="Họ và tên"
                  v-model="employee.FullName"
                  :originValue="employee.FullName"
                  ref="ValidateFullName"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for=""> Ngày sinh </label>
                <DatePicker
                  v-model="employee.DateOfBirth"
                  :format="'DD-MM-YYYY'"
                  :value-type="'YYYY-MM-DD'"
                  :placeholder="'DD-MM-YYYY'"
                  :disabled-date="(date) => date >= new Date()"
                >
                  <BaseFieldInput
                    :isRequired="false"
                    v-model="employee.DateOfBirth"
                    :originValue="employee.DateOfBirth"
                  />
                </DatePicker>
              </div>
              <div class="col">
                <label for="">Giới tính</label><br />
                <BaseComboBox
                  itemId="Gender"
                  itemText="GenderName"
                  myUrl=""
                  v-model="employee.Gender"
                  :originId="employee.Gender + ''"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <BaseFieldInput
                  :isRequired="true"
                  labelText="Số CCCD/CMND"
                  v-model="employee.IdentityNumber"
                  :originValue="employee.IdentityNumber"
                  ref="ValidateIdentityNumber"
                />
              </div>
              <div class="col">
                <label for=""> Ngày cấp </label>
                <DatePicker
                  v-model="employee.IdentityDate"
                  :format="'DD-MM-YYYY'"
                  :value-type="'YYYY-MM-DD'"
                  :placeholder="'DD-MM-YYYY'"
                  :disabled-date="(date) => date >= new Date()"
                >
                  <BaseFieldInput
                    :isRequired="false"
                    v-model="employee.IdentityDate"
                    :originValue="employee.IdentityDate"
                  />
                </DatePicker>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <BaseFieldInput
                  :isRequired="false"
                  labelText="Nơi cấp"
                  v-model="employee.IdentityPlace"
                  :originValue="employee.IdentityPlace"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <BaseFieldInput
                  :isRequired="true"
                  labelText="Email"
                  v-model="employee.Email"
                  :originValue="employee.Email"
                  dataType="Email"
                  ref="ValidateEmail"
                />
              </div>
              <div class="col">
                <BaseFieldInput
                  :isRequired="true"
                  labelText="Số điện thoại"
                  v-model="employee.PhoneNumber"
                  :originValue="employee.PhoneNumber"
                  ref="ValidatePhoneNumber"
                />
              </div>
            </div>
          </div>
          <div class="B">
            <div>B.THÔNG TIN CÔNG VIỆC</div>
            <div class="line"></div>
            <div class="row">
              <div class="col">
                <label for="">Phòng ban</label><br />
                <BaseComboBox
                  itemId="DepartmentId"
                  itemText="DepartmentName"
                  myUrl="http://cukcuk.manhnv.net/api/v1/Departments"
                  v-model="employee.DepartmentId"
                  :originId="employee.DepartmentId + ''"
                />
              </div>
              <div class="col">
                <label for="">Vị trí</label><br />
                <BaseComboBox
                  itemId="PositionId"
                  itemText="PositionName"
                  myUrl="http://cukcuk.manhnv.net/api/v1/Positions"
                  v-model="employee.PositionId"
                  :originId="employee.PositionId + ''"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <BaseFieldInput
                  :isRequired="false"
                  labelText="Mã số thuế"
                  v-model="employee.PersonalTaxCode"
                  :originValue="employee.PersonalTaxCode"
                />
              </div>
              <div class="col">
                <BaseFieldInput
                  :isRequired="false"
                  labelText="Mức lương"
                  v-model="employee.Salary"
                  :originValue="employee.Salary"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for=""> Ngày gia nhập công ty </label>
                <DatePicker
                  v-model="employee.JoinDate"
                  :format="'DD-MM-YYYY'"
                  :value-type="'YYYY-MM-DD'"
                  :placeholder="'DD-MM-YYYY'"
                  :disabled-date="(date) => date >= new Date()"
                >
                  <BaseFieldInput
                    :isRequired="false"
                    v-model="employee.JoinDate"
                    :originValue="employee.JoinDate"
                  />
                </DatePicker>
              </div>
              <div class="col">
                <label for="">Tình trạng công việc</label><br />
                <BaseComboBox
                  itemId="WorkStatus"
                  itemText="WorkStatusName"
                  v-model="employee.WorkStatus"
                  :originId="employee.WorkStatus + ''"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-dialog-footer">
        <button class="button save" id="btnSave" @click="onClickBtnSave">
          Lưu
        </button>
        <button class="button create">Thêm</button>
        <button class="button cancel" id="btnCancel" @click="btnCloseOnClick">
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import BaseFieldInput from "../../components/Base/BaseFieldInput.vue";
import BaseComboBox from "../../components/Base/BaseCombobox.vue";
import axios from "axios";
export default {
  name: "EmployeeDialog",
  components: {
    BaseComboBox,
    BaseFieldInput,
    DatePicker,
  },
  props: {
    isHidden: Boolean,
    employeeEdit: Object,
  },
  data() {
    return {
      employee: {},
      formMode: 0,
      validate: [
        "ValidateFieldCode",
        "ValidateFullName",
        "ValidateIdentityNumber",
        "ValidateEmail",
      ],
    };
  },
  methods: {
    btnCloseOnClick() {
      this.$emit("closeEmployeeDialog");
    },
    changeFormMode(formMode) {
      this.formMode = formMode;
      this.employee = this.employeeEdit;
      console.log("EMployee", this.employee);
    },
    async onClickBtnSave() {
      let hasError = false;
      this.validate.forEach((i) => {
        if (!this.$refs[i].validateInputOnBlur()) hasError = true;
      });
      if (!hasError) {
        if (this.formMode == 0) {
          //Call Api và Thêm Mơi
          axios
            .post("http://cukcuk.manhnv.net/api/v1/Employees", this.employee)
            .then((respone) => {
              console.log(respone);
              this.btnCloseOnClick();
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (this.formMode == 1) {
          //Call Api và sửa
          await axios
            .put(
              `http://cukcuk.manhnv.net/api/v1/Employees/${this.employee.EmployeeId}`,
              this.employee
            )
            .then((respone) => {
              console.log(respone);
              this.btnCloseOnClick();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }else{
        alert("lỗi :v")
      }
    },
  },
};
</script>

<style>
@import url("../../styles/Component/datepicker.css");
@import url("../../styles/Component/dialog.css");
</style>