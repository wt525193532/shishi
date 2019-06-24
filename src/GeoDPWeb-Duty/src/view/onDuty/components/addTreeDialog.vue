<template>
  <div>
    <el-dialog
      :title="title"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :visible.sync="dialogTreeVisible"
    >
      <el-tree
        :props="defaultProps"
        :data="data"
        ref="addTree"
        default-expand-all
        node-key="label"
        show-checkbox
        @check="getCheckNodes"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="add">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "AddTreeDialog",
  props: {
    dialogTreeVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    add: Function,
    getCheckNodes: Function,
    handleClose: Function
  },
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                },
                {
                  label: "三级 1-1-2"
                },
                {
                  label: "三级 1-1-3"
                }
              ]
            },
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 1-2-1"
                },
                {
                  label: "三级 1-2-2"
                },
                {
                  label: "三级 1-2-3"
                }
              ]
            },
            {
              label: "二级 3-1"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tags: []
    };
  },
  methods: {
    setCheckedNodes(tags) {
      this.$refs.addTree.setCheckedNodes(tags);
    }
  }
};
</script>
