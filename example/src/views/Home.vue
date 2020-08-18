<template>
  <div class="home">
    <kgt-list-page
      :queryVal="queryVal"
      :queryOption="queryOption"
      :listOption="listOption"
      :loading="loading"
    >
    <template #test>
      只是一个slot
    </template>
    </kgt-list-page>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      queryVal: {},
      queryOption: {
        schema: [
          { key: "name", label: "名称", type: "input" },
          {
            key: "time",
            label: "日期",
            type: "datetime"
          },
          {
            slot: "test",
            label: "slot"
          },
        ],
      },
      listOption: {
        columns: [
          {
            title: "第一列",
            key: "col1",
          },
          {
            title: "第二列",
            key: "col2",
          },
          {
            title: "第三列",
            key: "col3",
          },
          {
            title: "第四列",
            key: "col4",
          },
        ],
        data: [
          { col1: "第一列", col2: "第二列", col3: "第三列", col4: "第四列" },
          { col1: "第一列", col2: "第二列", col3: "第三列", col4: "第四列" },
          { col1: "第一列", col2: "第二列", col3: "第三列", col4: "第四列" },
          { col1: "第一列", col2: "第二列", col3: "第三列", col4: "第四列" },
          { col1: "第一列", col2: "第二列", col3: "第三列", col4: "第四列" },
          { col1: "第一列", col2: "第二列", col3: "第三列", col4: "第四列" },
        ],
      },
      loading: false,
    };
  },
};
</script>
