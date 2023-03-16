<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div class=" col-lg-6 col-xl-5 col-md-8 col-sm-8 col-11 q-gutter-y-lg">
      <HeaderCardComponent
        :is-loading="isLoading"
        :filter="filterValue"
        @change-filter="changeFilter"
      />
      <template v-if="!isLoading">
        <SearchNotFoundComponent v-if="!filteredAndSortedArray.length" />

        <AchievementsList
          v-else
          :achievements="filteredAndSortedArray"
          :is-admin="userStore.isAdmin"
        />
      </template>
      <div
        v-else
        class="row justify-center q-mt-xl"
      >
        <q-spinner
          color="primary"
          size="7em"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import SearchNotFoundComponent from 'src/components/SearchNotFoundComponent.vue'
import AchievementsList from 'src/components/AchievementsPage/AchievementsList.vue'
import HeaderCardComponent from 'src/components/AchievementsPage/HeaderCardComponent.vue'
import { useAchievementsStore } from 'src/stores/achievementsStore'
import { Achievement } from 'src/api/generated'
import { useUserStore } from 'src/stores/userStore'

const achievementsStore = useAchievementsStore()
const userStore = useUserStore()

const isLoading = ref(false)

const filterValue = ref('')
const filteredAndSortedArray = computed<Achievement[]>(() => {
  const arr = [...achievementsStore.achievements].sort((a, b) => b.created_at - a.created_at)
  const filterValueLower = filterValue.value.toLowerCase()
  return arr.filter((item) => item.name.toLowerCase().includes(filterValueLower) || item.description?.toLowerCase().includes(filterValueLower))
})

const changeFilter = (newValue: string): void => {
  filterValue.value = newValue
}

</script>
