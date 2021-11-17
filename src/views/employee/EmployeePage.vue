<template>
  <div>
    <div class="container-content-header">
      <div class="title">Danh sách nhân viên</div>
      <div class="container-content-header-btn">
        <BaseButton
          id="btnDeleted"
          buttonText="Xóa nhân viên"
          @btn-click="btnDeletedOnClick"
        />
        <BaseButton
          id="btnAdd"
          buttonText="Thêm Nhân viên"
          @btn-click="showAddForm(0)"
        />
      </div>
    </div>
    <div class="container-content-filter">
      <div class="container-content-filter-left">
        <div class="filter-search">
          <input
            class="field-input"
            type="text"
            placeholder="Tìm theo mã, Tên hoặc Số điện thoại"
          />
        </div>
        <div class="filter-department">
          <div id="cbbPosition" class="m-combobox" style="width: 200px">
            <input type="text" class="m-combobox-input" value="Phòng ban" />
            <button class="m-combobox-button">
              <div class="arrow"></div>
            </button>
            <div class="m-combobox-select d-none">
              <div class="m-combobox-item" value="1">Kinh doanh</div>
              <div class="m-combobox-item" value="2">Nhân sự</div>
              <div class="m-combobox-item m-item-selected" value="3">
                Phát triển
              </div>
            </div>
          </div>
        </div>
        <div class="filter-position">
          <div class="m-combobox" style="width: 200px">
            <input type="text" class="m-combobox-input" value="Vị trí" />
            <button class="m-combobox-button">
              <div class="arrow"></div>
            </button>
            <div class="m-combobox-select d-none">
              <div class="m-combobox-item">Giám đốc</div>
              <div class="m-combobox-item">Trưởng phòng</div>
              <div class="m-combobox-item m-item-selected">Nhân viên</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-content-filter-right"></div>
    </div>
    <div class="container-table-employee">
      <table id="tbListData">
        <thead>
          <tr>
            <th>
              <div class="checkbox"></div>
            </th>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Mức lương cơ bản</th>
            <th>Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.EmployeeId"
            @dblclick="dbOnClickTR(employee.EmployeeId)"
            :id="employee.EmployeeId"
          >
            <td><div class="checkbox" @click="onClickCheckBox"></div></td>
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td>{{ employee.DateOfBirth | FormatDateDMY }}</td>
            <td>{{ employee.PhoneNumber }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.PositionName }}</td>
            <td>{{ employee.DepartmentName }}</td>
            <td>{{ employee.Salary | FormatMoney }}</td>
            <td>{{ employee.WorkStatus | FormatWorkStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container-pages">
      <div class="record-captions">Hiển thị 1-10/1000 nhân viên</div>
      <div class="page-list">
        <div class="btn first-page"></div>
        <div class="btn prev-page"></div>
        <div class="btn page-number">1</div>
        <div class="btn page-number">2</div>
        <div class="btn page-number">3</div>
        <div class="btn page-number">4</div>
        <div class="btn next-page"></div>
        <div class="btn last-page"></div>
      </div>
      <div class="number-record">10 nhân viên/trang</div>
    </div>
    <EmployeeDialog
      :isHidden="isHidden"
      @closeEmployeeDialog="closeEmployeeDialog"
      :employeeEdit="employeeEdit"
      ref="EmployeeDialog"
    />
  </div>
</template>

<script>
import axios from "axios";
import Resource from "../../scripts/Resources";
import EmployeeDialog from "../employee/EmployeeDialog.vue";
import BaseButton from "../../components/Base/BaseButton.vue";
export default {
  name: "EmployeePage",
  components: {
    EmployeeDialog,
    BaseButton,
  },

  data() {
    return {
      //form props
      isHidden: true,
      employeeEdit: {},
      employees: [],
      employee: {},
      employeeDelete: [],
      firstName: "",
    };
  },
  created() {
    this.loadData();
    // console.log(
    //   "2. created (trước khi gán lại data):" + this.employee.CustomerCode
    // );
    // this.employee = { CustomerCode: "NV0001" };
    // console.log(
    //   "3. created (sau khi gán lại data):" + this.employee.CustomerCode
    // );
  },
  filters: {
    //Chỉnh lại tên Hàm trong js chuẩn convention
    // format bằng Vue Date Picker
    FormatDateDMY(date) {
      date = new Date(date); //Khởi tạo biến chuẩn
      return (
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear()
      );
    },
    FormatWorkStatus(status) {
      var workStatus = "";
      switch (status) {
        case 0:
          workStatus = Resource.VN.WorkStatus.Testing;
          break;
        case 1:
          workStatus = Resource.VN.WorkStatus.Working;
          break;
        case 2:
          workStatus = Resource.VN.WorkStatus.Quitted;
          break;
        default:
          workStatus = "";
          break;
      }
      return workStatus;
    },
    FormatMoney(salary) {
      return (salary = new Intl.NumberFormat("vi-VI", {
        style: "currency",
        currency: "VND",
      }).format(salary));
    },
  },
  methods: {
    /**
     * Method load data
     */
    loadData() {
      var me = this;
      // Gọi API lấy dữ liệu:
      axios
        .get("http://cukcuk.manhnv.net/api/v1/Employees")
        .then(function (res) {
          console.log(res);
          me.employees = res.data;
          console.log(me.employees);
        })
        .catch(function (res) {
          console.log(res);
        });
    },
    /**
     * Method show Dialog
     */
    showAddForm(formMode) {
      this.isHidden = false;
      this.$refs.EmployeeDialog.changeFormMode(formMode);
      axios
        .get("http://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode")
        .then((res) => {
          this.employeeEdit = {};
          this.employeeEdit.EmployeeCode = res.data;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    /**
     * Method ẩn Dialog
     */
    closeEmployeeDialog() {
      this.isHidden = true;
      this.loadData();
    },
    /**
     * Sự kiện dbOnClickTR
     */
    async dbOnClickTR(EmployeeId) {
      let me = this;
      await axios
        .get(`http://cukcuk.manhnv.net/api/v1/Employees/${EmployeeId}`)
        .then((respone) => {
          me.employeeEdit = respone.data;
          console.log(respone.data);
        })
        .catch((error) => {
          console.log(error);
        });
      me.showAddForm(1);
    },
    /**
     * Sự kiện onClickCheckBox
     */
    onClickCheckBox(event) {
      event.currentTarget.classList.toggle("icon-checked");
    },
    /**
     * Sự kiện btnDeleteOnClick
     */
    btnDeletedOnClick() {
      var isSelectedListCheckBox = document.querySelectorAll(".icon-checked");
      isSelectedListCheckBox.forEach((element) => {
        var employeeIdDeleted =
          element.parentNode.parentNode.getAttribute("id");
        this.employeeDelete.push(employeeIdDeleted);
      });
      console.log("employeeDelete", this.employeeDelete);
      this.employeeDelete.forEach((e) => {
        axios
          .delete(`http://cukcuk.manhnv.net/api/v1/Employees/${e}`)
          .then((respone) => {
            console.log(respone);
            this.closeEmployeeDialog();
          })
          .catch((respone) => {
            console.log(respone);
          });
      });
    },
  },
};
</script>

<style>
@import url("../../styles/Layout/container-content.css");
</style>