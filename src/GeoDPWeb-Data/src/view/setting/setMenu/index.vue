<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增菜单</el-button>
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>菜单列表</span>
      </div>
      <el-table :data="tabData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="40"> </el-table-column>
        <el-table-column prop="name" label="唯一名称"> </el-table-column>
        <el-table-column prop="displayName" label="显示名称"> </el-table-column>
        <el-table-column prop="url" label="项导航地址"> </el-table-column>
        <el-table-column prop="icon" label="菜单图标名称"> </el-table-column>
        <el-table-column prop="order" label="菜单序号"> </el-table-column>
        <el-table-column prop="isVisible" label="菜单是否可见">
          <template slot-scope="scope"
            >{{ scope.row.isVisible + "" }}
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="菜单是否激活可用">
          <template slot-scope="scope"
            >{{ scope.row.isActive + "" }}
          </template>
        </el-table-column>
        <el-table-column prop="target" label="菜单跳转目标"> </el-table-column>
        <el-table-column
          prop="requiresAuthentication"
          label="是否需要用户登录后才可用"
        >
          <template slot-scope="scope"
            >{{ scope.row.requiresAuthentication + "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="requiredPermissionName"
          label="需要验证的权限名称"
        >
        </el-table-column>
        <el-table-column prop="parentId" label="上一级菜单id">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div>
      <el-dialog
        title="新增菜单"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
      >
        <el-form
          :model="addMenuData"
          ref="addShiftForm"
          label-suffix="："
          label-width="130px"
        >
          <el-form-item label="唯一名称">
            <el-input v-model="addMenuData.name"></el-input>
          </el-form-item>
          <el-form-item label="显示名称">
            <el-input v-model="addMenuData.displayName"></el-input>
          </el-form-item>
          <el-form-item label="导航地址">
            <el-input v-model="addMenuData.url"></el-input>
          </el-form-item>
          <el-form-item label="图标名称">
            <el-input v-model="addMenuData.icon"></el-input>
          </el-form-item>
          <el-form-item label="菜单序号">
            <el-input v-model="addMenuData.order"></el-input>
          </el-form-item>
          <el-form-item label="菜单是否可见">
            <el-select v-model="addMenuData.isVisible" placeholder="">
              <el-option label="是" :value="true"> </el-option>
              <el-option label="否" :value="false"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单是否激活可用">
            <el-select v-model="addMenuData.isActive" placeholder="">
              <el-option label="是" :value="true"> </el-option>
              <el-option label="否" :value="false"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单跳转目标">
            <el-radio-group v-model="addMenuData.target">
              <el-radio label="_blank"></el-radio>
              <el-radio label="_self"></el-radio>
              <el-radio label="_parent"></el-radio>
              <el-radio label="_top"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否需要用户登录后才可用">
            <el-select
              v-model="addMenuData.requiresAuthentication"
              placeholder=""
            >
              <el-option label="是" :value="true"> </el-option>
              <el-option label="否" :value="false"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="需要验证的权限名称">
            <el-input v-model="addMenuData.requiredPermissionName"></el-input>
            <!-- <el-select v-model="addMenuData.requiredPermissionName">
              <el-option
                v-for="(item, key) in auth"
                :key="item.value"
                :label="key"
                :value="key"
              >
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="上一级菜单id">
            <el-input v-model="addMenuData.parentId"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">添 加</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from "@/lib/request";
export default {
  name: "SetFlow",
  data() {
    return {
      dialogVisible: false,
      addMenuData: {
        name: "",
        displayName: "",
        url: "",
        icon: "",
        order: null,
        isVisible: null,
        isActive: null,
        customData: {},
        target: "",
        requiresAuthentication: null,
        requiredPermissionName: "",
        parentId: null,
        id: 0
      },
      tabData: [
        {
          name: "string",
          displayName: "string",
          url: "string",
          icon: "string",
          order: 0,
          isVisible: null,
          isActive: null,
          customData: {},
          target: "string",
          requiresAuthentication: null,
          requiredPermissionName: "string",
          parentId: 0,
          id: 0
        }
      ],
      auth: {}
    };
  },
  mounted() {
    this.getMenu().then(res => {
      this.tabData = res.data.result;
    });
    this.auth = this.$store.getters.auth.grantedPermissions;
  },
  methods: {
    async getMenu() {
      return await request.get(`./api/services/app/Navigation/GetAll`);
    },
    async addMenu(data) {
      return await request.post(
        `./api/services/app/Navigation/CreateOrUpdate`,
        data
      );
    },
    async deleteMenu(id) {
      return await request.delete(
        `./api/services/app/Navigation/Delete?id=${id}`
      );
    },
    add() {
      this.addMenu(this.addMenuData).then(res => {
        console.log(res);
      });
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.addMenuData = row;
      this.dialogVisible = true;
      this.addMenu(this.addMenuData).then(res => {
        console.log(res);
      });
    },
    handleDelete(row) {
      this.deleteMenu(row.id).then(res => {
        console.log(res);
        location.reload;
      });
    }
  }
};
</script>
