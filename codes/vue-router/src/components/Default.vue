<template>
  <div class="hello">
    <h1>Home</h1>
    <div>
      Sort By:
      <span>
        <a
          v-for="(sort, index) in sorts"
          :class="['btn', sort.toLowerCase(), index===sortIndex ? 'active' : '']"
          :key="index"
          @click="changeSort(index)"
        >{{sort}}</a>
      </span>
      <a class="btn add" @click="add(index)">Add</a>
    </div>
    <transition-group name="fade" tag="div" appear>
      <div class="row" v-for="(row, index) in list" :key="row.rank">
        <div>{{row.rank}}</div>
        <div>{{row.title}}</div>
        <div>{{row.description}}</div>
        <div class="btn rm-btn" @click="remove(index)">X</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import source from "./data";
let length = source.length;

export default {
  name: "Default",
  data() {
    return {
      sorts: ["Rank", "Title", "Description"],
      sortIndex: 0,
      list: [...source]
    };
  },
  methods: {
    remove(index) {
      this.list.splice(index, 1);
    },
    add() {
      const item = source[Math.floor(Math.random() * 10)];
      const newItem = {
        rank: ++length,
        title: item.title,
        description: item.description
      };
      this.list = [newItem, ...this.list];
    },
    changeSort(index) {
      this.sortIndex = index;
      const prop = this.sorts[index].toLowerCase();
      this.list.sort((a, b) => {
        if (a[prop] > b[prop]) {
          return 1;
        }
        if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

.btn {
  display: inline-block;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 0.5em 0.8em;
  margin-right: 0.5em;
  transition: box-shadow 0.05s ease-in-out;
  -webkit-transition: box-shadow 0.05s ease-in-out;
}

.btn:hover {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

.btn:active,
.active,
.active:hover {
  box-shadow: 0 0 2px rgba(0, 0, 0, 2);
}

.add {
  float: right;
}

#container {
  max-width: 42em;
  margin: 0 auto 2em auto;
}

.list {
  position: relative;
}

.row {
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  left: 0px;
  margin: 0.5em 0;
  padding: 1em;
  background: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  /* transition: transform 5s ease-in-out, opacity 5s ease-out, left 5s ease-in-out; */
  /* -webkit-transition: transform 5s ease-in-out, opacity 0.5s ease-out, */
  /* left 0.5s ease-in-out; */
}

.row div {
  display: inline-block;
  vertical-align: middle;
}

.row > div:nth-child(1) {
  width: 5%;
}

.row > div:nth-child(2) {
  width: 30%;
}

.row > div:nth-child(3) {
  width: 65%;
}

.rm-btn {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  color: #c25151;
  width: 1.4em;
  height: 1.4em;
  text-align: center;
  line-height: 1.4em;
  padding: 0;
}

/* .row {
  transition: all 1s;
} */
.fade-enter-active {
  transition: all 1s;
}
.fade-enter
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-50%);
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-active {
  position: absolute;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
.fade-move {
  transition: all 1s;
}
</style>
