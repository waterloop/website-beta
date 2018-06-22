<template>
  <a
    href="#main"
    class="db arrow"/>
</template>

<style>
.arrow {
  animation: sdb 1.5s infinite;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  height: 1.5rem;
  width: 1.5rem;
}

@keyframes sdb {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(-45deg);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(0, 1rem) rotate(-45deg);
  }
}
</style>

