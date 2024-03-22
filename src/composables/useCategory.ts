import { useAppStore } from "@/stores/app";
import { useToastStore } from "@/stores/toast";
import type { Category, CategorySchema } from "@/types";
import { publicRequest } from "@/utils/request";
import { storeToRefs } from "pinia";
import { ref, watch, type Ref } from "vue";
import usePrivateRequest from "./usePrivateRequest";
import { sleep } from "@/utils/appHelper";
import { useRoute } from "vue-router";

export type CategoryOpenModal = "close" | "edit" | "add" | "delete";

const CATEGORY_URL = "/categories";

// type Props = {
//    isOpenModal: Ref<CategoryOpenModal>;
// };

export default function useCategory() {
   const isFetching = ref(false);

   const appStore = useAppStore();
   const toastStore = useToastStore();
   const { status, categories } = storeToRefs(appStore);

   const privateRequest = usePrivateRequest();
   const route = useRoute();

   const getCategories = async () => {
      try {
         console.log(">>> api get categories");
         const res = await publicRequest.get("/categories");
         appStore.storingCategory({ categories: res.data.data, status: "successful" });
      } catch (err) {
         console.log({ message: err });
         appStore.storingCategory({ status: "error" });
      }
   };

   const getCurCategory = () => {
      if (status.value !== "successful") return undefined;

      const categoryAscii = route.params.categoryAscii;
      if (!categoryAscii) return undefined;

      return categories.value.find((c) => c.category_ascii === categoryAscii);
   };

   const getBrandsByCategory = () => {
      const curCategory = getCurCategory();
      if (!curCategory) return [];
      return curCategory.brands;
   };

   type AddCategory = {
      type: "add";
      category: CategorySchema;
   };

   type EditCategory = {
      type: "edit";
      category: CategorySchema;
      currentIndex: number | undefined;
   };

   const addOrEditCategory = async ({ ...props }: AddCategory | EditCategory) => {
      try {
         switch (props.type) {
            case "add":
               isFetching.value = true;

               const { category } = props;
               // add category
               const res = await privateRequest.post(`${CATEGORY_URL}`, category);

               // add attributes prop to category to fix error not found when add attribute
               const newCategory = res.data.data as Category;
               const newCategories = [...categories.value, newCategory];

               if (import.meta.env.DEV) await sleep(2000);

               appStore.storingCategory({ categories: newCategories });

               break;
            case "edit":
               const { category: _category, currentIndex } = props;

               if (currentIndex === undefined) throw new Error("Missing current index");
               const curCategory = categories.value[currentIndex];

               if (curCategory === undefined) throw new Error("Missing curCategory");

               isFetching.value = true;

               await privateRequest.put(`${CATEGORY_URL}/${curCategory.id}`, _category);

               const _newCategories = [...categories.value];
               Object.assign(_newCategories[currentIndex], _category);

               if (import.meta.env.DEV) await sleep(2000);

               appStore.storingCategory({ categories: _newCategories });
         }

         toastStore.setSuccessToast(`${props.type} category successful`);
      } catch (error) {
         console.log({ message: error });
         toastStore.setErrorToast(`${props.type} category fail`);
      } finally {
         isFetching.value = false;
         // isOpenModal.value = "close";
      }
   };

   const deleteCategory = async (currentIndex: number | undefined) => {
      try {
         if (currentIndex === undefined) throw new Error("Missing current index have id");
         const curCategory = categories.value[currentIndex];

         if (!curCategory) throw new Error("Category not found");
         isFetching.value = true;

         await privateRequest.delete(`${CATEGORY_URL}/${curCategory.id}`);

         const newCategories = categories.value.filter((c) => c.id !== curCategory.id);
         appStore.storingCategory({ categories: newCategories });

         toastStore.setSuccessToast(`Delete category '${curCategory.category_name}' successful`);
      } catch (error) {
         console.log({ message: error });
         toastStore.setErrorToast(`Delete category fail`);
      } finally {
         isFetching.value = false;
         // isOpenModal.value = "close";
      }
   };

   // watch(
   //    appStore,
   //    async () => {
   //       if (!categories.value.length) getCategories();
   //    },
   //    {
   //       immediate: true,
   //       flush: "post",
   //       once: true,
   //    }
   // );

   return {
      categories,
      status,
      getCategories,
      getCurCategory,
      getBrandsByCategory,
      addOrEditCategory,
      deleteCategory,
      isFetching,
   };
}
