<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">{{ name }}</div> -->
    <div class="dashboard-bg">
      <div class="img" />
      <div class="text">
        <p>你看 顽皮细雨招摇过远帆 修理过小店某处忽明忽暗的灯盏</p>
        <p>你听 江水流过人家吵着要上岸 你去过烟花三月的江南</p>
        <p>你看 秋月温柔撕破了花瓣 却只为迎着暮冬大雪纷飞时贪玩</p>
        <p>你说 要忘却所有不愉快的片段 把美好事物纯真的走完</p>
        <i>——房东的猫</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 20px;
    margin-left: 40px;
    line-height: 46px;
  }

  &-bg {
    display: flex;
    .img {
      margin: 80px 0 0 90px;
      width: 550px;
      height: 380px;
      background: url("http://www.jammyfm.com/wordpress/wp-content/uploads/images/2017/08/09/1502277609906115.jpg") no-repeat;
      background-size: 100% 100%;
    }

    .text{
      flex: 1;
      margin: 70px 0 0 90px;
      i{
        margin-top: 50px;
        display: block;
      }
    }
  }
}
</style>
