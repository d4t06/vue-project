<script setup lang="ts">
import type { Brand } from "@/types";
import Button from "../ui/Button.vue";
import { computed } from "vue";
import useFilterAction from "@/composables/useFilterAction";

type Props = {
   brand?: Brand;
   toggle: () => void;
};

const { brand, toggle } = defineProps<Props>();
const { brands } = useFilterAction();

const active = computed(() =>
   brand
      ? brands.value.findIndex((b) => b.brand_ascii === brand.brand_ascii) !== -1
      : !brands.value.length
);

const classes = {
   active: "text-[#cd1818] font-[500]",
   btn: "py-[3px] px-[12px] text-[15px]",
};
</script>

<template>
   <Button
      size="clear"
      :onClick="toggle"
      :active="`${active ? classes.active : ''}`"
      :class="classes.btn"
      variant="push"
      colors="secondary"
      >{{ brand ? brand.brand_name : "All" }}
   </Button>
</template>
