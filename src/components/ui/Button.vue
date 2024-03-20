<script lang="ts" setup>
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "vue";
import { RouterLink } from "vue-router";

const classes = {
   primary: "text-white rounded-[6px]  hover:brightness-90 text-[14px] bg-[#cd1818]",
   push: 'text-white active:translate-y-[4px] active:before:shadow-none before:z-[-1] border-b-[4px] border-transparent  before:absolute before:content-[""] before:bg-[#cd1818] before:inset-0 before:shadow-[0_4px_0_#9e010d] transition-[transform] before:transition-shadow',
   clear: "",
};

const ButtonVariant = cva(
   "font-[500] inline-flex justify-center items-center disabled:opacity-[.6] relative  z-0",
   {
      variants: {
         variant: {
            primary: classes.primary,
            push: classes.push,
            clear: classes.clear,
         },
         size: {
            primary: "px-[20px] py-[4px]",
            full: "w-full py-[4px]",
            clear: "",
         },
         rounded: {
            primary: "before:rounded-[8px] rounded-[8px]",
            lg: "before:rounded-[12px] rounded-[12px]",
            max: "before:rounded-[99px] rounded-[99px]",
         },
      },
      defaultVariants: {
         variant: "primary",
         size: "primary",
         rounded: "primary",
      },
   }
);

interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
   href?: string;
   loading?: boolean;
   className?: string;
   variant?: "primary" | "push" | "clear" | null | undefined;
   size?: "primary" | "full" | "clear" | null | undefined;
   rounded?: "primary" | "lg" | "max" | null | undefined;
   rest?: Partial<ButtonHTMLAttributes>;
}

const { href, variant, size, className, loading, rounded, ...rest } = defineProps<ButtonProps>();
</script>

<template>
   <RouterLink
      v-if="href"
      v-bind="rest"
      :to="href"
      :class="ButtonVariant({ variant, size, rounded, className })"
   >
      <slot />
   </RouterLink>

   <template v-else>
      <button v-bind="rest" :class="ButtonVariant({ variant, size, rounded, className })">
         <template v-if="loading">
            <ArrowPathIcon class="w-[24px] animate-spin" />
         </template>
         <template v-else>
            <slot />
         </template>
      </button>
   </template>
</template>