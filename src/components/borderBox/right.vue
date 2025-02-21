<template>
  <div class="box">
    <div class="circle"></div>
    <div class="circle1"></div>
    <div class="line"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
    <div class="circle5"></div>
    <div class="line1"></div>
    <div class="aside-container">
      <slot />
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.box {
  position: relative;
  height: 100%;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 30%;
    background-color: #fff;
    left: -4px;
    top: 18px;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 63%;
    background-color: #fff;
    left: -4px;
    top: 35%;
  }

  .circle {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 50%;
    top: -15px;
    left: -15px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 255px;
      height: 2px;
      background-color: #fff;
      right: -260px;
      top: 10px;
    }
  }

  .circle1 {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #fff;
    background-color: #fff;
    border-radius: 50%;
    top: -13px;
    left: 200px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 80px;
      height: 2px;
      background-color: #fff;
      right: -80px;
      top: 0.5px;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 43px;
      height: 2px;
      background-color: #fff;
      right: -122px;
      top: -7px;
      transform: rotate(-20deg);
    }
  }

  .line {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    top: -25px;
    left: 323px;
  }

  .circle2 {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #fff;
    background-color: #fff;
    border-radius: 50%;
    top: 10px;
    left: -8px;
  }

  .circle3 {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #fff;
    background-color: #fff;
    border-radius: 50%;
    top: 35%;
    left: -8px;
  }

  .circle4 {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 50%;
    bottom: -15px;
    left: -15px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 255px;
      height: 2px;
      background-color: #fff;
      right: -260px;
      top: 4px;
    }
  }

  .circle5 {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #fff;
    background-color: #fff;
    border-radius: 50%;
    bottom: -15px;
    left: 200px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 80px;
      height: 2px;
      background-color: #fff;
      right: -80px;
      top: 0.5px;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 40px;
      height: 2px;
      background-color: #fff;
      right: -118px;
      bottom: -5px;
      transform: rotate(-160deg);
    }
  }

  .line1 {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    bottom: -25px;
    left: 323px;
  }

  .aside-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: absolute;
    top: 0%;
    overflow: hidden;
    outline: none;
    cursor: grab;
  }
}
</style>