<template>
  <div v-loading="bodyLoading">
    <el-table
      :data="dataSource"
      v-bind="options"
      border
      @selection-change="handleSelectionChange"
      header-row-class-name="table-header-row"
    >
      <!-- 是否需要展开 -->
      <el-table-column type="expand" v-if="options.expand">
        <template slot-scope="scope">
          <slot name="expand" :row="scope.row">默认展开内容</slot>
        </template>
      </el-table-column>
      <!--selection选择框-->
      <el-table-column
        v-if="options.mutiSelect"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>

      <!--序号-->
      <el-table-column
        v-if="options.index"
        label="序号"
        type="index"
        width="60"
        align="center"
      ></el-table-column>

      <!--数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :show-overflow-tooltip="true"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align || 'center'"
          :width="column.width"
          :fixed="column.fixed"
        >
          <template slot-scope="scope">
            <!-- slot 你可以其他常用项 -->
            <slot :name="column.prop || column.type" :row="scope.row">
              <template v-if="column.threeLevel">{{
                scope.row[column.parent][column.threeLevel][column.prop]
              }}</template>
              <template v-if="!column.render">
                {{
                  column.parent
                    ? scope.row[column.parent]
                      ? scope.row[column.parent][column.prop]
                      : ""
                    : scope.row[column.prop]
                }}
              </template>
              <!-- render -->
              <template v-else>
                <RenderDom
                  :row="scope.row"
                  :index="index"
                  :render="column.render"
                />
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pagination"
      :total="pagination.total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "ComTable",
  components: {
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(createElement, ctx) {
        const { row, index } = ctx.props;
        return ctx.props.render(row, index);
      }
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    dataSource: Array,
    options: Object, // 表格参数控制 maxHeight、stripe 等等...
    columns: Array,
    pagination: Object, // 分页，不传则不显示,
    query: {
      default: () => {},
      type: Function
    }, // 获取数据的函数
    handleSelectionChange: {
      default: val => {
        console.log(val);
      },
      type: Function
    }
    // handleRowClick: {
    //   default: (row, event, column) => {
    //     console.log(row, event, column)
    //   },
    //   type: Function
    // }
  },
  // created() {
  //   // 传入的options覆盖默认设置
  //   this.$parent.options = Object.assign(
  //     {
  //       maxHeight: 750,
  //       stripe: true, // 是否为斑马纹
  //       border: false
  //     },
  //     this.options
  //   );

  //   this.options.initTable && this.query();
  // },
  methods: {
    handleSizeChange(size) {
      // 切换每页显示的数量
      console.log(this);
      this.pagination.pageSize = size;
      this.query();
    },
    handleIndexChange(current) {
      // 切换页码
      this.pagination.pageIndex = current;
      this.query();
    }
  },
  computed: {
    bodyLoading() {
      return this.$store.state.app.loading;
    }
  }
};
</script>
<style lang="less" scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
